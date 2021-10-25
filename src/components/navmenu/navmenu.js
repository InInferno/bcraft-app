import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navmenu.module.css';
import { menuToggle } from '../../services/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function NavMenu() {

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(menuToggle());
  }

  const { isAuth } = useSelector(store => store.reducers)

  return (
    <div className={styles.container}>
      <button onClick={onClickHandler} className={styles.button}>Закрыть меню</button>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to='/' className={styles.link}><p className={styles.text}>Главная</p></Link>
          </li>
          {!isAuth &&
            <>
              <li>
                <Link to='/login' className={styles.link}><p className={styles.text}>Авторизация</p></Link>
              </li>
              <li>
                <Link to='/register' className={styles.link}><p className={styles.text}>Регистрация</p></Link>
              </li>
            </>
          }
          {isAuth &&
            <li>
              <Link to='/change-password' className={styles.link}><p className={styles.text}>Смена пароля</p></Link>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
}

export default NavMenu;
