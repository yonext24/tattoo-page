import * as admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import { getAuth } from 'firebase-admin/auth'

const credentials = {
  type: process.env.FIREBASE_type as string,
  project_id: process.env.FIREBASE_project_id as string,
  private_key_id: process.env.FIREBASE_private_key_id as string,
  private_key: process.env.FIREBASE_private_key,
  client_email: process.env.FIREBASE_client_email as string,
  client_id: process.env.FIREBASE_client_id as string,
  auth_uri: process.env.FIREBASE_auth_uri as string,
  token_uri: process.env.FIREBASE_token_uri as string,
  auth_provider_x509_cert_url: process.env
    .FIREBASE_auth_provider_x509_cert_url as string,
  client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url as string
}

const app = admin.apps.length
  ? admin.apps[0]
  : initializeApp({
      credential: admin.credential.cert(credentials as any),
      storageBucket: 'alan-page.appspot.com'
    })

export const auth = getAuth(app as any)
export const storage = getStorage(app as any)
export const bucket = storage.bucket('alan-page.appspot.com')
