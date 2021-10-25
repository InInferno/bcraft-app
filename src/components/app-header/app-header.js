import React from 'react';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { menuToggle } from '../../services/actions/actions';
import { useDispatch } from 'react-redux';

export default function AppHeader() {

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(menuToggle());
  }

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.title}><h1>BCRAFT</h1></Link>
      <button onClick={onClickHandler} className={styles.button}>Меню</button>
    </header>
  )
}
