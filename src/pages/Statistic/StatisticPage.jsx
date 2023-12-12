import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';

import SideNavbar from '../../components/SideNavbar';
import CanvasJSReact from '@canvasjs/react-charts';
import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect, useState } from 'react';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticPage() {
  const [data1, setData1] = useState([]);
  const { request } = useHttp();

  const getData = useCallback(async () => {
    let responseData = await request({
      url: 'records/'
    })

    const formatedData1 = responseData.map((record) => {
      return { x: new Date(record.date), y: parseFloat(record.production_valumes) };
    });
    
    console.log(formatedData1);
    setData1(formatedData1);
  }, [request])

  useEffect(() => {
    getData();
  }, [getData])

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    title: {
      text: 'Графік вироблень',
      fontColor: '#494f5b',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: 26,
    },
    axisX: {
      valueFormatString: 'YY.MMM.DD',
  
      labelFontFamily: 'Montserrat',
      labelFontColor: '#494f5b',
  
      tickColor: '#8d96a7',
  
      lineColor: '#8d96a7',
      lineThickness: 2,
    },
    axisY: {
      title: 'Кількість',
      titleFontColor: '#494f5b',
      titleFontFamily: 'Montserrat',
  
      labelFontFamily: 'Montserrat',
      labelFontColor: '#494f5b',
  
      tickColor: '#8d96a7',
  
      lineColor: '#8d96a7',
      lineThickness: 2,
  
      gridColor: '#8d96a7',
    },
    legend: {
      fontColor: '#494f5b',
      fontFamily: 'Montserrat',
      fontWeight: 400,
    },
    toolTip: {
      backgroundColor: '#f2f5fb',
  
      fontColor: '#494f5b',
      fontWeight: 500,
      fontFamily: 'Montserrat',
  
      cornerRadius: 7,
    },
    data: [
      {
        yValueFormatString: '#,###.#### разів',
        xValueFormatString: 'YY.MMM.DD',
        showInLegend: true,
        legendText: 'Вироблена кількість',
        type: 'spline',
        color: '#8dabe8',
        dataPoints: data1,
      }
    ],
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="statistic" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title} style={{display: "none"}}>Статистика</h1>
          <div className={pageGlobalStyles.content_inner}>
            <CanvasJSChart options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticPage;