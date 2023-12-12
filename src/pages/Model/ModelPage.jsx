import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { DeleteIcon, NewIcon } from '../../ui/Icon';

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

  const updateRecord = async (record) => {
    record.date = record.date.split('T')[0];

    await request({
      url: 'records/update/' + record.id,
      data: record,
      method: 'put'
    })
  }
  
  const deleteRecord = async (id) => {
    await request({
      url: 'records/' + id,
      method: 'delete'
    })
  }
  
  const createRecord = async (newOrder) => {
    await request({
      url: 'records/create',
      data: newOrder,
      method: 'post'
    })
  }

  useEffect(() => {
    getData();
  }, [getData])

  function handleInputChange(ind, record, nameValue, newValue) {
    let tempRecords = [...records];
    tempRecords[ind][nameValue] = newValue;
    setRecords(tempRecords);

    updateRecord(record);
  }
  
  function handleDelete(record) {
    let tempRecords = records.filter(it => it.id !== record.id);
    setRecords(tempRecords);

    deleteRecord(record.id);
  }

  async function handleCreate() {
    let newOrder = {
      "date": null,
      "production_valumes": 0,
      "unit_price": 0,
      "unit_cost": 0,
      "meterials_cost": 0,
      "energy_cost": 0,
      "equipment_cost": 0,
      "amortization": 0,
      "marketing": 0,
      "labor_cost": 0,
      "transportation_cost": 0,
      "insurance": 0,
      "taxation": 0
    };

    await createRecord(newOrder);
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
              onClick={handleCreate}>
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
