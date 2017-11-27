const fs = require('fs');

fs.symlinkSync('.', 'lib/ios', 'dir', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

fs.symlinkSync('.', 'lib/android', 'dir', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});