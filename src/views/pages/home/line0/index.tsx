import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { iconPosition } from "../leftPosition";

export type Position = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

type IconPos = {
  position: Position;
  line: string;
  speed: number;
};

const BoxIcon = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 100px;
  transition: top 0.1s linear, left 0.1s linear;
`;
// const arr: number[] = [];
const HomeIcon: React.FC<IconPos> = ({ position, line, speed }) => {
  // arr.push(sinPercent);
  return (
    <BoxIcon style={iconPosition(position, line, speed) as any}>
      <img src="/wp-content/themes/spero/svg/logoIcon.svg" alt="" />
    </BoxIcon>
  );
};

const Line0: React.FC<{
  lineSvg: string;
  lineActive: string;
  height: number;
  speed?: number;
  head?: number;
  foot?: number;
}> = ({ lineSvg, lineActive, height, speed, head, foot }) => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Position>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  // console.log("position", );
  const { height: posHeight, top } = position;
  useEffect(() => {
    const calcPosition = () => {
      // console.log(a);
      if (el) {
        setPosition(el.getBoundingClientRect());
      }
    };

    window.addEventListener("scroll", calcPosition);
    return () => {
      window.removeEventListener("scroll", calcPosition);
    };
  }, [el, height]);
  return (
    <div className="step-line position-relative" ref={(e) => setEl(e)}>
      {posHeight - 400 - top < height + (head || 0) &&
        posHeight - 400 - top > (foot || 0) && (
          <HomeIcon
            speed={speed || 0}
            position={position}
            line={
              height === 1034 ? "line0" : height === 825 ? "line1" : "line2"
            }
          />
        )}
      <div
        className="position-absolute overflow-hidden"
        style={{
          height:
            position.height - 550 - position.top + 50 > height
              ? height
              : position.height - 550 - position.top + 50,
        }}
      >
        <img height={height} src={lineActive} alt="step-line" />
      </div>
      <img src={lineSvg} alt="step-line" />
    </div>
  );
};

export default Line0;
// /wp-content/eehmst/spero/svg/testline.svg;
// /wp-content/themes/spero/svg/Group-5368.svg
