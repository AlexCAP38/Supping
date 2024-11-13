import React, {useContext, useEffect, useState} from 'react';
import block from 'bem-cn-lite';
import {UserLabel, Button, Modal, Text, TextArea, TextInput} from '@gravity-ui/uikit';
import {MainContext} from '@context/Context';
import {RentItem} from '@components/RentItem';

import './RentPage.scss';


const b = block('rent-page');

export function RentPage() {
  const {state: {rentItems}, setState} = useContext(MainContext);

  return (
    <div className={b()}>
      {rentItems.map((item) => (<RentItem key={item.id} rentItem={item} />))}
    </div>
  );
}