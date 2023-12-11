import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { DeleteIcon, NewIcon } from '../../ui/Icon';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [clients, setCients] = useState([]);
  const { request } = useHttp();

  const getData = useCallback(async () => {
    let responseOrders = await request({
      url: 'order/getall'
    })
    let responseClients = await request({
      url: 'clients/getall'
    })

    setOrders(responseOrders);
    setCients(responseClients);
  }, [request])

  const updateOrder = async (order) => {
    await request({
      url: 'order/update',
      data: order,
      method: 'post'
    })
  }
  
  const deleteOrder = async (id) => {
    await request({
      url: 'order/delete',
      method: 'delete',
      params: {
        id: id
      }
    })
  }
  
  const createOrder = async (newOrder) => {
    await request({
      url: 'order/creation',
      data: newOrder,
      method: 'post'
    })
  }

  useEffect(() => {
    getData();
  }, [getData])

  function handleInputChange(ind, order, nameValue, newValue) {
    let tempOrders = [...orders];
    tempOrders[ind][nameValue] = newValue;
    setOrders(tempOrders);

    updateOrder(order);
  }
  
  function handleDelete(order) {
    let tempOrders = orders.filter(it => it.id !== order.id);
    setOrders(tempOrders);

    deleteOrder(order.id);
  }

  async function handleCreateOrder() {
    let newOrder = {
      id: 0, 
      orderDate: new Date(Date.now()),
      totalAmount: 0,
      clientID: 2,
    };

    await createOrder(newOrder);
    await getData();
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="orders" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Замовлення</h1>
          <div className={pageGlobalStyles.content_inner}>
            <button className={styles.button_new_order}
              onClick={handleCreateOrder}>
              <NewIcon />
              <span>Створити нове замовлення</span>
            </button>
            <div className={styles.grid}>
              <span className={styles.cell + " " + styles.head_title}>ID</span>
              <span className={styles.cell + " " + styles.head_title}>Дата</span>
              <span className={styles.cell + " " + styles.head_title}>Всього</span>
              <span className={styles.cell + " " + styles.head_title}>Кліент</span>
              <span className={styles.cell + " " + styles.head_title}><DeleteIcon/></span>

              {
                orders.map((order, ind) => {
                  return (
                    <>
                      <input key={order.id + 1} 
                        className={styles.cell + " " + styles.input}
                        type='text'
                        name='id'
                        value={order.id}/>
                      <input key={order.id + 2} 
                        className={styles.cell + " " + styles.input}
                        type='datetime-local'
                        name='orderDate'
                        value={order.orderDate}
                        onChange={(e) => handleInputChange(ind, order, 'orderDate', e.currentTarget.value)}/>
                      <input key={order.id + 3} 
                        className={styles.cell + " " + styles.input}
                        type='number'
                        name='totalAmount'
                        value={order.totalAmount}
                        onChange={(e) => handleInputChange(ind, order, 'totalAmount', e.currentTarget.value)}/>
                      <select key={order.id + 4} 
                        name="clientID"
                        className={styles.cell + " " + styles.input}
                        value={order.clientID}
                        onChange={(e) => handleInputChange(ind, order, 'clientID', e.currentTarget.value)}>
                        {
                          clients.map(client => {
                            return (
                              <option key={'client' + client.id} 
                                value={client.id}>{client.id}# {client.firstName} {client.lastName}</option>
                            )
                          })
                        }
                      </select>
                      
                      <button key={order.id + 5} 
                        className={styles.cell + " " + styles.delete_button}
                        onClick={() => handleDelete(order)}> 
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

export default OrdersPage;
