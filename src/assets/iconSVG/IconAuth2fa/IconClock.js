import * as React from 'react';
import Svg, { Path,G,Ellipse } from 'react-native-svg';

const IconClock = ({
  fill,
  fillSecondary,
  height,
  width,
  ...props
}) => {

  return (
    <Svg
     xmlns="http://www.w3.org/2000/svg"
      height={height} 
      width={width}
      data-name="Group 3"
      viewBox="0 0 190.143 147.655"
    >
      <G transform="translate(16 17.424)">
        <Path
          fill={fill}
          d="M169.86 113.832h-2.8v-1.642h1.153v-1.15h1.647v2.792zm-6.807 0h-4.006v-1.642h4.006v1.642zm-8.013 0h-4.006v-1.642h4.006v1.642zm-8.013 0h-4.006v-1.642h4.006v1.642zm-8.012 0h-4.006v-1.642h4.006v1.642zm-8.013 0H127v-1.642h4v1.642zm-8.013 0h-4.006v-1.642h4.006v1.642zm-8.013 0h-4.006v-1.642h4.006v1.642zm-8.013 0h-4.006v-1.642h4.006v1.642zm-8.013 0h-4.004v-1.642h4.006v1.642zm-8.012 0h-4.005v-1.642h4.007v1.642zm-8.013 0H78.92v-1.642h4.006v1.642zm-8.012 0h-4.005v-1.642h4.006v1.642zm-8.013 0h-4v-1.642h4v1.642zm-8.013 0h-4.005v-1.642h4.006v1.642zm-8.012 0H46.87v-1.642h4.006v1.642zm-8.013 0h-4.005v-1.642h4.006v1.642zm-8.012 0h-4.006v-1.642h4.007v1.642zm-8.013 0h-4.005v-1.642h4.006v1.642zm-8.013 0h-4.005v-1.642h4.006v1.642zm-8.012 0H6.807v-1.642h4.006v1.642zm-8.013 0H0v-2.792h1.647v1.15H2.8v1.642zm167.06-6.62h-1.647v-3.827h1.647v3.827zm-168.213 0H0v-3.827h1.647v3.827zm161.081-.682H6.165V73.938h68.39a31.785 31.785 0 01-10.872-6.149H62v-1.56a31.784 31.784 0 01-6.816-10.07 31.505 31.505 0 012.77-29.775 31.926 31.926 0 0113.6-11.491 31.63 31.63 0 0112.069-2.713V7.606h-6.007V0h13.758v7.606h-6.1v4.574a31.672 31.672 0 0119.765 7.566l3.722-3.711-4.252-4.235 5.391-5.38 9.729 9.7-5.391 5.38-4.316-4.3-3.659 3.649a31.822 31.822 0 017.268 10.272 31.5 31.5 0 01-2.753 30.419 32 32 0 01-3.881 4.689v1.566h-1.687a31.784 31.784 0 01-10.872 6.149h68.39v32.586zM7.812 75.581v29.307h153.27V75.581zm76.635-61.769a30.029 30.029 0 1030.114 30.029 30.106 30.106 0 00-30.114-30.029zM109.9 8.743l-3.061 3.057 7.4 7.378 3.064-3.056-7.4-7.378zm-30.639-7.1v4.321h10.466V1.643zM145.919 99.8h-1.647v-8.143l-7.072 4.069-.823-1.422 7.069-4.07-7.069-4.07.823-1.422 7.069 4.07v-8.14h1.647v8.139l7.069-4.07.824 1.422-7.069 4.07 7.069 4.07-.824 1.422-7.069-4.069V99.8zm-24.293 0h-1.647v-8.143l-7.068 4.069-.824-1.422 7.069-4.07-7.069-4.07.824-1.422 7.068 4.07v-8.14h1.647v8.14l7.069-4.07.824 1.422-7.069 4.07 7.069 4.07-.824 1.422-7.069-4.069V99.8zm-24.292 0h-1.647v-8.143l-7.069 4.069-.824-1.426 7.069-4.07-7.069-4.07.824-1.422 7.069 4.07v-8.14h1.647v8.139l7.069-4.07.824 1.422-7.069 4.07 7.069 4.07-.824 1.422-7.069-4.069V99.8zm-24.293 0h-1.647v-8.143l-7.069 4.069L63.5 94.3l7.069-4.07-7.069-4.066.824-1.422 7.069 4.07v-8.14h1.647v8.139l7.069-4.07.824 1.422-7.069 4.07 7.069 4.07-.824 1.422-7.069-4.069V99.8zm-24.292 0H47.1v-8.143l-7.069 4.069-.822-1.426 7.069-4.07-7.069-4.07.824-1.422 7.069 4.07v-8.136h1.647v8.139l7.069-4.07.823 1.422-7.069 4.07 7.069 4.07-.823 1.422-7.069-4.069V99.8zm-24.293 0h-1.648v-8.143l-7.068 4.069-.824-1.426 7.068-4.07-7.068-4.07.823-1.422 7.069 4.07v-8.136h1.647v8.139l7.069-4.07.824 1.422-7.069 4.07 7.069 4.07-.824 1.422-7.069-4.069V99.8zm-22.809-.242H0v-3.827h1.647v3.827zm168.213 0h-1.647v-3.827h1.647v3.827zm0-7.654h-1.647v-3.828h1.647V91.9zM1.647 91.9H0v-3.824h1.647V91.9zm168.213-7.652h-1.647v-3.827h1.647v3.827zm-168.213 0H0v-3.827h1.647v3.827zm168.213-7.655h-1.647v-3.827h1.647v3.827zm-168.213 0H0v-3.827h1.647v3.827zm168.213-7.654h-1.647v-1.15h-1.153v-1.642h2.8v2.792zm-168.213 0H0v-2.792h2.8v1.643H1.647v1.15zm161.4-1.15h-4.011v-1.642h4.011v1.642zm-8.022 0h-4.011v-1.642h4.011v1.642zm-8.022 0h-4.011v-1.642h4.011v1.642zm-8.022 0h-4.011v-1.642h4.011v1.642zm-8.022 0h-4.011v-1.642h4.011v1.642zm-8.022 0h-4.011v-1.642h4.011v1.642zm-8.022 0h-4.011v-1.642h4.011v1.642zm-30.472 0a23.948 23.948 0 1124.016-23.948 24.009 24.009 0 01-24.012 23.948zm0-46.254a22.306 22.306 0 1022.369 22.306 22.362 22.362 0 00-22.365-22.306zM58.056 67.789h-3.947v-1.642h3.947v1.642zm-7.894 0h-3.947v-1.642h3.947v1.642zm-7.894 0h-3.947v-1.642h3.947v1.642zm-7.894 0h-3.946v-1.642h3.947v1.642zm-7.893 0h-3.947v-1.642h3.947v1.642zm-7.893 0h-3.947v-1.642h3.947v1.642zm-7.894 0H6.747v-1.642h3.947v1.642zm73.753-6.842a17.1 17.1 0 01-13.218-28.011l.525-.632 10.312 8.507a3.822 3.822 0 011.557-.733V26.735h.824a17.106 17.106 0 110 34.212zM71.99 34.63a15.536 15.536 0 1013.281-6.23v11.68a3.854 3.854 0 013.04 3.762 3.863 3.863 0 11-7.294-1.765z"
          data-name="Fill 1"
        ></Path>
      </G>
      <G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          transform="translate(36.796 66.61)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy"
          transform="translate(154 42.435)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 6"
          transform="translate(202.396 115.92)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 6"
          transform="translate(202 38.985)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 6"
          transform="translate(175.143 11.385)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 6"
          transform="translate(99.596 144.895)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 15"
          transform="translate(141.491 141.79)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 16"
          transform="translate(57.015 144.205)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 2"
          transform="translate(0 69)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 17"
          transform="translate(108.525)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 8"
          transform="translate(191.396 140.04)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 4"
          transform="translate(43.966 29.045)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <G
          fill="none"
          stroke={fill}
          strokeMiterlimit="10"
          strokeWidth="1"
          data-name="Rectangle Copy 9"
          transform="translate(19.411 43.9)"
        >
          <Path stroke="none" d="M0 0H2.747V2.76H0z"></Path>
          <Path d="M0.5 0.5H2.247V2.26H0.5z"></Path>
        </G>
        <Path
          fill={fillSecondary}
          d="M0 0H2.747V2.76H0z"
          data-name="Rectangle Copy 10"
          transform="translate(151.106 16.56)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M0 0H2.747V2.76H0z"
          data-name="Rectangle Copy 11"
          transform="translate(65.943 9.66)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M0 0H2.747V2.76H0z"
          data-name="Rectangle Copy 12"
          transform="translate(15.17 11.445)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M0 0H2.747V2.76H0z"
          data-name="Rectangle Copy 13"
          transform="translate(168 66.585)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M0 0H2.747V2.76H0z"
          data-name="Rectangle Copy 14"
          transform="translate(200.253 81.775)"
        ></Path>
        <Path
          fill={fillSecondary}
          d="M0 0H2.747V2.76H0z"
          data-name="Rectangle Copy 18"
          transform="translate(0 129)"
        ></Path>
      </G>
    </Svg>
  );
};

export default IconClock;
