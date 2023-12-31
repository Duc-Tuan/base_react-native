import React from "react";
import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
const IconHeart = (props: Props) => {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_216026)">
        <Path
          d="M13.3497 20.1307C12.5897 20.8207 11.4197 20.8207 10.6597 20.1207L10.5497 20.0207C5.29967 15.2707 1.86966 12.1607 1.99966 8.28065C2.05966 6.58065 2.92966 4.95065 4.33966 3.99065C6.97966 2.19065 10.2397 3.03065 11.9997 5.09065C13.7597 3.03065 17.0197 2.18065 19.6597 3.99065C21.0697 4.95065 21.9397 6.58065 21.9997 8.28065C22.1397 12.1607 18.6997 15.2707 13.4497 20.0407L13.3497 20.1307Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_216026">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(IconHeart);
