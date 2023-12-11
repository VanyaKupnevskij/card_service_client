import globalStyles from '../../global.module.scss';
import pageGlobalStyles from '../pageGlobalStyle.module.scss';
import styles from './style.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useHttp } from "../../hooks/http.hook";

import SideNavbar from '../../components/SideNavbar';
import { DeleteIcon, NewIcon } from '../../ui/Icon';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState(0);
  const { request } = useHttp();

  const getData = useCallback(async () => {
    let responseData = null;

    if(search === '') {
      responseData = await request({
        url: 'clients/getall'
      })
    } else {
      responseData = await request({
        url: 'clients/GetByFilter',
        params: {
          typeFilter: typeSearch,
          filterValue: search
        }
      })
    }

    setClients(responseData);
  }, [request, search, typeSearch])

  const updateClient = async (client) => {
    await request({
      url: 'clients/update',
      data: client,
      method: 'post'
    })
  }
  
  const deleteClient = async (id) => {
    await request({
      url: 'clients/delete',
      method: 'delete',
      params: {
        id: id
      }
    })
  }
  
  const createClient = async (newClient) => {
    await request({
      url: 'clients/creation',
      data: newClient,
      method: 'post'
    })
  }

  useEffect(() => {
    getData();
  }, [getData])

  function handleInputChange(ind, client, nameValue, newValue) {
    let tempClients = [...clients];
    tempClients[ind][nameValue] = newValue;
    setClients(tempClients);

    updateClient(client);
  }
  
  function handleDelete(client) {
    let tempClients = clients.filter(it => it.id !== client.id);
    setClients(tempClients);

    deleteClient(client.id);
  }

  async function handleCreateClient() {
    let newClient = {
      id: 0, 
      firstName: "FirstName",
      lastName: "LastName",
      email: "email",
      phone: "0961112223",
      isAdmin: false
    };

    await createClient(newClient);
    await getData();
  }

  function handleSearchChange(newValue) { 
    setSearch(newValue);

    getData();
  }
  
  function handleTypeSearchChange(newValue) { 
    setTypeSearch(newValue);

    getData();
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="clients" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Кліенти</h1>
          <div className={pageGlobalStyles.content_inner}>
            <div className={styles.searcher}>
              <select 
                name="search"
                value={typeSearch}
                onChange={(e) => handleTypeSearchChange(e.currentTarget.value)}>
                <option value="0">Ім'я</option>
                <option value="1">Прізвище</option>
                <option value="2">Пошта</option>
                <option value="3">Номер</option>
              </select>
              <input 
                type="text" 
                value={search}
                onChange={(e) => handleSearchChange(e.currentTarget.value)}/>
            </div>

            <button className={styles.button_new_client}
              onClick={handleCreateClient}>
              <NewIcon />
              <span>Створити нового кілента</span>
            </button>
            <div className={styles.grid}>
              <span className={styles.cell + " " + styles.head_title}>ID</span>
              <span className={styles.cell + " " + styles.head_title}>Ім'я</span>
              <span className={styles.cell + " " + styles.head_title}>Прізвище</span>
              <span className={styles.cell + " " + styles.head_title}>Пошта</span>
              <span className={styles.cell + " " + styles.head_title}>Телефон</span>
              <span className={styles.cell + " " + styles.head_title}>Адмін</span>
              <span className={styles.cell + " " + styles.head_title}><DeleteIcon/></span>

              {
                (clients === undefined ||
                clients === null ||
                clients.length === 0) ? 
                  <div className={styles.message_nothing}>
                    Нічого не найдено!
                  </div> 
                  :
                  clients.map((client, ind) => {
                    return (
                      <>
                        <input key={client.id + 1} 
                          className={styles.cell + " " + styles.input}
                          type='text'
                          name='id'
                          value={client.id}/>
                        <input key={client.id + 2} 
                          className={styles.cell + " " + styles.input}
                          type='text'
                          name='firstName'
                          value={client.firstName}
                          onChange={(e) => handleInputChange(ind, client, 'firstName', e.currentTarget.value)}/>
                        <input key={client.id + 3} 
                          className={styles.cell + " " + styles.input}
                          type='text'
                          name='lastName'
                          value={client.lastName}
                          onChange={(e) => handleInputChange(ind, client, 'lastName', e.currentTarget.value)}/>
                        <input key={client.id + 4} 
                          className={styles.cell + " " + styles.input}
                          type='text'
                          name='email'
                          value={client.email}
                          onChange={(e) => handleInputChange(ind, client, 'email', e.currentTarget.value)}/>
                        <input key={client.id + 5} 
                          className={styles.cell + " " + styles.input}
                          type='text'
                          name='phone'
                          value={client.phone}
                          onChange={(e) => handleInputChange(ind, client, 'phone', e.currentTarget.value)}/>
                        <input key={client.id + 6} 
                          className={styles.cell + " " + styles.checkbox}
                          type='checkbox'
                          name='isAdmin'
                          checked={client.isAdmin}
                          onChange={(e) => handleInputChange(ind, client, 'isAdmin', e.currentTarget.checked)}/>
                        
                        <button key={client.id + 7} 
                          className={styles.cell + " " + styles.delete_button}
                          onClick={() => handleDelete(client)}> 
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

export default ClientsPage;
