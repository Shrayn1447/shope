export interface IParametrsColor {
  id: number;
  color: string;
}

export interface ISize {
  id: number;
  size: string;
}
export interface IImg {
  id: number;
  url: string;
}

export interface IVariationOption {
  value: string;
}

export interface IVariationProduct {
  id: number;
  name: string;
  product_categoryId: number;
  variation_option: IVariationOption[];
}

export interface IVariation {
  id: number;
  category_name: string;
  variation: IVariationProduct[];
}

interface IProductConfiguration {
  product_id: number;
  variation_id: number;
  variation_option: IVariationOption;
}

interface IProductItem {
  id: number;
  quantity: number;
  product_img: string;
  price: number;
  productId: number;
  product_configuration: IProductConfiguration[];
}

export interface IProduct {
  id: number;
  product_categoryId: number;
  name: string;
  descreption: string;
  product_image: string;
  product_item: IProductItem[];
  product_category: {
    category_name: string;
  };
}
export interface IParams {
  [key: string]: string;
}
interface ProductItem {
  price: number;
}

export interface IProductCategory {
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
