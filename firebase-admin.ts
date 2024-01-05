import {initFirestore} from '@auth/firebase-adapter'
import admin from 'firebase-admin'

let app 

if(!admin.apps.length){
app = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: 'REDACTED',
        privateKey: 'REDACTED'
    }),
    
})
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: 'REDACTED',
        privateKey: 'REDACTED'
    })
})

const adminAuth = admin.auth(app)

export {adminDb,adminAuth}
