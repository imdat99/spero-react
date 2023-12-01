import { toast } from "react-toastify";

export const appRequest = async ({
  url,
  method = "GET",
  body,
  setLoading,
}: {
  url: string;
  method?: "POST" | "GET";
  body?: BodyInit | string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (setLoading) {
    setLoading(true);
  }
  return await fetch(url, { method, credentials: "include", body })
    .then((response) => response.json().then((res) => res))
    .catch(() => {
      toast.error("Đã xảy ra lỗi!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        role: "alert",
      });
    })
    .finally(() => {
      if (setLoading) setLoading(false);
    });
};

export const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());