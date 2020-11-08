import { Router } from 'express';
import { PeripheralController, GatewayController } from '../controllers';
import * as ApiInterfaces from '@gateway/api-interfaces';

const router = Router();

// peripheral
router.post(ApiInterfaces.PeripheralApiUrlCreate, PeripheralController.create);
router.get(ApiInterfaces.PeripheralApiUrlList, PeripheralController.list);
router.get(ApiInterfaces.PeripheralApiUrlDetail, PeripheralController.detail);
router.delete(ApiInterfaces.PeripheralApiUrlRemove, PeripheralController.remove);
router.put(ApiInterfaces.PeripheralApiUrlUpdate, PeripheralController.update);

// gateway
router.post(ApiInterfaces.GatewayApiUrlCreate, GatewayController.create);
router.get(ApiInterfaces.GatewayApiUrlList, GatewayController.list);
router.get(ApiInterfaces.GatewayApiUrlDetail, GatewayController.detail);
router.delete(ApiInterfaces.GatewayApiUrlRemove, GatewayController.remove);
router.put(ApiInterfaces.GatewayApiUrlUpdate, GatewayController.update);
router.get(ApiInterfaces.GatewayApiUrlPeripheral, GatewayController.getPeripherals);

export default router;
