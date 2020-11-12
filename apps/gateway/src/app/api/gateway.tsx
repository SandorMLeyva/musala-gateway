import * as ApiInterfaces from '@gateway/api-interfaces';
import { IGateway } from '@gateway/models';
import { API } from '../config';

export const updateGateway = (id: string, values: IGateway) => (
    fetch(`${API}${ApiInterfaces.GatewayApiUrlUpdate.replace(":id", id)}`,
        {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
);

export const createGateway = (values: IGateway) => (
    fetch(`${API}${ApiInterfaces.GatewayApiUrlCreate}`,
    {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
);