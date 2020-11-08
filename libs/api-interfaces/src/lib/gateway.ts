import { Gateway } from '@gateway/models';

const GatewayApiUrlCreate = '/gateway';
const GatewayApiUrlList = '/gateway';
const GatewayApiUrlRemove = '/gateway/:id';
const GatewayApiUrlDetail = '/gateway/:id';
const GatewayApiUrlUpdate = '/gateway/:id';
const GatewayApiUrlPeripheral = '/gateway/:id/peripheral';

export {
  Gateway,
  GatewayApiUrlCreate,
  GatewayApiUrlUpdate,
  GatewayApiUrlRemove,
  GatewayApiUrlDetail,
  GatewayApiUrlList,
  GatewayApiUrlPeripheral,
};
