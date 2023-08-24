import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconAdd(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M9.2925 15.8805L13.1725 12.0005L9.2925 8.12047C8.9025 7.73047 8.9025 7.10047 9.2925 6.71047C9.6825 6.32047 10.3125 6.32047 10.7025 6.71047L15.2925 11.3005C15.6825 11.6905 15.6825 12.3205 15.2925 12.7105L10.7025 17.3005C10.3125 17.6905 9.6825 17.6905 9.2925 17.3005C8.9125 16.9105 8.9025 16.2705 9.2925 15.8805Z"
        fill={fill}
      />
    </Svg>
  );
}
