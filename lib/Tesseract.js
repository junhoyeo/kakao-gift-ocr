const isRunningOnBrowser = typeof window !== 'undefined';
const Tesseract = require(
  isRunningOnBrowser ? 'tesseract.js/dist/tesseract' : 'tesseract.js',
);
export default Tesseract;
