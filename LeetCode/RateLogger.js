/**
 * Initialize your data structure here.
 */
const LOGGING_SECONDS = 10;

var Logger = function() {
  this.logs = new Array(LOGGING_SECONDS);
  this.currentIndex = 0;
  this.currentTime = 0;
};

/**
 * Returns true if the message should be printed in the given timestamp, otherwise returns false.
        If this method returns false, the message will not be printed.
        The timestamp is in seconds granularity. 
 * @param {number} timestamp 
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function(timestamp, message) {
  this.updateLogs(timestamp);

  if (this.isMessageInLog(message)) {
      return false;
  }

  this.insertLog(timestamp, message);

  return true;
};

Logger.prototype.isMessageInLog = function(message) {
    const nonEmpty = this.logs.filter(m => !!m);
    const isMessageInLogs = nonEmpty.some(map => !!map[message]);

    return nonEmpty.length > 0 && isMessageInLogs;
};

Logger.prototype.insertLog = function(timestamp, message) {
  const map = this.logs[this.currentIndex] || {};
  map[message] = { message, timestamp };
  this.logs[this.currentIndex] = map;
};

Logger.prototype.updateTime = function(timestamp) {
  const prev = this.currentTime;
  const curr = timestamp;

  this.currentTime = timestamp;

  return { prev, curr };
};

Logger.prototype.updateLogs = function(timestamp) {
  // Need to increment the pointer to the current timestamp if
  // its farther in the future than the current time
  // When we increment we need to delete all the records which
  // the pointer increments past
  const index = timestamp % LOGGING_SECONDS;
  const shouldUpdateTime = timestamp > this.currentTime;

  if (shouldUpdateTime) {
    const { prev, curr } = this.updateTime(timestamp);
    this.updateIndex(prev, curr);
  }
};

Logger.prototype.updateIndex = function(oldTime, newTime) {
  // Snap the difference to be no greater than the size of the array
  let diff = Math.min(LOGGING_SECONDS, newTime - oldTime);

  // delete indexes which are the oldest
  let idx = this.currentIndex + 1;
  while (diff) {
    this.logs[idx] = null;
    diff--;

    if (diff < 1) {
        this.currentIndex = idx;
    }
    idx = (idx + 1) % LOGGING_SECONDS;
  }
};

const commands = ["Logger","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage","shouldPrintMessage"]
const vals = [[],[0,"A"],[0,"B"],[0,"C"],[9,"A"],[9,"B"],[9,"C"],[10,"A"],[10,"B"],[10,"C"],[11,"A"]]
let logger;
commands.forEach((command, i) => {
    if (command === 'Logger') {
        logger = new Logger();
    } else {
        const [ timestamp, message ] = vals[i];
        console.log(logger.shouldPrintMessage(timestamp, message));
    }
})

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */
