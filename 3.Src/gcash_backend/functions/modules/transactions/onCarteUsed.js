const { db } = require("../adminSdk");
const admin = require("firebase-admin");

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

const onCarteUsed = (snapshot, context) => {
    const typeOperationRecharge = 3;
    if (snapshot.before.data()["etat"] === 1 && snapshot.after.data()["etat"] === 2) {
        let idClaimer = snapshot.after.data()["usedById"];
        let montant = -snapshot.after.data()["valeur"];
        let reciever = snapshot.after.data()["usedDestPhoneNumber"] || "";

        let operationsPath = usersCollection + "/" + idClaimer + "/" + comptesCollection + "/" + principalDocument + "/" + operationsCollection;
        let dataToAdd = {
            typeOperation: typeOperationRecharge,
            montant: montant,
            comment: reciever,
            date: admin.firestore.FieldValue.serverTimestamp(),
        };
        let refReceveur = db.collection(operationsPath).doc();
        refReceveur.create(dataToAdd);
    } else {
        console.log("do nothing");
    }
    return "";
}


module.exports = onCarteUsed;
