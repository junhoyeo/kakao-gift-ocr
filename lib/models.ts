export interface IGiftCardPayload {
  product: string;
  barcode: string;
  dueDate: string;
  order: string;
}

export interface IGiftCard {
  product: string;
  barcode: string;
  dueDate: Date;
  order: string;
}

export function createGiftCard({
  product, barcode, dueDate, order,
}: IGiftCardPayload) {
  return {
    product,
    barcode,
    dueDate: new Date(dueDate),
    order,
  };
}
