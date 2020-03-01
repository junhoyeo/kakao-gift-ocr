'use strict';
const fs = require('fs');
const expect = require('chai').expect;
const KakaoGiftOCR = require('../dist/index.js');

describe('getInfo function test', () => {
  it('should return giftCard information', async function() {
    this.timeout('25s');

    const giftCardParser = new KakaoGiftOCR.default();
    await giftCardParser.Ready;

    const chickenGiftCard = fs.readFileSync('./test/chicken.jpeg');
    const giftCard = await giftCardParser.getInfo(chickenGiftCard);

    console.log(giftCard);
    const { name, barcode, dueDate, order } = giftCard;

    expect(name).to.include('순살뿌링클+콜라');
    expect(barcode).to.equal('111420582002');
    expect(order).to.equal('570993632');
    expect(dueDate.getTime()).to
      .equal(new Date('2019.06.11').getTime());

    await giftCardParser.terminate();

    after(
      'Exit mocha gracefully after finishing all tests execution',
      process.exit,
    );
  });
});
