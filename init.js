// const path = require('path')
// const fs = require('fs')
// const crypto = require('crypto')

// const JWT_KEY = crypto.randomBytes(32).toString('hex')

// console.log('JWT_KEY CREATED')

// fs.writeFile(
//   path.resolve(___dirname, '.env'),
//   JWT_KEY,
//   { flag: 'wx' },
//   (err) => {
//     if (err) {
//       return
//     }

//     console.log('CREATED .ENV FILE')
//   }
// )
const jwt = require('jsonwebtoken')

const token = jwt.sign({ id: 12 }, 'SECRET')
const payload = jwt.verify(token, 'SECRET')
console.log(payload)
