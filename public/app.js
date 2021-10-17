const firebaseConfig = {
	apiKey: "AIzaSyADLkHxkIkQFbjREF2ds6SfzchyIdBzEek",
	authDomain: "fcm-s-test.firebaseapp.com",
	projectId: "fcm-s-test",
	storageBucket: "fcm-s-test.appspot.com",
	messagingSenderId: "174757692282",
	appId: "1:174757692282:web:5ac7d8a4e448348bfe8cc3",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

function subscribeUser() {
	Notification.requestPermission().then((permission) => {
		console.log(permission);
		if (permission == "granted") {
			messaging
				.getToken({
					vapidKey:
						"BKvZI9_nsNzr7u4YFhR3-x8rRO7w-m9Tnfyk997OuEoRgp5ZT_0GyQ1q-mRbyp_Y3P2DytOKOT55ZN53nqgtVxM",
				})
				.then((currentToken) => {
					console.log(currentToken);
					document.getElementById("tokenId").innerHTML = currentToken;

					let body = {
						token: currentToken,
					};
					let options = {
						method: "POST",
						headers: new Headers({
							"content-type": "application/json",
						}),
						body: JSON.stringify(body),
					};

					fetch("/subscribe", options)
						.then((res) => {
							console.log(res);
							console.log("SENT");
						})
						.catch((e) => console.log(e));
				});
		}
	});
}
function sendNotification() {
	fetch("/sendNotification")
		.then((response) => response.json())
		.then((data) => console.log(data));
}
messaging.onMessage((res) => {
	console.log({ res });
});
