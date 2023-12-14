import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { CalculateIcon } from '../../ui/Icon';

const inputPatern = [
  {
    label: "За який рік спрогнозувати",
    name: "year",
    min: new Date(Date.now()).getFullYear() + 1,
    max: 2199,
    step: 1
  },
  {
    label: "Яка прогнозована інфляція (%)",
    name: "inflation",
    min: 0,
    max: 100,
    step: 1
  },
  {
    label: "Ризик нестабільності політичної ситуації",
    name: "risk_politic",
    min: 0,
    max: 10,
    step: 1
  },
  {
    label: "Ризик зміни курса валюти та інфляції",
    name: "risk_inflation",
    min: 0,
    max: 10,
    step: 1
  },
  {
    label: "Ризик конкуренції",
    name: "risk_concuration",
    min: 0,
    max: 10,
    step: 1
  },
  {
    label: "Ризик порушення договорів про поставку",
    name: "risk_contract",
    min: 0,
    max: 10,
    step: 1
  }
];

const outputPatern = [
  {
    label: "Виторг",
    name: "proceeds"
  },
  {
    label: "Собівартість",
    name: "cost_price"
  },
  {
    label: "Прибуток",
    name: "income"
  },
  {
    label: "Оперативний прибуток",
    name: "operating_income"
  },
  {
    label: "Чистий прибуток",
    name: "net_income"
  }
];

function ModelPage() {
  const [result, setResult] = useState({
    lastYear: {
      proceeds: 0,
      cost_price: 0,
      income: 0,
      operating_income: 0,
      net_income: 0
    },
    selectYear: {
      proceeds: 0,
      cost_price: 0,
      income: 0,
      operating_income: 0,
      net_income: 0
    }
  });
  const [inputData, setInputData] = useState({
      year: new Date(Date.now()).getFullYear() + 1,
      inflation: 0,
      risk_politic: 0,
      risk_inflation: 0,
      risk_concuration: 0,
      risk_contract: 0
  });
  const { request } = useHttp();
  
  const getCalculate = async () => {
    let responseData = await request({
      url: 'records/calculate',
      data: inputData,
      method: 'post'
    });

    setResult(responseData);
  }

  function handleInputDataChange(name, newValue) {
    setInputData(prev => ({ ...prev, [name]: newValue }));
  }

  async function handleCalculate() {
    await getCalculate();
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="model" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Модель</h1>
          <div className={pageGlobalStyles.content_inner}>
            <div className={styles.root}>
              <div className={styles.form_input}>
                {
                  inputPatern.map((inputItem, ind) => {
                    return (
                      <div key={ind} className={styles.field}>
                        <label htmlFor={inputItem.name} className={styles.label}>
                          {inputItem.label}
                        </label>
                        <input 
                          className={styles.input}
                          type='number'
                          name={inputItem.name}
                          min={inputItem.min}
                          max={inputItem.max}
                          step={inputItem.step}
                          value={inputData[inputItem.name]}
                          onChange={(e) => handleInputDataChange(inputItem.name, e.currentTarget.value)}/>
                      </div>
                    )
                  })
                }
                
                <button className={styles.button_calculate}
                  onClick={handleCalculate}>
                  <CalculateIcon />
                  <span>Обрахувати</span>
                </button>
              </div>
              
              <div className={styles.form_output}>
                {
                  outputPatern.map((outputItem, ind) => {
                    return (
                      <div key={ind} className={styles.field}>
                        <div className={styles.label}>
                          {outputItem.label}
                        </div>

                        <span>Мнулий рік</span>
                        <div className={styles.output}>
                          {result.lastYear[outputItem.name]}
                        </div>

                        <span>{inputData.year} рік</span>
                        <div className={styles.output}>
                          {result.selectYear[outputItem.name]}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelPage;
