import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getFunctions} from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIYgPpMadE3sne0MC3kHTxajVHNo3XYtM",
    authDomain: "omnichat-b1429.firebaseapp.com",
    projectId: "omnichat-b1429",
    storageBucket: "omnichat-b1429.appspot.com",
    messagingSenderId: "424712602946",
    appId: "1:424712602946:web:43a4c0952c9e94a611f4db"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const functions = getFunctions(app);

  export {auth,db,functions}