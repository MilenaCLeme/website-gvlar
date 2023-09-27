import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import style from './nav.module.scss';

interface LinkProps {
  name: string;
  to: string;
  action: boolean;
}

const Link: React.FC<LinkProps> = ({ name, to, action }: LinkProps) => {
  return (
    <NavLink className={classNames({ [style.nav]: true, [style.action]: action })} to={to}>
      {name}
    </NavLink>
  );
};

export default Link;
