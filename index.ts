const path = require('path');

import { Worker, ImageLike, createWorker } from 'tesseract.js';

const defaults = {
  langPath: path.join(__dirname, '../data', 'lang-data'),
  logger: (message: string) => console.log(message),
};

export default class giftCardParser {
  private worker: Worker;
  public Ready: Promise<void>;

  constructor (
    langPath: string = defaults.langPath,
    logger: (message: string) => void = defaults.logger,
  ) {
    this.worker = createWorker({
      langPath,
      logger,
    });
    this.Ready = this.initialize();
  }

  private async initialize() {
    await this.worker.load();
    await this.worker.loadLanguage('kor');
    await this.worker.initialize('kor');
  }

  private matchString(string: string, regex: RegExp) {
    const matches = string.match(regex);
    if (matches) {
      return matches[0];
    }
    return '';
  }

  public async getInfo(image: ImageLike) {
    const { data: { text } } = await this.worker.recognize(image);

    const lines = text.split('\n')
      .filter((line: string) => line)
      .map((line: string) => line.replace(/\s/g, ''));
    const exchangerIndex = lines.findIndex((line) => line.includes('교환처'));

    const barcode = parseInt(lines[exchangerIndex - 1]);
    const product = lines[exchangerIndex - 2];

    const date = new Date(this.matchString(text, /(\d{4}\.\d{2}\.\d{2})/g));
    const order = parseInt(this.matchString(text, /(\d){8,}\w+/g));
    return ({ product, barcode, date, order });
  };

  public async terminate() {
    await this.worker.terminate();
  }
}
