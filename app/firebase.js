// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCyJmVsxVMASHfwSTap1d1YLK6QmpvbSQ",
  authDomain: "realtime-water-quality-monitor.firebaseapp.com",
  databaseURL: "https://realtime-water-quality-monitor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-water-quality-monitor",
  storageBucket: "realtime-water-quality-monitor.appspot.com",
  messagingSenderId: "657709849226",
  appId: "1:657709849226:web:1ba8457077450e62776b73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;