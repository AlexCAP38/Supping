import './Loader.scss';

import block from 'bem-cn-lite';
import React, {FC, useContext, useEffect, useState} from 'react';

const b = block('loader');

interface Props { }

export const Loader: FC<Props> = ({ }) => {

    return (
        <div className={b()}>
            <div className={'content'}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}