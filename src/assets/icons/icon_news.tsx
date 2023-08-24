import Svg, { Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconNews(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M3.75 12V18C3.75 19.125 4.875 20.25 6 20.25H18C19.125 20.25 20.25 19.125 20.25 18V12M3.75 12H7.875C7.875 12 8.625 14.625 12 14.625C15.375 14.625 16.125 12 16.125 12H20.25M3.75 12V14.625M3.75 12L4.5 8.25M20.25 12L19.5 8.25M10.125 6.75H13.875M10.125 9.75H13.875M7.125 9.75V3.75H16.875V9.75"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
