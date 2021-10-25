import React, { useEffect } from 'react';
import styles from './app.module.css'
import {
  Link,
  Route, 
  Switch
} from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Register from '../register/register';
import Login from '../login/login';
import ChangePassword from '../change-password/change-password';
import NavMenu from '../navmenu/navmenu';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../services/actions/actions';

function App() {

  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.reducers)

  useEffect(() => {
    localStorage.email = 'example@example.com';
    localStorage.password = '123G';
  }, [])

  const { menuOpen } = useSelector(store => store.reducers)

  const logout = () => {
    dispatch(auth());
  }

  return (
    <>
      <AppHeader />
      {menuOpen &&
        <NavMenu />
      }
      <Switch>
        <Route path="/" exact>
          <div className={styles.container}>
            <p className={styles.title}>Главная страница</p>
            {isAuth ?
              <>
                <p>Вы авторизованы</p> 
                <button onClick={logout} className={styles.button}>Выйти</button>
              </>
              :
              <>
                <p>Вы не авторизованы</p> 
                <button className={styles.button}><Link to='/login' className={styles.link}>Войти</Link></button>
              </>
            }
          </div>
          </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login /> 
        </Route>
        <Route path='/change-password'>
          <ChangePassword /> 
        </Route>
      </Switch>
    </>
  );
}

export default App;
