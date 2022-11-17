import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(
      message.length > 0 ? message.substring(0, message.length - 1) : message
    );
  },
};

export default logger;
