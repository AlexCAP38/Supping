import './TableStock.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Text, Loader, Button} from '@gravity-ui/uikit';
import {ApiStockResponse} from '@services/supping-api';
import {ModalStock} from './components/ModalStock/ModalStock'
import {ItemStock} from './components/ItemStock/ItemStock';
import {api} from '@services/api';

const b = block('table-stock');

export function TableStock() {
    //Список элементов
    const [itemsStock, setItemsStock] = useState<ApiStockResponse[]>([]);
    //Выбранный элемент
    const [itemCurrent, setItemCurrent] = useState<ApiStockResponse | undefined>(undefined);
    //Статус обновить таблицы
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [showModalStock, setShowModalStock] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true)
        //Можно добавить опции сортировки
        api.v1.findAllByFilter1({})
            .then((response) => {
                setItemsStock(response.data)
                setShowLoader(false);
                setUpdateTable(false);
            })
            .catch((error) => console.log('Я б взял сервер на дуэль, да он уже сдался без боя!', error))
    }, [updateTable]);

    return (
        <div className={b()}>
            <Text
                variant='display-2'
                className={b('table-title')}
            >
                Система скидок и Акции
            </Text>
            <div className={b("columns-name", "grid-table-stock")}>
                <div>Активация <br /> акции</div>
                <div>Наименование</div>
                <div>Кол-во</div>
                <div>Ед. <br /> изм.</div>
                <div>Скидка, %</div>
            </div>
            {showLoader ?
                <Loader className={b('loader')} size='l' />
                :
                <>
                    {itemsStock.map((item) => {
                        return <ItemStock
                            key={item.id}
                            item={item}
                            showModalStock={() => setShowModalStock(true)}
                            itemCurrent={(item) => setItemCurrent(item)}
                        />
                    })}
                    <Button
                        className={b('table-stock-btn')}
                        onClick={() => {
                            setShowModalStock(true);
                        }}
                    >
                        Добавить новую акцию
                    </Button>


                </>
            }
            <ModalStock
                showModal={showModalStock}
                closeModal={() => {
                    setShowModalStock(state => !state)
                    //При закрытии почистим состояние инпутов
                    setItemCurrent(undefined);
                }}
                currentItem={itemCurrent}
                updateTable={(value)=>setUpdateTable(value)}
            />
        </div>
    )
}