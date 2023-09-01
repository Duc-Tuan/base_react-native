import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconAddV2(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clipPath="url(#clip0_16158_224722)">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H13V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H11V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_224722">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
