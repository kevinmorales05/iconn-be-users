const { credential } = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth} = require('firebase-admin/auth')
const admin = require('firebase-admin')

initializeApp( {
  credential: applicationDefault(),
})

module.exports = {
  admin, getAuth
}