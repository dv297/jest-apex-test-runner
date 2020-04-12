const path = require('path');
const { pass, fail } = require('create-jest-runner');
const shell = require('shelljs');
const chalk = require('chalk');

async function runTest(options) {
  const { testPath } = options;

  const start = Date.now();
  const end = Date.now();

  // Deploy the latest test changes
  shell.exec(`sfdx force:source:deploy --sourcepath ${testPath} --json --loglevel fatal`, {
    silent: true,
  });

  const testFileName = path.basename(testPath, '.cls');
  // Send request to Salesforce to execute tests
  const testExecution = JSON.parse(
    shell.exec(`sfdx force:apex:test:run --tests ${testFileName} --resultformat human --loglevel error --json`, {
      silent: true,
    }),
  );

  if (testExecution.result.summary.outcome !== 'Failed') {
    return pass({ start, end, test: { path: testPath } });
  } else {
    const failedTests = testExecution.result.tests.filter((testResult) => !didIndividualTestPass(testResult));
    const errorMessages = failedTests
      .map(
        (testResult) =>
          `${chalk.yellowBright(testResult.FullName)}  -  ${chalk.red(testResult.Message)}
Caused by ${testResult.StackTrace}
`,
      )
      .join('\n');

    return fail({
      start,
      end,
      test: {
        path: testPath,
        errorMessage: errorMessages,
        title: testPath,
      },
    });
  }
}

function didIndividualTestPass(testResult) {
  return testResult.Outcome !== 'Fail';
}

module.exports = runTest;
