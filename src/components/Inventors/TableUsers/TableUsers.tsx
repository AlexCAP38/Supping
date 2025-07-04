import './TableUsers.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Text, Loader, Button} from '@gravity-ui/uikit';
import {ApiUserResponse, ApiStockResponse, ApiFilterRequest} from '@services/supping-api';
import {ModalUsers} from './components/ModalUsers/ModalUsers'
import {Item} from './components/Item/Item';
import {AppContext} from '@context/Context';
import {api} from '@services/api';

const b = block('table-users');


//Опции сортировка по умолчанию
const sortOption: ApiFilterRequest = {
    sort: {
        field: 'firstName',
        direction: 'ASC'
    }
}


export function TableUsers() {
    const [items, setItems] = useState<ApiUserResponse[]>([]);
    const [itemCurrent, setItemCurrent] = useState<ApiUserResponse | undefined>(undefined);
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    // useEffect(() => {
    //     setItemsType(state.itemTypes);
    // }, [state.itemTypes]);

    //Обновление таблицы
    useEffect(() => {
        //Получаем список типов инвентаря
        api.v1.findAllByFilter(sortOption)
            .then((response) => {
                setItems(response.data);
                setUpdateTable(false); //сбрасываем счетчик обновления
            })
            .catch((error) => console.log('Ошибка получения списка пользователей', error))
    }, [updateTable]);

    return (
        <div className={b()}>
            <Text
                variant='display-2'
                className={b('table-title')}
            >
                Список пользователей
            </Text>
            <div className={b("columns-name", "grid-table")}>
                <div>Наименование</div>
                <div>На смене</div>
                <div>ЗП за сегодня</div>
            </div>
            {items.map((item) => {
                return <Item
                    key={item.id}
                    item={item}
                    onClick={() => {
                        setShowModal(true);
                        setItemCurrent(item);
                    }}
                />
            })}
            <Button
                className={b('table-btn')}
                onClick={() => {setShowModal(true);}}
            >
                Добавить нового пользователя
            </Button>


            <ModalUsers
                showModal={showModal}
                closeModal={() => {
                    setShowModal(state => !state)
                    //При закрытии почистим состояние инпутов
                    setItemCurrent(undefined);
                }}
                currentItem={itemCurrent}
                updateTable={(value) => setUpdateTable(value)}
            />
        </div>
    )
}