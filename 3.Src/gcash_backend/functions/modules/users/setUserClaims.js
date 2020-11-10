const { db } = require("../adminSdk");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });
const setUserClaims = (req, res) => {
    cors(req, res, () => {
        let uid = req.body.data.uid;
        let userClaims = req.body.data;
        delete userClaims.uid;
        message = "Claims not updated correctly";
    
        if (userClaims) {
          message = "claims updated correctly";
          admin
            .auth()
            .setCustomUserClaims(uid, userClaims)
            .then(() => {
              return null;
            })
            .catch((error) => {
              console.log("error", error);
              process.exit(1);
            });
        }
    
        res.status(200).send({ data: message });
      });

};

module.exports = setUserClaims;
