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


export const removeGateway = (id: string) => (
    fetch(`${API}${ApiInterfaces.GatewayApiUrlRemove.replace(":id", id)}`,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
);

export const detailGateway = (id: string) => (
    fetch(`${API}${ApiInterfaces.GatewayApiUrlDetail.replace(":id", id)}`)
);

export const peripheralsGateway = (id: string) => (
    fetch(`${API}${ApiInterfaces.GatewayApiUrlPeripheral.replace(":id", id)}`)
);


export const listGateway = () => (
    fetch(`${API}${ApiInterfaces.GatewayApiUrlList}`)
);