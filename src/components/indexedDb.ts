import { openDB } from "idb";

const DB_NAME = "database";
const CARD_STORE = "cardStore";
const TEAM_STORE = "teamStore";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(CARD_STORE)) {
        db.createObjectStore(CARD_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(TEAM_STORE)) {
        db.createObjectStore(TEAM_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const addCard = async (data: any) => {
  const db = await initDB();
  const tx = db.transaction(CARD_STORE, "readwrite");
  await tx.store.put(data);
  await tx.done;
};

export const deleteCard = async (id: any) => {
  const db = await initDB();
  const tx = db.transaction(CARD_STORE, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};

export const deleteAllCards = async () => {
  const db = await initDB();
  const tx = db.transaction(CARD_STORE, "readwrite");
  const store = tx.objectStore(CARD_STORE);
  await store.clear();
  await tx.done;
};

export const getAllCards = async () => {
  const db = await initDB();
  return db.getAll(CARD_STORE);
};

// Team Store Operations
export const addTeam = async (data: any) => {
  const db = await initDB();

  const tx = db.transaction(TEAM_STORE, "readwrite");
  await tx.store.put(data);
  await tx.done;
};

export const deleteTeam = async (id: any) => {
  const db = await initDB();
  const tx = db.transaction(TEAM_STORE, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};

export const deleteAllTeams = async () => {
  const db = await initDB();
  const tx = db.transaction(TEAM_STORE, "readwrite");
  const store = tx.objectStore(TEAM_STORE);
  await store.clear();
  await tx.done;
};

export const getAllTeams = async () => {
  const db = await initDB();
  return db.getAll(TEAM_STORE);
};
