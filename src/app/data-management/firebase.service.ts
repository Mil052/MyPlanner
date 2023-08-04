import { Injectable } from '@angular/core';
// Import the modules and functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteField, updateDoc, deleteDoc } from 'firebase/firestore';

import { Task } from './data-models/task.model';
import { Note } from './data-models/note.model';

// Firebase daily-tasks document format:
export interface FirebaseDailyTasks {
  date: Date,
  tasks: {[id: string]: Task}
}

// Provide Firebase configuration:
export const firebaseConfig = {
  apiKey: "AIzaSyBvjMZlPog70dWWn5VXjo_rkOWihc5dYEA",
  authDomain: "myplanner-c4cf3.firebaseapp.com",
  projectId: "myplanner-c4cf3",
  storageBucket: "myplanner-c4cf3.appspot.com",
  messagingSenderId: "1061573060398",
  appId: "1:1061573060398:web:339ee9963fa438477a3cbf"
};

function documentNameFromDate (date: Date): string {
  let month: number | string = date.getMonth() + 1;
  month = month < 10 ? `0${month.toString()}` : month.toString();
  return date.getFullYear().toString() + month + date.getDate().toString();
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  // Initialize Firebase
  // https://firebase.google.com/docs/firestore/quickstart?authuser=1
  private app = initializeApp(firebaseConfig);
  private database = getFirestore(this.app);

  constructor() {}

// FETCH:
// https://firebase.google.com/docs/firestore/quickstart
  async fetchDbDailyTasks(date: Date) {
    const docName = documentNameFromDate(date);
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'daily_tasks', docName);
    const documentSnapshot = await getDoc(documentRef);
    const data = documentSnapshot.data();
    if (!data) {
      return false;
    }
    return data as FirebaseDailyTasks;
  }

  async fetchDbNotes() {
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'user_notes', 'notes');
    const documentSnapshot = await getDoc(documentRef);
    const data = documentSnapshot.data();
    if (!data) {
      return false;
    }
    return data as {[id: string]: Note};
  }

// ADD:
// https://firebase.google.com/docs/firestore/manage-data/add-data
  async createDbDailyTask(date: Date, id: string, task: Task) {
    const docName = documentNameFromDate(date);
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'daily_tasks', docName);
    let dataObject: {date: Date, tasks: {[id: string]: Task}} = {date: date, tasks: {}};
    dataObject.tasks[id] = task;
    await setDoc(documentRef, dataObject, {merge: true});
    return ({date: date, id: id, task: task});
  }

  async createNote(id: string, note: Note) {
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'user_notes', 'notes');
    await setDoc(documentRef, {[id]: note}, {merge: true});
    return {id: id, note: note};
  }

// DELETE:
  async deleteDbNote(noteId: string) {
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'user_notes', 'notes');
    await updateDoc(documentRef, {[noteId]: deleteField()});
    return noteId;
  }

  async deleteDbTask(date: Date, taskId: string) {
    const docName = documentNameFromDate(date);
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'daily_tasks', docName);
    await updateDoc(documentRef, {['tasks.' + taskId]: deleteField()});
    return taskId;
  }

  async deleteDbTaskDocument(date: Date, taskId: string) {
    const docName = documentNameFromDate(date);
    const documentRef = doc(this.database, 'users', 'user_gajda_milosz', 'daily_tasks', docName);
    await deleteDoc(documentRef);
    return taskId;
  }
}
