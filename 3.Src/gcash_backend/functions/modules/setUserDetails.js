const { db } = require("./adminSdk");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });
const setUserDetails = (req, res) => {
    cors(req, res, () => {
        let uid = req.body.data.uid;
        let datasToUpdate = {};
    
        let email = req.body.data.email;
        if (email !== null && email !== "" && email !== undefined) {
          datasToUpdate.email = email;
        }
        let displayName = req.body.data.displayName;
        if (
          displayName !== null &&
          displayName !== "" &&
          displayName !== undefined
        ) {
          datasToUpdate.displayName = displayName;
        }
        let photoURL = req.body.data.photoURL;
        if (photoURL !== null && photoURL !== "" && photoURL !== undefined) {
          datasToUpdate.photoURL = photoURL;
        }
        let phoneNumber = req.body.data.phoneNumber;
        if (
          phoneNumber !== null &&
          phoneNumber !== "" &&
          phoneNumber !== undefined
        ) {
          if(!phoneNumber.startsWith('+222')) {
            phoneNumber = "+222" + phoneNumber;
          }
          datasToUpdate.phoneNumber = phoneNumber;
        }
        let password = req.body.data.password;
        if (password !== null && password !== "" && password !== undefined) {
          datasToUpdate.password = password;
        }
        let disabled = req.body.data.disabled;
        if (disabled !== null && disabled !== "" && disabled !== undefined) {
          datasToUpdate.disabled = disabled;
        }
        // authentification
        //admin.auth().updateUser(uid, datasToUpdate);
        admin
          .auth()
          .updateUser(uid, datasToUpdate)
          .then((data) => {
            res.status(200).send({ data: { message: "success", data: data } });
            return null;
          })
          .catch((err) => {
            res.status(200).send({ data: { message: err } });
            return null;
          });
        datasToUpdate.uid = uid;
        datasToUpdate.password = null;
        // firestore
        db.collection("users").doc(uid).set(datasToUpdate, { merge: true });
        return;
      });
}
 
module.exports = setUserDetails;
