function getLogger(module) {

    const { format, transports } = require('winston');
    const { combine, timestamp, label, printf } = format;

    const myFormat = printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });

    const fileName = module.filename.split('/').slice(-2).join('/');

    const winston = require('winston');

    const log = winston.createLogger({
        format: combine(
            winston.format.colorize(),
            label({ label: fileName }),
            timestamp(),
            format.splat(),
            format.simple(),
            myFormat,
        ),
        transports: [
            new winston.transports.Console({
                level: 'info',
            }),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
            })
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'logs/exceptions.log' })
        ]
    });
    return log;
}

module.exports = getLogger;