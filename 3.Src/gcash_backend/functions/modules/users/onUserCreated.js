const { db } = require("../adminSdk");
const admin = require("firebase-admin");
const defaultParameters = { "lang": "ar", "secAllApp": 0, "secOperation": 1 };
const defaultAccount = { "solde": 0, "libelle": "Compte principal" };
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
const onUserCreated = (user) => {
  // admin
  //   .auth()
  //   .setCustomUserClaims(user.uid, { is: true })
  //   .then(() => {
  //     return null;
  //   })
  //   .catch((error) => {
  //     process.exit(1);
  //   });
  let datasToUpdate = {
    uid: user.uid,
    displayName: user.displayName === null ? " " : user.displayName,
    email: user.email === null ? " " : user.email,
    photoURL: user.photoURL === null ? " " : user.photoURL,
    phoneNumber: user.phoneNumber === null ? " " : user.phoneNumber,
  };
  db.collection(usersCollection).doc(user.uid).create(datasToUpdate);
  db.collection(usersCollection+"/" + user.uid + "/"+paraCollection).doc(metersDocument).create(defaultParameters);
  db.collection(usersCollection+"/" + user.uid + "/"+comptesCollection).doc(principalDocument).create(defaultAccount);

};

module.exports = onUserCreated;