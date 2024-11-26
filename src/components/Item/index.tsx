import React, {FC, useState} from "react";
import block from 'bem-cn-lite';
import {TrashBin, CirclePlusFill, ArrowRotateRight, Person, PersonXmark, PlayFill, CircleMinusFill, PencilToSquare} from '@gravity-ui/icons';
import {Text, Modal, TextArea, TextInput, Button, UserLabel, Icon} from '@gravity-ui/uikit';
import anyPictures from '@assets/test.jpg'
import {InventoryItem} from "@services/types";


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

    return (

        <div className={b('item')} key={item.id} onClick={()=>{handleClick()}}>

            <div className='name'>{item.name}</div>
            <div>
                <div className='number'>{item.number}</div>
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
                <Text variant='display-2'>{item.name}</Text>
                <Text variant='header-1'>{item.number}</Text>
                <Text variant='body-2'>{item.type.cost}</Text>
                <img src={anyPictures} alt="" />
                <Button className={b('item-btn')}>
                    <Icon data={CirclePlusFill} size={20} />
                    добавить изображени
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={PencilToSquare} size={20} />
                    изменить  изображени
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={CircleMinusFill} size={20} />
                    удалить  изображени
                </Button>

                <TextArea value='----------- эТО просто разделить '>

                </TextArea>

                <Button className={b('item-btn')}>
                    <Icon data={PlayFill} size={20} />
                    СДАТЬ
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={Person} size={20} />
                    ВКЛЮЧИТЬ
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={PersonXmark} size={20} />
                    ОТКЛЮЧИТЬ
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={ArrowRotateRight} size={20} />
                    ОБНОВИТЬ
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={CirclePlusFill} size={20} />
                    СОЗДАТЬ
                </Button>
                <Button className={b('item-btn')}>
                    <Icon data={TrashBin} size={20}/>
                    УДАЛИТЬ
                </Button>
            </Modal>


        </div>
    )
}