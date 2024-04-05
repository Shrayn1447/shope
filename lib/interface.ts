interface Color {
  id: number;
  color: string;
}

interface Size {
  id: number;
  size: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string | null;
  gender: string | null;
  price: number;
  quantity: number | null;
  material: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  color: Color[];
  size: Size[];
}
export interface IProduct {
  id: number;
  name: string;
  category: ProductCategory;
  brand: string;
  color: ProductColor[];
  size: ProductSize[];
  gender: ProductGender;
  price: number;
  quantity: number;
  material: ProductMaterial;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
enum ProductCategory {
  SHIRT,
  SNEAKERS,
  TROUSERS,
  HOODIES,
  HEADDRESS,
}
enum ProductColor {
  WHITE,
  BLACK,
}
enum ProductSize {
  S,
  M,
  L,
  X,
  XL,
}
enum ProductGender {
  MAN,
  GIRL,
}
enum ProductMaterial {
  COTTON,
  LINEN,
  WOOL,
  SILK,
}
