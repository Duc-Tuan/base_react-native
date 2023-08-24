import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconDown(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M8.11875 9.28859L11.9988 13.1686L15.8787 9.28859C16.2688 8.89859 16.8988 8.89859 17.2888 9.28859C17.6788 9.67859 17.6788 10.3086 17.2888 10.6986L12.6988 15.2886C12.3088 15.6786 11.6788 15.6786 11.2888 15.2886L6.69875 10.6986C6.30875 10.3086 6.30875 9.67859 6.69875 9.28859C7.08875 8.90859 7.72875 8.89859 8.11875 9.28859Z"
        fill={fill}
      />
    </Svg>
  );
}
