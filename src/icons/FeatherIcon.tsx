type Props = {
  color?: string;
};

const FeatherIcon: React.FC<Props> = ({ color = 'currentColor', ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.18 9.18003C16.0244 8.33564 16.4988 7.19041 16.4988 5.99628C16.4988 4.80214 16.0244 3.65691 15.18 2.81253C14.3356 1.96814 13.1904 1.49377 11.9962 1.49377C10.8021 1.49377 9.65688 1.96814 8.8125 2.81253L3.75 7.87503V14.25H10.125L15.18 9.18003Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6L1.5 16.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.125 11.25H6.75"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FeatherIcon;
