import * as ApiInterfaces from '@gateway/api-interfaces';
import { IPeripheral } from '@gateway/models';
import { API } from '../config';

export const updatePeripheral = (id: string, values: IPeripheral) => (

    fetch(`${API}$${ApiInterfaces.PeripheralApiUrlUpdate.replace(":id", id)}`,
        {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
);

export const createPeripheral = (values: IPeripheral) => (
    fetch(`${API}${ApiInterfaces.PeripheralApiUrlCreate}`,
        {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
);