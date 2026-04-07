#!/usr/bin/env node

import('../src/index.js')
  .then(mod => mod.main())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });