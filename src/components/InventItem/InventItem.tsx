import './InventItem.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useState} from "react";
import {Text, Modal} from '@gravity-ui/uikit';
import anyPictures from '@assets/test.jpg'
import {InventoryItem} from "@services/types";
import {api} from "@services/api";
import {useNavigate} from 'react-router';

const b = block('item-container');

interface InventItemProps {
    item: InventoryItem;
}

export const InventItem: FC<InventItemProps> = ({item}) => {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigate();

    function handleClick() {
        setShowModal(true)
    }

    function onSubmit() {
        api.v1.startRent(item.id)
            .then((response) => {
                setShowModal(false);
                navigation('/')
            })
            .catch((error) => console.log('Ошибка сдачи инвентаря в аренду', error))
    }

    return (
        <div className={b('item')} key={item.id} onClick={() => {handleClick()}}>
            <div className='name'>{item.description}</div>
            <div>
                <div className='number'>
                    <span className="first">{item.name.slice(0, 2)}</span>
                    <span className="second">{item.name.slice(2, -1)}</span>
                </div>
            </div>
            <div>{item.type.cost}</div>
            <div>{item.type.cost}</div>
            <div>{item.type.cost}</div>

            <Modal
                open={showModal}
                className={b('item-detail')}
                onClose={(event) => {
                    event.stopPropagation();
                    setShowModal(false)
                    // setVisibilityModal(false);
                    // setInputGetMoney(rentCost.toString());
                    // setInputDescription('');
                }}
                style={{backgroundColor: 'rgba(20,20,20, 0.15)'}}
            >
                <div className="container-title">
                    <Text className={'item-title'}>{item.description}</Text>
                    <div className={'invent-number'}>
                        <span className="first">{item.name.slice(0, 2)}</span>
                        <span className="second">{item.name.slice(2, -1)}</span>
                    </div>
                </div>
                <img src={anyPictures} className={'item-image'} />
                <div className="btn-rent" onClick={onSubmit}>СДАТЬ</div>
            </Modal>


        </div>
    )
}