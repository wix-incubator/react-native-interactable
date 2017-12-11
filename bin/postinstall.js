const Lnf = require('lnf');
const fs = require('fs');

Lnf.sync('lib/ios', __dirname + '..', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }  
})

Lnf.sync('lib/android', __dirname + '..', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }  
})