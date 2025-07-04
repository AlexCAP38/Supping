import './InventItem.scss';
import block from 'bem-cn-lite';
import React, {FC, useContext, useRef, useState} from "react";
import {ApiItemResponse} from '@services/supping-api';
import {InventModal} from './components/InventModal/InventModal';
import {AppContext} from '@context/Context';

const b = block('item-container');

interface InventItemProps {
    item: ApiItemResponse;
}

export const InventItem: FC<InventItemProps> = ({item}) => {
    const {state: {options: {closingModal}}, setState} = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {

        if (closingModal) return;

        event.stopPropagation();

        if (!showModal) {
            setShowModal(true);
        }
    }

    return (
        <>
            <div className={b('item')} key={item.id} onClick={(event) => {handleClick(event)}}>
                <div className='name'>{`${item?.type?.name} ${item.description}`}</div>
                <div>
                    <div className='number'>
                        <span className="first">{item?.name?.slice(0, 2)}</span>
                        <span className="second">{item?.name?.slice(2)}</span>
                    </div>
                </div>
                <div className='cost'>{item?.type?.cost}</div>
                <div className='cost'>{item?.type?.cost}</div>
                <div className='cost'>{item?.type?.cost}</div>
            </div>
            {showModal && <InventModal
                showModal={showModal}
                setShowModal={setShowModal}
                item={item}
            />}
        </>
    )
}