import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconAddLocation(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_234866)">
        <Path
          d="M19 1C19.55 1 20 1.45 20 2V4H22C22.55 4 23 4.45 23 5C23 5.55 22.55 6 22 6H20V8C20 8.55 19.55 9 19 9C18.45 9 18 8.55 18 8V6H16C15.45 6 15 5.55 15 5C15 4.45 15.45 4 16 4H18V2C18 1.45 18.45 1 19 1ZM12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13ZM14.72 3.47C14.28 3.83 14 4.38 14 5C14 6.1 14.9 7 16 7H17V8C17 9.1 17.9 10 19 10C19.32 10 19.62 9.92 19.89 9.79C19.96 10.24 20 10.71 20 11.2C20 14.38 17.55 18.12 12.66 22.43C12.28 22.76 11.71 22.76 11.33 22.43C6.45 18.12 4 14.38 4 11.2C4 6.22 7.8 3 12 3C12.94 3 13.86 3.16 14.72 3.47Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_234866">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
