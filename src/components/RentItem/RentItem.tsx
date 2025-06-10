import './RentItem.scss';
import block from 'bem-cn-lite';
import React, {FC, useEffect, useState} from "react";
import {Text} from '@gravity-ui/uikit';
import noPhoto from '@assets/no-photo.png';
import battery from '@assets/Battery_low.svg';
import wallet from '@assets/wallet.png';
import {RentItem as RItem, StatusItem} from "@services/types";
import {getCachedImage} from '@context/IndexDB';
import {RentModal} from './components/RentModal/RentModal';

const b = block('rent-item');

interface RentItemProps {
    rentItem: RItem;
    closeItem: React.MutableRefObject<boolean>
}

export const RentItem: FC<RentItemProps> = ({rentItem, closeItem}) => {
    const {item, startTime, endTime, rentTime, rentCost, status, description, item: {lowEnergy, type}, rentCostFact} = rentItem;
    //метка есть ли датчик у инвентаря
    const {auto} = type ?? {}
    const [showModal, setShowModal] = useState(false);

    const [visibilityBlockDescription, setVisibilityBlockDescription] = useState(true);
    const [image, setImage] = useState<string>(noPhoto);

    //устанавливаем время в стайте дял удобства и определяем показывать секцию с описание и полученной суммой
    useEffect(() => {
        if (description && rentCostFact !== 0) setVisibilityBlockDescription(false)
        getImage(rentItem.item.image || '')
    }, [rentItem])

    //извлекаем время
    function returnTimeRent() {

        const startHours = new Date(startTime).getHours().toString().padStart(2, '0');
        const startMinutes = new Date(startTime).getMinutes().toString().padStart(2, '0');

        const finishedTime = !endTime ? '...' :
            `${new Date(endTime).getHours().toString().padStart(2, '0')}:${new Date(endTime).getMinutes().toString().padStart(2, '0')}`

        const totalTime = (rentTime === 0 || !rentTime) ? '...' :
            (rentTime / 60 <= 59) ? `${Math.ceil(rentTime / 60)} мин` :
                `${Math.ceil(rentTime / 3600)} ч`;

        return `${startHours}:${startMinutes} - ${finishedTime} = ${totalTime}`
    }

    function checkStatus(status: StatusItem) {
        switch (status) {
            case 'NO_PAY':
                return 'no-pay'
                break;
            case 'PAY':
                return 'pay'
                break;
            case 'NEW':
                return 'new'
                break;
        }
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        !closeItem.current && setShowModal(true);
    }

    async function getImage(id: string) {
        let image: string;
        if (id) {
            image = await getCachedImage(id);

            if (image) setImage(image)
        }

    }

    return (
        <div className={b()}>
            <div
                className={b('section-item')}
                onClick={(event) => handleClick(event)}
            >
                <div className={b('section-info')}>
                    <img className={b('image')} src={image} />
                    <div className={b('section-title')}>
                        <Text className={b('name')}>
                            {item.type?.name}
                            <br/>
                            {item.description}
                            </Text>
                        <Text className={b('time')}>
                            {returnTimeRent()}</Text>
                    </div>
                </div>

                <div className={b('section-price', `${checkStatus(status)} `)}>
                    <Text className={b('id-item')}>
                        <div className='number'>
                            <span className="first">{item.name?.slice(0, 2)}</span>
                            <span className="second">{item.name?.slice(2)}</span>
                        </div>
                    </Text>
                    <div className={b('separator')}></div>
                    <div className={b('cost')}>
                        <img src={wallet} />
                        <Text className={b('summa')}>{
                            status === 'PAY' ? rentCostFact : rentCost
                        }</Text>
                    </div>
                    <img className={b('battery', {show: lowEnergy && !!auto})} src={battery} />
                </div>
            </div>

            <div className={b('section-description', {hidden: visibilityBlockDescription})}>
                {description}
            </div>
            {
                (showModal && !closeItem.current) &&
                <RentModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    idRentItem={rentItem.id}
                    closeRef={closeItem}
                />
            }
        </div>
    )
}