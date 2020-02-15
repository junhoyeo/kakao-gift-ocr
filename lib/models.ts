export interface IGiftCardPayload {
  product: string;
  barcode: string;
  date: string;
  order: string;
}

export interface IGiftCard {
  product: string;
  barcode: number;
  date: Date;
  order: number;
}

export function createGiftCard({
  product, barcode, date, order,
}: IGiftCardPayload) {
  return {
    product,
    barcode: parseInt(barcode),
    date: new Date(date),
    order: parseInt(order),
  };
}
