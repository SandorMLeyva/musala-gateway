import {
  GatewayModel,
  Gateway,
  PeripheralModel,
  Peripheral,
} from '@gateway/models';
import { Request, Response } from 'express';

// post create
export async function create(req: Request, res: Response) {
  const model = new GatewayModel(req.body);
  await model.save((err, item: Gateway) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).json(item);
  });
}

// get list
export async function list(req: Request, res: Response) {
  await GatewayModel.find().exec((err, items: [Gateway]) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(items);
  });
}

// get detail
export async function detail(req: Request, res: Response) {
  await GatewayModel.findById(req.params.id, (err, item: Gateway) => {
    if (err) return res.status(500).send({ error: err.message });
    if (item === null) return res.status(404).send({error: "Resource not found"});
    return res.json(item);
  });
}

// put update
export async function update(req: Request, res: Response) {
  const body: Gateway = req.body;
  GatewayModel.findOneAndUpdate(
    { _id: req.params.id },
    body,
    (err, item: Gateway) => {
      if (err) res.status(500).send({ error: err.message });
      if (item === null) return res.status(404).send({error: "Resource not found"});
      return res.json(item);
    }
  );
}

// delete delete
export async function remove(req: Request, res: Response) {
  await GatewayModel.findByIdAndRemove(
    req.params.id,
    { new: true },
    (err, item: Gateway) => {
      if (err) return res.status(500).send({ error: err.message });
      if (item === null) return res.status(404).send({error: "Resource not found"});
      return res.json(item);
    }
  );
}

// get get peripherals from a given gateway
export async function getPeripherals(req: Request, res: Response) {
  await PeripheralModel.find(
    { gatewayId: req.params.id },
    (err, items: [Peripheral]) => {
      if (err) return res.status(500).send({ error: err.message });
      return res.json(items);
    }
  );
}
