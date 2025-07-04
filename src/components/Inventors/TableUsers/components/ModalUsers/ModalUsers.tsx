import './ModalUsers.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useState} from "react";
import {Button, Modal, TextInput, Checkbox, Text, Select} from '@gravity-ui/uikit';
import {ApiUserRequest, ApiUserResponse} from "@services/supping-api";
import {api} from '@services/api';

const b = block('modal-stock');

type Props = {
    showModal: boolean;
    currentItem?: ApiUserResponse;
    closeModal: () => void;
    updateTable: (value: boolean) => void;
}

interface UnitValue {
    value: string;
    content: string;
}

const unitValue: UnitValue[] = [
    {
        value: "USER",
        content: "Пользователь",
    },
    {
        value: "ADMIN",
        content: "Администратор",
    },
    {
        value: "SYSTEM",
        content: "Владелец",
    }
]

export const ModalUsers: FC<Props> = ({showModal, currentItem, closeModal, updateTable}) => {
    const [item, setItem] = useState<ApiUserResponse | undefined>(undefined)
    const [itemNew, setItemNew] = useState<ApiUserRequest>({} as ApiUserRequest)
    const [password, setPassword] = useState('')

    useEffect(() => {
        setItem(currentItem)
    }, [currentItem])

    function addNewItem() {
        if (itemNew) {
            api.v1.createUser(
                {
                    firstName: itemNew.firstName,
                    lastName: itemNew.lastName,
                    login: itemNew.login,
                    role: itemNew.role
                }
            )
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка создание типа', error)})
        }
    }

    function updateCurrentItem() {
        if (item && item.id) {
            api.v1.updateUser(item.id,
                {
                    firstName: item.firstName,
                    lastName: item.lastName
                })
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка обновление акции', error)})
        }
    }

    function resetPassword() {
        if (!item || !item.login) return;

        api.v1.resetPassword({
            login: item?.login,
            password: password
        })
            .then((response) => {
                setPassword('')
                closeModal();
            })
            .catch((error) => {
                console.log('Ошибка сброса пароля', error)
            })
    }

    return (
        <Modal
            open={showModal}
            onClose={() => {
                closeModal()
                setItem(undefined);
                setItemNew({} as ApiUserRequest);
                setPassword('')
            }}
            className={b('container')}
        >
            {!currentItem ?
                <>
                    <Text
                        className={b('header')}
                        variant="header-2"
                    >Добавить пользователя
                    </Text>
                    <Text className={b('caption')}>Логин</Text>
                    <TextInput
                        className={b('input')}
                        value={itemNew?.login ?? ''}
                        size='l'
                        type='text'
                        onUpdate={(value) => setItemNew((prevState) => ({
                            ...prevState,
                            login: value
                        }))}
                    />
                    <Text className={b('caption')}>Фамилия</Text>
                    <TextInput
                        className={b('input')}
                        value={itemNew?.lastName ?? ''}
                        size='l'
                        type='text'
                        onUpdate={(value) => setItemNew((prevState) => ({
                            ...prevState,
                            lastName: value
                        }))}
                    />
                    <Text className={b('caption')}>Имя</Text>
                    <TextInput
                        className={b('input')}
                        value={itemNew?.firstName ?? ''}
                        size='l'
                        type='text'
                        onUpdate={(value) => setItemNew((prevState) => ({
                            ...prevState,
                            firstName: value
                        }))}
                    />
                    <Text className={b('caption')}>Роль</Text>
                    <Select className={b('select')}
                        size="l"
                        options={unitValue}
                        value={[itemNew.role as string]}
                        popupWidth={200}
                        popupPlacement={"bottom"}
                        onUpdate={(value) =>
                            setItemNew((prevState) => ({
                                ...prevState,
                                role: value[0] as "ADMIN" | "USER" | "SYSTEM"
                            }))
                        }
                    />
                    <div className={b("btn-container")}>
                        <Button
                            size="l"
                            children={'Создать'}
                            onClick={() => addNewItem()}
                        />
                    </div>
                </> :
                <>
                    <Text
                        className={b('header')}
                        variant="header-2"
                    >Обновить пользователя
                    </Text>
                    <Text className={b('caption')}>Фамилия</Text>
                    <TextInput
                        className={b('input')}
                        value={item?.lastName ?? ''}
                        size='l'
                        type='text'
                        onUpdate={(value) => setItem((prevState) => ({
                            ...prevState,
                            lastName: value
                        }))}
                    />
                    <Text className={b('caption')}>Имя</Text>
                    <TextInput
                        className={b('input')}
                        value={item?.firstName ?? ''}
                        size='l'
                        type='text'
                        onUpdate={(value) => setItem((prevState) => ({
                            ...prevState,
                            firstName: value
                        }))}
                    />
                    <Text className={b('caption')}>Пароль</Text>
                    <TextInput
                        className={b('input')}
                        value={password}
                        size='l'
                        type='text'
                        onUpdate={(value) => setPassword(value)}
                    />
                    <div className={b("btn-container")}>
                        <Button
                            size="l"
                            children={'Сбросить пароль'}
                            onClick={() => resetPassword()}
                            disabled={!password}
                        />
                        <Button
                            size="l"
                            children={'Обновить'}
                            onClick={() => updateCurrentItem()}
                        />
                    </div>
                </>
            }
        </Modal>
    )
}