var mocha = require('mocha');
module.exports = screenShotReporter;

function screenShotReporter(runner) {
  mocha.reporters.Base.call(this, runner);

  runner.on('fail', function(test, err){
    let d = new Date();
    let _filename = test.fullTitle() + d;
    browser.takeScreenshot().then(function(png) {
      writeScreenShot(png, '/failedTests/screenshots/' + _filename);
    });
  });

  function writeScreenShot(data, filename) {
          var stream = fs.createWriteStream(filename);
          stream.write(new Buffer(data, 'base64'));
          stream.end();
      }
}
