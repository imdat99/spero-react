import { PROVINCE } from "./types";

// export function decodeHTML(str: string) {
//   return str.replace(/&#(\d+);/g, function (_match, dec) {
//     return String.fromCharCode(dec);
//   });
// }
export function decodeHTML(input: string) {
  var e = document.createElement("textarea");
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
export const elementIsVisibleInViewport = (
  el?: Element,
  partiallyVisible = false
) => {
  if (el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  }
  return false;
};
export const Money = (v: string | number) =>
  String(v || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";

export const updateCartIcon = (count = "0") => {
  const cartAmountElement = document.getElementById("cart-quantity");
  if (cartAmountElement) {
    cartAmountElement.innerText = count;
  }
};

export const getNonce = (url: string) => {
  const re = /(?:_wpnonc[\w]+)(?:=|&?)(?<value>[\w+,.-]*)/g;
  return (re.exec(url) || "aa")[1];
};

export const objectBody = (obj: Record<string, any>) => {
  const body = new FormData();
  Object.entries(obj).forEach(([key, val]) => {
    if (val) body.append(key, val);
  });
  return body;
};

export function buildQueryString(object: Record<string, any>) {
  if (typeof object !== "object") return "";
  const args: any[] = [];
  for (const key in object) {
    destructure(key, object[key]);
  }
  return args.join("&");

  function destructure(key: string, value: any) {
    if (key && (value || value === false || value === 0)) {
      if (typeof value === "object" && value !== null) {
        for (const i in value) {
          destructure(key + "[" + i + "]", value[i]);
        }
      } else {
        if (Array.isArray(value)) {
          if (value.length) {
            args.push(
              encodeURIComponent(key) +
                (value != null && value !== undefined
                  ? "=" + value.toString()
                  : "")
            );
          }
        } else {
          args.push(
            encodeURIComponent(key) +
              (value != null && value !== "" && value !== undefined
                ? "=" + encodeURIComponent(value)
                : "")
          );
        }
      }
    }
  }
}

export const getData_diagioi_fromId = ({
  id_district,
  id_city,
  DiaGioiVN,
}: {
  id_district: string;
  id_city: string;
  DiaGioiVN: PROVINCE[];
}) => {
  const cityData = DiaGioiVN.find((item) => item.Id === id_city);
  const districtData = cityData?.Districts.find(
    (item) => item.Id === id_district
  );
  return {
    billing_city: cityData?.Name,
    billing_address_1: districtData?.Name,
  };
};
