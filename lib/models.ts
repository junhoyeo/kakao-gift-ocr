export interface IGiftCardPayload {
  name: string;
  barcode: string;
  dueDate: string;
  order: string;
}

export interface IGiftCard {
  name: string;
  barcode: string;
  dueDate: Date;
  order: string;
}

export function createGiftCard({
  name, barcode, dueDate, order,
}: IGiftCardPayload) {
  return {
    name,
    barcode,
    dueDate: new Date(dueDate),
    order,
  };
}
