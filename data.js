import { problems } from './src';
import pino from 'pino';

const base_logger = pino({
  base: {},
  formatters: {
    level (label, number) {
      return { level: label || number };
    },
  },
  level: 'debug',
  messageKey: 'message',
  nestedKey: 'payload',
  timestamp: true,
  prettyPrint: true,
});

export const handler = async (event = {}) => {
  const output = { event };
  const { category, key } = event;
  const logger = base_logger.child({ category, key });

  try {
    const func = problems[category][key];
    if (!func) throw new Error('unknown event.category or event.num key');
    output.result = func(logger, event.payload);
  } catch (error) {
    output.error = error.message;
    logger.error(error, handler.name);
  }
  return output;
};
