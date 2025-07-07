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
  if (!id) {
    console.warn("Attempted to delete card with undefined/null id");
    return;
  }
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

// Export all data as JSON
export const exportAllData = async () => {
  try {
    const cards = await getAllCards();
    const teams = await getAllTeams();

    const exportData = {
      exportDate: new Date().toISOString(),
      cards: cards.map((item) => ({
        id: item.key,
        ...item.value,
      })),
      teams: teams.map((item) => ({
        id: item.key,
        ...item.value,
      })),
    };

    return exportData;
  } catch (error) {
    console.error("Error exporting data:", error);
    throw error;
  }
};

// Export all data as JSON (without images)
export const exportDataWithoutImages = async () => {
  try {
    const cards = await getAllCards();
    const teams = await getAllTeams();

    const exportData = {
      exportDate: new Date().toISOString(),
      cards: cards.map((item) => ({
        id: item.key,
        cardData: {
          ...item.value.cardData,
          image: "", // Remove player image
        },
        presetType: item.value.presetType,
        // Exclude frontPng and backPng
      })),
      teams: teams.map((item) => ({
        id: item.key,
        ...item.value,
      })),
    };

    return exportData;
  } catch (error) {
    console.error("Error exporting data without images:", error);
    throw error;
  }
};

// Import data from JSON
export const importData = async (importData: any) => {
  try {
    const db = await initDB();

    // Import teams first
    if (importData.teams && Array.isArray(importData.teams)) {
      const teamTx = db.transaction(TEAM_STORE, "readwrite");
      for (const team of importData.teams) {
        if (team.team) {
          await teamTx.store.put({
            id: team.id || team.team.name,
            team: team.team,
          });
        }
      }
      await teamTx.done;
    }

    // Import cards
    if (importData.cards && Array.isArray(importData.cards)) {
      const cardTx = db.transaction(CARD_STORE, "readwrite");
      for (const card of importData.cards) {
        if (card.cardData) {
          await cardTx.store.put({
            id: card.id || card.cardData.collectNumber,
            value: {
              frontPng: card.frontPng,
              backPng: card.backPng,
              cardData: card.cardData,
              presetType: card.presetType || 1,
            },
          });
        }
      }
      await cardTx.done;
    }

    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    throw error;
  }
};

// Clear all data (for import replacement)
export const clearAllData = async () => {
  try {
    await deleteAllCards();
    await deleteAllTeams();
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  }
};
