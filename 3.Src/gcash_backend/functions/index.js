const functions = require("firebase-functions"); 

const onUserCreated = require("./modules/users/onUserCreated");
const setUserClaims = require("./modules/users/setUserClaims");
const setUserDetails = require("./modules/users/setUserDetails");
const onComptaOpCreated = require("./modules/compta/onComptaOpCreated");
const onPaiementCreated = require("./modules/transactions/onPaiementCreated");
const onTrnasfertCreated = require("./modules/transactions/onTrnasfertCreated");

const { db } = require("./modules/adminSdk");


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


module.exports = {
  onUserCreated: functions.auth.user().onCreate(onUserCreated),
  setUserClaims: functions.https.onRequest(setUserClaims),
  setUserDetails: functions.https.onRequest(setUserDetails),
  onComptaOpCreated: functions.firestore
    .document(usersCollection+ "/{uid}/"+comptesCollection+"/{compteId}/"+operationsCollection+"/{operationId}")
    .onCreate(onComptaOpCreated),
    onTrnasfertCreated: functions.firestore
      .document(transfertCollection+ "/{transfertId}")
      .onCreate(onTrnasfertCreated),
      onPaiementCreated: functions.firestore
      .document(paiementsCollection+ "/{paiementId}")
      .onCreate(onPaiementCreated),
};
