import { Router } from 'express';
import  {PeripheralController}  from '../controllers';
import {
  PeripheralApiUrlCreate,
  PeripheralApiUrlList,
  PeripheralApiUrlDetail,
  PeripheralApiUrlRemove,
  PeripheralApiUrlUpdate
} from '@gateway/api-interfaces';

const router = Router();

// peripheral
router.post(PeripheralApiUrlCreate, PeripheralController.create);
router.get(PeripheralApiUrlList, PeripheralController.list);
router.get(PeripheralApiUrlDetail, PeripheralController.detail);
router.delete(PeripheralApiUrlRemove, PeripheralController.remove);
router.put(PeripheralApiUrlUpdate, PeripheralController.update);

// gateway

export default router;
