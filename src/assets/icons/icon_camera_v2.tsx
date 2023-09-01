import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconCameraV2(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} {...props}>
      <G clipPath="url(#clip0_16158_231907)">
        <Path
          d="M13.8105 2.86074C13.9805 2.56074 13.8105 2.16074 13.4605 2.12074C10.8405 1.75074 8.16048 2.40074 6.02048 3.98074C5.83048 4.13074 5.77048 4.41074 5.90048 4.63074L8.91048 9.85074C9.10048 10.1807 9.58048 10.1807 9.78048 9.85074L13.8105 2.86074ZM21.3005 8.33074C20.3205 5.86074 18.3805 3.87074 15.9505 2.83074C15.7205 2.73074 15.4505 2.83074 15.3205 3.05074L12.3105 8.26074C12.1205 8.58074 12.3605 9.00074 12.7505 9.00074H20.8305C21.1805 9.00074 21.4305 8.65074 21.3005 8.33074ZM21.3705 10.0007H15.1705C14.7905 10.0007 14.5405 10.4207 14.7405 10.7507L19.0005 18.1407C19.1705 18.4407 19.6005 18.4907 19.8205 18.2207C21.5605 16.0407 22.3005 13.1907 21.8705 10.4307C21.8405 10.1807 21.6205 10.0007 21.3705 10.0007ZM4.18048 5.79074C2.45048 7.98074 1.70048 10.8107 2.13048 13.5807C2.16048 13.8207 2.38048 14.0007 2.63048 14.0007H8.83048C9.21048 14.0007 9.46048 13.5807 9.26048 13.2507L5.00048 5.87074C4.82048 5.57074 4.39048 5.52074 4.18048 5.79074ZM2.70048 15.6707C3.68048 18.1407 5.62048 20.1307 8.05048 21.1707C8.28048 21.2707 8.55048 21.1707 8.68048 20.9507L11.6905 15.7407C11.8805 15.4107 11.6405 14.9907 11.2605 14.9907H3.17048C2.82048 15.0007 2.57048 15.3507 2.70048 15.6707ZM10.5305 21.8907C13.1505 22.2607 15.8305 21.6107 17.9705 20.0307C18.1705 19.8807 18.2305 19.5907 18.1005 19.3707L15.0905 14.1507C14.9005 13.8207 14.4205 13.8207 14.2205 14.1507L10.1805 21.1407C10.0105 21.4407 10.1905 21.8407 10.5305 21.8907Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_231907">
          <Rect height={height} width={width} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
