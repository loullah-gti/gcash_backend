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
const idClientField = "clientUID";
const typeField = "type";


const onAlimentationCreated = async (snap, context) => {
    const typeOperationRetrait = 4;
    const typeOperationAlimentation = 5;
    var batch = db.batch();
    let montant = snap.data()[montantField] || 0;
    let idClient = snap.data()[idClientField];
    let type = snap.data()[typeField];
    let operationsPath = usersCollection + "/" + idClient + "/" + comptesCollection + "/" + principalDocument + "/" + operationsCollection;
    let dataOperation = {
        typeOperation: type===1? typeOperationAlimentation: typeOperationRetrait,
        montant: (type===1? montant: -montant),
        comment: "",//type===1?"Alimentation":"Retrait",
        date: admin.firestore.FieldValue.serverTimestamp(),
    };
    let refClientOperation = db.collection(operationsPath).doc();
    batch.create(refClientOperation, dataOperation);
    
    batch.commit();
    return "";
}


module.exports = onAlimentationCreated;
