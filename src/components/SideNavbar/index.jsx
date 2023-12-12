import styles from './style.module.scss';

import IconLink from '../../ui/IconLink';
import {
  StatisticIcon,
  ClientsIcon
} from '../../ui/Icon';

function SideNavbar({ currentTab }) {
  return (
    <div className={styles.side_navbar}>
      <IconLink linkPath="/records" icon={<ClientsIcon />} isActive={currentTab === 'records'}>
        Записи
      </IconLink>
      <IconLink linkPath="/statistic" icon={<StatisticIcon />} isActive={currentTab === 'statistic'}>
        Статистика
      </IconLink>
    </div>
  );
}

export default SideNavbar;
