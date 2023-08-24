import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconSussOrder(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_23996_57607)">
        <Path
          d="M9.33301 2C5.19301 2 1.83301 5.36 1.83301 9.5C1.83301 13.64 5.19301 17 9.33301 17C13.473 17 16.833 13.64 16.833 9.5C16.833 5.36 13.473 2 9.33301 2ZM7.83301 13.25L4.08301 9.5L5.14051 8.4425L7.83301 11.1275L13.5255 5.435L14.583 6.5L7.83301 13.25Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_23996_57607">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
