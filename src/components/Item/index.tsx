import React, {FC, useState} from "react";
import block from 'bem-cn-lite';
import {Text, Modal} from '@gravity-ui/uikit';
import anyPictures from '@assets/test.jpg'
import {InventoryItem} from "@services/types";
import {setRentItem} from "@services/api";

import './Item.scss';

const b = block('item-container');

interface IItemProps {
    item: InventoryItem;
}


export const Item: FC<IItemProps> = ({item}) => {
    const [showModal, setShowModal] = useState(false);


    function handleClick() {
        setShowModal(true)
    }

    function onSubmit() {
        setRentItem(item.id).then(()=>{setShowModal(false)});
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


            <Modal open={showModal}
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