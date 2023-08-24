import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconLeft(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M14.7066 15.8805L10.8266 12.0005L14.7066 8.12047C15.0966 7.73047 15.0966 7.10047 14.7066 6.71047C14.3166 6.32047 13.6866 6.32047 13.2966 6.71047L8.70656 11.3005C8.31656 11.6905 8.31656 12.3205 8.70656 12.7105L13.2966 17.3005C13.6866 17.6905 14.3166 17.6905 14.7066 17.3005C15.0866 16.9105 15.0966 16.2705 14.7066 15.8805Z"
        fill={fill}
      />
    </Svg>
  );
}
