export interface Color {
  id: number;
  color: string;
}

export interface Size {
  id: number;
  size: string;
}
export interface Img {
  id: number;
  url: string;
}
interface ProductItem {
  product_img: string;
  price: number;
}

interface VariationOption {
  value: string;
}

interface VariationProduct {
  id: number;
  name: string;
  product_categoryId: number;
  variation_option: VariationOption[];
}

export interface Variation {
  id: number;
  category_name: string;
  variation: VariationProduct[];
}

interface VariationOption {
  id: number;
  value: string;
  variationId: number;
}

interface ProductConfiguration {
  product_id: number;
  variation_id: number;
  variation_option: VariationOption;
}

interface ProductItem {
  id: number;
  quantity: number;
  product_img: string;
  price: number;
  productId: number;
  product_configuration: ProductConfiguration[];
}

export interface Product {
  id: number;
  product_categoryId: number;
  name: string;
  descreption: string;
  product_image: string;
  product_item: ProductItem[];
  product_category: {
    category_name:string
  }

}
export interface Form {
  [key: string]: string;
}
interface ProductItem {
  price: number;
}

export interface ProductCategory {
  id: number;
  product_categoryId: number;
  name: string;
  descreption: string;
  product_image: string;
  product_item: ProductItem[];
  product_category: {
    category_name: string;
  };
}
