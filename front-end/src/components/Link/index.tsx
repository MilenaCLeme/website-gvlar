import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import style from './link.module.scss';

interface LinkProps {
  name: string;
  to: string;
  action: boolean;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({ name, to, action, onClick }: LinkProps) => {
  const handleClick = (e: any) => {
    if (action) e.preventDefault();
  };

  return (
    <NavLink
      className={classNames({ [style.nav]: true, [style.action]: action })}
      onClick={onClick || handleClick}
      to={to}
    >
      {name}
    </NavLink>
  );
};

export default Link;
