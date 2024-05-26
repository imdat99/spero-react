export const WEIGHT_UNIT: Record<string, string> = {
    g: "gram",
    kg: "kilogram",
};

export enum SPERO_ACTION {
  ADD_TO_CART = "spero_ajax_add_to_cart",
  REMOVE_ITEM = "spero_ajax_remove_item",
  UPDATE_ITEM = "spero_update_quantity_item",
  CHECKOUT_INFO = "spero_checkout_data",
}

export enum BUTTON_TYPE {
  MINUS = "minus",
  INCREASE = "increase",
}

export const PageUrl: string = (window as any).__PAGE_URL__;

export const checkoutData = PageUrl + "/wp-json/vendor/checkout-info";
export const adminAjax = PageUrl + "/wp-admin/admin-ajax.php";
export const searchCoupon = PageUrl + "/wp-json/vendor/v/coupon";
