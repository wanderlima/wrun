#!/usr/bin/env node

import("../src/index.js")
  .then(() => {
    //...
  })
  .catch((err) => {
    console.error("❌ Failed to run wrun:", err);

    process.exit(1);
  });
