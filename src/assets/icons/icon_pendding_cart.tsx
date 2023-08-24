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
      <G clip-path="url(#clip0_23996_145957)">
        <Path
          d="M15.3999 6.5H13.1499V3.5H2.6499C1.8249 3.5 1.1499 4.175 1.1499 5V13.25H2.6499C2.6499 14.495 3.6549 15.5 4.8999 15.5C6.1449 15.5 7.1499 14.495 7.1499 13.25H11.6499C11.6499 14.495 12.6549 15.5 13.8999 15.5C15.1449 15.5 16.1499 14.495 16.1499 13.25H17.6499V9.5L15.3999 6.5ZM4.8999 14.375C4.2774 14.375 3.7749 13.8725 3.7749 13.25C3.7749 12.6275 4.2774 12.125 4.8999 12.125C5.5224 12.125 6.0249 12.6275 6.0249 13.25C6.0249 13.8725 5.5224 14.375 4.8999 14.375ZM15.0249 7.625L16.4949 9.5H13.1499V7.625H15.0249ZM13.8999 14.375C13.2774 14.375 12.7749 13.8725 12.7749 13.25C12.7749 12.6275 13.2774 12.125 13.8999 12.125C14.5224 12.125 15.0249 12.6275 15.0249 13.25C15.0249 13.8725 14.5224 14.375 13.8999 14.375Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_23996_145957">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
