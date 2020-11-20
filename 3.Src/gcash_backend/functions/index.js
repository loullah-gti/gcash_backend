const functions = require("firebase-functions");

const onUserCreated = require("./modules/users/onUserCreated");
const setUserClaims = require("./modules/users/setUserClaims");
const setUserDetails = require("./modules/users/setUserDetails");
const getPersonInfos = require("./modules/users/getPersonInfos");
const onComptaOpCreated = require("./modules/compta/onComptaOpCreated");
const onPaiementCreated = require("./modules/transactions/onPaiementCreated");
const onTrnasfertCreated = require("./modules/transactions/onTrnasfertCreated");
const onCarteUsed = require("./modules/transactions/onCarteUsed");
const findMeACarte = require("./modules/transactions/findMeACarte");
const onAlimentationCreated = require("./modules/transactions/onAlimentationCreated");
const getSNDEAccountByReference = require("./modules/external/snde/getSNDEAccountByReference");
const getSomelecAccountByReference = require("./modules/external/somelec/getSomelecAccountByReference");

const { db } = require("./modules/adminSdk");

const admin = require("firebase-admin");

const usersCollection = "users";
const transfertCollection = "transferts";
const alimentationsCollection = "alimentations";
const paiementsCollection = "paiements";
const comptesCollection = "comptes";
const cartesCollection = "cartes";
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
    .document(usersCollection + "/{uid}/" + comptesCollection + "/{compteId}/" + operationsCollection + "/{operationId}")
    .onCreate(onComptaOpCreated),
  onTrnasfertCreated: functions.firestore
    .document(transfertCollection + "/{transfertId}")
    .onCreate(onTrnasfertCreated),
  onPaiementCreated: functions.firestore
    .document(paiementsCollection + "/{paiementId}")
    .onCreate(onPaiementCreated),
    onAlimentationCreated: functions.firestore
    .document(alimentationsCollection + "/{alimId}")
    .onCreate(onAlimentationCreated),

  onCarteUsed: functions.firestore
    .document(cartesCollection + "/{paiementId}")
    .onWrite(onCarteUsed),

  findMeACarte: functions.https.onRequest(findMeACarte),
  getPersonInfos: functions.https.onRequest(getPersonInfos),
  getSNDEAccountByReference: functions.https.onRequest(getSNDEAccountByReference),
  getSomelecAccountByReference: functions.https.onRequest(getSomelecAccountByReference),

};
