interface ButtonProps {
  name: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ name, onClick, className, disabled }: ButtonProps) => {
  return (
    <button type='button' disabled={disabled} onClick={onClick} className={className}>
      {name}
    </button>
  );
};

export default Button;
