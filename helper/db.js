import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("photos.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY NOT NULL, userId TEXT NOT NULL, imageUri TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPhoto = (userId, imageUri) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO photos (userId, imageUri) VALUES (?, ?);",
        [userId, imageUri],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
