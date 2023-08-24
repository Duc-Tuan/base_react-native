import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconDelete(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_225106)">
        <Path
          d="M16 16H18C18.55 16 19 16.45 19 17C19 17.55 18.55 18 18 18H16C15.45 18 15 17.55 15 17C15 16.45 15.45 16 16 16ZM16 8H21C21.55 8 22 8.45 22 9C22 9.55 21.55 10 21 10H16C15.45 10 15 9.55 15 9C15 8.45 15.45 8 16 8ZM16 12H20C20.55 12 21 12.45 21 13C21 13.55 20.55 14 20 14H16C15.45 14 15 13.55 15 13C15 12.45 15.45 12 16 12ZM3 18C3 19.1 3.9 20 5 20H11C12.1 20 13 19.1 13 18V8H3V18ZM13 5H11L10.29 4.29C10.11 4.11 9.85 4 9.59 4H6.41C6.15 4 5.89 4.11 5.71 4.29L5 5H3C2.45 5 2 5.45 2 6C2 6.55 2.45 7 3 7H13C13.55 7 14 6.55 14 6C14 5.45 13.55 5 13 5Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_225106">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
