require('dotenv').config()


module.exports = {
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysql": {
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
    "url": "",
    "database": process.env.MYSQL_DATAB,
    "password": process.env.MYSQL_PASS,
    "name": "mysql",
    "user": process.env.MYSQL_USER,
    "connector": "mysql"
  }
}
