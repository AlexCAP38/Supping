import './ModalTypes.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useState} from "react";
import {Button, Modal, TextInput, Checkbox, Text, Select} from '@gravity-ui/uikit';
import {ApiItemTypeResponse, ApiStockResponse} from "@services/supping-api";
import {api} from '@services/api';

const b = block('modal-stock');

type TypeProps = {
    showModal: boolean;
    currentItem: ApiItemTypeResponse | undefined;
    closeModal: () => void;
    updateTable: (value: boolean) => void;
}


export const ModalTypes: FC<TypeProps> = ({showModal, currentItem, closeModal, updateTable}) => {
    const [item, setItem] = useState<ApiItemTypeResponse | undefined>(undefined)

    useEffect(() => {
        setItem(currentItem)
    }, [currentItem])

    //Добавить новый тип
    function addNewItem() {
        if (item) {
            api.v1.createType(
                {
                    name: item.name as string,
                    cost: item.cost,
                    description: item.description
                }
            )
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка создание типа', error)})
        }
    }

    //Обновить акцию
    function updateCurrentItem() {
        if (item && item.id) {
            api.v1.updateType(item.id,
                {
                    name: item.name as string,
                    cost: item.cost,
                    description: item.description
                })
                .then((response) => {
                    closeModal();
                    updateTable(true);
                })
                .catch((error) => {console.log('Ошибка обновление акции', error)})
        }
    }


    function deleteCurrentItem() {

        api.v1.deleteType(item?.id!)
            .then((response) => {
                closeModal();
                updateTable(true);
            })
            .catch((error) => {
                console.log('Ошибка удаления типа инвентаря', error)
            })
    }

    return (
        <Modal
            open={showModal}
            onClose={() => {
                closeModal()
                setItem(undefined);
            }}
            className={b('container')}
        >
            <Text
                className={b('header')}
                variant="header-2"
            >
                {!currentItem ? 'Добавить тип' : 'Обновить скидку'}
            </Text>
            <Text className={b('caption')}>Наименование</Text>
            <TextInput
                className={b('input')}
                value={item?.name ?? ''}
                size='l'
                type='text'
                onUpdate={(value) => setItem((prevState) => ({
                    ...prevState,
                    name: value
                }))}
            />
            <Text className={b('caption')}>Базовая стоимость</Text>
            <TextInput
                className={b('input')}
                value={item?.cost?.toString() ?? ''}
                size='l'
                type='text'
                onUpdate={(value) => {
                    const clearValue = value.replace(/[^0-9.]/, '');
                    setItem((prevState) => ({
                        ...prevState,
                        cost: parseFloat(clearValue)
                    }))
                }}
            />
            <Text className={b('caption')}>Описание</Text>
            <TextInput
                className={b('input')}
                value={item?.description ?? ''}
                size='l'
                type='text'
                onUpdate={(value) => {
                    setItem((prevState) => ({
                        ...prevState,
                        description: value
                    }))
                }}
            />
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
                        onClick={() => deleteCurrentItem()}
                    />
                    <Button
                        size="l"
                        children={'Обновить'}
                        onClick={() => updateCurrentItem()}
                    />
                </div>
            }
        </Modal>
    )
}