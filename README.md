# kakao-gift-card
OCR library for parsing data in Kakao Gift Cards

<img src="./test/chicken.jpeg" width="256px">
<img src="./docs/assets/output.png" height="365px">

## 📦 Installation

```bash
npm install kakao-gift-card
# Or using yarn
yarn add kakao-gift-card
```

## 🔥 Action

```typescript
import KakaoGiftCard from 'kakao-gift-card';
const fs = require('fs');

const ignoreLogs = () => {};

(async () => {
  const giftCardParser = new kakaoGiftCard(ignoreLogs);
  await giftCardParser.Ready;

  const chickenGiftCard = fs.readFileSync('./test/chicken.jpeg');
  const giftCard = await giftCardParser.getInfo(chickenGiftCard);

  console.log(giftCard);
  // {
  //   product: '순살뿌링클+콜라1.25Ｌ[',
  //   barcode: 111420582002,
  //   date: 2019-06-10T15:00:00.000Z,
  //   order: 570993632
  // }

  await giftCardParser.terminate();
})();
```
