const log = console.log;
const { format} = require('date-fns');
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    log(logItem);
    try {
        let pathToLogs = path.join(__dirname, 'logs', logName);
        let dirPath = path.join(__dirname, 'logs');

        if (!fs.existsSync(dirPath)) {
            await fsPromises.mkdir(dirPath);
            await fsPromises.appendFile(pathToLogs, logItem);
        } else {
            await fsPromises.appendFile(pathToLogs, logItem);
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = logEvents;