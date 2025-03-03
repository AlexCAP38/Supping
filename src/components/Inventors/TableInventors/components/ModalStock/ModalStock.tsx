import './ModalStock.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useState} from "react";
import {Button, Modal, TextInput, Checkbox, Text, Select} from '@gravity-ui/uikit';
import {ApiStockResponse} from "@services/supping-api";
import {api} from '@services/api';

const b = block('modal-stock');

type NewStockProps = {
    showModal: boolean;
    currentItem: ApiStockResponse | undefined;
    closeModal: () => void;
    updateTable: (value: boolean) => void;
}

type Status = "ACTIVE" | "DISABLE" | "DELETE";

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

export const ModalStock: FC<NewStockProps> = ({showModal, currentItem, closeModal, updateTable}) => {
    const [item, setItem] = useState<ApiStockResponse | undefined>(currentItem)

    useEffect(() => {
        setItem(currentItem)
    }, [currentItem])

    //Добавить акцию
    function addNewStock() {
        if (item) {
            api.v1.createStock(
                {
                    name: item.name as string,
                    type: {},
                    value: item.value,
                    units: item.units,
                    stock: item.stock,
                    status: item.status
                }
            )
        }
    }

    //Обновить акцию
    function updateStock() {
        if (item && item.id) {
            api.v1.updateStock(item.id,
                {
                    name: item.name as string,
                    type: {},
                    value: item.value,
                    unit: item.units,
                    stock: item.stock,
                    status: item.status
                })
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка обновление акции', error)})
        }
    }

    function deleteStock() {

    }

    return (
        <Modal
            open={showModal}
            onClose={() => {closeModal()
                setItem(undefined);
            }}
            className={b('container')}
        >
            <Text
                className={b('header')}
                variant="header-2"
            >
                {!currentItem ? 'Добавить скидку' : 'Обновить скидку'}
            </Text>
            <Text className={b('caption')}>Наименование</Text>
            <TextInput
                className={b('input')}
                value={item ? item.name : ''}
                size='l'
                type='text'
                onUpdate={(value) => setItem((prevState) => ({
                    ...prevState,
                    name: value
                }))}
            />
            <Text className={b('caption')}>Количество</Text>
            <TextInput
                className={b('input')}
                value={item !== undefined ? item.value?.toString() : ''}
                size='l'
                type='text'
                onUpdate={(value) => {
                    const clearValue = value.replace(/[^0-9.]/, '');
                    setItem((prevState) => ({
                        ...prevState,
                        value: parseFloat(clearValue)
                    }))
                }}
            />
            <Text className={b('caption')}>Единица измерения</Text>
            <Select className={b('select')}
                size="l"
                options={unitValue}
                value={item ? [item?.units as string] : []}
                popupWidth={200}
                popupPlacement={"bottom"}
                onUpdate={(value) =>
                    setItem((prevState) => ({
                        ...prevState,
                        units: value[0] as "MINUTES" | "HOURS" | "DAYS"
                    }))
                }
            />
            <Text className={b('caption')}>Скидка %</Text>
            <TextInput
                className={b('input')}
                value={item ? item.stock?.toString() : ''}
                size='l'
                type='text'
                onUpdate={(value) => {
                    const clearValue = value.replace(/[^0-9.]/, '');
                    setItem((prevState) => ({
                        ...prevState,
                        stock: parseFloat(clearValue)
                    }))
                }}
            />
            {!currentItem ?
                <div className={b("btn-container")}>
                    <Checkbox
                        size="l"
                        content="Активировать"
                        checked={false}
                    // onChange={() => setStatus(state => !state)}
                    />
                    <Button
                        size="l"
                        children={'Создать'}
                        onClick={() => addNewStock()}
                    />
                </div>
                :
                <div className={b("btn-container")}>
                    <Checkbox
                        size="l"
                        content="Активировать"
                        checked={
                            item?.status === 'ACTIVE' ? true : false
                        }
                        disabled={item?.status === 'DELETE' ? true : false}
                        onChange={() => setItem((prevState) => ({
                            ...prevState,
                            status:
                                prevState?.status === 'ACTIVE' ? 'DISABLE'
                                    : prevState?.status === 'DISABLE' ? 'ACTIVE'
                                        : prevState?.status
                        }))}
                    />
                    <Button
                        size="l"
                        children={'Удалить'}
                        onClick={() => deleteStock()}
                    />
                    <Button
                        size="l"
                        children={'Обновить'}
                        onClick={() => updateStock()}
                    />
                </div>
            }
        </Modal>
    )
}