const { db } = require("../adminSdk");
const admin = require("firebase-admin");
const defaultParameters = { "lang": "ar", "secAllApp": 1, "secOperation": 2 };
const defaultAccount = { "solde": 0, "libelle": "Compte principal" };
const onUserCreated = (user) => {
  admin
    .auth()
    .setCustomUserClaims(user.uid, { isRider: true })
    .then(() => {
      return null;
    })
    .catch((error) => {
      process.exit(1);
    });
  let datasToUpdate = {
    uid: user.uid,
    displayName: user.displayName === null ? " " : user.displayName,
    email: user.email === null ? " " : user.email,
    photoURL: user.photoURL === null ? " " : user.photoURL,
    phoneNumber: user.phoneNumber === null ? " " : user.phoneNumber,
  };
  db.collection(usersCollection).doc(user.uid).set(datasToUpdate, { merge: true });
  db.collection(usersCollection+"/" + user.uid + "/"+paraCollection).doc(metersDocument).set(defaultParameters, { merge: true });
  db.collection(usersCollection+"/" + user.uid + "/"+comptesCollection).doc(principalDocument).set(defaultAccount, { merge: true });

};

module.exports = onUserCreated;