import { PageUrl } from "@app/utils/constant";
import { useTranslation } from "react-i18next";

const noteInfo = [
    {
        id: "point1",
        fill: "#193969",
        text: "Arabicadiscovered",
    },
    {
        id: "point2",
        fill: "#2F71D3",
        text: "Robustadiscovered",
    },
    {
        id: "point3",
        fill: "#587BB0",
        text: "coffeeArea",
    },
];

const Map1 = () => {
    const { t } = useTranslation();
    return (
        <div className="spero-map mb-4">
            <img src={PageUrl + "/wp-content/themes/spero/svg/map.svg"} alt="" />
            <div className="products-container my-5">
                <ul>
                    {noteInfo.map((item) => (
                        <li key={item.id}>
                            <p className="note-info">
                                <span className="svg-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="30"
                                        viewBox="0 0 21 30"
                                        fill="none"
                                    >
                                        <path
                                            d="M10.5 0C4.695 0 0 4.695 0 10.5C0 18.375 10.5 30 10.5 30C10.5 30 21 18.375 21 10.5C21 4.695 16.305 0 10.5 0ZM10.5 14.25C9.50544 14.25 8.55161 13.8549 7.84835 13.1517C7.14509 12.4484 6.75 11.4946 6.75 10.5C6.75 9.50544 7.14509 8.55161 7.84835 7.84835C8.55161 7.14509 9.50544 6.75 10.5 6.75C11.4946 6.75 12.4484 7.14509 13.1517 7.84835C13.8549 8.55161 14.25 9.50544 14.25 10.5C14.25 11.4946 13.8549 12.4484 13.1517 13.1517C12.4484 13.8549 11.4946 14.25 10.5 14.25Z"
                                            fill={item.fill}
                                        />
                                    </svg>
                                </span>
                                {t(item.text)}
                            </p>
                        </li>
                    ))}
                </ul>
                <p className="spero__text spero-text-primary text-center">
          {t("MapIntro")}
                </p>
            </div>
        </div>
    );
};

export default Map1;
