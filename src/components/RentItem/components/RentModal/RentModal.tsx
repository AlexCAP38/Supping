import './RentModal.scss';
import block from 'bem-cn-lite';

import {Text, Modal, TextArea, TextInput} from '@gravity-ui/uikit';
import clock from '@assets/clock.svg'
import {clearInputValue} from '@utils/ClearInputNumber';
import {api} from '@services/api';
import React, {FC, useContext, useEffect, useState} from 'react';
import wallet from '@assets/wallet.png';
import {AppContext} from '@context/Context';
import {ApiRentResponse} from '@services/supping-api';

const b = block('rent-modal');

interface RentModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    idRentItem: string;
}

interface Time {
    hour: string,
    minute: string
};

const initTime: Time = {hour: '', minute: ''};

export const RentModal: FC<RentModalProps> = ({showModal, setShowModal, idRentItem}) => {
    const {state, setState} = useContext(AppContext);
    const [item, setItem] = useState<ApiRentResponse | undefined>(undefined)

    const [startRent, setStartRent] = useState<Time>(initTime);
    const [endRent, setEndRent] = useState<Time>(initTime);;

    const [inputDescription, setInputDescription] = useState('');
    const [inputGetMoney, setInputGetMoney] = useState('');

    const [isLoad, setIsLoad] = useState(false);

    const itemStatus = item?.status === 'ACTIVE' ? true : false;

    //Получение информации об аренде
    useEffect(() => {
        //ДОБАВИТЬ ЛОАДЕР

        api.v1.getRentItem(idRentItem)
            .then((response) => {
                const item = response.data;
                setItem(item);
            })
            .catch((error) => console.log('Не могу получить информацию о аренде', error))
    }, [idRentItem])

    useEffect(() => {
        if (item?.startTime) {
            const time = new Date(parseFloat(item?.startTime) * 1000);

            setStartRent({
                hour: time.getHours().toString().padStart(2, '0'),
                minute: time.getMinutes().toString().padStart(2, '0')
            });

            if (item.status === 'WAIT_PAYMENT' || item.status === 'PAID') {
                setEndRent({
                    hour: new Date(parseFloat(item.endTime || '') * 1000).getHours().toString().padStart(2, '0'),
                    minute: new Date(parseFloat(item.endTime || '') * 1000).getMinutes().toString().padStart(2, '0')
                });

            } else setEndRent({
                hour: new Date().getHours().toString().padStart(2, '0'),
                minute: new Date().getMinutes().toString().padStart(2, '0')
            });

            setInputGetMoney(item?.rentCost?.toString() || '')
            setInputDescription(item?.description || '')
        }

    }, [item])

    function handlePay(event: React.MouseEvent) {
        event.stopPropagation();
        if (!item?.id) return;

        setIsLoad(true)
        api.v1.paymentRent(item.id,
            {
                description: inputDescription,
                paid: parseFloat(inputGetMoney)
            })
            .then((response) => {
                setState({
                    options: {
                        ...state.options,
                        reloadPage: true
                    }
                })
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
        if (!item?.id) return;

        //На сервер отправляем в UTC формате
        const stopTime = new Date();
        stopTime.setHours(parseInt(endRent.hour), parseInt(endRent.minute), 0, 0);

        api.v1.stopRent(item.id, {endTime: stopTime.toISOString()})
            .then((response) => {
                setItem(response.data)
            })
            .catch((error) => {
                //TODO сделать нормальное предупреждение об ошибке
                console.log(`Ошибка при остановке аренды`, error);
            })
    }

    function handleClose(event: MouseEvent | KeyboardEvent) {
        setState({
            options: {
                ...state.options,
                closingModal: true
            }
        })

        event.stopPropagation();

        setShowModal(false);

        setTimeout(() => {
            setState({
                options: {
                    ...state.options,
                    closingModal: false
                }
            })
        }, 100);
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
                    <Text className={'title'}>{item?.item?.description}</Text>
                    <div className={'invent-number'}>
                        <span className="first-letters">{item?.item?.name?.slice(0, 2)}</span>
                        <span className="second-letters">{item?.item?.name?.slice(2, -1)}</span>
                    </div>
                </div>

                <div className="section-time">
                    <img src={clock} className={'icon'} alt="Время старта аренды" />
                    <p className={'start-time'}>{startRent?.hour}</p>
                    <p className={'separator'}>:</p>
                    <p className={'start-time'}>{startRent?.minute}</p>
                    <div className="minus-separator"></div>
                    <input
                        disabled={item?.status === 'PAID' || item?.status === 'WAIT_PAYMENT'}
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
                        disabled={item?.status === 'PAID' || item?.status === 'WAIT_PAYMENT'}
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
                    <div className={b('precost', {visible: !item?.preRentCost})}>{`Предоплата: ${item?.preRentCost} руб`}</div>
                    <div className={b('rentcost')}>
                        <img className={b('icon-wallet')} src={wallet} />
                        <TextInput className={b('input-money', {bgcolor: itemStatus})}
                            view='clear'
                            size="xl"
                            value={inputGetMoney.toString()}
                            onUpdate={(value) => setInputGetMoney(clearInputValue(value))}
                            disabled={itemStatus}
                        />
                    </div>
                </div>

                <TextArea className={b('comment')}
                    view='clear'
                    minRows={3}
                    maxRows={3}
                    placeholder={'Комментарий'}
                    size="xl"
                    value={inputDescription}
                    onUpdate={(value) => setInputDescription(value)}
                    disabled={itemStatus}
                />
                {
                    item?.status === 'ACTIVE' ?
                        <div className="btn" onClick={(event) => handleStopPay(event)}>
                            Остановить аренду
                        </div>
                        :
                        <div className="btn" onClick={(event) => handlePay(event)}>
                            {item?.status === 'PAID' ? 'Обновить' : 'Оплатить'}
                        </div>
                }
            </div>
        </Modal>
    )
}