import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconClearUp(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 15.016H15V15.003C14.9984 14.4789 14.7895 13.9767 14.4189 13.6061C14.0483 13.2355 13.5461 13.0266 13.022 13.025H12.987L16.844 2.63201L15.112 1.98901L11.017 13.025H10.978C10.4539 13.0266 9.9517 13.2355 9.58109 13.6061C9.21049 13.9767 9.00158 14.4789 9 15.003V15.016H4V17.016H20V15.016ZM20 18.018H4L2 22H22L20 18.018Z"
        fill={fill}
      />
    </Svg>
  );
}
