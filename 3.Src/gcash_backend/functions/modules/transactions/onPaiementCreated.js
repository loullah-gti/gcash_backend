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

const onPaiementCreated = async (snap, context) => {
    const typeOperationPaiement = 2;
    var batch = db.batch();
    let paiementId = context.params.paiementId;
    let montant = snap.data()[montantField] || 0;
    let idEmetteur = snap.data()[idEmetteurField];
    let idReceveur = snap.data()[idReceveurField];
    let operationsEmetteurPath = usersCollection + "/" + idEmetteur + "/" + comptesCollection + "/" + principalDocument+"/"+operationsCollection;
    let operationsReceveurPath = usersCollection + "/" + idReceveur + "/" + comptesCollection + "/" + principalDocument+"/"+operationsCollection;
    let dataEmetteur = {
        typeOperation: typeOperationPaiement,
        montant: -montant,
        comment: "",
        date: admin.firestore.FieldValue.serverTimestamp,
    };
    let dataReceveur = {
        typeOperation: typeOperationPaiement,
        montant: montant,
        comment: "",
        date: admin.firestore.FieldValue.serverTimestamp,
    };
    let refEmetteur = db.collection(operationsEmetteurPath).doc();
    batch.create(refEmetteur,dataEmetteur);
    
    let refReceveur = db.collection(operationsReceveurPath).doc();
    batch.create(refReceveur,dataReceveur);

    return;
}


module.exports = onPaiementCreated;
