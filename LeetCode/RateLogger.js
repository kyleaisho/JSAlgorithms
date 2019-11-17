/**
 * Initialize your data structure here.
 */
var Logger = function() {
  this.time = 0;
  this.pointer = 0;
  this.messages = new Array(10).fill(new Set());
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
  // Update time if needed
  const { oldTime, currTime } = this.updateTime(timestamp);
  
  // If the time has changed
  // update the pointer
  this.updatePointer(oldTime, currTime);
  
  if (this.shouldAddMessage(message)) {
      this.addMessage(message);
      return true;
  }
  
  return false;
};

Logger.prototype.updateTime = function(timestamp) {
  const oldTime = this.time;
  let currTime = this.time;
  
  if (timestamp > this.time) {
      this.time = timestamp;
      currTime = timestamp; 
  }
  
  return { oldTime, currTime };
}

Logger.prototype.updatePointer = function(old, curr) {
  let delta = Math.abs(curr - old);
  
  while (delta--) {
      this.pointer = (this.pointer + 1) % this.messages.length;
      this.messages[this.pointer] = new Set();
  }
}

Logger.prototype.addMessage = function(message) {
  this.messages[this.pointer].add(message);
}

Logger.prototype.shouldAddMessage = function(message) {
  return this.messages.every(set => !set.has(message));
}

/** 
* Your Logger object will be instantiated and called as such:
* var obj = new Logger()
* var param_1 = obj.shouldPrintMessage(timestamp,message)
*/
