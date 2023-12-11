import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { DeleteIcon, NewIcon } from '../../ui/Icon';

function OrdersDetailsPage() {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const { request } = useHttp();

  const getData = useCallback(async () => {
    let responseOrdersDetails = await request({
      url: 'orderdetails/getall'
    })
    let responseOrders = await request({
      url: 'order/getall'
    })
    let responseProducts = await request({
      url: 'product/getall'
    })

    setOrdersDetails(responseOrdersDetails);
    setOrders(responseOrders);
    setProducts(responseProducts);
  }, [request])

  const updateOrderDetails = async (orderDetails) => {
    await request({
      url: 'orderdetails/update',
      data: orderDetails,
      method: 'post'
    })
  }
  
  const deleteOrderDetails = async (id) => {
    await request({
      url: 'orderdetails/delete',
      method: 'delete',
      params: {
        id: id
      }
    })
  }
  
  const createOrderDetails = async (newOrderDetails) => {
    await request({
      url: 'orderdetails/creation',
      data: newOrderDetails,
      method: 'post'
    })
  }

  useEffect(() => {
    getData();
  }, [getData])

  function handleInputChange(ind, orderDetails, nameValue, newValue) {
    let tempOrdersDetails = [...ordersDetails];
    tempOrdersDetails[ind][nameValue] = newValue;
    setOrdersDetails(tempOrdersDetails);

    updateOrderDetails(orderDetails);
  }
  
  function handleDelete(orderDetails) {
    let tempOrdersDetails = ordersDetails.filter(it => it.id !== orderDetails.id);
    setOrdersDetails(tempOrdersDetails);

    deleteOrderDetails(orderDetails.id);
  }

  async function handleCreateOrderDetails() {
    let newOrderDetails = {
      id: 0, 
      orderID: 4,
      productID: 3,
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    };

    await createOrderDetails(newOrderDetails);
    await getData();
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="ordersDetails" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Замовлення</h1>
          <div className={pageGlobalStyles.content_inner}>
            <button className={styles.button_new_orders_details}
              onClick={handleCreateOrderDetails}>
              <NewIcon />
              <span>Створити нові деталі</span>
            </button>
            <div className={styles.grid}>
              <span className={styles.cell + " " + styles.head_title}>ID</span>
              <span className={styles.cell + " " + styles.head_title}>Замовлення</span>
              <span className={styles.cell + " " + styles.head_title}>Продукт</span>
              <span className={styles.cell + " " + styles.head_title}>Кількість</span>
              <span className={styles.cell + " " + styles.head_title}>Ціна за 1</span>
              <span className={styles.cell + " " + styles.head_title}>Ціна</span>
              <span className={styles.cell + " " + styles.head_title}><DeleteIcon/></span>

              {
                ordersDetails.map((orderDetails, ind) => {
                  return (
                    <>
                      <input key={orderDetails.id + 1} 
                        className={styles.cell + " " + styles.input}
                        type='text'
                        name='id'
                        value={orderDetails.id}/>
                      <select key={orderDetails.id + 2} 
                        name="orderID"
                        className={styles.cell + " " + styles.input}
                        value={orderDetails.orderID}
                        onChange={(e) => handleInputChange(ind, orderDetails, 'orderID', e.currentTarget.value)}>
                        {
                          orders.map(order => {
                            return (
                              <option key={'order' + order.id} 
                                value={order.id}>{order.id}#</option>
                            )
                          })
                        }
                      </select>
                      <select key={orderDetails.id + 3} 
                        name="productID"
                        className={styles.cell + " " + styles.input}
                        value={orderDetails.productID}
                        onChange={(e) => handleInputChange(ind, orderDetails, 'productID', e.currentTarget.value)}>
                        {
                          products.map(product => {
                            return (
                              <option key={'product' + product.id} 
                                value={product.id}>{product.id}# {product.name}</option>
                            )
                          })
                        }
                      </select>
                      <input key={orderDetails.id + 4} 
                        className={styles.cell + " " + styles.input}
                        type='number'
                        name='quantity'
                        value={orderDetails.quantity}
                        onChange={(e) => handleInputChange(ind, orderDetails, 'quantity', e.currentTarget.value)}/>
                      <input key={orderDetails.id + 5} 
                        className={styles.cell + " " + styles.input}
                        type='number'
                        name='unitPrice'
                        value={orderDetails.unitPrice}
                        onChange={(e) => handleInputChange(ind, orderDetails, 'unitPrice', e.currentTarget.value)}/>
                      <input key={orderDetails.id + 6} 
                        className={styles.cell + " " + styles.input}
                        type='number'
                        name='totalPrice'
                        value={orderDetails.totalPrice}
                        onChange={(e) => handleInputChange(ind, orderDetails, 'totalPrice', e.currentTarget.value)}/>
                      
                      <button key={orderDetails.id + 7} 
                        className={styles.cell + " " + styles.delete_button}
                        onClick={() => handleDelete(orderDetails)}> 
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

export default OrdersDetailsPage;
