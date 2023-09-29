import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconComment(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clipPath="url(#clip0_16158_223247)">
        <Path
          d="M21.99 4C21.99 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22L21.99 4ZM17 14H7C6.45 14 6 13.55 6 13C6 12.45 6.45 12 7 12H17C17.55 12 18 12.45 18 13C18 13.55 17.55 14 17 14ZM17 11H7C6.45 11 6 10.55 6 10C6 9.45 6.45 9 7 9H17C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11ZM17 8H7C6.45 8 6 7.55 6 7C6 6.45 6.45 6 7 6H17C17.55 6 18 6.45 18 7C18 7.55 17.55 8 17 8Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_223247">
          <Rect height={height} width={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
