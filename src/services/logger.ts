import winston from 'winston';
import Config from '../config';

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;
const logConfiguration = {
  level: 'info',
  format: combine(
    timestamp({
      format: 'DD-MMM-YYYY HH:mm:ss',
    }),
    colorize(),
    printf((info) => `${[info.timestamp]} | ${info.level} | ${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
}

const logger = createLogger(logConfiguration);

if (Config.NODE_ENV !== 'development') {
  logger.add(
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error'
    })
  )
}

export default logger;