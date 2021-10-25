import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { setChangePasswordData } from '../../services/actions/actions';
import styles from './change-password.module.css';

function ChangePassword() {

    const dispatch = useDispatch();
    const { changePasswordData } = useSelector(store => store.reducers)

    const [oldPassword, setOldPassword] = useState(''); 

    const [password, setPassword] = useState(''); 
    const [validPassword, setValidPassword] = useState(false); 

    const [repeatPassword, setRepeatPassword] = useState(''); 
    const [validRepeatPassword, setValidRepeatPassword] = useState(false);

    const [success, setSuccess] = useState(false);

    const changeHandler = (e) => {
        e.preventDefault();
        localStorage.password = password;
        setOldPassword(null);
        setPassword(null);
        setRepeatPassword(null);
        setSuccess(true);
        dispatch(setChangePasswordData(null, null, null))
    }

    const validatePassword = (password) => {
        const validPasswordReg = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{4,10}$');
        return validPasswordReg.test(password);
    }

    const oldPasswordHandler = (e) => {
        setOldPassword(e.target.value);
        dispatch(setChangePasswordData(e.target.value, password, repeatPassword))
    }

    const passwordHandler = (e) => {
        setValidPassword(validatePassword(e.target.value));
        setPassword(e.target.value);
        dispatch(setChangePasswordData(oldPassword, e.target.value, repeatPassword))
    }

    const repeatPasswordHandler = (e) => {
        setRepeatPassword(e.target.value)
        setValidRepeatPassword((validatePassword(e.target.value) && password === e.target.value));
        dispatch(setChangePasswordData(oldPassword, password, e.target.value))
    }

    const validForm = validPassword && validRepeatPassword;

    useEffect(() => {
        setValidPassword(validatePassword(changePasswordData.password));
        setValidRepeatPassword((validatePassword(changePasswordData.repeatPassword) && changePasswordData.password === changePasswordData.repeatPassword));
    }, [changePasswordData])

    const { isAuth } = useSelector(store => store.reducers)
    if (!isAuth) {
        return (
          <Redirect
            to='/login' 
          />
        );
    }

  return (
    <div className={styles.container}>
        <p className={styles.text}>
            Изменить пароль
        </p>
        {success ?
            <p>Пароль успешно изменён</p>    
        :
        <form 
            className={`${styles.form} mt-6`}
            onSubmit={changeHandler}
        >
            <input
                className={styles.input}
                onChange={oldPasswordHandler}
                placeholder="Старый пароль"
                type="password"
                id="OldPassword"
                name="OldPassword"
                defaultValue={changePasswordData.oldPassword}
            />
            <input
                className={styles.input}
                onChange={passwordHandler}
                placeholder="Пароль"
                type="password"
                id="password"
                name="password"
                defaultValue={changePasswordData.password}
            />
            <input
                className={styles.input}
                onChange={repeatPasswordHandler}
                placeholder="Повторите пароль"
                type="password"
                id="repeat-password"
                name="repeat-password"
                defaultValue={changePasswordData.repeatPassword}
            />
            <button className={`${styles.button} ${!validForm && styles.disabled}`} disabled={!validForm}>
                Изменить пароль
            </button>
        </form>
        }
    </div>
  );
}

export default ChangePassword;
