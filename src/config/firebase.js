
var admin = require("firebase-admin");

var serviceAccount = require("../db/tu-pc-gamer-firebase-adminsdk-vlc5q-60fcac6c1c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log('Contectado a Firebase')

const db = admin.firestore()

export default db