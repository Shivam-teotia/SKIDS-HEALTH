import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "user");

class userServices {
  addUser = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "user", id);
    return updateDoc(userDoc, updatedUser);
  };

  deleteUser = (id) => {
    const userDoc = doc(db, "user", id);
    return deleteDoc(userDoc);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };
}
export default new userServices();
