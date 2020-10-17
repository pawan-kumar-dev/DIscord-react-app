import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDMYt1piQTozq5i0MTt_BBi6kRYoq6kRxw",
  authDomain: "discord-clone-app-c0f00.firebaseapp.com",
  databaseURL: "https://discord-clone-app-c0f00.firebaseio.com",
  projectId: "discord-clone-app-c0f00",
  storageBucket: "discord-clone-app-c0f00.appspot.com",
  messagingSenderId: "672467518941",
  appId: "1:672467518941:web:0a688c4f426c74c6f32234"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
