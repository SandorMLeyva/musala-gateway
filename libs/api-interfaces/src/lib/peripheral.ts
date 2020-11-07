import { Peripheral } from '@gateway/models';

const PeripheralApiUrlCreate = '/peripheral';
const PeripheralApiUrlList = '/peripheral';
const PeripheralApiUrlRemove = '/peripheral/:id';
const PeripheralApiUrlDetail = '/peripheral/:id';
const PeripheralApiUrlUpdate = '/peripheral/:id';

export {
  Peripheral,
  PeripheralApiUrlCreate,
  PeripheralApiUrlUpdate,
  PeripheralApiUrlRemove,
  PeripheralApiUrlDetail,
  PeripheralApiUrlList,
};
