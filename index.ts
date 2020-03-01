import { Worker, ImageLike, createWorker } from './lib/Tesseract';
import defaults from './lib/defaults';
import { IGiftCard, createGiftCard } from './lib/models';
import {
  regexAboutWhitespace,
  regexAboutFormattedDate,
  regexAboutLongNumber,
} from './lib/regex';
import { matchString } from './lib/utils';

export default class giftCardParser {
  private worker: Worker;
  public Ready: Promise<void>;

  constructor (
    logger: (message: string) => void = defaults.logger,
    langPath: string = defaults.langPath,
  ) {
    this.worker = createWorker({
      langPath,
      logger,
    });
    this.Ready = this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.worker.load();
    await this.worker.loadLanguage('kor');
    await this.worker.initialize('kor');
  }

  public async getInfo(image: ImageLike): Promise<IGiftCard> {
    const { data: { text } } = await this.worker.recognize(image);

    const textLines = text.split('\n')
      .filter((line: string) => line)
      .map((line: string) => line.replace(regexAboutWhitespace, ''));
    const exchangerIndex = textLines
      .findIndex((line) => line.includes('교환처'));

    const barcode = textLines[exchangerIndex - 1];
    const product = textLines[exchangerIndex - 2];

    const dueDate = matchString(text, regexAboutFormattedDate);
    const order = matchString(text, regexAboutLongNumber);

    return createGiftCard({ product, barcode, dueDate, order });
  };

  public async terminate(): Promise<void> {
    await this.worker.terminate();
  }
}
