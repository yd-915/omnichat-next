import {initFirestore} from '@auth/firebase-adapter'
import admin from 'firebase-admin'

let app 

if(!admin.apps.length){
app = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "ganchat-dd078",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
    }),
    
})
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: "ganchat-dd078",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
    })
})

const adminAuth = admin.auth(app)

export {adminDb,adminAuth}
