import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconBackRight(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
    >
      <G clip-path="url(#clip0_16158_238532)">
        <Path
          d="M5 12.9987H16.17L11.29 17.8787C10.9 18.2687 10.9 18.9087 11.29 19.2987C11.68 19.6887 12.31 19.6887 12.7 19.2987L19.29 12.7087C19.68 12.3187 19.68 11.6888 19.29 11.2988L12.71 4.69875C12.32 4.30875 11.69 4.30875 11.3 4.69875C10.91 5.08875 10.91 5.71875 11.3 6.10875L16.17 10.9988H5C4.45 10.9988 4 11.4488 4 11.9988C4 12.5487 4.45 12.9987 5 12.9987Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_238532">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
