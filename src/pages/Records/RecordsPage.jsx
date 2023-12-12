import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { DeleteIcon, NewIcon } from '../../ui/Icon';

function RecordsPage() {
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
        <SideNavbar currentTab="records" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Записи</h1>
          <div className={pageGlobalStyles.content_inner}>
            <button className={styles.button_new}
              onClick={handleCreate}>
              <NewIcon />
              <span>Створити новий запис</span>
            </button>
            <div className={styles.grid}>
              <span className={styles.cell + " " + styles.head_title}>ID</span>
              <span className={styles.cell + " " + styles.head_title}>Дата</span>
              <span className={styles.cell + " " + styles.head_title}>Обсяги виробництва</span>
              <span className={styles.cell + " " + styles.head_title}>Ціна одиниці виробу</span>
              <span className={styles.cell + " " + styles.head_title}>Собівартість одиниці виробу</span>
              <span className={styles.cell + " " + styles.head_title}>Cировина і матеріали</span>
              <span className={styles.cell + " " + styles.head_title}>Витрати на енергоносії</span>
              <span className={styles.cell + " " + styles.head_title}>Вартість обладнання</span>
              <span className={styles.cell + " " + styles.head_title}>Амотризація</span>
              <span className={styles.cell + " " + styles.head_title}>Маркетинг і рекалама</span>
              <span className={styles.cell + " " + styles.head_title}>Витрати на працю</span>
              <span className={styles.cell + " " + styles.head_title}>Транспортні витрати</span>
              <span className={styles.cell + " " + styles.head_title}>Страхування</span>
              <span className={styles.cell + " " + styles.head_title}>Оподаткування</span>
              <span className={styles.cell + " " + styles.head_title}><DeleteIcon/></span>

              {
                (records === undefined ||
                records === null ||
                records.length === 0) ? 
                  <div className={styles.message_nothing}>
                    Нічого не найдено!
                  </div> 
                  :
                  records.map((record, ind) => {
                    

                    return (
                      <>
                        <input key={record.id + 1} 
                          className={styles.cell + " " + styles.input}
                          type='text'
                          name='id'
                          value={record.id}
                          readOnly/>
                        <input key={record.id + 2} 
                          className={styles.cell + " " + styles.input}
                          type='date'
                          name='date'
                          value={record.date}
                          onChange={(e) => handleInputChange(ind, record, 'date', e.currentTarget.value)}/>
                        <input key={record.id + 3} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='production_valumes'
                          value={+record.production_valumes}
                          onChange={(e) => handleInputChange(ind, record, 'production_valumes', e.currentTarget.value)}/>
                        <input key={record.id + 4} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='unit_price'
                          value={+record.unit_price}
                          onChange={(e) => handleInputChange(ind, record, 'unit_price', e.currentTarget.value)}/>
                        <input key={record.id + 5} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='unit_cost'
                          value={+record.unit_cost}
                          onChange={(e) => handleInputChange(ind, record, 'unit_cost', e.currentTarget.value)}/>
                        <input key={record.id + 6} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='meterials_cost'
                          value={+record.meterials_cost}
                          onChange={(e) => handleInputChange(ind, record, 'meterials_cost', e.currentTarget.value)}/>
                        <input key={record.id + 7} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='energy_cost'
                          value={+record.energy_cost}
                          onChange={(e) => handleInputChange(ind, record, 'energy_cost', e.currentTarget.value)}/>
                        <input key={record.id + 8} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='equipment_cost'
                          value={+record.equipment_cost}
                          onChange={(e) => handleInputChange(ind, record, 'equipment_cost', e.currentTarget.value)}/>
                        <input key={record.id + 9} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='amortization'
                          value={+record.amortization}
                          onChange={(e) => handleInputChange(ind, record, 'amortization', e.currentTarget.value)}/>
                        <input key={record.id + 10} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='marketing'
                          value={+record.marketing}
                          onChange={(e) => handleInputChange(ind, record, 'marketing', e.currentTarget.value)}/>
                        <input key={record.id + 11} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='labor_cost'
                          value={+record.labor_cost}
                          onChange={(e) => handleInputChange(ind, record, 'labor_cost', e.currentTarget.value)}/>
                        <input key={record.id + 12} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='transportation_cost'
                          value={+record.transportation_cost}
                          onChange={(e) => handleInputChange(ind, record, 'transportation_cost', e.currentTarget.value)}/>
                        <input key={record.id + 13} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='insurance'
                          value={+record.insurance}
                          onChange={(e) => handleInputChange(ind, record, 'insurance', e.currentTarget.value)}/>
                        <input key={record.id + 14} 
                          className={styles.cell + " " + styles.input}
                          type='number'
                          name='taxation'
                          value={+record.taxation}
                          onChange={(e) => handleInputChange(ind, record, 'taxation', e.currentTarget.value)}/>

                        <button key={record.id + 15} 
                          className={styles.cell + " " + styles.delete_button}
                          onClick={() => handleDelete(record)}> 
                          <DeleteIcon className={styles.delete_icon}/>
                        </button>
                      </>
                    )
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordsPage;
