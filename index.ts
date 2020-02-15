const fs = require('fs');
const path = require('path');

import { Worker, createWorker } from 'tesseract.js';

const worker = createWorker({
  langPath: path.join(__dirname, '../data', 'lang-data'),
  logger: m => console.log(m),
});

const matchString = (string: string, regex: RegExp) => {
  const matches = string.match(regex);
  if (matches) {
    return matches[0];
  }
  return '';
}

const getInfo = async (worker: Worker, filePath: string) => {
  const { data: { text } } = await worker.recognize(fs.readFileSync(filePath));
  console.log(text);
  const lines = text.split('\n')
    .filter((line) => line)
    .map((line) => line.replace(/\s/g, ''));
  console.log(lines);
  const exchangerIndex = lines.findIndex((line) => line.includes('교환처'));
  const barcode = parseInt(lines[exchangerIndex - 1]);
  const product = lines[exchangerIndex - 2];

  const date = new Date(matchString(text, /(\d{4}\.\d{2}\.\d{2})/g));
  const order = parseInt(matchString(text, /(\d){8,}\w+/g));
  return ({ product, barcode, date, order });
};

(async () => {
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');

  const chicken = await getInfo(worker, './chicken.jpeg');
  const pepero = await getInfo(worker, './pepero.jpeg');
  console.log(chicken, pepero);

  await worker.terminate();
})();
