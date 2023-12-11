import styles from './style.module.scss';

import IconLink from '../../ui/IconLink';
import {
  StatisticIcon,
  ClientsIcon,
  OrdersIcon,
  OrdersDetailsIcon,
  CategoriesIcon,
  ProductsIcon
} from '../../ui/Icon';

function SideNavbar({ currentTab }) {
  return (
    <div className={styles.side_navbar}>
      <IconLink linkPath="/clients" icon={<ClientsIcon />} isActive={currentTab === 'clients'}>
        Кліенти
      </IconLink>
      <IconLink linkPath="/products" icon={<ProductsIcon />} isActive={currentTab === 'products'}>
        Продукти
      </IconLink>
      <IconLink linkPath="/orders" icon={<OrdersIcon />} isActive={currentTab === 'orders'}>
        Замовлення
      </IconLink>
      <IconLink linkPath="/ordersdetails" icon={<OrdersDetailsIcon />} isActive={currentTab === 'ordersDetails'}>
        Деталі замовлення
      </IconLink>
      <IconLink linkPath="/categories" icon={<CategoriesIcon />} isActive={currentTab === 'categories'}>
        Категорії
      </IconLink>
      <IconLink linkPath="/statistic" icon={<StatisticIcon />} isActive={currentTab === 'statistic'}>
        Статистика
      </IconLink>
    </div>
  );
}

export default SideNavbar;
