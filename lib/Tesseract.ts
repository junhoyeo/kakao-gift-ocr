export {
  Worker as Worker,
  ImageLike as ImageLike
} from 'tesseract.js';

declare const window: any;

const isRunningOnBrowser = typeof window !== 'undefined';
const _instance = require(
  isRunningOnBrowser ? 'tesseract.js/dist/tesseract' : 'tesseract.js',
);

export const createWorker =  _instance.createWorker;
