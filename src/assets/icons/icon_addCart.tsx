import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconCheck(props: Props) {
  const { fill = 'black', width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} {...props}>
      <G clip-path="url(#clip0_16158_214139)">
        <Path
          d="M12 9C12.55 9 13 8.55 13 8V6H15C15.55 6 16 5.55 16 5C16 4.45 15.55 4 15 4H13V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2V4H9C8.45 4 8 4.45 8 5C8 5.55 8.45 6 9 6H11V8C11 8.55 11.45 9 12 9ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.68 5.84C20.95 5.36 20.77 4.75 20.29 4.48C19.81 4.22 19.2 4.39 18.94 4.87L15.55 11H8.53L4.54 2.57C4.38 2.22 4.02 2 3.64 2H2C1.45 2 1 2.45 1 3C1 3.55 1.45 4 2 4H3L6.6 11.59L5.25 14.03C4.52 15.37 5.48 17 7 17H18C18.55 17 19 16.55 19 16C19 15.45 18.55 15 18 15H7L8.1 13Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_214139">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
