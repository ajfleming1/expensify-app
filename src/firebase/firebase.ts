import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export { firebase, database as default };

// child_removed
// database.ref("expenses")
// .on("child_removed", (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref("expenses")
// .on("child_changed", (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref("expenses")
// .on("child_added", (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // Set up 'expenses' with three items (three push calls)
// const expenseOne: UpdateExpenseType = {
//   amount: 100000,
//   createdAt: moment.now(),
//   description: "Car",
//   note: "Note about Car."
// };

// database.ref("expenses").push(expenseOne);

// database
//   .ref("expenses")
//   .on("value", (snapshot) => {
//     const expenses: ExepenseItemType[] = [];
//     snapshot.forEach((childSnapshot) =>
//     {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });

// database.ref("notes/-MBibX8Telb_VYQfinoL").update({
//   body: "Buy food"
// });

// database.ref("notes/-MBibX8Telb_VYQfinoL").remove();


// database.ref("notes").push({
//   title: "Course Topics",
//   body: "React Native, Angular, Python"
// });
// const firebaseNotes = {
//   notes: {
//     "asdfas": {
//       id: "1",
//       title: "My first note",
//       body: "This is a note"
//     },
//     "asdasdfasf": {
//       id: "72ase",
//       title: "My second note",
//       body: "This is a note"
//     }
//   }
// }
// const notes = [
//   {
//     id: "1",
//     title: "My first note",
//     body: "This is a note"
//   },
//   {
//     id: "72ase",
//     title: "My second note",
//     body: "This is a note"
//   }
// ];

// database.ref('notes').set(notes);

// const onValueChange = database.ref()
// .on("value", (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
// }, (e: any) => {
//   console.log("Error with data fetching", e);
// });

// const onValueChange = database.ref()
//   .on("value", (snapshot) => {
//     console.log(snapshot.val());
//   }, (e: any) => {
//     console.log("Error with data fetching", e);
//   });

// setTimeout(() => {
//   database.ref("age").set(29);
// }, 3500);

// setTimeout(() => {
//   database.ref().off("value", onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref("age").set(30);
// }, 10500);

// database.ref("location/city")
//   .once("value")
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => console.log("Error fetching data.", e));

// database.ref().set({
//   name: "Andrew Fleming",
//   age: 36,
//   job: {
//     title: "Software Developer",
//     company: "Google"
//   },
//   stressLevel: 6,
//   location: {
//     city: "Bristol",
//     country: "United States"
//   }
// }).then(() => {
//   console.log("Data was saved");
// }).catch((err) => {
//   console.log("Error saving data ", err);
// });

// database.ref().update({
//   stressLevel: 9,
//   "job/company": "Amazon",
//   "location/city": "Seattle"  
// });

//database.ref().set("This is my data.");
// database.ref("age").set(37);
// database.ref("location/city").set("Roanoke");
// database.ref("attributes").set({
//   height: 71,
//   weight: 180
// });

// database.ref("isSingle").set(null);

// database.ref()
//   .remove()
//   .then(() => {
//     console.log("Data removed.")
//   })
//   .catch(err => console.log("Did not remove data", err));