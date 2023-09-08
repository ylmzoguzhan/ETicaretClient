export class List_Product {
  products: List_Product_Item[];
  totalCount: number;
}
export class List_Product_Item {
  id: number;
  name: string;
  price: number;
  stock: number;
}
export class Get_Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}