import './RentItem.scss';
import block from 'bem-cn-lite';
import React, {FC, useContext, useEffect, useState} from "react";
import {Text} from '@gravity-ui/uikit';
import noPhoto from '@assets/no-photo.png';
import battery from '@assets/Battery_low.svg';
import wallet from '@assets/wallet.png';
import {StatusItem} from "@services/types";
import {getCachedImage} from '@context/IndexDB';
import {RentModal} from './components/RentModal/RentModal';
import {AppContext} from '@context/Context';
import {ApiRentResponse} from '@services/supping-api';

const b = block('rent-item');

interface RentItemProps {
    rentItem: ApiRentResponse;
}

export const RentItem: FC<RentItemProps> = ({rentItem}) => {
    const {state, setState} = useContext(AppContext);
    const {closingModal} = state.options;
    const {item = {},
        startTime = '',
        endTime = '',
        rentTime = 0,
        rentCost = 0,
        status = undefined,
        description = '',
        rentCostFact = 0} = rentItem;

    const {lowEnergy = false,
        type = {},
        image: imageItem = ''} = item;
    const {auto = false} = type; //метка есть ли датчик у инвентаря
    const [showModal, setShowModal] = useState(false);

    const [visibilityBlockDescription, setVisibilityBlockDescription] = useState(true);
    const [image, setImage] = useState<string>(noPhoto);

    //устанавливаем время в стайте дял удобства и определяем показывать секцию с описание и полученной суммой
    useEffect(() => {
        if (description && rentCostFact !== 0) setVisibilityBlockDescription(false)
        getImage(imageItem)
    }, [rentItem])

    //извлекаем время
    function returnTimeRent() {

        const startHours = new Date(parseFloat(startTime) * 1000).getHours().toString().padStart(2, '0');
        const startMinutes = new Date(parseFloat(startTime) * 1000).getMinutes().toString().padStart(2, '0');

        const endHours = new Date(parseFloat(endTime) * 1000).getHours().toString().padStart(2, '0');
        const endMinutes = new Date(parseFloat(endTime) * 1000).getMinutes().toString().padStart(2, '0');

        const finishedTime = !endTime ? '...' : `${endHours}:${endMinutes}`

        const totalTime = (rentTime === 0 || !rentTime) ? '...' :
            (rentTime / 60 <= 59) ? `${Math.ceil(rentTime / 60)} мин` :
                `${Math.ceil(rentTime / 3600)} ч`;

        return status === 'HOLD' ? `Предоплата ${rentItem.preRentCost}` : `${startHours}:${startMinutes} - ${finishedTime} = ${totalTime}`
    }

    function checkStatus(status: StatusItem) {
        switch (status) {
            case 'WAIT_PAYMENT':
                return 'wait-payment'
                break;
            case 'PAID':
                return 'paid'
                break;
            case 'HOLD':
                return 'hold'
                break;
            case 'ACTIVE':
                return 'active'
                break;
        }
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        !closingModal && setShowModal(true);
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
                            <br />
                            {item?.description}
                        </Text>
                        <Text className={b('time')}>
                            {returnTimeRent()}</Text>
                    </div>
                </div>

                <div className={b('section-price', `${checkStatus(status)} `)}>
                    <Text className={b('id-item')}>
                        <div className='number'>
                            <span className="first">{item?.name?.slice(0, 2)}</span>
                            <span className="second">{item?.name?.slice(2)}</span>
                        </div>
                    </Text>
                    <div className={b('separator')}></div>
                    <div className={b('cost')}>
                        <img src={wallet} />
                        <Text className={b('summa')}>{
                            status === 'PAID' ? rentCostFact : rentCost
                        }</Text>
                    </div>
                    <img className={b('battery', {show: lowEnergy && !!auto})} src={battery} />
                </div>
            </div>

            <div className={b('section-description', {hidden: visibilityBlockDescription})}>
                {description}
            </div>
            {
                (status !== 'HOLD' && showModal && !closingModal) &&
                <RentModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    idRentItem={rentItem.id!}
                />
            }
        </div>
    )
}