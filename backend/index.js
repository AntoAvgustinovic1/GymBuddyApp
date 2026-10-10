import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, doc} from "firebase/firestore";

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

//funkcija za dohvat svih lista u kolekciji WorkoutList
export async function getLists(){
  const dohvat = await getDocs(collection(db,"WorkoutList"))

  return dohvat.docs.map(doc=>({
    id: doc.id, // identifikator je"metadata" koji se inace nebi dohvatio preko doc.data() ispod
    ...doc.data() //nije "metadata" vec sva preostala polja
  }))
}

//funkcija koja prima podatke iz frontenda i stvara novu workout listu s njima
export async function addWorkout(ime, opis, broj) {
  const querySnapshot= await addDoc(collection(db, "WorkoutList"), {
    WorkoutName:ime,
    WorkoutDescription:opis,
    NumberWeeks:broj
  })
  return querySnapshot.id; //vraca id novo stvorenog dokumenta natrag na frontend
}

//prima id dokumenta u koji zeli uci i stvoriti novu kolekciju "templates"
export async function AddDay(id, counter){
  const querySnapshot= await addDoc(collection(db, `WorkoutList/${id}/templates`),
  {
    Day:"Day "+ counter,
  })
  return querySnapshot.id;
}

//dohvat svih dana u nekom template
export async function GetTemplates(id){
  const querySnapshot= await getDocs(collection(db, `WorkoutList/${id}/templates`))
  return querySnapshot.docs.map(doc=>({
    id: doc.id,
    ...doc.data()
  }))
  
}

//pohrana plana jednog "dana" u template
export async function SaveDay(id, dayId){
  const querySnapshot= await addDoc(collection(db, `WorkoutList/${id}/templates/${dayId}/exercises`),
{
  Test:"test"
})
}

export async function LoopSave(id, dayId, exercise){
const querySnapshot= await addDoc(collection(db, `WorkoutList/${id}/templates/${dayId}/exercises`),
{
  exercise:exercise.exercise,
  sets:exercise.sets
})

}

export async function FetchWorkout(id) {
const querySnapshot= await getDoc(doc(db, 'WorkoutList', id))
return{
  id: querySnapshot.id,
  ...querySnapshot.data()
}
}