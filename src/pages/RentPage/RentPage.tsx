import './RentPage.scss';
import block from 'bem-cn-lite';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from '@context/Context';
import {RentItem} from '@components/RentItem/RentItem';

const b = block('rent-page');

export function RentPage() {
  const {state: {rentItems}, setState} = useContext(AppContext);
    const closingRef = useRef(false);

  return (
    <div className={b()}>
      {rentItems.map((item) =>
        <RentItem
          key={item.id}
          rentItem={item}
          closeItem={closingRef}
        />
      )}
    </div>
  );
}