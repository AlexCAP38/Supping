import React, {FC, useEffect, useState} from "react";
import block from 'bem-cn-lite';
import {Button, Modal, TextInput, Text} from '@gravity-ui/uikit';
import noPhoto from '@assets/no-photo.svg';
import wallet from '@assets/icon_vallet.svg';
import {RentItem} from "@services/types";

import './Item.scss';

const b = block('item-container');

interface IItemProps {
    rentItem: RentItem;
}

type TimeRent = {
    start: string,
    end: string,
    total: string
}

export const Item: FC<IItemProps> = ({rentItem}) => {
    const formatter = new Intl.NumberFormat('ru', {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0
    });
    const {item, startTime, endTime, rentTime, rentCost} = rentItem;
    const [timeRent, setTimeRent] = useState<TimeRent>({
        start: '',
        end: '',
        total: ''
    });

    useEffect(() => {
        setTimeRent(getTimeRent(startTime, endTime, rentTime));
    }, [rentItem])


    function getTimeRent(startTime: string, endTime: string, rentTime: number) {
        let parseRentTime = '';
        let start = new Date(Date.parse(startTime));
        let end = new Date(Date.parse(endTime));
        if (rentTime / 60 <= 59) {
            parseRentTime = `${Math.ceil(rentTime / 60)}мин`;
        } else {
            parseRentTime = `${Math.ceil(rentTime / 3600)}ч`;
        }
        return {
            start: `${start.getHours()}:${start.getMinutes()}`,
            end: `${end.getHours()}:${end.getMinutes()}`,
            total: `${parseRentTime}`
        }
    }


    return (
        <div className={b()}>
            <div className={b('section-main')}>
                <div className={b('info-container')}>
                    <img src={item.image ? item.image : noPhoto} />
                    <div className={b('section-info')}>
                        <Text className={b('name-item')}>{item.name}</Text>
                        <Text className={b('time')}>
                            {`${timeRent.start} - ${timeRent.end} = ${timeRent.total}`}</Text>
                    </div>
                </div>
                <TextInput
                    className={b('input-comment')}
                    size="xl"
                    pin="brick-round"
                />
            </div>

            <div className={b('section-price')}>
                <Text className={b('id-item')}>
                    <Text variant="display-2">{item.number.toString()[0]}</Text>
                    {item.number.toString().slice(1)}
                </Text>
                <div>
                    <img src={wallet} />
                    {/* TODO убрать все функици это безобразие  */}
                    <Text className={b('summa')}>{`${formatter.format(
                        Math.ceil(rentCost))
                        }`}</Text>
                </div>
                <TextInput
                    className={b('input')}
                    placeholder="..."
                    view="clear"
                    size="xl"
                />
            </div>
        </div>
    )
}