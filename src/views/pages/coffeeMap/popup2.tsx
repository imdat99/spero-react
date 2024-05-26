import { MapPin } from "@app/utils/types";
import Scrollbars from "react-custom-scrollbars-2";
import styled from "styled-components";

const Popup2: React.FC<{ mapPin: MapPin }> = (props) => {
    const { mapPin } = props || { mapPin: [] };
    return (
        <Scrollbars
            style={{
                height: 500,
                width: 425,
            }}
        >
            <PopupStyled>
                <div className="tag-header d-flex">
                    <img className="map-img" src={mapPin.img} alt="" />
                    <div className="tag-info">
                        <h2 className="tag-name">{mapPin.name}</h2>
                        <p className="tag-title">{mapPin.desc}</p>
                    </div>
                </div>
                <p
                    className="tag-content"
                    dangerouslySetInnerHTML={{ __html: mapPin.content }}
                ></p>
            </PopupStyled>
        </Scrollbars>
    );
};

export default Popup2;
const PopupStyled = styled.div`
  /* position: relative; */
  width: 390px;
  .map-img {
    width: 50%;
    flex-shrink: 0;
  }
  .tag-info {
    margin-block: auto;
    width: 50%;
    margin-left: 26px;
    .tag-name {
      font-size: 30px;
      font-weight: 700;
    }
    .tag-title {
      font-size: 18px;
    }
  }
  .tag-content {
    font-size: 16px;
    color: var(--neutral-text-1, #323330);
  }
  .product_name_text {
    font-size: 12.34px;
    line-height: 17.276px; /* 140% */
  }
  .product-cart-icon svg {
    width: 15px;
    height: 15px;
  }
`;
