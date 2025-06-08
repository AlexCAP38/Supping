import './RentModal.scss';
import block from 'bem-cn-lite';

import {Text, Modal, TextArea, TextInput} from '@gravity-ui/uikit';
import clock from '@assets/clock.svg'
import {clearInputValue} from '@utils/ClearInputNumber';
import {api} from "@services/api";
import React, {FC, useEffect, useState} from 'react';
import {RentItem as RItem, } from "@services/types";
import wallet from '@assets/wallet.png';

const b = block('rent-modal');

interface RentModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    idRentItem: string;
    closeRef: React.MutableRefObject<boolean>;
}

export const RentModal: FC<RentModalProps> = ({showModal, setShowModal, idRentItem, closeRef}) => {
    const [item, setItem] = useState<RItem | undefined>(undefined)
    const [startRent, setStartRent] = useState<{hour: string, minute: string}>({hour: '', minute: ''});
    const [endRent, setEndRent] = useState<{hour: string, minute: string}>({hour: '', minute: ''});;
    const [isLoad, setIsLoad] = useState(false);
    const [inputDescription, setInputDescription] = useState('');
    const [inputGetMoney, setInputGetMoney] = useState('');


    //Получение информации об аренде
    useEffect(() => {
        //ДОБАВИТЬ ЛОАДЕР

        api.v1.getRentItem(idRentItem)
            .then((response) => {
                const item = response.data as RItem;
                setItem(item);
            })
            .catch((error) => console.log('Не могу получить информацию о аренде', error))
    }, [idRentItem])

    useEffect(() => {
        if (item?.startTime) {
            const time = new Date(item?.startTime);

            setStartRent({
                hour: time.getHours().toString().padStart(2, '0'),
                minute: time.getMinutes().toString().padStart(2, '0')
            });

            setEndRent({
                hour: new Date().getHours().toString().padStart(2, '0'),
                minute: new Date().getMinutes().toString().padStart(2, '0')
            });

            setInputGetMoney(item?.rentCost.toString() || '')
        }

    }, [item])

    function handlePay(event: React.MouseEvent) {
        event.stopPropagation();
        if (!item) return;

        setIsLoad(true)
        api.v1.setStatusPay(item.id,
            {
                description: inputDescription,
                paid: parseFloat(inputGetMoney)
            })
            .then((response) => {
                // setState({rentItems: returnNewItemsList(response.data as RItem)})
                setIsLoad(false)
                setShowModal(false);
            })
            .catch((error) => {
                //TODO сделать нормальное предупреждение об ошибке
                console.log(`Ошибка при завершение аренды`, error);
            })
    }

    function handleStopPay(event: React.MouseEvent) {
        event.stopPropagation();
        if (!item) return;

        //На сервер отправляем в UTC формате
        const stopTime = new Date();
        stopTime.setHours(parseInt(endRent.hour), parseInt(endRent.minute), 0, 0);

        api.v1.stopRent(item.id, {endTime: stopTime.toISOString()})
            .then((response) => {
                setIsLoad(false)
                setShowModal(false);
            })
            .catch((error) => {
                //TODO сделать нормальное предупреждение об ошибке
                console.log(`Ошибка при остановке аренды`, error);
            })
    }

    function handleClose(event: MouseEvent | KeyboardEvent) {
        closeRef.current = true;
        event.stopPropagation();

        setShowModal(false);

        setTimeout(() => {
            closeRef.current = false;
        }, 150);

        // setInputGetMoney(item?.rentCost.toString() || '');
        // setInputDescription('');
    }

    return (
        <Modal
            open={showModal}
            onClose={(event) => handleClose(event)}
            style={{
                backgroundColor: 'rgba(20,20,20, 0.15)',
            }}
        >
            <div className={b('modal-container')}>
                <div className="section-title">
                    <Text className={'title'}>{item?.item.description}</Text>
                    <div className={'invent-number'}>
                        <span className="first-letters">{item?.item.name?.slice(0, 2)}</span>
                        <span className="second-letters">{item?.item.name?.slice(2, -1)}</span>
                    </div>
                </div>

                <div className="section-time">
                    <img src={clock} className={'icon'} alt="Время старта аренды" />
                    <p className={'start-time'}>{startRent?.hour}</p>
                    <p className={'separator'}>:</p>
                    <p className={'start-time'}>{startRent?.minute}</p>
                    <div className="minus-separator"></div>
                    <input
                        value={endRent?.hour || ''}
                        className={'input-time'}
                        onChange={(event) => {
                            const value: number = parseInt(event.target.value)
                            if (value >= 0 && value < 24 || !value) {
                                setEndRent(prevState => ({
                                    ...prevState,
                                    hour: value.toString().padStart(2, '0')
                                }))
                            }
                        }}
                    />
                    <p className={'separator'}>:</p>
                    <input
                        value={endRent?.minute}
                        className={'input-time'}
                        onChange={(event) => {
                            const value: number = parseInt(event.target.value)
                            if (value >= 0 && value < 60 || !value) {
                                setEndRent(prevState => ({
                                    ...prevState,
                                    minute: value.toString().padStart(2, '0')
                                }))
                            }
                        }}
                    />
                </div>

                <div className={b("section-money")}>
                    <img className={b('icon-wallet')} src={wallet} />
                    <TextInput className={b('modal-input')}
                        view='clear'
                        size="xl"
                        value={inputGetMoney.toString()}
                        onUpdate={(value) => setInputGetMoney(clearInputValue(value))}
                        disabled={item?.status === 'NEW'}
                    />
                </div>

                <TextArea className={b('modal-comment')}
                    view='clear'
                    minRows={3}
                    maxRows={3}
                    placeholder={'Комментарий'}
                    size="xl"
                    onUpdate={(value) => setInputDescription(value)}
                    disabled={item?.status === 'NEW'}
                />
                {
                    item?.status === 'NEW' ?
                        <div className="btn-rent" onClick={(event) => handleStopPay(event)}>
                            Остановить аренду
                        </div>
                        :
                        <div className="btn-rent" onClick={(event) => handlePay(event)}>
                            Завершить
                        </div>
                }
            </div>
        </Modal>
    )
}