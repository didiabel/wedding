import React from 'react';

export const FlagARG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <rect width="900" height="600" fill="#75aadb" />
    <rect y="200" width="900" height="200" fill="#fff" />
    <g transform="translate(450,300)">
      <circle r="36" fill="#f6b40e" />
      <g id="s">
        <g id="c">
          <path
            id="t"
            d="M0-65c1.6 15-5 25.5-12 32 4.5-5 12-8.5 12-32z"
            fill="#f6b40e"
          />
          <use xlinkHref="#t" transform="rotate(22.5)" />
          <use xlinkHref="#t" transform="rotate(45)" />
          <use xlinkHref="#t" transform="rotate(67.5)" />
        </g>
        <use xlinkHref="#c" transform="rotate(90)" />
      </g>
      <use xlinkHref="#s" transform="rotate(180)" />
    </g>
  </svg>
);

export const FlagUSA = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1235 650" {...props}>
    <rect width="1235" height="650" fill="#b22234" />
    <path
      d="M0,50H1235V100H0M0,150H1235V200H0M0,250H1235V300H0M0,350H1235V400H0M0,450H1235V500H0M0,550H1235V600H0"
      fill="#fff"
    />
    <rect width="494" height="350" fill="#3c3b6e" />
    <g fill="#fff">
      <g id="s">
        <g id="c">
          <path
            id="t"
            d="M24.7,17l3.8,11.3H40L30.6,35.2l3.6,11.3L24.7,39.6l-9.5,6.9l3.6-11.3L9.4,28.3h11.5z"
          />
          <use xlinkHref="#t" x="82.3" />
          <use xlinkHref="#t" x="164.6" />
          <use xlinkHref="#t" x="246.9" />
          <use xlinkHref="#t" x="329.2" />
          <use xlinkHref="#t" x="411.5" />
        </g>
        <use xlinkHref="#c" y="70" />
        <use xlinkHref="#c" y="140" />
        <use xlinkHref="#c" y="210" />
        <use xlinkHref="#c" y="280" />
      </g>
      <use xlinkHref="#s" y="35" x="41.15" />
    </g>
  </svg>
);
