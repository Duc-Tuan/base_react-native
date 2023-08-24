import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
import Colors from "../../themes/Color";
import React from "react";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
const IconShipping = (props: Props) => {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7 18.958a4.01 4.01 0 0 1-4.008-4.008v-2.367a.8.8 0 0 1 1.075-.75c.216.075.433.125.658.159.1.016.2.033.3.033.125.017.258.025.383.025.925 0 1.842-.342 2.567-.933a3.89 3.89 0 0 0 2.533.933c.95 0 1.834-.325 2.525-.925.717.583 1.617.925 2.534.925.141 0 .291-.008.425-.025a3.739 3.739 0 0 0 .975-.208.8.8 0 0 1 1.058.75v2.383a4.01 4.01 0 0 1-4.008 4.008H7Z"
        fill={fill || Colors.primary}
      />
      <Path
        d="m18.817 7.658-.234-2.216c-.333-2.417-1.433-3.4-3.775-3.4H6.183c-2.35 0-3.441.983-3.783 3.425l-.217 2.2c-.083.858.15 1.691.659 2.341.608.792 1.541 1.242 2.583 1.242 1.008 0 1.975-.508 2.592-1.317a2.995 2.995 0 0 0 2.5 1.317c1.033 0 1.941-.483 2.491-1.283.617.791 1.575 1.283 2.567 1.283 1.067 0 2.025-.475 2.625-1.308.483-.642.7-1.45.617-2.284Zm-7.067-.716h-2.5a.624.624 0 1 1 0-1.25h2.5a.624.624 0 1 1 0 1.25Z"
        fill={fill || Colors.primary}
      />
    </Svg>
  );
};

export default React.memo(IconShipping);
