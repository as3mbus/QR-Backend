require('dotenv').config()

module.exports = {
  "restApiRoot": "/api",
  "host": process.env.APP_HOST,
  "port": process.env.APP_PORT,
  "remoting": {
    "context": false,
    "rest": {
      "handleErrors": false,
      "normalizeHttpPath": false,
      "xml": false
    },
    "json": {
      "strict": false,
      "limit": "100kb"
    },
    "urlencoded": {
      "extended": true,
      "limit": "100kb"
    },
    "cors": false
  },
  "legacyExplorer": false,
  "logoutSessionsOnSensitiveChanges": true
}
