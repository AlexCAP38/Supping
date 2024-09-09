import React, {useEffect} from 'react';
import block from 'bem-cn-lite';
import {UserLabel, Button, Modal, TextInput} from '@gravity-ui/uikit';
import {Plus} from '@gravity-ui/icons';
import monkey from '@assets/monkey.gif';
import {getUsers} from '@services/api'
import './LoginPage.scss';

const b = block('container');

export function LoginPage() {

  useEffect(() => {
    getUsers();
  }, []);

  function handleClick() {

  }

  return (
    <div className={b()}>
      <UserLabel
        className={b('card')}
        type='person'
        avatar={monkey}
        children='Евгений Никитин'
        size='xl'
      />
      <UserLabel
        className={b('card')}
        type='person'
        avatar={monkey}
        children='Евгений Никитин'
        size='xl'
      />

      <Modal open={true} className={b('modal-new-user')}>
        <TextInput
          size='l'
          type='text'
          placeholder='Имя'
        />
        <TextInput
          size='l'
          type='text'
          placeholder='Фамилия'
        />
        <TextInput
          size='l'
          type='text'
          placeholder='Логин'
        />
      </Modal>


      <Button
        onClick={handleClick}
        pin="circle-circle"
        selected
        className={b('btn-add-user')}>
        <Plus />
      </Button>

    </div>
  );
}  