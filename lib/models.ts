export interface IGiftCardPayload {
  product: string;
  barcode: string;
  date: string;
  order: string;
}

export interface IGiftCard {
  product: string;
  barcode: string;
  date: Date;
  order: string;
}

export function createGiftCard({
  product, barcode, date, order,
}: IGiftCardPayload) {
  return {
    product,
    barcode,
    date: new Date(date),
    order,
  };
}
