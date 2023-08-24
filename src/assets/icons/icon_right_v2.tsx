import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconRightV2(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_238773)">
        <Path
          d="M20.0828 11.42L16.0428 5.77C15.7028 5.29 15.1528 5 14.5628 5C13.0728 5 12.2128 6.68 13.0728 7.89L16.0028 12L13.0728 16.11C12.2028 17.32 13.0728 19 14.5628 19C15.1528 19 15.7128 18.71 16.0528 18.23L20.0928 12.58C20.3328 12.23 20.3328 11.77 20.0828 11.42Z"
          fill={fill}
        />
        <Path
          d="M13.0828 11.42L9.05285 5.77C8.70285 5.29 8.15285 5 7.56285 5C6.07285 5 5.20285 6.68 6.07285 7.89L9.00285 12L6.07285 16.11C5.20285 17.32 6.07285 19 7.56285 19C8.15285 19 8.71285 18.71 9.05285 18.23L13.0928 12.58C13.3328 12.23 13.3328 11.77 13.0828 11.42Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_238773">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
