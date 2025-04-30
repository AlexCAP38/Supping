import './RentModal.scss';
import block from 'bem-cn-lite';

import {Text, Modal, TextArea, TextInput, Button} from '@gravity-ui/uikit';
import clock from '@assets/clock.svg'
import {clearInputValue} from '@utils/ClearInputNumber';
import {api} from "@services/api";
import {useEffect, useState} from 'react';

export const RentModal = () => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setHours(new Date().getHours().toString())
        setMinutes(new Date().getMinutes().toString())
    }, [showModal])


    function handlePay() {

        api.v1.stopRent(rentItem.id, {})

        setIsLoad(true)
        api.v1.setStatusPay(rentItem.id,
            {
                description: inputDescription,
                paid: parseFloat(inputGetMoney)
            })
            .then((response) => {
                setState({rentItems: returnNewItemsList(response.data as RItem)})
                setIsLoad(false)
                setShowModal(false);
            })
            .catch((error) => {
                //TODO сделать нормальное предупреждение об ошибке
                console.log(`Ошибка при завершение аренды`, error);
            })
    }


    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        setShowModal(true);
    }

    function handleClose(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();

        setShowModal(false);

        setInputGetMoney(rentCost.toString());
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
            <Text className={'title'}>{item.description}</Text>
            <div className={'invent-number'}>
                <span className="first-letters">{item.name.slice(0, 2)}</span>
                <span className="second-letters">{item.name.slice(2, -1)}</span>
            </div>
        </div>

        <div className="section-time">
            <img src={clock} className={'icon'} alt="Время старта аренды" />
            <p className={'start-time'}>{new Date(startTime).getHours()}</p>
            <p className={'separator'}>:</p>
            <p className={'start-time'}>{new Date(startTime).getMinutes()}</p>
            <div className="minus-separator"></div>
            <input
                value={hours}
                className={'input-time'}
                onChange={(event) => {
                    const value: number = parseInt(event.target.value)
                    if (value >= 0 && value < 24 || !value)
                        setHours(clearInputValue(event.target.value))
                }
                }
            />
            <p className={'separator'}>:</p>
            <input
                value={minutes}
                className={'input-time'}
                onChange={(event) => {
                    const value: number = parseInt(event.target.value)
                    if (value >= 0 && value < 60 || !value)
                        setMinutes(clearInputValue(event.target.value))
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