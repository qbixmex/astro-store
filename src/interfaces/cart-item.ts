export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type UUID = `${string}-${string}-${string}-${string}`;

export interface CartItem {
  productId: UUID,
  size: Size;
  quantity: number;
}
