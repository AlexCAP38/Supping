import './ModalInventors.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useState, useContext} from "react";
import {Button, Modal, TextInput, Checkbox, Text, Select} from '@gravity-ui/uikit';
import {ApiItemResponse, ApiStockResponse} from "@services/supping-api";
import {api} from '@services/api';
import {AppContext} from '@context/Context';

const b = block('modal-inventors');

type NewInventorsProps = {
    showModal: boolean;
    currentItem: ApiItemResponse | undefined;
    closeModal: () => void;
    updateTable: (value: boolean) => void;
}

type Status = "HOME" | "RENTED_OUT" | "NO_ACTIVE" | "DELETE";

interface UnitValue {
    value: string;
    content: string;
}

const unitValue: UnitValue[] = [
    {
        value: "MINUTES",
        content: "минуты",
    },
    {
        value: "HOURS",
        content: "часы",
    },
    {
        value: "DAYS",
        content: "дни",
    }
]

const initItem: ApiItemResponse = {
    id: '',
    number: 0,
    name: '',
    description: '',
    volt: 0,
    lowEnergy: false,
    status: "NO_ACTIVE",
    type: {id: ''},
    image: '',
}

export const ModalInventors: FC<NewInventorsProps> = ({showModal, currentItem, closeModal, updateTable}) => {
    const {state} = useContext(AppContext)

    const [item, setItem] = useState<ApiItemResponse>(initItem)

    //Тип инвентаря
    const [types, setTypes] = useState<UnitValue[] | undefined>(undefined);

    //создаем опции типов для селекта
    useEffect(() => {
        const typesOptions = state.itemTypes.map((type) => {
            return {
                value: type.id as string,
                content: type.name as string
            }
        });
        setTypes(typesOptions)
    }, [state])


    useEffect(() => {
        if (currentItem) {setItem(currentItem)}
    }, [currentItem])

    //Добавить новый инвентарь
    function addNewItem() {
        if (item) {
            console.log('item', item)
            api.v1.createItem(
                {
                    name: item.name as string,
                    number: item.number ?? 0,
                    type: {id: item.type?.id},
                    description: item.description,
                }
            ).then((response) => {
                closeModal();
                updateTable(true);
            })
        }
    }

    //Обновить инвентарь
    function updateItem() {
        if (item && item.id) {
            api.v1.updateItem(item.id,
                {
                    name: item.name as string,
                    number: item.number,
                    description: item.description,
                })
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка обновление акции', error)})
        }
    }

    // Удалить инвентарь
    function deleteItem() {
        if (item && item.id) {
            api.v1.deleteItem(item.id)
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка обновление акции', error)})
        }
    }

    return (
        <Modal
            open={showModal}
            onClose={() => {
                closeModal()
                setItem(initItem);
            }}
            className={b('container')}
        >
            <Text
                className={b('header')}
                variant="header-2"
            >
                {!currentItem ? 'Добавить инвентарь' : 'Обновить инвентарь'}
            </Text>
            {!currentItem ? <>
                <Text className={b('caption')}>Тип инвентаря</Text>
                <Select className={b('select')}
                    size="l"
                    options={types}
                    // value={[item.type.id as string]}
                    popupWidth={200}
                    popupPlacement={"bottom"}
                    onUpdate={(value) =>
                        setItem((prevState) => ({
                            ...prevState,
                            type: {id: value[0]}
                        }))
                    }
                />
            </>
                : null
            }
            <Text className={b('caption')}>Наименование</Text>
            <TextInput
                className={b('input')}
                value={item.description}
                size='l'
                type='text'
                onUpdate={(value) => setItem((prevState) => ({
                    ...prevState,
                    description: value
                }))}
            />
            <Text className={b('caption')}>Инв.Номер</Text>
            <TextInput
                className={b('input')}
                value={item.name}
                size='l'
                type='text'
                onUpdate={(value) => {
                    const clearValue = value.replace(/[^0-9.]/, '');
                    setItem((prevState) => ({
                        ...prevState,
                        name: clearValue
                    }))
                }}
            />
            {/* <Text className={b('caption')}>Описание</Text>
            <TextInput
                className={b('input')}
                value={item.description}
                size='l'
                type='text'
                onUpdate={(value) => setItem((prevState) => ({
                    ...prevState,
                    description: value
                }))}
            /> */}
            <Text className={b('caption')}>URL на изображение</Text>
            <TextInput
                className={b('input')}
                value={item.image ?? ''}
                size='l'
                type='text'
                onUpdate={(value) => setItem((prevState) => ({
                    ...prevState,
                    image: value
                }))}
            />
            <img className={b('image')} src={item.image ?? ''} alt="Изображение" />
            {!currentItem ?
                <div className={b("btn-container")}>
                    <Button
                        size="l"
                        children={'Создать'}
                        onClick={() => addNewItem()}
                    />
                </div>
                :
                <div className={b("btn-container")}>
                    <Button
                        size="l"
                        children={'Удалить'}
                        onClick={() => deleteItem()}
                    />
                    <Button
                        size="l"
                        children={'Обновить'}
                        onClick={() => updateItem()}
                    />
                </div>
            }
        </Modal>
    )
}