const functions = require("firebase-functions"); 
const onUserCreated = require("./modules/onUserCreated");
const setUserClaims = require("./modules/setUserClaims");
const setUserDetails = require("./modules/setUserDetails");

const { db } = require("./modules/adminSdk");

module.exports = {
  onUserCreated: functions.auth.user().onCreate(onUserCreated),
  setUserClaims: functions.https.onRequest(setUserClaims),
  setUserDetails: functions.https.onRequest(setUserDetails),
};
