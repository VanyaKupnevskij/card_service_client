import styles from './style.module.scss';

import statisticImage from '../images/statistic.svg';
import clientsImage from '../images/clients.svg';
import ordersImage from '../images/orders.svg';
import ordersDetailsImage from '../images/orderDetails.svg';
import categoriesImage from '../images/categories.svg';
import productsImage from '../images/products.svg';
import deleteImage from '../images/delete.svg';
import newImage from '../images/new.svg';

function Icon({ width, height, style, className = '', src }) {
  const _className = `${styles.root} ${className}`;

  return <img className={_className} style={style} src={src} width={width} height={height} alt='img'/>;
}

function StatisticIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={statisticImage} />
  );
}

function ClientsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={clientsImage} />
  );
}

function OrdersIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={ordersImage} />
  );
}

function OrdersDetailsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={ordersDetailsImage} />
  );
}

function CategoriesIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={categoriesImage} />
  );
}

function ProductsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={productsImage} />
  );
}

function DeleteIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={deleteImage} />
  );
}

function NewIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={newImage} />
  );
}

export {
  StatisticIcon,
  ClientsIcon,
  OrdersIcon,
  OrdersDetailsIcon,
  CategoriesIcon,
  ProductsIcon,
  DeleteIcon,
  NewIcon
};
