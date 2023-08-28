import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconAdd(props: Props) {
  const { fill = 'black', width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_224689)">
        <Path
          d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_224689">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
