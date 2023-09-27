import Svg, { Rect, ClipPath, Defs, G, Path } from 'react-native-svg';
import Colors from 'themes/Color';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconPackOrderEmty(props: Props) {
  const { fill = Colors.primary, width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 512 512" fill="none" {...props}>
      <G>
        <G>
          <Path
            d="M475.323,233.777c-4.788,0-8.668,3.881-8.668,8.668v132.163L264.674,488.494v-227.43l201.981-113.895v60.606
			c0,4.787,3.881,8.668,8.668,8.668c4.788,0,8.668-3.881,8.668-8.668v-75.444c0-0.097-0.018-0.19-0.032-0.282
			c-0.099-2.967-1.698-5.751-4.382-7.264L260.259,1.116c-1.352-0.763-2.887-1.141-4.434-1.115L155.072,2.063
			c-3.906,0.08-7.275,2.763-8.229,6.55c-0.952,3.788,0.747,7.747,4.149,9.665l35.162,19.827l-35.288,19.896l-46.85-26.417
			c-3.932-2.217-8.906-1.046-11.436,2.692l-63.076,93.2c-0.948,1.401-1.446,3.034-1.477,4.693c-0.005,0.054-0.018,0.105-0.018,0.159
			v247.343c0,3.128,1.686,6.014,4.41,7.55l219.328,123.66c1.322,0.745,2.789,1.118,4.258,1.118c1.469,0,2.935-0.372,4.258-1.118
			l219.317-123.66c2.724-1.537,4.41-4.422,4.41-7.55V242.445C483.991,237.658,480.111,233.777,475.323,233.777z M283.815,230.371
			l42.44-62.708c1.358-2.007,1.813-4.49,1.26-6.846c-0.555-2.358-2.071-4.374-4.18-5.564l-58.661-33.077V82.381l105.638,59.567
			c1.3,0.733,2.767,1.118,4.258,1.118c0.059,0,0.119,0,0.177-0.001l66.305-1.357L283.815,230.371z M253.809,17.382l189.646,106.936
			l-66.693,1.365L187.116,18.747L253.809,17.382z M203.803,48.057l43.535,24.548V112.4l-78.822-44.446L203.803,48.057z
			 M253.301,244.526l-131.755-74.293c-4.169-2.351-9.457-0.877-11.808,3.294c-2.351,4.17-0.877,9.456,3.294,11.808l134.307,75.732
			v227.427L45.346,374.607V147.171l37.965,21.406c4.167,2.35,9.457,0.877,11.808-3.294c2.351-4.17,0.877-9.456-3.294-11.808
			l-42.692-24.073l53.327-78.796l204.167,115.125L253.301,244.526z"
            fill={fill}
          />
        </G>
      </G>
      <G>
        <G>
          <Path
            d="M393.769,256.677l-23.626-16.418c-2.006-1.394-4.507-1.876-6.888-1.329c-2.381,0.548-4.419,2.073-5.616,4.203
			l-24.382,43.412c-2.344,4.174-0.861,9.458,3.312,11.802c1.343,0.755,2.799,1.112,4.237,1.112c3.031,0,5.975-1.594,7.565-4.425
			l8.157-14.523V388.53c0,4.786,3.881,8.667,8.668,8.667c4.788,0,8.668-3.881,8.668-8.668V263.955l10.012,6.958
			c3.934,2.733,9.333,1.758,12.064-2.172C398.671,264.811,397.699,259.409,393.769,256.677z"
            fill={fill}
          />
        </G>
      </G>
    </Svg>
  );
}
