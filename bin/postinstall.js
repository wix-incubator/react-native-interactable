const fs = require('fs');

fs.symlinkSync('.', 'lib/ios', 'dir', err => {
  console.error(err);
  process.exit(1);
});

fs.symlinkSync('.', 'lib/android', 'dir', err => {
  console.error(err);
  process.exit(1);
});