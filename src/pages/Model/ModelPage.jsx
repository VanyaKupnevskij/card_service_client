import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { NewIcon } from '../../ui/Icon';

function ModelPage() {
  const [records, setRecords] = useState([]);
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
            <button className={styles.button_new_client}
              onClick={handleCalculate}>
              <NewIcon />
              <span>Обрахувати</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelPage;
