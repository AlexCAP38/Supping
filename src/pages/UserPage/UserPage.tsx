import './UserPage.scss';
import React, {useContext} from 'react';
import block from 'bem-cn-lite';
import {Button, Icon} from '@gravity-ui/uikit';
import {api} from '@services/api';
import {AppContext} from '@context/Context';
import {useNavigate} from 'react-router-dom';
import {tokenStorage} from '@utils/tokenStorage';
import {ArrowRightFromSquare} from '@gravity-ui/icons';

const b = block('user');

export function UserPage() {
  const {state, setState} = useContext(AppContext);
  const {user} = state;
  const navigate = useNavigate();

  function handleActiveUser() {
    if (!state.user.id) return;

    api.v1.setActiveUser()
      .then((response) => {
        setState({
          options: {
            ...state.options,
            reloadPage: true
          }
        })
        navigate('/');
      })
      .catch((error) => {
        console.log('Ошибка не удалось установить активного пользователя', error);
      });

  }

  function handleLogoff() {
    tokenStorage.clear();
    navigate('/login');
  }

  return (
    <div className={b()}>
      <table className={b('table')}>
        <tbody>
          <tr>
            <td className={b('column-first')}>Смена открыта:</td>
            <td className={b('column-second')}>{`${user.assignedUser?.firstName} ${user.assignedUser?.lastName}`}</td>
          </tr>
          <tr>
            <td className={b('column-first')}>ЗП за день:</td>
            <td className={b('column-second')}>{user.totalValue}</td>
          </tr>
        </tbody>
      </table>

      <Button
        size='xl'
        className={b('btn')}
        onClick={() => handleActiveUser()}
      >
        Я сегодня работаю !
      </Button>
      <Button
        size='xl'
        className={b('btn')}
        onClick={() => handleLogoff()}
      >
        Выйти
        <Icon data={ArrowRightFromSquare} size={30}/>
      </Button>
    </div>
  );
}