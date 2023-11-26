import { createPortal } from "react-dom";
import Line0 from "./line0";
// import { leftValue } from "./leftPosition";

const ScrollRoot = document.getElementById("home-scroll");

const Home = () => {
  return ScrollRoot
    ? createPortal(
        <div className="spero-text-primary position-relative">
          <div className="spero_story_tag">
            <h2 className="h2 text-uppercase">Câu chuyện</h2>
            <h1 className="h1 text-uppercase fw-bold">của spero</h1>
            <a href="/cau-chuyen-thuong-hieu" className="nav-link">
              Trải nghiệm thêm <i className="ms-2 fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <Line0
            lineSvg="/wp-content/themes/spero/svg/Group-5368.svg"
            lineActive="/wp-content/themes/spero/svg/testline.svg"
            height={1034}
            speed={0}
            head={100}
          />
          <div className="spero_story_tag">
            <h2 className="h2 text-uppercase">HÀNH TRÌNH 2023 - 2024</h2>
            <h1 className="h1 text-uppercase fw-bold">của ETHIOPIA</h1>
            <a href="/ethiopia" className="nav-link">
              Trải nghiệm thêm <i className="ms-2 fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <Line0
            lineSvg="/wp-content/themes/spero/svg/line1.svg"
            lineActive="/wp-content/themes/spero/svg/line1active.svg"
            height={825}
            speed={0}
            head={115}
            foot={0}
          />
          <div className="spero_story_tag">
            <h2 className="h2 text-uppercase">câu chuyện</h2>
            <h1 className="h1 text-uppercase fw-bold">của cà phê</h1>
            <a href="/kien-thuc-ca-phe" className="nav-link">
              Trải nghiệm thêm <i className="ms-2 fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <Line0
            lineSvg="/wp-content/themes/spero/svg/line2.svg"
            lineActive="/wp-content/themes/spero/svg/line2active.svg"
            height={1165}
            speed={0}
            head={90}
            foot={100}
          />
          <div className="spero_story_tag">
            <h2 className="h2 text-uppercase">Đích đến</h2>
            <h1 className="h1 text-uppercase fw-bold">thành quả</h1>
            <a href="/san-pham" className="nav-link">
              Trải nghiệm thêm <i className="ms-2 fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>,
        ScrollRoot
      )
    : null;
};

export default Home;
