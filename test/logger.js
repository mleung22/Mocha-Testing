const {logger, LEVELS} = require('./../logger');
const chalk = require('chalk');
var assert = require('assert');

describe('Logger', function() {

  let testLogger = new logger({ root: 'test' });
  let message;

  beforeEach(function(){
    message = {message: 'test'};
  });

  describe('Transport function', function(){
    it('should respond with a GREEN message when the level is not ERROR, WARNING, or DEBUG',function(){

      let testMessage;

      message       = JSON.stringify(message);
      testMessage   = testLogger.transport(undefined, message);
      greenMessage  = chalk.green(message);

      assert(testMessage === greenMessage);

    });

    it('should respond with a RED message when the level is ERROR',function(){

      let testMessage;

      message       = JSON.stringify(message);
      testMessage   = testLogger.transport(LEVELS.ERROR, message);
      redMessage    = chalk.red(message);

      assert(testMessage === redMessage);

    });

    it('should respond with a YELLOW message when the level is WARNING',function(){

      let testMessage;

      message       = JSON.stringify(message);
      testMessage   = testLogger.transport(LEVELS.WARN, message);
      yellowMessage = chalk.yellow(message);

      assert(testMessage === yellowMessage);

    });

    it('should respond with a BLUE message when the level is DEBUG',function(){

      let testMessage;

      message       = JSON.stringify(message);
      testMessage   = testLogger.transport(LEVELS.DEBUG, message);
      blueMessage   = chalk.blue(message);

      assert(testMessage === blueMessage);

    });
  });

  describe('Format function', function(){

    it('should respond with a stringified version of the obj', function(){
      let formattedMsg  = testLogger.format(message);
      let testMessage   = JSON.stringify(message);
      assert(formattedMsg === testMessage);
    });

  });

  describe('Create Log Object function', function(){

    it('should respond with a object that contains the root, message, and level', function(){
      let data = {
        root: 'test',
        level: LEVELS.DEBUG,
        data: message
      };

      let logObj = {root: 'test', message: 'test', level: LEVELS.DEBUG};
      let testObj = testLogger.createLogObject.call(data);

      logObj = JSON.stringify(logObj);
      testObj = JSON.stringify(testObj);

      assert(logObj === testObj);

    });

    it('should respond with a object that contains the root, message, and info as the level if the level is not specified', function(){
      let data = {
        root: 'test',
        data: message
      };

      let logObj = {root: 'test', message: 'test', level: 'info'};
      let testObj = testLogger.createLogObject.call(data);

      logObj = JSON.stringify(logObj);
      testObj = JSON.stringify(testObj);

      assert(logObj === testObj);

    });
  });

  describe('Log function', function(){
    it('should log the appropriate logObject in GREEN if the level is not ERROR, WARNING, or DEBUG', function(){

      let logToTestAgainst = {"root":"test","message":"test","level":"info"};

      logToTestAgainst = JSON.stringify(logToTestAgainst);
      testLog   = testLogger.log(message, LEVELS.INFO);
      greenLog  = chalk.green(logToTestAgainst);

      assert(testLog === greenLog);

    });

    it('should log the appropriate logObject in RED if the level is ERROR', function(){

      let logToTestAgainst = {"root":"test","message":"test","level":"error"};

      logToTestAgainst = JSON.stringify(logToTestAgainst);
      testLog   = testLogger.log(message, LEVELS.ERROR);
      redLog  = chalk.red(logToTestAgainst);

      assert(testLog === redLog);

    });

    it('should log the appropriate logObject in YELLOW if the level is WARNING', function(){

      let logToTestAgainst = {"root":"test","message":"test","level":"warning"};

      logToTestAgainst = JSON.stringify(logToTestAgainst);
      testLog   = testLogger.log(message, LEVELS.WARN);
      yellowLog  = chalk.yellow(logToTestAgainst);

      assert(testLog === yellowLog);

    });

    it('should log the appropriate logObject in BLUE if the level is DEBUG', function(){

      let logToTestAgainst = {"root":"test","message":"test","level":"debug"};

      logToTestAgainst = JSON.stringify(logToTestAgainst);
      testLog   = testLogger.log(message, LEVELS.DEBUG);
      blueLog  = chalk.blue(logToTestAgainst);

      assert(testLog === blueLog);

    });
  });







});
