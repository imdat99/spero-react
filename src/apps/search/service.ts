import { PageUrl } from "@app/utils/constant";
import { appRequest } from "@app/utils/request";

export const searchfn =
  (
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setResult: React.Dispatch<React.SetStateAction<any[]>>
  ) =>
      (keyword: string) => {
          appRequest({
              url: PageUrl + `/wp-json/wp/v2/search/?search=${keyword}`,
              method: "GET",
              setLoading,
              //other options
          }).then((res) => {
              setResult(res);
          });
      };
