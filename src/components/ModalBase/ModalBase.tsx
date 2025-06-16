import './ModalBase.scss';
import block from 'bem-cn-lite';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Modal} from '@gravity-ui/uikit';

const b = block('modal');

export function ModalBase() {
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
                    <img className={b('icon-wallet')} src={wallet} />
                    <TextInput className={b('modal-input', {bgcolor: item?.status === 'ACTIVE'})}
                        view='clear'
                        size="xl"
                        value={inputGetMoney.toString()}
                        onUpdate={(value) => setInputGetMoney(clearInputValue(value))}
                        disabled={item?.status === 'ACTIVE'}
                    />
                </div>

                <TextArea className={b('modal-comment')}
                    view='clear'
                    minRows={3}
                    maxRows={3}
                    placeholder={'Комментарий'}
                    size="xl"
                    onUpdate={(value) => setInputDescription(value)}
                    disabled={item?.status === 'ACTIVE'}
                />
                {
                    item?.status === 'ACTIVE' ?
                        <div className="btn-rent" onClick={(event) => handleStopPay(event)}>
                            Остановить аренду
                        </div>
                        :
                        item?.status === 'PAID' ?
                            <div className="btn-rent" onClick={(event) => handlePay(event)}>
                                ОБновить
                            </div>
                            :
                            <div className="btn-rent" onClick={(event) => handlePay(event)}>
                                Оплатить
                            </div>
                }
            </div>
        </Modal>
    )
}