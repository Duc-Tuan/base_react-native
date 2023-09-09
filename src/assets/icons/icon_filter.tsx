import Svg, { Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconFilter(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path d="M21.6625 2H3V3.55518H21.6625V2Z" fill={fill} />
      <Path
        d="M3.37329 4.48834L10.5584 11.7667C10.6517 11.86 10.7761 11.9844 10.7761 12.1089V22L13.8865 20.3204V12.1089C13.8865 11.9844 14.0109 11.86 14.1042 11.7667L21.2893 4.48834H3.37329Z"
        fill={fill}
      />
    </Svg>
  );
}
