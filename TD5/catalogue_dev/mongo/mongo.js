// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoClient } = require('mongodb');

let db = null;

module.exports = {
    connect: (url, callback) => {
        if (db) {
            return callback(null, db);
        }
        return MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }, (err, database) => {
            if (err) { return callback(err); }
            db = database.db('mongo');
            return db;
        });
    },

    disconnect: (callback) => {
        if (!db) {
            return callback(null);
        }
        return db.close((err) => {
            db = null;
            callback(err);
        });
    },
    get: (col) => (db ? db.collection(col) : null),
};