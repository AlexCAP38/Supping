import React, {FC, useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import block from 'bem-cn-lite';
import {Button, Card, Modal, Text, Spin} from '@gravity-ui/uikit';

import './Footer.scss';

const b = block('footer');

export const Footer: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const route = {
        mainpage: {
            route: '/',
            action: 'СДАТЬ'
        },
        inventorypage: {
            route: '/inventory',
            action: 'ВЕРНУТЬСЯ'
        }
    }


    function handleClick() {
        location.pathname === '/' ? navigate(route.inventorypage.route): navigate(route.mainpage.route);
    }

    return (
        <div className={b()} onClick={() => handleClick()}>
            <Text className={b('text')}>{location.pathname === '/' ? route.mainpage.action : route.inventorypage.action}</Text>
        </div>
    )
}