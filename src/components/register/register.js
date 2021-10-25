import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { auth, setRegisterData } from '../../services/actions/actions';
import styles from './register.module.css';

function Register() {

    const dispatch = useDispatch();
    const { registerData } = useSelector(store => store.reducers)

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); 

    const [password, setPassword] = useState(''); 
    const [validPassword, setValidPassword] = useState(false); 

    const [repeatPassword, setRepeatPassword] = useState('');
    const [validRepeatPassword, setValidRepeatPassword] = useState(false);

    const registerHandler = (e) => {
        e.preventDefault();
        localStorage.email = email;
        localStorage.password = password;
        dispatch(auth());
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
        dispatch(setRegisterData(e.target.value, password, repeatPassword))
    }

    const passwordHandler = (e) => {
        setValidPassword(validatePassword(e.target.value));
        setPassword(e.target.value);
        dispatch(setRegisterData(email, e.target.value, repeatPassword))
    }

    const repeatPasswordHandler = (e) => {
        setValidRepeatPassword((validatePassword(e.target.value) && password === e.target.value));
        setRepeatPassword(e.target.value);
        dispatch(setRegisterData(email, password, e.target.value))
    }

    const validForm = validEmail && validPassword && validRepeatPassword;

    useEffect(() => {
        setValidEmail(validateEmail(registerData.email));
        setValidPassword(validatePassword(registerData.password));
        setValidRepeatPassword((validatePassword(registerData.repeatPassword) && registerData.password === registerData.repeatPassword));
    }, [registerData])

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
            Регистрация
        </p>
        <form 
            className={`${styles.form} mt-6`}
            onSubmit={registerHandler}
        >
            <input
                className={styles.input}
                placeholder="Email"
                onChange={emailHandler}
                type="email"
                id="email"
                name="email"
                defaultValue={registerData.email}
            />
            <input
                className={styles.input}
                onChange={passwordHandler}
                placeholder="Пароль"
                type="password"
                id="password"
                name="password"
                defaultValue={registerData.password}
            />
            <input
                className={styles.input}
                onChange={repeatPasswordHandler}
                placeholder="Повторите пароль"
                type="password"
                id="repeat-password"
                name="repeat-password"
                defaultValue={registerData.repeatPassword}
            />
            <button className={`${styles.button} ${!validForm && styles.disabled}`} disabled={!validForm}>
                Зарегистрироваться
            </button>
        </form>
    </div>
  );
}

export default Register;
