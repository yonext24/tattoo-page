import * as admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import { getAuth } from 'firebase-admin/auth'

const app = admin.apps.length
  ? admin.apps[0]
  : initializeApp({
      credential: admin.credential.cert(`./admin/admin.json`),
      storageBucket: 'alan-page.appspot.com'
    })

export const auth = getAuth(app as any)
export const storage = getStorage(app as any)
export const bucket = storage.bucket('alan-page.appspot.com')
