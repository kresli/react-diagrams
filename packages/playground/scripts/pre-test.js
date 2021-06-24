const {spawnSync} = require('child_process');

spawnSync("npx kill-port 3000", {shell: true});
spawnSync("yarn build", {shell: true});

