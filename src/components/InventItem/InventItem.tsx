import './InventItem.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useRef, useState} from "react";
import {Text, Modal} from '@gravity-ui/uikit';
import clock from '@assets/clock.svg'
import {InventoryItem} from "@services/types";
import {api} from "@services/api";
import {useNavigate} from 'react-router';
import {getCachedImage} from '@context/IndexDB';
import {clearInputValue} from '@utils/ClearInputNumber';

const b = block('item-container');

interface InventItemProps {
    item: InventoryItem;
}

export const InventItem: FC<InventItemProps> = ({item}) => {
    const [showModal, setShowModal] = useState(false);
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [image, setImage] = useState<string>();
    const closingRef = useRef(false);

    useEffect(() => {
        setHours(new Date().getHours().toString())
        setMinutes(new Date().getMinutes().toString())
    }, [showModal])

    useEffect(() => {
        async function getImage(id: string) {
            let image: string;
            if (id) {
                image = await getCachedImage(id);

                if (image) setImage(image)
            }
        }

        getImage(item.image);
    }, [item.image]);

    const navigation = useNavigate();

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        if (closingRef.current) return;

        event.stopPropagation();

        if (!showModal) {
            setShowModal(true);
        }
    }

    function handleClose(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();

        closingRef.current = true;

        setShowModal(false);

        setTimeout(() => {
            closingRef.current = false;
        }, 100);
    }

    function onSubmit() {

        api.v1.startRent(item.id,
            {
                startTime:
                {
                    //Ошибка при отправке Серега разбирается
                    hour: parseInt(hours),
                    minute: parseInt(minutes),
                    second: 0,
                    nano: 0
                }
            })
            .then((response) => {
                setShowModal(false);
                navigation('/')
            })
            .catch((error) => console.log('Ошибка сдачи инвентаря в аренду', error))
    }

    return (
        <div className={b('item')} key={item.id} onClick={(event) => {handleClick(event)}}>
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
                onClose={(event) => handleClose(event)}
                style={{backgroundColor: 'rgba(20,20,20, 0.15)'}}
            >
                <div className="container-title">
                    <Text className={'item-title'}>{item.description}</Text>
                    <div className={'invent-number'}>
                        <span className="first">{item.name.slice(0, 2)}</span>
                        <span className="second">{item.name.slice(2, -1)}</span>
                    </div>
                </div>
                <div className={'section-image'}>
                    {
                        image ?
                            <img src={image} className={'image'} />
                            :
                            <Text variant='display-4' style={{opacity: '0.3'}}>ФОТО</Text>
                    }
                </div>
                <div className="section-time">
                    <img src={clock} className={'icon'} alt="Время старта аренды" />
                    <input
                        value={hours}
                        className={'time'}
                        onChange={(event) => {
                            const value: number = parseInt(event.target.value)
                            if (value >= 0 && value < 24 || !value)
                                setHours(clearInputValue(event.target.value))
                        }
                        }
                    />
                    <p className={'separator'}>:</p>
                    <input
                        value={minutes}
                        className={'time'}
                        onChange={(event) => {
                            const value: number = parseInt(event.target.value)
                            if (value >= 0 && value < 60 || !value)
                                setMinutes(clearInputValue(event.target.value))
                        }}
                    />
                </div>
                <div className="btn-rent" onClick={onSubmit}>СДАТЬ</div>
            </Modal>
        </div>
    )
}