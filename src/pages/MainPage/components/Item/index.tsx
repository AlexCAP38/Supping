import React, {FC} from "react";
import block from 'bem-cn-lite';
import {Button, Modal, TextInput, Text} from '@gravity-ui/uikit';
import noPhoto from '@assets/no-photo.svg';
import wallet from '@assets/icon_vallet.png';
import { IItem } from "@services/api";

import './Item.scss';

const b = block('item-container');

interface IItemProps {
    item: IItem; // Интерфейс IItem должен описывать структуру данных item
  }

export const Item: FC<IItemProps> = ({item}) => {
    return (
        <div className={b()}>
            <div className={b('section-main')}>
                <div className={b('info-container')}>
                    <img src={item.image ? item.image : noPhoto} />
                    <div className={b('section-info')}>
                        <Text className={b('name-item')}>{item.name} - 12’2” - Aqua Marina Super Trip</Text>
                        <Text className={b('time')}>14:00 - 15:00 = 1ч</Text>
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
                    <Text variant="display-2">5</Text>
                    598623598
                </Text>
                <div>
                    <img src={wallet} />
                    <Text className={b('summa')}>2500</Text>
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