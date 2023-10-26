import styled from "styled-components";

const PageSlogan = () => {
  return (
    <SloganContainer className="spero-slogan">
      <div className="big-slogan">
        <h2>
          D<span>is</span>cover
        </h2>
        <h2>the Original</h2>
      </div>
      <div className="text-slogan">
        <p>Một thế giới mới và thú vị về cà phê để bạn khám phá !</p>
      </div>
    </SloganContainer>
  );
};

export default PageSlogan;
const SloganContainer = styled.div`
  text-align: center;
  .text-slogan {
    font-size: var(--fs-md);
    font-weight: 400;
    margin-top: 1.5rem;
    color: var(--primary-1);
  }
  .big-slogan {
    h2 {
      font-size: var(--slogan-text-size);
      font-weight: 500;
      margin: 0;
      &:first-child {
        span {
          color: var(--primary-1);
          text-shadow: none;
        }
        color: #fff;
        text-shadow: -1px 1px 0 var(--primary-1), 1px 1px 0 var(--primary-1),
          1px -1px 0 var(--primary-1), -1px -1px 0 var(--primary-1);

        /* border: 1px solid #333; */
      }
    }
  }
`;
