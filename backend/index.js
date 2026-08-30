import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs  } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAL4beKCnwK_4238MJqAKLvs-EJx2hc9v0",

  authDomain: "gymbuddy-7e60f.firebaseapp.com",

  projectId: "gymbuddy-7e60f",

  storageBucket: "gymbuddy-7e60f.firebasestorage.app",

  messagingSenderId: "945429773818",

  appId: "1:945429773818:web:8c4e3b5c54f33fcad1b843",

  measurementId: "G-9TQFDT7FBY"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export async function test(){
  const querySnapshot = await getDocs(collection(db, "WorkoutList"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});
}