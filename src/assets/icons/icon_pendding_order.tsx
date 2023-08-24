import Svg, { Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconPenddingOrder(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M9.32551 2C5.18551 2 1.83301 5.36 1.83301 9.5C1.83301 13.64 5.18551 17 9.32551 17C13.473 17 16.833 13.64 16.833 9.5C16.833 5.36 13.473 2 9.32551 2ZM11.8005 13.0325L8.58301 9.8075V5.75H10.083V9.1925L12.8655 11.975L11.8005 13.0325Z"
        fill={fill}
      />
    </Svg>
  );
}
