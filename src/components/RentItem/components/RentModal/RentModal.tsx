import './RentModal.scss';
import block from 'bem-cn-lite';

import {Text, Modal, TextArea, TextInput} from '@gravity-ui/uikit';
import clock from '@assets/clock.svg'
import {clearInputValue} from '@utils/ClearInputNumber';
import {api} from '@services/api';
import React, {FC, useContext, useEffect, useState} from 'react';
import wallet from '@assets/wallet.svg';
import preCostImg from '@assets/prepaid.svg';
import preCostImgRed from '@assets/prepaid-red.svg';
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
    const [endRent, setEndRent] = useState<Time>(initTime);
    const [blockInputEndTimeRent, setBlockInputEndTime] = useState(false);

    const [inputDescription, setInputDescription] = useState('');
    const [inputGetMoney, setInputGetMoney] = useState('');

    //Инвентарь в аренде, имеет статус ACTIVE
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

            setInputGetMoney(item?.totalRentCost?.toString() || '')
            setInputDescription(item?.description || '')
            setBlockInputEndTime(item?.status === 'PAID' || item?.status === 'WAIT_PAYMENT')
        }

    }, [item])

    function handlePay(event: React.MouseEvent) {
        event.stopPropagation();
        if (!item?.id) return;

        api.v1.paymentRent(item.id,
            {
                description: inputDescription,
                paid: parseFloat(inputGetMoney),
            })
            .then((response) => {
                setState({
                    options: {
                        ...state.options,
                        reloadPage: true
                    }
                })
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
                setItem(response.data);
                setState({
                    options: {
                        ...state.options,
                        reloadPage: true
                    }
                })
                setShowModal(false);
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
        !item ? (
            null
        ) : (
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
                            inputMode='numeric'
                            type='text'
                            disabled={blockInputEndTimeRent}
                            value={endRent?.hour || ''}
                            className={b('input-time', {border: blockInputEndTimeRent})}
                            onChange={(event) => {
                                const value: number = parseInt(event.target.value)
                                if ((value >= 0 && value < 24) || !value) {
                                    setEndRent(prevState => ({
                                        ...prevState,
                                        hour: value.toString().padStart(2, '0')
                                    }))
                                }
                            }}
                        />
                        <p className={'separator'}>:</p>
                        <input
                            inputMode='numeric'
                            type='text'
                            disabled={blockInputEndTimeRent}
                            value={endRent?.minute}
                            className={b('input-time', {border: blockInputEndTimeRent})}
                            onChange={(event) => {
                                const value: number = parseInt(event.target.value)
                                if ((value >= 0 && value < 60) || !value) {
                                    setEndRent(prevState => ({
                                        ...prevState,
                                        minute: value.toString().padStart(2, '0')
                                    }))
                                }
                            }}
                        />
                    </div>

                    <div className={b("section-money")}>
                        <div className={b('precost')}>
                            <img className={b('icon-wallet')} src={item?.preRentCost ? preCostImgRed : preCostImg} />
                            <p className={b('content', {color: Boolean(item?.preRentCost)})}>{item?.preRentCost || 0}</p>
                        </div>
                        <div className={b('rentcost')}>
                            <img className={b('icon-wallet')} src={wallet} />
                            <input className={b('input-money', {bgcolor: itemStatus})}
                                inputMode='numeric'
                                type='text'
                                value={inputGetMoney.toString()}
                                onChange={(event) => setInputGetMoney(clearInputValue(event.target.value))}
                                disabled={itemStatus}
                            />
                        </div>
                    </div>
                    {
                        itemStatus ?
                            <div className={b("btn", {margin: true})} onClick={(event) => handleStopPay(event)}>
                                Остановить аренду
                            </div>
                            :
                            <>
                                <TextArea className={b('comment')}
                                    view='clear'
                                    minRows={2}
                                    maxRows={2}
                                    placeholder={'Комментарий'}
                                    size="xl"
                                    value={inputDescription}
                                    onUpdate={(value) => setInputDescription(value)}
                                    disabled={itemStatus}
                                />
                                <div className={b("btn")} onClick={(event) => handlePay(event)}>
                                    {item?.status === 'PAID' ? 'Обновить' : 'Оплачено'}
                                </div>
                            </>
                    }
                </div>
            </Modal>
        )
    )
}