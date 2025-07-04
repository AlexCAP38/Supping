import './LoginPage.scss';
import block from 'bem-cn-lite';
import {TextInput, Button, Link, Checkbox} from '@gravity-ui/uikit';
import React, {useContext, useEffect, useState} from 'react';
import {api} from '@services/api';
import {tokenStorage} from '@utils/tokenStorage';
import {useNavigate} from 'react-router';
import {AppContext} from '@context/Context';
import logo from '@assets/favicon/sup.svg';
import {jwtDecode} from "jwt-decode";
import {JWT} from '@context/InitUser';

const b = block('authorization');

export function LoginPage() {
    const {state, setState} = useContext(AppContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [logError, setLogError] = useState('');
    const navigate = useNavigate();

    //Проверка инпутов на пустоут
    const validateInput = () => {
        if (!login || !password) {
            setHasError(true);
            return false
        }
        setHasError(false);
        return true
    }

    useEffect(() => {
        validateInput()
    }, [login, password])

    // useEffect(() => {
    //     // state.user.token && navigate('/');
    // }, [])

    const sendAuth = () => {
        //сбросим ошибку авторизации
        setLogError('')

        api.v1.login({
            login: login,
            password: password
        })
            .then((response) => {
                if ("access-token" in response.headers) {
                    const token = response.headers['access-token']
                    const decoded: JWT = jwtDecode(token);

                    //Сохранение токена
                    rememberMe ? tokenStorage.setLocal(token) : tokenStorage.setSession(token);

                    setState({
                        user: {
                            ...state.user,
                            token: token,
                            role: decoded.role
                        }
                    });

                    navigate('/');
                } else console.error('В заголовке нету access-token')
            })
            .catch((error) => {
                if (error.status === 403) {
                    setLogError(`Неверный логин/пароль`)
                } else {
                    setLogError(`Ошибка, код: ${error.status}`)
                    console.log('Ошибка, код: ', error);
                }
            });
    }

    return (
        <div className={b()}>
            <div className={b('logo')}>
                <img src={logo} alt="logo" />
            </div>
            <div className={b('label')}>Логин</div>
            <TextInput
                className={b('input')}
                size='xl'
                onChange={(event) => setLogin(event.target.value.trim())}
                type='text'
            />
            <div className={b('label')}>Пароль</div>
            <TextInput
                className={b('input')}
                size='xl'
                onChange={(event) => setPassword(event.target.value.trim())}
                type='password'
            />
            <div className={b('container')}>
                <Checkbox
                    size='l'
                    onChange={() => setRememberMe(prevState => !prevState)}
                    className={b('checkbox')}
                >
                    Запомнить
                </Checkbox>
                <Link
                    href='#'
                    className={b('link')}
                >
                    Забыли пароль ?
                </Link>
            </div>
            <div className={b('log')}>{logError}</div>
            <Button
                className={b('btn')}
                size='xl'
                onClick={sendAuth}
                disabled={hasError}
            >
                Авторизоваться
            </Button>
        </div>
    )
}