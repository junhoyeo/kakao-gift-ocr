const path = require('path');

const defaults = {
  langPath: path.join(__dirname, '../data', 'lang-data'),
  logger: (message: string) => console.log(message),
};

export default defaults;
