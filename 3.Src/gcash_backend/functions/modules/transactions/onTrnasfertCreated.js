const { db } = require("../adminSdk");
const admin = require("firebase-admin");

const usersCollection = "users";
const transfertCollection = "transferts";
const paiementsCollection = "paiements";
const comptesCollection = "comptes";
const operationsCollection = "operations";
const principalDocument = "principal";
const paraCollection = "para";
const metersDocument = "meters";
const montantField = "montant";
const idEmetteurField = "idEmetteur";
const phoneEmetteurField = "phoneEmetteur";
const idReceveurField = "idReceveur";
const phoneReceveurField = "phoneReceveur";


const onTrnasfertCreated = async (snap, context) => {

    const typeOperationTransfert = 1;
    var batch = db.batch();
    let transfertId = context.params.transfertId;
    let montant = snap.data()[montantField] || 0;
    let idEmetteur = snap.data()[idEmetteurField];
    let idReceveur = snap.data()[idReceveurField] || null;
    let phoneReceveur = snap.data()[phoneReceveurField] || null;
    let operationsEmetteurPath = usersCollection + "/" + idEmetteur + "/" + comptesCollection + "/" + principalDocument + "/" + operationsCollection;
    let dataEmetteur = {
        typeOperation: typeOperationTransfert,
        montant: -montant,
        comment: "",
        date: admin.firestore.FieldValue.serverTimestamp(),
    };
    let refEmetteur = db.collection(operationsEmetteurPath).doc();
    batch.create(refEmetteur, dataEmetteur);
    if (!idReceveur) {
        if (phoneReceveur) {
            // look for the reciever in the db
            try {
                let user = await admin.auth().getUserByPhoneNumber("+222" + phoneReceveur);
                if (user) {
                    idReceveur = user.uid;
                }
            } catch (e) {
                console.log("user not existing");
            }
        }
    }
    if (idReceveur) {
        let operationsReceveurPath = usersCollection + "/" + idReceveur + "/" + comptesCollection + "/" + principalDocument + "/" + operationsCollection;
        let dataReceveur = {
            typeOperation: typeOperationTransfert,
            montant: montant,
            comment: "",
            date: admin.firestore.FieldValue.serverTimestamp(),
        };
        let refReceveur = db.collection(operationsReceveurPath).doc();
        batch.create(refReceveur, dataReceveur);
    }
    batch.commit();
    return "";
}




module.exports = onTrnasfertCreated;