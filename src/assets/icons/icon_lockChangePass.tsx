import Svg, { Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconAdd(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path opacity={0.4} d="M12 17.35a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26Z" fill={fill} />
      <Path
        d="M16.65 9.44h-9.3C3.25 9.44 2 10.69 2 14.79v1.86C2 20.75 3.25 22 7.35 22h9.3c4.1 0 5.35-1.25 5.35-5.35v-1.86c0-4.1-1.25-5.35-5.35-5.35ZM12 18.74c-1.67 0-3.02-1.36-3.02-3.02S10.33 12.7 12 12.7s3.02 1.36 3.02 3.02-1.35 3.02-3.02 3.02Z"
        fill={fill}
      />
      <Path
        opacity={0.4}
        d="M7.12 9.45V8.28c0-2.93.83-4.88 4.88-4.88s4.88 1.95 4.88 4.88v1.17c.51.01.97.03 1.4.09V8.28C18.28 5.58 17.63 2 12 2S5.72 5.58 5.72 8.28v1.25c.42-.05.89-.08 1.4-.08Z"
        fill={fill}
      />
    </Svg>
  );
}
