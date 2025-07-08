import './InventModal.scss';
import block from 'bem-cn-lite';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Text, Modal, TextInput, TextArea} from '@gravity-ui/uikit';
import clock from '@assets/clock.svg'
import {ApiItemResponse} from '@services/supping-api';
import {api} from '@services/api';
import {useNavigate} from 'react-router';
import {getCachedImage} from '@context/IndexDB';
import {AppContext} from '@context/Context';
import wallet from '@assets/prepaid.svg';
import {clearInputValue} from '@utils/ClearInputNumber';

const b = block('modal');

interface InventModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    item: ApiItemResponse;
}

export const InventModal: FC<InventModalProps> = ({item, showModal, setShowModal}) => {
    const {state, setState} = useContext(AppContext);
    const [startTime, setStartTime] = useState('');
    const [image, setImage] = useState<string>();

    const [inputDescription, setInputDescription] = useState('');
    const [inputGetMoney, setInputGetMoney] = useState('');


    const dateObj = new Date(startTime);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    const navigation = useNavigate();

    useEffect(() => {
        setStartTime(new Date().toISOString());
    }, [showModal])

    useEffect(() => {
        if (!item.image) {
            console.log('В items нету изображения');
            return;
        };

        async function getImage(id: string) {
            let image: string;
            if (id) {
                image = await getCachedImage(id);
                if (image) setImage(image)
            }
        }

        getImage(item.image);
    }, [item.image]);


    function handleClose(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();

        setState({
            options: {
                ...state.options,
                closingModal: true
            }
        })

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

    function startRent() {
        if (!item.id) {
            console.log('Не могу начать аренду в items нету id');
            return;
        };

        // if (item.type?.auto) {
        //     //Ручка для инвентаря с датчиком
        //     api.v1.preRent(item.id, {
        //         description: inputDescription,
        //         preRentCost: inputGetMoney ? parseFloat(inputGetMoney) : 0
        //     }
        //     )
        //         .then((response) => {
        //             setShowModal(false);
        //             navigation('/')
        //         })
        //         .catch((error) => console.log('Ошибка сдачи инвентаря в аренду', error))
        // }
        // else {
        //Ручка универсальная
        const dateObj = new Date(startTime);
        api.v1.startRent(item.id, {
            startTime: `${dateObj.getUTCHours().toString().padStart(2, '0')}:${dateObj.getUTCMinutes().toString().padStart(2, '0')}:00`,
            description: inputDescription,
            preRentCost: inputGetMoney ? parseFloat(inputGetMoney) : 0
        }
        )
            .then((response) => {
                setState({
                    options: {
                        ...state.options,
                        reloadPage: true
                    }
                })
                setShowModal(false);
                navigation('/')
            })
            .catch((error) => console.log('Ошибка сдачи инвентаря в аренду', error))
    }
    // }

    return (
        <Modal
            open={showModal}
            className={b()}
            onClose={(event) => handleClose(event)}
            style={{backgroundColor: 'rgba(20,20,20, 0.15)'}}
        >
            <div className={b("section-title")}>
                <Text className={'title'}>{item.description}</Text>
                <div className={'invent-number'}>
                    <span className="first">{item?.name?.slice(0, 2)}</span>
                    <span className="second">{item?.name?.slice(2, -1)}</span>
                </div>
            </div>

            <div className={b('section-image',{background:!!image})}>
                {
                    image ?
                        <img src={image} className={'image'} />
                        :
                        <Text variant='display-4' style={{opacity: '0.3'}}>ФОТО</Text>
                }
            </div>

            {/* {!item.type?.auto && */}

            <div className={b("section-time")}>
                <img src={clock} className={'icon'} alt="Время старта аренды" />
                <input
                    inputMode='numeric'
                    type='text'
                    value={hours}
                    className={'time'}
                    onChange={(event) => {
                        const value: number = parseInt(event.target.value)
                        if (value >= 0 && value < 24 || !value) {
                            const newDate = new Date(startTime);
                            newDate.setHours(isNaN(value) ? 0 : value);
                            setStartTime(newDate.toISOString());
                        }
                    }}
                />
                <p className={'separator'}>:</p>
                <input
                    inputMode='numeric'
                    type='text'
                    value={minutes}
                    className={'time'}
                    onChange={(event) => {
                        const value: number = parseInt(event.target.value)
                        if (value >= 0 && value < 60 || !value) {
                            const newDate = new Date(startTime);
                            newDate.setMinutes(isNaN(value) ? 0 : value);
                            setStartTime(newDate.toISOString());
                        }
                    }}
                />
            </div>
            {/* } */}

            <div className={b("section-money")}>
                <img className={b('icon-wallet')} src={wallet} />
                <TextInput className={b('input-money')}
                    view='clear'
                    size="xl"
                    value={inputGetMoney.toString()}
                    onUpdate={(value) => setInputGetMoney(clearInputValue(value))}
                    placeholder='Предоплата'
                />
            </div>

            <TextArea className={b('comment')}
                view='clear'
                minRows={1}
                maxRows={1}
                placeholder={'Комментарий'}
                size="xl"
                onUpdate={(value) => setInputDescription(value)}
            />

            <div className="btn" onClick={startRent}>СДАТЬ</div>
        </Modal>
    )
}