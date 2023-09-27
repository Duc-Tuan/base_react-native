import React from 'react';
import Svg, { Path } from 'react-native-svg';
type Props = {
  fill?: string;
  width?: number;
  height?: number;
};
const IconCart = (props: Props) => {
  const { fill = 'black', width = 24, height = 24 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24' fill={fill}>
      <Path
        d="M8.75 13C8.75 12.8011 8.67098 12.6103 8.53033 12.4697C8.38968 12.329 8.19891 12.25 8 12.25C7.80109 12.25 7.61032 12.329 7.46967 12.4697C7.32902 12.6103 7.25 12.8011 7.25 13V17C7.25 17.1989 7.32902 17.3897 7.46967 17.5303C7.61032 17.671 7.80109 17.75 8 17.75C8.19891 17.75 8.38968 17.671 8.53033 17.5303C8.67098 17.3897 8.75 17.1989 8.75 17V13ZM16 12.25C16.1989 12.25 16.3897 12.329 16.5303 12.4697C16.671 12.6103 16.75 12.8011 16.75 13V17C16.75 17.1989 16.671 17.3897 16.5303 17.5303C16.3897 17.671 16.1989 17.75 16 17.75C15.8011 17.75 15.6103 17.671 15.4697 17.5303C15.329 17.3897 15.25 17.1989 15.25 17V13C15.25 12.8011 15.329 12.6103 15.4697 12.4697C15.6103 12.329 15.8011 12.25 16 12.25ZM12.75 13C12.75 12.8011 12.671 12.6103 12.5303 12.4697C12.3897 12.329 12.1989 12.25 12 12.25C11.8011 12.25 11.6103 12.329 11.4697 12.4697C11.329 12.6103 11.25 12.8011 11.25 13V17C11.25 17.1989 11.329 17.3897 11.4697 17.5303C11.6103 17.671 11.8011 17.75 12 17.75C12.1989 17.75 12.3897 17.671 12.5303 17.5303C12.671 17.3897 12.75 17.1989 12.75 17V13Z"
        fill={fill}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.274 3.473C16.798 3.287 16.265 3.256 15.582 3.251C15.4402 2.95147 15.2162 2.69838 14.9361 2.52117C14.656 2.34396 14.3314 2.24993 14 2.25H10C9.66869 2.24984 9.34414 2.34373 9.06409 2.52075C8.78404 2.69777 8.55999 2.95066 8.418 3.25C7.734 3.256 7.202 3.287 6.726 3.473C6.15777 3.69527 5.66359 4.07301 5.3 4.563C4.933 5.056 4.76 5.69 4.524 6.561L3.896 8.864C3.50223 9.0619 3.15728 9.34469 2.886 9.692C2.264 10.489 2.154 11.438 2.265 12.526C2.372 13.582 2.705 14.912 3.121 16.576L3.147 16.683C3.411 17.735 3.624 18.59 3.878 19.257C4.143 19.953 4.48 20.523 5.034 20.956C5.589 21.389 6.224 21.576 6.963 21.666C7.671 21.75 8.553 21.75 9.638 21.75H14.362C15.447 21.75 16.328 21.75 17.037 21.665C17.777 21.577 18.411 21.389 18.965 20.955C19.52 20.523 19.856 19.953 20.121 19.257C20.376 18.59 20.589 17.735 20.852 16.682L20.879 16.577C21.295 14.912 21.627 13.582 21.735 12.527C21.845 11.437 21.735 10.489 21.113 9.692C20.842 9.34481 20.4974 9.06202 20.104 8.864L19.476 6.561C19.239 5.69 19.066 5.056 18.7 4.562C18.3363 4.07238 17.8421 3.695 17.274 3.473ZM7.272 4.87C7.492 4.784 7.758 4.759 8.419 4.752C8.701 5.342 9.303 5.75 9.999 5.75H13.999C14.697 5.75 15.299 5.342 15.581 4.752C16.242 4.759 16.508 4.784 16.728 4.87C17.034 4.99 17.3 5.193 17.496 5.457C17.672 5.694 17.775 6.025 18.066 7.092L18.42 8.389C17.382 8.25 16.042 8.25 14.377 8.25H9.622C7.958 8.25 6.618 8.25 5.58 8.389L5.934 7.092C6.224 6.025 6.328 5.694 6.504 5.457C6.69981 5.19311 6.96597 4.98968 7.272 4.87ZM10 3.75C9.9337 3.75 9.87011 3.77634 9.82322 3.82322C9.77634 3.87011 9.75 3.9337 9.75 4C9.75 4.0663 9.77634 4.12989 9.82322 4.17678C9.87011 4.22366 9.9337 4.25 10 4.25H14C14.0663 4.25 14.1299 4.22366 14.1768 4.17678C14.2237 4.12989 14.25 4.0663 14.25 4C14.25 3.9337 14.2237 3.87011 14.1768 3.82322C14.1299 3.77634 14.0663 3.75 14 3.75H10ZM4.069 10.615C4.348 10.258 4.789 10.018 5.699 9.886C6.63 9.752 7.892 9.75 9.685 9.75H14.315C16.108 9.75 17.369 9.752 18.3 9.886C19.211 10.018 19.652 10.258 19.931 10.616C20.21 10.973 20.336 11.458 20.242 12.374C20.147 13.31 19.843 14.534 19.408 16.274C19.131 17.382 18.938 18.15 18.72 18.724C18.508 19.278 18.301 19.571 18.042 19.774C17.783 19.976 17.448 20.105 16.859 20.176C16.249 20.249 15.459 20.25 14.315 20.25H9.685C8.541 20.25 7.75 20.249 7.141 20.176C6.551 20.106 6.217 19.976 5.958 19.774C5.698 19.571 5.491 19.278 5.28 18.724C5.062 18.15 4.869 17.382 4.591 16.274C4.157 14.534 3.852 13.31 3.757 12.374C3.664 11.458 3.79 10.972 4.069 10.615Z"
        fill={fill}
      />
    </Svg>
  );
};

export default React.memo(IconCart);
