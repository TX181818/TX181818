export interface OpenFoodFactsProduct {
  product_name?: string;
  brands?: string;
  image_url?: string;
}

export interface OpenFoodFactsResponse {
  status: number;
  product?: OpenFoodFactsProduct;
}