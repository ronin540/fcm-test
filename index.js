const express = require("express");
const path = require("path");

const admin = require("firebase-admin");
var serviceAccount = require("./fcm-s-test-firebase-adminsdk-q1kra-34fb990e1c.json");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const port = 8080;

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
		});

	app
		.get("/sendNotification", async (req, res) => {
			// Send a message to devices subscribed to the provided topic.
			let topic = "sam";
			let message = {
				data: { score: "850", time: "2:45" },
				notification: {
					title: "subscription",
					body: "someone subscribe",
				},
				topic,
			};
			admin
				.messaging()
				.send(message)
				.then((response) => {
					// Response is a message ID string.
					console.log("Successfully sent message:", response);
					res.send(response);
				})
				.catch((error) => {
					console.log("Error sending message:", error);
				});
		})
		.catch((error) => {
			console.log("Error subscribing to topic:", error);
		});
});
app.listen(port, () => {
	console.log(`app is listening to ${port}`);
});
