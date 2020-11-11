import React, { createContext, useState } from 'react';
import { IPeripheral } from '@gateway/models';

interface IPeripheralContext{
    peripherals?: IPeripheral[],
    setPeripherals?: React.Dispatch<React.SetStateAction<IPeripheral[]>>
}

export const PeripheralContext = createContext<IPeripheralContext>({});

export const PeripheralContextProvider = ({ children }) => {
    const [peripherals, setPeripherals] = useState<IPeripheral[]>([]);
    return (<PeripheralContext.Provider value={{ peripherals, setPeripherals }}>
        {children}
    </PeripheralContext.Provider>);
}
