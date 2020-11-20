const { db } = require("../../adminSdk");
const admin = require("firebase-admin");
const { getSessionUser } = require("../../getSessionUID");

const cors = require("cors")({ origin: true });

const getSNDEAccountByReference = (req, res) => {
  cors(req, res, async () => {
    let user = await getSessionUser(req);
    //todo: if isAdmin or user.uid == req.body.data.uid
    if (user) {
      let reference = req.body.data.reference;
      res.send({ data: { found: false, message: "Reference " + reference + " not found" } });
      return;
    } else {
      res.status(401).send({ data: { error: "Unauthorized" } });
      return;
    }
  });
}
module.exports = getSNDEAccountByReference;
