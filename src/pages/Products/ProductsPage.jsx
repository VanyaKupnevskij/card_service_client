import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { DeleteIcon, NewIcon } from '../../ui/Icon';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { request } = useHttp();

  const getData = useCallback(async () => {
    let responseProducts = await request({
      url: 'product/getall'
    })
    let responseCategories = await request({
      url: 'categories/getsorted'
    })

    setProducts(responseProducts);
    setCategories(responseCategories);
  }, [request])

  const updateProduct = async (product) => {
    await request({
      url: 'product/update',
      data: product,
      method: 'post'
    })
  }
  
  const deleteProduct = async (id) => {
    await request({
      url: 'product/delete',
      method: 'delete',
      params: {
        id: id
      }
    })
  }
  
  const createProduct = async (newProduct) => {
    await request({
      url: 'product/creation',
      data: newProduct,
      method: 'post'
    })
  }

  useEffect(() => {
    getData();
  }, [getData])

  function handleInputChange(ind, product, nameValue, newValue) {
    let tempProducts = [...products];
    tempProducts[ind][nameValue] = newValue;
    setProducts(tempProducts);

    updateProduct(product);
  }
  
  function handleDelete(product) {
    let tempProducts = products.filter(it => it.id !== product.id);
    setProducts(tempProducts);

    deleteProduct(product.id);
  }

  async function handleCreateProduct() {
    let newProduct = {
      id: 0, 
      name: "Name Product",
      description: "Some product",
      price: 1,
      categoryID: 9,
    };

    await createProduct(newProduct);
    await getData();
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="products" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Продукти</h1>
          <div className={pageGlobalStyles.content_inner}>
            <button className={styles.button_new_product}
              onClick={handleCreateProduct}>
              <NewIcon />
              <span>Створити нового продукта</span>
            </button>
            <div className={styles.grid}>
              <span className={styles.cell + " " + styles.head_title}>ID</span>
              <span className={styles.cell + " " + styles.head_title}>Назва</span>
              <span className={styles.cell + " " + styles.head_title}>Опис</span>
              <span className={styles.cell + " " + styles.head_title}>Ціна</span>
              <span className={styles.cell + " " + styles.head_title}>Категорія</span>
              <span className={styles.cell + " " + styles.head_title}><DeleteIcon/></span>

              {
                products.map((product, ind) => {
                  return (
                    <>
                      <input key={product.id + 1} 
                        className={styles.cell + " " + styles.input}
                        type='text'
                        name='id'
                        value={product.id}/>
                      <input key={product.id + 2} 
                        className={styles.cell + " " + styles.input}
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={(e) => handleInputChange(ind, product, 'name', e.currentTarget.value)}/>
                      <textarea key={product.id + 3} 
                        className={styles.cell + " " + styles.input}
                        type='text'
                        name='description'
                        value={product.description}
                        onChange={(e) => handleInputChange(ind, product, 'description', e.currentTarget.value)}/>
                      <input key={product.id + 4} 
                        className={styles.cell + " " + styles.input}
                        type='number'
                        name='price'
                        value={product.price}
                        onChange={(e) => handleInputChange(ind, product, 'price', e.currentTarget.value)}/>
                      <select key={product.id + 5} 
                        name="categoryID"
                        className={styles.cell + " " + styles.input}
                        value={product.categoryID}
                        onChange={(e) => handleInputChange(ind, product, 'categoryID', e.currentTarget.value)}>
                        {
                          categories.map(category => {
                            return (
                              <option key={'category' + category.id} 
                                value={category.id}>{category.name}</option>
                            )
                          })
                        }
                      </select>
                      
                      <button key={product.id + 6} 
                        className={styles.cell + " " + styles.delete_button}
                        onClick={() => handleDelete(product)}> 
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

export default ProductsPage;
