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


const onComptaOpCreated = async (snap, context) => {
    let uid = context.params.uid;
    let compteId = context.params.compteId;
    let operationId = context.params.operationId;
    let montant = snap.data()[montantField] || 0;
    db.doc(usersCollection + "/" + uid + "/" + comptesCollection + "/" + compteId).update({ solde: admin.firestore.FieldValue.increment(montant) });
}
module.exports = onComptaOpCreated;