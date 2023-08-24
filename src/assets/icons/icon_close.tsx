import Svg, { Rect, ClipPath, Defs, G, Path } from "react-native-svg";
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
export default function IconClose(props: Props) {
  const { fill = "black", width = 24, height = 24 } = props;
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" {...props}>
      <G clip-path="url(#clip0_16158_238748)">
        <Path
          d="M18.2987 5.70875C17.9087 5.31875 17.2787 5.31875 16.8887 5.70875L11.9988 10.5888L7.10875 5.69875C6.71875 5.30875 6.08875 5.30875 5.69875 5.69875C5.30875 6.08875 5.30875 6.71875 5.69875 7.10875L10.5888 11.9988L5.69875 16.8887C5.30875 17.2787 5.30875 17.9087 5.69875 18.2987C6.08875 18.6887 6.71875 18.6887 7.10875 18.2987L11.9988 13.4087L16.8887 18.2987C17.2787 18.6887 17.9087 18.6887 18.2987 18.2987C18.6887 17.9087 18.6887 17.2787 18.2987 16.8887L13.4087 11.9988L18.2987 7.10875C18.6787 6.72875 18.6787 6.08875 18.2987 5.70875Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_16158_238748">
          <Rect width={width} height={height} fill={fill} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
