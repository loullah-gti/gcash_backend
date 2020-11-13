const admin = require("firebase-admin");
const getSessionUID = async (req) => {
    try {
        let tokenId = req.get('Authorization').split('Bearer ')[1];
        let decoded =await admin.auth().verifyIdToken(tokenId);
        return decoded.uid;
        // console.log(decoded);
    } catch (err) {
        return null;
    }
};
const getSessionUser = async (req) => {
    try {
        let uid =await getSessionUID(req);
        return await admin.auth().getUser(uid);
        // console.log(decoded);
    } catch (err) {
        return null;
    }
};

module.exports ={getSessionUID, getSessionUser};