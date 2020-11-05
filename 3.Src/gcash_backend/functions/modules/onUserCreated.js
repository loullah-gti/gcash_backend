const { db } = require("./adminSdk");
const admin = require("firebase-admin");

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
  db.collection("users").doc(user.uid).set(datasToUpdate, { merge: true });
  db.collection("users"+user.uid+"para").doc("meters").set({}, { merge: true });

};

module.exports = onUserCreated;