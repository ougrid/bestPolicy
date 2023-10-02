const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

// Specify the log directory path
const logDirectory = path.join(__dirname, 'logs');

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Specify the log file path
const logFilePath = path.join(logDirectory, 'app.log');


// Create a writable stream to the log file
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Create a Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.Stream({
      stream: logStream, // Log to the file
    }),
  ],
});

module.exports = logger;
