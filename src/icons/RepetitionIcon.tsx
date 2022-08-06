type Props = {
  color?: string;
};

const RepetitionIcon: React.FC<Props> = ({
  color = 'currentColor',
  ...props
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_304_550)">
      <path
        d="M16.2916 2.83337V7.08337H12.0416"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.708374 14.1666V9.91663H4.95837"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.261 3.64291C3.45609 4.35832 2.84553 5.26596 2.48629 6.28116L3.27591 4.74857L4.261 3.64291ZM4.261 3.64291C5.0659 2.9275 6.03891 2.42766 7.08924 2.19001C8.13957 1.95235 9.23299 1.98465 10.2675 2.28387C11.3019 2.58309 12.6971 3.34285 13.4584 4.10451L16.2917 6.98949L13.005 3.64291L10.9792 2.47918L9.56254 2.12266L8.50004 2.03283L7.42967 2.12266L6.49442 2.35524L5.40326 2.83334L4.261 3.64291ZM0.708374 9.82282L3.99504 12.9112C4.75632 13.6728 5.69814 14.2292 6.73261 14.5284C7.76709 14.8277 8.86051 14.86 9.91084 14.6223C10.9612 14.3847 11.9342 13.8848 12.7391 13.1694C13.544 12.454 14.1545 11.5463 14.5138 10.5312"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_304_550">
        <rect width="17" height="17" fill={color} />
      </clipPath>
    </defs>
  </svg>
);

export default RepetitionIcon;
