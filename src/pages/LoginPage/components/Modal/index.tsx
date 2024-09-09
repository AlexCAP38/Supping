import React, {FC} from "react";
import block from 'bem-cn-lite';
import {Button, Modal, TextInput} from '@gravity-ui/uikit';

import './Modal.scss';

const b = block('modal-container');

type ModalNewUserProps = {
    showModal:boolean;
    closeModal: ()=>void
}

export const ModalNewUser:FC<ModalNewUserProps> = ({showModal,closeModal}) => {
    return (
        // <div className={b()}>
        <Modal open={showModal}
        onClose={closeModal}
        className={b('modal-new-user')}>
            <TextInput
                className={b('modal-input')}
                size='l'
                type='text'
                placeholder='Имя'
            />
            <TextInput
                className={b('modal-input')}
                size='l'
                type='text'
                placeholder='Фамилия'
            />
            <TextInput
                className={b('modal-input')}
                size='l'
                type='text'
                placeholder='Логин'
            />
            <Button
                size="xl"
            >Создать</Button>
        </Modal>
        // </div>
    )
}