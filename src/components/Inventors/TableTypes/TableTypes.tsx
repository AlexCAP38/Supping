import './TableTypes.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Text, Loader, Button} from '@gravity-ui/uikit';
import {ApiItemTypeResponse, ApiStockResponse} from '@services/supping-api';
import {ModalTypes} from './components/ModalTypes/ModalTypes'
import {Item} from './components/Item/Item';
import {AppContext} from '@context/Context';

const b = block('table-types');

export function TableTypes() {
    const {state, setState} = useContext(AppContext);
    //Список элементов
    const [itemsType, setItemsType] = useState<ApiItemTypeResponse[]>([]);
    //Выбранный элемент
    const [itemCurrent, setItemCurrent] = useState<ApiStockResponse | undefined>(undefined);
    //Статус обновить таблицы
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [showModalStock, setShowModalStock] = useState<boolean>(false);

    useEffect(() => {
        setItemsType(state.itemTypes);
    }, [state.itemTypes]);

    return (
        <div className={b()}>
            <Text
                variant='display-2'
                className={b('table-title')}
            >
                Типы инвентаря
            </Text>
            <div className={b("columns-name", "grid-table")}>
                <div>Наименование</div>
                <div>Базовая стоимость</div>
                <div>Описание</div>
            </div>
            {<>
                {itemsType.map((item) => {
                    return <Item
                        key={item.id}
                        item={item}
                        showModalStock={() => setShowModalStock(true)}
                        itemCurrent={(item) => setItemCurrent(item)}
                    />
                })}
                <Button
                    className={b('table-btn')}
                    onClick={() => {
                        setShowModalStock(true);
                    }}
                >
                    Добавить новый тип инвентаря
                </Button>


            </>
            }
            <ModalTypes
                showModal={showModalStock}
                closeModal={() => {
                    setShowModalStock(state => !state)
                    //При закрытии почистим состояние инпутов
                    setItemCurrent(undefined);
                }}
                currentItem={itemCurrent}
                updateTable={(value) => setUpdateTable(value)}
            />
        </div>
    )
}