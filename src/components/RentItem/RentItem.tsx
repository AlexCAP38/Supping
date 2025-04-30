import './RentItem.scss';
import block from 'bem-cn-lite';
import React, {FC, useContext, useEffect, useState} from "react";
import {Text} from '@gravity-ui/uikit';
import noPhoto from '@assets/no-photo.png';
import battery from '@assets/Battery_low.svg';
import wallet from '@assets/wallet.png';
import {RentItem as RItem, StatusItem} from "@services/types";
import {api} from "@services/api";
import {AppContext} from '@context/Context';
import {getCachedImage} from '@context/IndexDB';

const b = block('rent-item');

interface RentItemProps {
    rentItem: RItem;
}

type TimeRent = {
    start: string,
    end: string,
    total: string
}

export const RentItem: FC<RentItemProps> = ({rentItem}) => {
    const {state: {rentItems}, setState} = useContext(AppContext);
    const {item, startTime, endTime, rentTime, rentCost, status, description, item: {lowEnergy}, rentCostFact} = rentItem;

    const [visibilityBlockDescription, setVisibilityBlockDescription] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [inputDescription, setInputDescription] = useState('');
    const [inputGetMoney, setInputGetMoney] = useState(rentCost.toString());
    const [image, setImage] = useState<string>(noPhoto);
    const [timeRent, setTimeRent] = useState<TimeRent>({start: '', end: '', total: ''});

    //устанавливаем время в стайте дял удобства и определяем показывать секцию с описание и полученной суммой
    useEffect(() => {
        setTimeRent(getTimeRent(startTime, endTime, rentTime));
        if (description && rentCostFact !== 0) setVisibilityBlockDescription(false)
        getImage(rentItem.item.image)
    }, [rentItem])

    //извлекаем время
    function getTimeRent(startTime: string, endTime: string, rentTime: number) {
        let parseRentTime = '';
        let start = new Date(Date.parse(startTime));
        let end: string;

        if (endTime) {
            let data = new Date(Date.parse(endTime));
            end = `${data.getHours()}:${data.getMinutes()}`;
        } else end = '...'

        if (rentTime === 0) {
            parseRentTime = '...'
        } else if (rentTime / 60 <= 59) {
            parseRentTime = `${Math.ceil(rentTime / 60)} мин`;
        } else {
            parseRentTime = `${Math.ceil(rentTime / 3600)} ч`;
        }

        return {
            start: `${start.getHours()}:${start.getMinutes()}`,
            end: end,
            total: `${parseRentTime}`
        }
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

    //   Ручное обновление статуса
    function returnNewItemsList(ItemWithNewStatus: RItem) {
        const newList = rentItems.map(item => item.id === ItemWithNewStatus.id ? ItemWithNewStatus : item)
        return newList;
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
                // onClick={(event) => handleClick(event)}
            >
                <div className={b('section-info')}>
                    <img className={b('image')} src={image} />
                    <div className={b('section-title')}>
                        <Text className={b('name')}>{item.description}</Text>
                        <Text className={b('time')}>
                            {`${timeRent.start} - ${timeRent.end} = ${timeRent.total}`}</Text>
                    </div>
                </div>

                <div className={b('section-price', `${checkStatus(status)}`)}>
                    <Text className={b('id-item')}>
                        <div className='number'>
                            <span className="first">{item.name.slice(0, 2)}</span>
                            <span className="second">{item.name.slice(2, -1)}</span>
                        </div>
                    </Text>
                    <div className={b('separator')}></div>
                    <div className={b('cost')}>
                        <img src={wallet} />
                        <Text className={b('summa')}>{
                            status === 'PAY' ? rentCostFact : rentCost
                        }</Text>
                    </div>
                    <img className={b('battery', {show: lowEnergy})} src={battery} />
                </div>
            </div>

            <div className={b('section-description', {hidden: visibilityBlockDescription})}>
                {description}
            </div>
        </div>
    )
}