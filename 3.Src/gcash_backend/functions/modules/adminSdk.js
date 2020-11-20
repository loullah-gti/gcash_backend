const functions = require("firebase-functions");
var isLocal=false;
var isProdEnv = isLocal?false:(functions.config().env.isprod === "true" ? true : false);
const admin = require("firebase-admin");
const serviceAccount = isProdEnv
  ? require("../config/gcash-61021-firebase-adminsdk-9odvc-ba27b8f616.json")
  : require("../config/gcashtestenvironment-firebase-adminsdk-bx9ng-4a1cb28a35.json");

//const app = express();
const databaseURL = isProdEnv
  ? "https://gcash-61021.firebaseio.com"
  : "https://gcashtestenvironment.firebaseio.com";
//  const databaseURL= "https://classrideenvtest.firebaseio.com";

const strorageUrl = isProdEnv
  ? "gcash-61021.appspot.com"
  : "gcashtestenvironment.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
  storageBucket:strorageUrl
});
const db = admin.firestore();
const storageBucket = admin.storage();

module.exports = {
  db,
  storageBucket,
  isProdEnv
}