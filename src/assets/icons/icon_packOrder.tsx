import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconPackOrder(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox={`0 0 24 24`} fill="none" {...props}>
      <Path
        d="M11.029 2.54001C11.326 2.37505 11.6602 2.28848 12 2.28848C12.3398 2.28848 12.674 2.37505 12.971 2.54001L20.486 6.71401C20.6418 6.80065 20.7716 6.92737 20.862 7.08103C20.9524 7.2347 21 7.40974 21 7.58801V15.823C20.9999 16.1797 20.9045 16.5298 20.7235 16.8371C20.5426 17.1445 20.2828 17.3979 19.971 17.571L12.971 21.461C12.674 21.626 12.3398 21.7125 12 21.7125C11.6602 21.7125 11.326 21.626 11.029 21.461L4.029 17.571C3.71736 17.3979 3.45763 17.1447 3.27671 16.8376C3.0958 16.5304 3.00026 16.1805 3 15.824V7.58801C2.99999 7.40974 3.04764 7.2347 3.13802 7.08103C3.22839 6.92737 3.3582 6.80065 3.514 6.71401L11.029 2.54001Z"
        stroke={fill}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 4.5L16.5 9.5V13M6 12.328L9 14"
        stroke={fill}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3 7L12 12M12 12L21 7M12 12V21.5" stroke={fill} strokeWidth="1" strokeLinejoin="round" />
    </Svg>
  );
}
