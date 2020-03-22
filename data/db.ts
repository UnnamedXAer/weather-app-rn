import * as SQLite from 'expo-sqlite';
import LocationModel from '../models/LocationModel';

type LocationRow = {
    id: number,
    city: string,
    country: string,
    countryCode: string,
    postalCode: string,
    region: string,
    latitude: number,
    longitude: number,
};

type SettingsRow = {
    id: number,
    currentLocation: null | number;
}

class DataAccess {
    private db: SQLite.WebSQLDatabase;
    static instance: DataAccess;
    c: number = 0;
    constructor() {
        if (DataAccess.instance) {
            return DataAccess.instance;
        }
        console.log('num of created instace: ', ++this.c);
        this.db = SQLite.openDatabase('TeKam-WeatherApp');
        DataAccess.instance = this;
    }

    getLocations = () => {
        return new Promise<LocationModel[]>((resolve, reject) => {
            this.db.transaction(trx => {
                trx.executeSql(`SELECT 
                    id, city, country, countryCode, postalCode, region, latitude, longitude 
                    FROM locations`,
                    [],
                    (_, results) => {
                        const locations: LocationModel[] = [];

                        for (let i = 0; i < results.rows.length; i++) {
                            const row = results.rows.item(i) as LocationRow;
                            locations.push(new LocationModel({
                                id: row.id,
                                city: row.city,
                                country: row.country,
                                countryCode: row.countryCode,
                                postalCode: row.postalCode,
                                region: row.region,
                                coords: { latitude: row.latitude, longitude: row.longitude },
                            }));
                        }

                        resolve(locations);
                    },
                    (_, err) => {
                        reject(err);
                        return false;
                    });
            }, (err) => {
                reject(err);
            });
        });
    };

    deleteLocation = (id: number) => {
        return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
            this.db.transaction(trx => {
                trx.executeSql('DELETE FROM locations where id = ?',
                    [id],
                    (_, results) => resolve(results),
                    (_, err) => {
                        reject(err);
                        return false;
                    });
            }, (err) => {
                reject(err);
            });
        });
    };

    addLocation = (location: LocationModel) => {
        return new Promise<number>((resolve, reject) => {
            this.db.transaction(trx => {
                trx.executeSql(`INSERT INTO locations (
                        city, country, countryCode, postalCode, region, latitude, longitude
                    ) VALUES (? ,?, ?, ?, ?, ? ,?)`,
                    [
                        location.city,
                        location.country,
                        location.countryCode,
                        location.postalCode,
                        location.region,
                        location.coords.latitude,
                        location.coords.longitude
                    ],
                    (_, results) => resolve(results.insertId),
                    (_, err) => {
                        reject(err);
                        return false;
                    });
            }, (err) => {
                reject(err);
            });
        });
    };

    updateCurrentLocation = (id: number) => {
        return new Promise<number>((resolve, reject) => {
            this.db.transaction(trx => {
                trx.executeSql(`UPDATE settings SET currentLocation = ? WHERE id = 1`,
                    [
                        id
                    ],
                    (_, results) => resolve(results.insertId),
                    (_, err) => {
                        reject(err);
                        return false;
                    });
            }, (err) => {
                reject(err);
            });
        });
    };

    getCurrentLocation = () => {
        return new Promise<number | null>((resolve, reject) => {
            this.db.transaction(trx => {
                trx.executeSql(`SELECT * FROM settings`,
                    [],
                    (_, results) => resolve((results.rows.item(0) as SettingsRow).currentLocation),
                    (_, err) => {
                        reject(err);
                        return false;
                    });
            }, (err) => {
                reject(err);
            });
        });
    };

    initDb = () => {
        return new Promise<void>((resolve, reject) => {
            this.db.transaction(
                trx => {
                    trx.executeSql(`CREATE TABLE IF NOT EXISTS locations (
                        id INTEGER PRIMARY KEY NOT NULL,
                        city TEXT NOT NULL,
                        country TEXT,
                        countryCode TEXT,
                        postalCode TEXT,
                        region TEXT,
                        latitude REAL NOT NULL,
                        longitude REAL NOT NULL);`);

                    trx.executeSql(`CREATE TABLE IF NOT EXISTS settings (
                        id INTEGER PRIMARY KEY NOT NULL,
                        currentLocation INTEGER,
                        FOREIGN KEY(currentLocation) REFERENCES locations(id));`);

                    trx.executeSql(`INSERT OR REPLACE INTO settings (id, currentLocation) 
                        VALUES (1, (SELECT currentLocation from settings where id = 1))`);
                },
                err => reject(err),
                () => resolve());
        });
    };
}

export default DataAccess;