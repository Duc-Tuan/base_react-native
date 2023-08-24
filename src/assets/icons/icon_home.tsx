import React from "react";
import Svg, { Rect, ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
const IconHome = (props: Props) => {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
    >
      <Path
        d="M2.36401 12.958C1.98401 10.321 1.79401 9.002 2.33501 7.875C2.87501 6.748 4.02601 6.062 6.32701 4.692L7.71201 3.867C9.80001 2.622 10.846 2 12 2C13.154 2 14.199 2.622 16.288 3.867L17.673 4.692C19.973 6.062 21.124 6.748 21.665 7.875C22.205 9.002 22.015 10.321 21.635 12.958L21.357 14.895C20.87 18.283 20.626 19.976 19.451 20.988C18.276 22 16.553 22 13.106 22H10.894C7.44701 22 5.72401 22 4.54901 20.988C3.37401 19.976 3.13001 18.283 2.64301 14.895L2.36401 12.958Z"
        stroke="white"
        stroke-width="1.5"
      />
      <Path
        d="M15 18H9"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default React.memo(IconHome);
