export type WP_IMG_INFO = {
  title: string;
  caption: string;
  url: string;
  alt: string;
  src: string;
  srcset: string;
  sizes: string;
  full_src: string;
  full_src_w: number;
  full_src_h: number;
  gallery_thumbnail_src: string;
  gallery_thumbnail_src_w: number;
  gallery_thumbnail_src_h: number;
  thumb_src: string;
  thumb_src_w: number;
  thumb_src_h: number;
  src_w: number;
  src_h: number;
};
export type PRODUCT_DATA = {
  slug: string;
  attributes: Record<string, string[]>;
  variations: {
    variation_id: string;
    attributes: Record<string, string>;
  }[];
  weight_unit: string;
  data: {
    product_name: string;
    product_id: string;
    url: string;
    short_description: string;
    description: string;
    price: string;
    product_image_url: WP_IMG_INFO;
    product_gallery_urls: WP_IMG_INFO[];
    weight: string;
    cat_products?: PRODUCT_DATA[];
    info: {
      key: string;
      value: string;
    }[];
  };
};

export type CART_ITEM = {
  data: PRODUCT_DATA;
  key: string;
  product_id: string;
  variation_id: string;
  variation: Record<string, string>;
  quantity: number;
  data_hash: string;
  line_tax_data: {
    subtotal: Array<any>;
    total: Array<any>;
  };
  line_subtotal: number;
  line_subtotal_tax: number;
  line_total: number;
  line_tax: number;
};

export type SPERO_CART = {
  count: number;
  items: Record<string, CART_ITEM>;
  total: string;
  ajaxUrl: string;
  shipping_total: string;
  checkout_total: string;
  discount_total: string;
  update_order_review_nonce: string;
  "woocommerce-process-checkout-nonce": string;
  shipping_method_id: string;
};

export type PRODUCT_CAT = {
  description: string;
  id: string;
  name: string;
  url: string;
  products: PRODUCT_DATA[];
};

export type WARD = {
  Id: string;
  Name: string;
  Level: string;
};
export type DISTRICT = {
  Id: string;
  Name: string;
  Wards: WARD[];
};
export type PROVINCE = {
  Id: string;
  Name: string;
  Districts: DISTRICT[];
};

export type CHECKOUT_DATA = {
  ajax_url: string;
  wc_ajax_url: string;
  update_order_review_nonce: string;
  apply_coupon_nonce: string;
  remove_coupon_nonce: string;
  option_guest_checkout: string;
  checkout_url: string;
  is_checkout: string;
  "woocommerce-process-checkout-nonce": string;
  diaGioiVn: PROVINCE[];
};

export type PAYMENT_GATEWAY = {
    "id": string
    "title": string;
}