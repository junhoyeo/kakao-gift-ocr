const path = require('path');

const defaults = {
  logger: (message: string) => console.log(message),
  langPath: path.join(__dirname, '../data', 'lang-data'),
};

export default defaults;
