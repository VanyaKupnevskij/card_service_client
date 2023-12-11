import styles from './style.module.scss';

import { Link } from 'react-router-dom';

function IconLink({
  style,
  className = '',
  linkPath = '',
  icon,
  children,
  onClick,
  isActive = false,
}) {
  const _className = `${styles.root} ${className}${isActive ? styles.root_active : ''}`;

  return (
    <Link to={linkPath} className={_className} onClick={onClick} style={style}>
      <div className={styles.root_icon}>{icon}</div>
      <div className={styles.root_content}>{children}</div>
    </Link>
  );
}

export default IconLink;
