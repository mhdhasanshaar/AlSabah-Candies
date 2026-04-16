export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface StoreData {
  banner: string;
  products: Product[];
}
