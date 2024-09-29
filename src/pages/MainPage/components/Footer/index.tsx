import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import block from 'bem-cn-lite';
import {Button, Card, Modal, Text, Spin} from '@gravity-ui/uikit';

import './Footer.scss';

const b = block('footer-container');

type FooterProps = {
    userActive: string;
}

export const Footer: FC<FooterProps> = ({userActive}) => {
    const date = new Date(); // Текущая дата

    const day = date.getDate(); // Получаем день
    const month = date.getMonth() + 1; // Получаем месяц (нужно прибавить 1)
    const year = date.getFullYear(); // Получаем год

    return (
        <Card className={b()}>
            <Text className={b('text')}>{day}.{month}.{year}</Text>
            {userActive ?
                <Link to='/supping/user'>
                    <Text className={b('text')}>{userActive}</Text>
                </Link>
                :
                <Spin size="xs" />
            }
        </Card>
    )
}