import React from 'react';
// import jestResults from '../../../../jest-results/output.json';

const ResultsGadget = () => {
  const {
    numPassedTests,
    numFailedTests,
    numTodoTests,
    numTotalTestSuites,
    numPassedTestSuites,
    numFailedTestSuites,
    numTotalTests,
  } = {};
  return (
    <>
      <div className="row">
        <div className="col">
          <span>Test Suites</span>
          <span className="badge badge-primary">
            {numPassedTestSuites}
            {numTotalTestSuites}
          </span>
          <span className="badge badge-primary">
            {numFailedTestSuites}
            {numTotalTestSuites}
          </span>
        </div>
        <div className="col">
          <span>Tests</span>
          <span className="badge badge-primary">{numTotalTests}</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <span>Passed</span>
          <span className="badge badge-success">{numPassedTests}</span>
        </div>
        <div className="col">
          <span>Failed</span>
          <span className="badge badge-danger">{numFailedTests}</span>
        </div>
        <div className="col">
          <span>Todo</span>
          <span className="badge badge-info">{numTodoTests}</span>
        </div>
      </div>
    </>
  );
};

export default ResultsGadget;
