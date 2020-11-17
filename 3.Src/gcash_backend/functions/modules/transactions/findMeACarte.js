const { db } = require("../adminSdk");
const admin = require("firebase-admin");
const { getSessionUser } = require("../getSessionUID");
const maxRetries = 5;

const {
    usersCollection,
    comptesCollection,
    operationsCollection,
    principalDocument,
    paraCollection,
    metersDocument,
    montantField,
    typeOpTransfert,
    typeOpPaiement,
    typeOpRecharge,
    typeOpRetrait,
    typeOpAlimentation,
} = require("../../constants");


const cors = require("cors")({ origin: true });
const findMeACarte = async (req, res) => {
    try {
        let operateur = req.body.data.operateur;
        let montant = req.body.data.montant;
        let phoneNumber = req.body.data.phoneNumber;
        let user = await getSessionUser(req);
        if (user) {
            // let currentTry = 0;
            // while (currentTry < maxRetries) {
            let carte = await getRandomcarte(operateur, montant);
            if (carte) {
                let carteReserved =
                    await reserveThisCarte(user, carte, phoneNumber);
                if (carteReserved === true) {
                    res.status(200).send({ data: { carte: carte.id, code: carte.data()["code"] } });
                    return;
                }
            }
            // }
            res.send({ data: { carte: null, code: null } });
            return;
        } else {
            res.status(401).send({ data: { error: "Unauthorized" } });
            return;
        }

    } catch (err) {
        console.error(err);
        res.status(400).send({ data: { error: "Problem getting carte, retry plz" } })
    }
    return;
};


async function getRandomcarte(operateur, montant) {
    var cartesCollection = db.collection("cartes");

    var key = cartesCollection.doc().id;
    var sn = await cartesCollection
        .where(admin.firestore.FieldPath.documentId(), ">=", key)
        .where("etat", "=", 1)
        .where("operateurId", "=", "" + operateur)
        .where("valeur", "=", montant)
        .limit(1)
        .get();
    if (sn.docs.length > 0) {
        return sn.docs[0];
    } else {
        sn = await cartesCollection
            .where(admin.firestore.FieldPath.documentId(), "<", key)
            .where("etat", "=", 1)
            .where("operateurId", "=", "" + operateur)
            .where("valeur", "=", montant)
            .limit(1)
            .get();
        if (sn.docs.length > 0) {
            return sn.docs[0];
        }

        return null;
    }
}

async function reserveThisCarte(user, carte, phoneNumber) {
    try {
        datasToUpdate = {
            etat: 2,
            usedById: user.uid,
            usedByName: user.displayName || "",
            usedByPhoneNumber: user.phoneNumber || "",
            usedDestPhoneNumber: phoneNumber || "",
            usedDate: admin.firestore.FieldValue.serverTimestamp(),
        };
        await db.doc(carte.ref.path)
            .update(datasToUpdate);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
module.exports = findMeACarte;
