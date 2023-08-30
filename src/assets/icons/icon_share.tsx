import Svg, { Path } from 'react-native-svg';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconShare(props: Props) {
  const { fill = 'black', width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M20 12L13.6 5V8.5C10.4 8.5 4 10.6 4 19C4 17.833 5.92 15.5 13.6 15.5V19L20 12Z"
        fill={fill}
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
