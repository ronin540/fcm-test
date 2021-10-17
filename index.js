const express = require("express");
const path = require("path");

const admin = require("firebase-admin");
var serviceAccount = require("./fcm-s-test-firebase-adminsdk-q1kra-c376bbc7b3.json");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const port = 3000;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://fcm-s-test-default-rtdb.firebaseio.com/",
});
app.post("/subscribe", async (req, res) => {
	let registrationTokens = req.body.token;
	let topic = "sam";
	admin
		.messaging()
		.subscribeToTopic(registrationTokens, topic)
		.then((response) => {
			// See the MessagingTopicManagementResponse reference documentation
			// for the contents of response.
			console.log("Successfully subscribed to topic:", response);
		})
		.then(() => {
			// Send a message to devices subscribed to the provided topic.
			let message = {
				data: "data is not here",
				notification: {
					title: "subscription",
					body: "someone subscribe",
				},
				topic: "no topic",
				webpush: {
					fcm_options: {
						link: "/",
					},
				},
			};
			admin
				.messaging()
				.send(message)
				.then((response) => {
					// Response is a message ID string.
					console.log("Successfully sent message:", response);
					res.send(res);
				})
				.catch((error) => {
					console.log("Error sending message:", error);
				});
		})
		.catch((error) => {
			console.log("Error subscribing to topic:", error);
		});
});
app.post("/sendNotification", async (req, res) => {});
app.listen(port, () => {
	console.log(`app is listening to ${port}`);
});
