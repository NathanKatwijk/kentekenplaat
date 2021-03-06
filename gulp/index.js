/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import fs from 'fs';
import gulp from 'gulp';
import onlyScripts from './util/scriptfilter';

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

// Ensure process ends after all Gulp tasks are finished
gulp.on('stop', () => {
  function stop() {
    if (!global.isWatching) {
      process.nextTick(() => {
        process.exit(0);
      });
    }
  }
  // If you have a slow laptop, increase the value. 💩
  // If you don't see any js in the dist folder, increase the value. 💩
  setTimeout(stop, 1500);
});

tasks.forEach((task) => {
  require(`./tasks/${task}`); // eslint-disable-line
});
