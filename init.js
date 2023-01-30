const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const JWT_KEY = crypto.randomBytes(32).toString('hex');

fs.writeFile(path.resolve(__dirname, '.env'), JWT_KEY, { flag: 'wx' }, (err) => {
  if (err) {
    return -1;
  }

  return 1;
});
