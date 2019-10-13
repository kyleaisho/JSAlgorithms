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

  const shouldPrint = this.hasLogPrinted(message);

  this.insertLog(timestamp, message);

  return shouldPrint;
};

Logger.prototype.hasLogPrinted = function(message) {
  return this.logs.every(map => !map[message]);
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
    const { prev, curr } = this.updateTime();
    this.updateIndex(prev, curr);
  }
};

Logger.prototype.updateIndex = function(oldTime, newTime) {
  // Snap the difference to be no greater than the size of the array
  const diff = Math.min(LOGGING_SECONDS, newTime - oldTime);

  // delete indexes which are the oldest
  const idx = this.currentIndex + 1;
  while (diff) {
    this.logs[idx] = null;
    idx = (idx + 1) % LOGGING_SECONDS;
    diff--;
  }

  this.currentIndex = idx;
};

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */
