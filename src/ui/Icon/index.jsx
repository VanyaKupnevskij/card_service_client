import styles from './style.module.scss';

import statisticImage from '../images/statistic.svg';
import recordsImage from '../images/records.svg';
import modelImage from '../images/model.svg';
import deleteImage from '../images/delete.svg';
import newImage from '../images/new.svg';
import calculateImage from '../images/calculate.svg';

function Icon({ width, height, style, className = '', src }) {
  const _className = `${styles.root} ${className}`;

  return <img className={_className} style={style} src={src} width={width} height={height} alt='img'/>;
}

function StatisticIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={statisticImage} />
  );
}

function RecordsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={recordsImage} />
  );
}

function ModelIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={modelImage} />
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

function CalculateIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={calculateImage} />
  );
}

export {
  StatisticIcon,
  RecordsIcon,
  ModelIcon,
  DeleteIcon,
  CalculateIcon,
  NewIcon
};
