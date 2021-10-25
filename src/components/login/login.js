import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { auth, setLoginData } from '../../services/actions/actions';
import styles from './login.module.css';
import { api } from '../../utils/api'

function Login() {

    const dispatch = useDispatch();
    const { loginData } = useSelector(store => store.reducers)
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); 

    const [password, setPassword] = useState(''); 
    const [validPassword, setValidPassword] = useState(false); 
    
    const [error, setError] = useState(false); 
    const [success, setSuccess] = useState(false); 

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(setLoginData(null, null))

        api
        .post('/login', { email, password })
        .then((res) => {
            console.log('res', res);
            setSuccess(true);
            setError(false);
            dispatch(auth());
        })
        .catch((err) => {
            console.log('err', err);
            setError(true);
        })
    }

    const validateEmail = (email) => {
        const validEmailReg = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        return validEmailReg.test(email);
    }

    const validatePassword = (password) => {
        const validPasswordReg = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{4,10}$');
        return validPasswordReg.test(password);
    }

    const emailHandler = (e) => {
        setValidEmail(validateEmail(e.target.value));
        setEmail(e.target.value);
        dispatch(setLoginData(e.target.value, password))
    }

    const passwordHandler = (e) => {
        setValidPassword(validatePassword(e.target.value));
        setPassword(e.target.value);
        dispatch(setLoginData(email, e.target.value))
    }

    const validForm = validEmail && validPassword;

    useEffect(() => {
        setValidEmail(validateEmail(loginData.email));
        setValidPassword(validatePassword(loginData.password));
    }, [loginData])

    const { isAuth } = useSelector(store => store.reducers)
    if (isAuth) {
        return (
          <Redirect
            to='/' 
          />
        );
    }

  return (
    <div className={styles.container}>
        <p className={styles.text}>
            Авторизация
        </p>
        {success ?
            <p>Вы успешно авторизоваливась</p>
        :
        <form 
            className={`${styles.form} mt-6`}
            onSubmit={loginHandler}
        >
            <input
                className={styles.input}
                placeholder="Email"
                onChange={emailHandler}
                type="email"
                id="email"
                name="email"
                defaultValue={loginData.email}
            />
            <input
                className={styles.input}
                onChange={passwordHandler}
                placeholder="Пароль"
                type="password"
                id="password"
                name="password"
                defaultValue={loginData.password}
            />
            <button className={`${styles.button} ${!validForm && styles.disabled}`} disabled={!validForm}>
                Войти
            </button>
        </form>
        }
        {error && <p>Ошибка авторизации</p>}
    </div>
  );
}

export default Login;
