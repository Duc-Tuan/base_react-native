import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconMoney(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_227868)">
        <Path
          d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C12.92 6.9 13.63 7.44 13.89 8.3C14.01 8.7 14.34 9 14.76 9H15.06C15.72 9 16.19 8.35 15.96 7.73C15.54 6.55 14.56 5.57 13 5.19V4.5C13 3.67 12.33 3 11.5 3C10.67 3 10 3.67 10 4.5V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.85 17.1 9 16.51 8.67 15.67C8.52 15.28 8.18 15 7.77 15H7.49C6.82 15 6.35 15.68 6.6 16.3C7.17 17.69 8.5 18.51 10 18.83V19.5C10 20.33 10.67 21 11.5 21C12.33 21 13 20.33 13 19.5V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_227868">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
