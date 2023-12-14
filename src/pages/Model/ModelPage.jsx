import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { CalculateIcon } from '../../ui/Icon';

function ModelPage() {
  const [records, setRecords] = useState([]);
  const [inputData, setInputData] = useState({
      date: new Date(Date.now()),
      inflation: 0
  });
  const { request } = useHttp();

  const getData = useCallback(async () => {
    let responseData = await request({
      url: 'records/'
    })

    responseData = responseData.map(record => {
      let date = new Date(record.date);
      date.setHours(date.getHours() + 8);
      date = date.toISOString().split('T')[0];
      record.date = date;
      
      return record;
    })

    setRecords(responseData);
  }, [request])
  
  const getCalculate = async (newOrder) => {
    await request({
      url: 'records/create',
      data: newOrder,
      method: 'post'
    })
  }

  useEffect(() => {
    getData();
  }, [getData])

  function handleInputDataChange(name, newValue) {
    setInputData(prev => ({ ...prev, [name]: newValue }));
  }

  async function handleCalculate() {
    await getCalculate();
    await getData();
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="model" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Модель</h1>
          <div className={pageGlobalStyles.content_inner}>
            <div className={styles.form_input}>
              <input 
                className={styles.input}
                type='date'
                name='date'
                value={inputData.date}
                onChange={(e) => handleInputDataChange('date', e.currentTarget.value)}/>
              <input 
                className={styles.input}
                type='number'
                name='inflation'
                min={0}
                max={100}
                value={inputData.inflation}
                onChange={(e) => handleInputDataChange('inflation', e.currentTarget.value)}/>
            </div>
            <button className={styles.button_calculate}
              onClick={handleCalculate}>
              <CalculateIcon />
              <span>Обрахувати</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelPage;
