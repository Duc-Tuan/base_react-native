import React from "react";
import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
const IconSettingUser = (props: Props) => {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_214212)">
        <Path
          d="M17 10.9986C17.34 10.9986 17.67 11.0386 18 11.0886V7.57859C18 6.77859 17.53 6.05859 16.8 5.74859L11.3 3.34859C10.79 3.12859 10.21 3.12859 9.7 3.34859L4.2 5.74859C3.47 6.06859 3 6.78859 3 7.57859V11.1786C3 15.7186 6.2 19.9686 10.5 20.9986C11.05 20.8686 11.58 20.6786 12.1 20.4486C11.41 19.4686 11 18.2786 11 16.9986C11 13.6886 13.69 10.9986 17 10.9986Z"
          fill={fill}
        />
        <Path
          d="M17 13C14.79 13 13 14.79 13 17C13 19.21 14.79 21 17 21C19.21 21 21 19.21 21 17C21 14.79 19.21 13 17 13ZM17 14.38C17.62 14.38 18.12 14.89 18.12 15.5C18.12 16.11 17.61 16.62 17 16.62C16.39 16.62 15.88 16.11 15.88 15.5C15.88 14.89 16.38 14.38 17 14.38ZM17 19.75C16.07 19.75 15.26 19.29 14.76 18.58C14.81 17.86 16.27 17.5 17 17.5C17.73 17.5 19.19 17.86 19.24 18.58C18.74 19.29 17.93 19.75 17 19.75Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_214212">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(IconSettingUser);
