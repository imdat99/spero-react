import { PageUrl } from "@app/utils/constant";
import { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import styled from "styled-components";

const noteInfoCoffee = [
  {
    id: "point1",
    fill: "#193969",
    text: "Nơi phát hiện hạt Arabica",
  },
  {
    id: "point2",
    fill: "#2F71D3",
    text: "Nơi phát hiện hạt Robusta",
  },
  {
    id: "point3",
    fill: "#587BB0",
    text: "Các vùng cà phê nổi tiếng thế giới",
  },
];
const noteInfoBean = [
  {
    id: "bean1",
    fill: "#587BB0",
    text: "Vùng trồng Arabica",
  },
  {
    id: "bean2",
    fill: "#587BB0",
    text: "Vùng trồng Robusta",
  },
];
const Map2 = () => {
  const [zoom, setZoom] = useState(1);
  return (
    <>
      <MapStyled className="spero-map position-relative">
        <div className="group-btn position-absolute">
          <button
            className="btn map-btn minus"
            onClick={() => {
              setZoom((prev) => prev - 0.1);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#0F2341"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="btn map-btn inc"
            onClick={() => {
              setZoom((prev) => prev + 0.1);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#0F2341"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 3.75V20.25"
                stroke="#0F2341"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <Scrollbars style={{ height: 980 }}>
          <MapStyled className="spero-map position-relative over">
            <div
              className="mapContainer spero-map position-relative"
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              <img
                src={`${PageUrl}/wp-content/themes/spero/svg/map2.svg`}
                alt=""
              />
              <div className="position-absolute top-0 start-0">
                <svg
                  className="hero-image"
                  width={1920}
                  height={1241}
                  viewBox="0 0 1920 1241"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_606_4543"
                    style={{
                      maskType: "luminance",
                    }}
                    maskUnits="userSpaceOnUse"
                    x={-117}
                    y={0}
                    width={2122}
                    height={1241}
                  >
                    <path
                      d="M2004.45 0.675781H-116.079V1240.03H2004.45V0.675781Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_606_4543)">
                    <path
                      d="M1216.59 645.802C1216.59 646.708 1215.85 647.444 1214.95 647.444C1214.04 647.444 1213.3 646.708 1213.3 645.802C1213.3 644.896 1214.04 644.16 1214.95 644.16C1215.85 644.16 1216.59 644.896 1216.59 645.802Z"
                      fill="#414042"
                    />
                  </g>
                  <g
                    className="vnGroup"
                    onClick={(e) => {
                      console.log(e.currentTarget.getBoundingClientRect());
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      className="ethiopia"
                      d="M1148.92 679.041L1148.48 677.289L1148.04 676.851L1147.82 675.099L1147.16 674.223L1146.73 673.347L1146.07 672.689H1145.19L1144.76 672.251V671.813L1144.1 671.594L1143 669.842L1142.78 669.623L1142.56 668.966L1141.69 668.09L1141.25 667.433H1139.28L1138.4 667.214L1137.97 666.557L1138.84 665.462L1139.28 665.242V664.147L1140.37 664.366L1141.25 664.147L1141.69 664.585H1142.35L1142.56 664.147L1143.22 663.709L1143.44 661.3V659.548L1143.66 658.234L1144.54 656.919V655.824L1144.1 655.386L1144.54 654.291L1145.63 652.977V652.539L1146.07 652.32L1146.73 652.539L1147.6 649.034L1148.26 647.501L1149.57 646.406V645.749L1150.67 643.778L1150.89 642.902L1151.76 642.683L1152.2 642.902L1152.64 641.369L1153.95 639.178V637.426L1154.61 635.893L1154.83 635.674L1155.49 635.893H1156.58L1156.8 635.236H1157.68L1158.99 632.607L1159.43 632.826L1159.65 633.484L1161.62 634.141H1162.5L1163.37 633.264H1164.25L1164.91 633.922L1165.34 633.484H1166.22L1167.75 634.798V634.36H1168.63H1169.51L1170.38 635.236L1171.26 635.455L1173.01 636.988L1173.23 637.645L1174.76 637.864V638.302H1175.64L1176.08 638.74L1177.17 639.397L1178.49 640.711L1179.36 640.93L1180.46 642.245V643.34L1180.89 643.778H1181.55L1182.87 645.53L1181.99 645.749L1181.55 647.063L1181.11 647.939L1181.33 649.034L1180.89 649.911V650.787L1180.02 651.882L1180.46 652.539H1182.21L1183.52 651.663L1184.84 651.444L1185.49 651.882L1185.28 652.539L1185.49 654.291L1186.37 656.919L1187.68 657.577L1187.47 658.891L1188.12 660.424L1189.87 660.862L1191.19 661.738L1205.21 666.119H1211.56L1196.45 681.012L1193.6 680.793L1190.53 681.012L1189.66 681.67H1188.78L1187.47 682.327L1187.25 683.203L1186.15 683.86L1185.06 684.517L1183.52 684.736L1181.99 685.393L1181.55 686.05L1181.33 686.269H1180.24L1178.49 686.488L1177.61 686.05L1176.95 684.955L1176.3 684.736L1174.1 684.955L1173.45 685.174H1172.79L1171.7 685.612L1171.26 686.269L1169.94 688.24H1169.07H1168.41L1167.53 688.021L1166.22 688.24L1165.12 687.583H1163.59L1162.72 687.364L1161.84 686.488L1160.74 685.612L1158.77 683.86L1157.9 683.203L1155.49 683.422L1154.39 682.984L1153.3 683.422L1152.2 683.203L1151.55 682.327V679.479L1150.67 679.26L1149.79 679.479L1149.35 678.603L1148.92 679.041Z"
                      fill="#CDDAEB"
                      stroke="#F8F8F8"
                      strokeWidth={1.06956}
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M1177.5 645C1171.69 645 1167 649.695 1167 655.5C1167 663.375 1177.5 675 1177.5 675C1177.5 675 1188 663.375 1188 655.5C1188 649.695 1183.3 645 1177.5 645ZM1177.5 659.25C1176.5 659.25 1175.55 658.855 1174.85 658.152C1174.14 657.448 1173.75 656.495 1173.75 655.5C1173.75 654.505 1174.14 653.552 1174.85 652.848C1175.55 652.145 1176.5 651.75 1177.5 651.75C1178.49 651.75 1179.45 652.145 1180.15 652.848C1180.85 653.552 1181.25 654.505 1181.25 655.5C1181.25 656.495 1180.85 657.448 1180.15 658.152C1179.45 658.855 1178.49 659.25 1177.5 659.25Z"
                      fill="#193969"
                    />
                  </g>
                  <path
                    d="M1176.75 687V680.374H1180.38V681.103H1177.5V683.233H1180.01V683.961H1177.5V686.271H1180.38V687H1176.75ZM1182.76 687V681.103H1180.94V680.374H1185.33V681.103H1183.51V687H1182.76ZM1190.56 687V683.971H1186.96V687H1186.21V680.374H1186.96V683.223H1190.56V680.374H1191.31V687H1190.56ZM1192.8 687V680.374H1193.55V687H1192.8ZM1198.13 687.085C1196.25 687.085 1194.73 685.571 1194.73 683.687C1194.73 681.803 1196.25 680.289 1198.13 680.289C1200.01 680.289 1201.53 681.803 1201.53 683.687C1201.53 685.571 1200.01 687.085 1198.13 687.085ZM1195.48 683.687C1195.48 685.164 1196.66 686.337 1198.13 686.337C1199.6 686.337 1200.78 685.164 1200.78 683.687C1200.78 682.21 1199.6 681.036 1198.13 681.036C1196.66 681.036 1195.48 682.21 1195.48 683.687ZM1202.71 687V680.374H1205.01C1206.23 680.374 1206.96 681.027 1206.96 682.229C1206.96 683.441 1206.23 684.066 1205.01 684.066H1203.46V687H1202.71ZM1203.46 683.356H1204.95C1205.69 683.356 1206.21 683.128 1206.21 682.239C1206.21 681.368 1205.69 681.103 1204.95 681.103H1203.46V683.356ZM1208.05 687V680.374H1208.8V687H1208.05ZM1209.7 687L1212.36 680.374H1213.2L1215.85 687H1215.04L1214.44 685.476H1211.13L1210.52 687H1209.7ZM1211.41 684.747H1214.15L1212.78 681.273L1211.41 684.747Z"
                    fill="#414042"
                  />
                  <g
                    className="vnGroup"
                    onClick={(e) => {
                      console.log(e.currentTarget.getBoundingClientRect());
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      className="vietnam"
                      d="M1466.95 591.651L1467.38 591.432H1467.82L1468.04 590.994L1468.48 590.556L1469.57 590.118H1470.23V590.775L1470.67 591.213H1471.33L1471.55 590.337L1472.2 589.899L1473.08 590.775L1473.52 590.118H1474.17L1474.39 590.775L1475.49 590.337L1475.71 589.68L1476.8 589.242L1477.68 589.68L1479.21 589.242V587.709L1480.31 587.052H1481.4L1482.06 586.395L1483.15 587.271V587.928L1484.25 588.147L1484.69 588.804H1486.88L1487.32 589.242L1488.63 588.804L1489.51 589.461L1489.29 590.337H1488.63L1488.19 592.089L1488.85 592.308L1489.07 593.403L1491.04 594.06L1491.26 594.718L1492.13 595.156L1493.01 595.594L1494.1 595.375L1494.54 595.813L1495.2 595.594L1496.08 596.032L1496.3 596.47L1496.08 596.908L1495.64 597.127H1495.2L1494.32 597.565H1493.45L1492.57 597.784L1492.35 598.222L1492.57 598.879L1492.13 599.317L1491.91 599.536L1491.48 599.317L1490.82 599.536L1490.38 599.974L1490.16 600.193L1489.94 599.755H1489.72V600.412L1489.29 600.85L1489.51 601.069L1489.29 601.726V602.383L1489.07 602.603L1489.29 603.26L1489.07 603.698H1488.63L1487.97 604.793H1487.32L1487.1 604.574V605.012L1486.66 605.231L1486.44 606.107L1486 606.326V607.202H1486.44L1486.88 607.64L1486.44 609.173L1486 610.049L1487.1 610.926V611.364L1486.22 611.583L1487.1 611.802L1488.41 612.678L1489.72 613.992H1490.16L1490.82 615.087V615.525L1490.6 615.744L1491.04 616.839L1491.26 617.496L1493.23 619.03L1494.32 619.687V619.906L1496.95 621.22L1499.36 622.972L1499.8 623.848L1501.99 625.381L1502.65 626.696L1502.87 627.353H1503.09V628.01L1504.18 629.105V629.543L1504.4 629.981L1504.18 630.419L1505.06 631.514L1505.28 633.266L1505.71 633.485L1506.15 635.019L1506.37 635.238V636.114L1506.15 636.552L1506.37 637.428L1506.15 637.866L1506.59 639.18V639.618L1507.03 639.837L1507.25 640.494L1507.9 641.589V642.246H1507.68V641.808L1507.47 641.37L1507.03 641.589V642.246L1507.47 642.685V643.123L1507.03 643.561V643.999L1506.37 644.656L1507.03 645.751L1506.59 646.627L1506.81 647.065L1506.15 647.722L1505.71 647.941L1505.49 649.036L1505.06 649.255L1503.96 650.351L1503.3 650.789L1502.43 651.446V652.322H1501.55L1500.89 652.979L1498.7 654.293L1497.39 654.512L1496.95 654.293L1496.08 654.512L1495.86 654.293L1496.08 653.636V652.979L1495.86 653.636L1495.64 653.855L1494.76 653.636L1495.2 654.074V654.512L1494.98 654.731L1494.1 654.512L1495.42 655.169L1495.2 655.607L1495.64 656.264L1494.98 656.702L1493.89 655.826L1494.76 656.702V657.14L1494.32 657.578L1493.89 657.359L1493.45 656.702H1493.01L1493.23 657.359V657.578L1493.45 657.797L1493.01 658.016L1492.79 658.454H1492.35L1491.48 659.331L1491.04 659.55H1490.38L1490.16 659.988L1489.94 661.083L1489.29 661.521H1489.07V661.74L1486.88 662.616L1485.78 662.397L1486.44 661.959L1487.32 661.521L1487.75 661.083L1487.32 661.302L1486.66 660.864V659.331L1486.88 659.112H1486.66L1486.88 658.454V656.921L1487.53 655.826L1488.85 654.731L1489.29 654.293L1488.63 654.512L1487.53 654.293L1486.88 654.512L1486.44 654.293L1486 654.512L1485.12 654.293L1485.34 654.074V653.198L1485.12 652.979L1486 651.884L1487.1 651.665L1487.75 650.351H1488.63L1489.07 650.789L1491.26 650.131L1492.13 650.789L1492.35 651.446H1493.89L1493.45 650.351L1493.67 649.693L1492.79 648.817L1491.7 648.598L1491.48 646.846L1492.35 646.189H1494.1L1494.54 645.313L1495.86 644.437L1497.17 643.999L1497.39 643.342L1498.05 643.123L1498.7 641.808L1498.49 640.713L1498.7 639.399L1498.27 638.523L1498.49 636.99L1497.61 635.019L1496.73 634.581L1496.08 633.047H1496.3L1497.17 632.39L1496.95 631.076L1496.51 630.419L1496.3 629.105L1497.61 628.01V626.915H1496.95L1496.51 626.258L1496.73 624.943L1497.39 624.286L1497.17 623.629L1496.3 624.067L1495.86 623.848L1495.2 622.972H1494.1L1493.67 622.534L1493.89 621.658L1493.23 621.439L1492.79 621.658L1492.13 621.001L1491.91 620.125L1491.48 619.249H1490.38L1489.72 619.03L1489.29 617.934L1487.75 616.182V615.525L1486.88 614.211L1485.56 613.554L1484.25 611.802H1483.37L1480.96 611.583H1479.43L1478.77 610.268H1478.12L1477.9 609.611L1478.55 608.954L1477.46 607.859L1477.24 606.983H1477.9L1479.21 606.545L1480.09 606.326L1480.53 605.888L1481.18 603.917L1481.84 603.698V603.041L1480.53 602.603V601.726L1480.31 600.85L1478.99 600.631L1478.33 599.755H1477.02L1475.93 600.412L1474.83 599.974H1472.86L1471.76 598.441L1470.01 596.908L1470.45 596.032L1470.23 594.937L1469.35 594.28L1468.48 592.965L1466.73 592.308L1466.95 591.651ZM1480.09 654.512L1480.53 655.169L1480.31 655.607L1480.74 656.483L1481.18 656.264L1481.4 654.731L1481.18 654.512L1480.96 653.855L1480.09 654.512Z"
                      fill="#9AAFCF"
                      stroke="#F8F8F8"
                      strokeWidth={1.06956}
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M1504 621C1500.13 621 1497 624.13 1497 628C1497 633.25 1504 641 1504 641C1504 641 1511 633.25 1511 628C1511 624.13 1507.87 621 1504 621ZM1504 630.5C1503.34 630.5 1502.7 630.237 1502.23 629.768C1501.76 629.299 1501.5 628.663 1501.5 628C1501.5 627.337 1501.76 626.701 1502.23 626.232C1502.7 625.763 1503.34 625.5 1504 625.5C1504.66 625.5 1505.3 625.763 1505.77 626.232C1506.24 626.701 1506.5 627.337 1506.5 628C1506.5 628.663 1506.24 629.299 1505.77 629.768C1505.3 630.237 1504.66 630.5 1504 630.5Z"
                      fill="#3A5D93"
                    />
                  </g>
                  <path
                    d="M1177 674.184C1274.44 627.726 1310.38 697.192 1361.27 722.854C1424.88 754.932 1510.21 670.313 1503.64 641"
                    stroke="#175CC2"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </svg>
              </div>
            </div>
          </MapStyled>
        </Scrollbars>
      </MapStyled>
      <div className="products-container my-5 spero-map coffee-map">
        <ul>
          {noteInfoCoffee.map((item) => (
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
                {item.text}
              </p>
            </li>
          ))}
        </ul>
        <ul>
          {noteInfoBean.map((item) => (
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
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Map2;
const MapStyled = styled.div`
  transition: all 0.1s linear 0.1s;

  &.over {
    /* overflow: scroll; */
    transition: all 0.2s ease-in-out;
  }
  text-align: center;
  width: 100vw;
  /* overflow: scroll; */
  .vnGroup {
    cursor: pointer;
  }
  .vnGroup:hover .vietnam,
  .vnGroup:hover .ethiopia {
    fill: red;
  }
  .hero-image {
    // background-image: url(${PageUrl}/wp-content/themes/spero/svg/map2.svg); /* The image used */
    /* background-position: center; Center the image */
    // background-repeat: no-repeat; /* Do not repeat the image */
    /* background-size: cover; Resize the background image to cover the entire container */
  }
  .group-btn {
    text-align: left;
    z-index: 1;
    .map-btn {
      border-top: 1px solid var(--primary-1);
      border-left: 1px solid var(--primary-1);
      border-bottom: 1px solid var(--primary-1);
      border-radius: 0;
      padding: 10px 20px;
      &.inc {
        border-right: 1px solid var(--primary-1);
        border-top-right-radius: 45%;
        border-bottom-right-radius: 45%;
      }
      &.minus {
        border-top-left-radius: 45%;
        border-bottom-left-radius: 45%;
      }
    }
  }
`;