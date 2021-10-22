importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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

messaging.onBackgroundMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Background Message Title";
	const notificationOptions = {
		body: "Background Message body.",
		icon: "/firebase-logo.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
