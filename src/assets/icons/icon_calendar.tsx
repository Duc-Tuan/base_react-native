import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconCalendar(props: Props) {
  const { fill = Colors.primary, width = 18, height = 20 } = props;
  return (
    <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} {...props}>
      <Path
        d="M6 9H4V11H6V9ZM10 9H8V11H10V9ZM14 9H12V11H14V9ZM16 2H15V0H13V2H5V0H3V2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2ZM16 18H2V7H16V18Z"
        fill={fill}
      />
    </Svg>
  );
}
