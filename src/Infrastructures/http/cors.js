import cors from 'cors';
import InvariantError from '../../Commons/exceptions/InvariantError';

const options = {
  origin: (origin, callback) => {
    // In dev, allow these origins to access the API
    const whiteList = ['localhost', 'chrome-extension'];
    // We are doing string matching here.
    // For advanced use-case, use regex
    const index = whiteList.findIndex((aWhiteListedOrigin) =>
      origin.includes(aWhiteListedOrigin)
    );
    if (!origin || index !== -1) {
      callback(null, true);
    } else {
      const error = {
        message: `'${origin}' is not allowed to access the specified route/resource`,
        status: httpStatus.FORBIDDEN,
      };
      callback(new InvariantError(error), false);
    }
  },
};

export default function (){
  return cors(options);
}