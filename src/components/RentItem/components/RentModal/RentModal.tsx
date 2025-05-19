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
}

export const RentModal: FC<RentModalProps> = ({showModal, setShowModal, idRentItem}) => {
    const [item, setItem] = useState<RItem | undefined>(undefined)
    const [startRent, setStartRent] = useState<{hour: number, minute: number} | undefined>(undefined);
    const [endRent, setEndRent] = useState<{hour: number, minute: number} | undefined>(undefined);;
    const [isLoad, setIsLoad] = useState(false);
    const [inputDescription, setInputDescription] = useState('');
    const [inputGetMoney, setInputGetMoney] = useState('');

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
        const time = new Date(item?.startTime || '')

        setStartRent({
            hour: time.getHours(),
            minute: time.getHours()
        });

        setEndRent({
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        });
        setInputGetMoney(item?.rentCost.toString() || '')
    }, [item])

    function handlePay() {
        if (!item) return;

        api.v1.stopRent(item.id, {})

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




    function handleClose(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();

        setShowModal(false);

        setInputGetMoney(item?.rentCost.toString() || '');
        setInputDescription('');
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
                        <span className="first-letters">{item?.item.name.slice(0, 2)}</span>
                        <span className="second-letters">{item?.item.name.slice(2, -1)}</span>
                    </div>
                </div>

                <div className="section-time">
                    <img src={clock} className={'icon'} alt="Время старта аренды" />
                    <p className={'start-time'}>{startRent?.hour}</p>
                    <p className={'separator'}>:</p>
                    <p className={'start-time'}>{startRent?.minute}</p>
                    <div className="minus-separator"></div>
                    <input
                        value={endRent?.hour}
                        className={'input-time'}
                        onChange={(event) => {
                            const value: number = parseInt(event.target.value)
                            if (value >= 0 && value < 24 || !value) {
                                // setHours(clearInputValue(event.target.value))
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
                                // setMinutes(clearInputValue(event.target.value))
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
                    />
                </div>

                <TextArea className={b('modal-comment')}
                    view='clear'
                    minRows={3}
                    maxRows={3}
                    placeholder={'Комментарий'}
                    size="xl"
                    onUpdate={(value) => setInputDescription(value)} />
                <div className="btn-rent" onClick={(event) => {
                    event.stopPropagation();
                    handlePay();
                }}>
                    Завершить
                </div>
                {/* <Button className={b('modal-btn')}
            size="xl"
            disabled={inputGetMoney.length === 0 ? true : false}
            selected={inputGetMoney.length !== 0 ? true : false}
            loading={isLoad}
            onClick={(event) => {
                event.stopPropagation();
                handlePay();
            }}
        >Завершить</Button> */}
            </div>
        </Modal>



    )

}