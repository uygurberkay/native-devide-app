import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';
const database = SQLite.openDatabase('places.db');

export function init() {
const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL
        )`,
        [],
        () => {
        resolve();
        },
        // @ts-ignore
        (_, error) => {
        reject(error);
        }
    );
    });
});

return promise;
}

export function insertPlace(place:any) {
const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
    tx.executeSql(
        `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
        [
        place.title,
        place.imageUri,
        place.address,
        place.location.latitude,
        place.location.longitude,
        ],
        (_, result: any) => {
        resolve(result);
        },
        // @ts-ignore
        (_, error) => {
        reject(error);
        }
    );
    });
});

return promise;
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
            const places = [];

            for (const dp of result.rows._array) {
            places.push(
                new Place(
                dp.title,
                dp.imageUri,
                {
                    address: dp.address,
                    lat: dp.lat,
                    lng: dp.lng,
                },
                // @ts-ignore
                dp.id
                )
            );
            }
            resolve(places);
        },
        // @ts-ignore
        (_, error) => {
            reject(error);
        }
        );
    });
    });

    return promise;
}

export function fetchPlaceDetails(id: any) {
    const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result.rows._array[0]);
        },
        // @ts-ignore
        (_, error) => {
            reject(error);
        }
        );
    });
    });

    return promise;
}