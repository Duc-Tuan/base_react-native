import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconTime(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <Path
        d="M9 1H15V3H9V1ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.0273 4.69833 14.0443 3.99969 12 4C9.61305 4 7.32387 4.94821 5.63604 6.63604C3.94821 8.32387 3 10.6131 3 13C3 17.97 7.02 22 12 22C13.6943 22.0009 15.3544 21.5232 16.7891 20.622C18.2238 19.7207 19.3748 18.4325 20.1094 16.9057C20.8441 15.379 21.1325 13.6758 20.9415 11.9923C20.7506 10.3087 20.088 8.71341 19.03 7.39ZM13 14H11V8H13V14Z"
        fill={fill}
      />
    </Svg>
  );
}
