import React, {useEffect, useState} from 'react';
import monkey from '@assets/monkey.gif';
import cat from '@assets/cat.gif';
import block from 'bem-cn-lite';
import {UserLabel, Button} from '@gravity-ui/uikit';
import {ModalNewUser} from './components/Modal';
import {Plus, ArrowUturnCcwLeft} from '@gravity-ui/icons';
import {
  getUsers,
  IUser,
  setUserActive
} from '@services/api';
import './LoginPage.scss';
import {useNavigate} from 'react-router-dom';

const b = block('container');

export function LoginPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const navigate = useNavigate();

//TODO Оптимизировать количество обращений Хранить данные в контексте 

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch(() => {
        console.log('ВКЛючи СЕРВЕР');
      })
  }, []);

  useEffect(() => {
  }, [users, showModalAddUser]);

  async function handleActiveUser(user: IUser) {
    if (user.active) {
      // добавить логику для деактивации пользователя, если это требуется
    } else {
      try {
        await setUserActive(user.id);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
      } catch (error) {
        //можно добавить модалку с ошибкой
        console.error('Ошибка при активации пользователя:', error);
      }
    }
  }

  function handleAddUser() {
    setShowModalAddUser(true);
  }
function handleBackPage() {

  navigate(-1);
}

  return (
    <div className={b()}>
      {users.map((user) => {
        return (
          <UserLabel
            key={user.id}
            className={b('card', {active: !user.active ? true : false})}
            type='person'
            avatar={user.active ? monkey : cat}
            size='xl'
            onClick={() => {handleActiveUser(user)}}
          >
            {user.firstName === user.lastName ?
              `${user.firstName}` :
              `${user.firstName} ${user.lastName}`}
          </UserLabel>
        )
      })}

      <Button
        onClick={handleBackPage}
        // pin="circle-circle"
        selected
      >
        <ArrowUturnCcwLeft />
      </Button>

      <Button
        onClick={handleAddUser}
        pin="circle-circle"
        selected
        className={b('btn-add-user')}>
        <Plus />
      </Button>

      <ModalNewUser
        showModal={showModalAddUser}
        closeModal={() => setShowModalAddUser(false)}
      />
    </div>
  );
}  