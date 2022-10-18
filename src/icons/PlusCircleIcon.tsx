type Props = {
  color?: string;
  size?: number;
};

const SaveIcon: React.FC<Props> = ({
  color = 'currentColor',
  size = 24,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M12 8v8M8 12h8' />
  </svg>
);

export default SaveIcon;
