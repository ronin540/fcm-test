const admin = require("firebase-admin");
var serviceAccount = require("./fcm-s-test-firebase-adminsdk-q1kra-c376bbc7b3.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://fcm-s-test-default-rtdb.firebaseio.com/",
});
