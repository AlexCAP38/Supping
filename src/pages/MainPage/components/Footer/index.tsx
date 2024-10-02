import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import block from 'bem-cn-lite';
import {Button, Card, Modal, Text, Spin} from '@gravity-ui/uikit';

import './Footer.scss';

const b = block('footer-container');

// type FooterProps = {
//     userActive: string;
// }

// export const Footer: FC<FooterProps> = ({userActive}) => {
export const Footer: FC = () => {


    return (
        <Card className={b()}>
            <Text className={b('text')}>СДАТЬ</Text>
        </Card>
    )
}