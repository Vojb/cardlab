// src/indexedDB.js
import { openDB } from "idb";

const DB_NAME = "database";
const STORE_NAME = "cardStore";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const addData = async (data: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(data);
  console.log(data, "Adeded");
  await tx.done;
};
export const deleteAllData = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  await tx.done;
};

export const getAllData = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteData = async (id: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
