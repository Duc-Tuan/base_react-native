import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconUp(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M8.11875 14.7105L11.9988 10.8305L15.8787 14.7105C16.2688 15.1005 16.8988 15.1005 17.2888 14.7105C17.6788 14.3205 17.6788 13.6905 17.2888 13.3005L12.6988 8.71047C12.3088 8.32047 11.6788 8.32047 11.2888 8.71047L6.69875 13.3005C6.30875 13.6905 6.30875 14.3205 6.69875 14.7105C7.08875 15.0905 7.72875 15.1005 8.11875 14.7105Z"
        fill={fill}
      />
    </Svg>
  );
}
