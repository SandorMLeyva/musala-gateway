import { Request, Response } from 'express';
import { GatewayModel, IGateway, PeripheralModel } from '@gateway/models';

// post create
export async function create(req: Request, res: Response) {
  const model = new GatewayModel(req.body);
  await model.save((err, item) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).json(item);
  });
}

// get list
export async function list(req: Request, res: Response) {
  await GatewayModel.find().exec((err, items) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(items);
  });
}

// get detail
export async function detail(req: Request, res: Response) {
  await GatewayModel.findById(req.params.id, (err, item) => {
    if (err) return res.status(500).send({ error: err.message });
    if (item === null)
      return res.status(404).send({ error: 'Resource not found' });
    return res.json(item);
  });
}

// put update
export async function update(req: Request, res: Response) {
  const body = req.body as IGateway;
  GatewayModel.findOneAndUpdate(
    { _id: req.params.id },
    body,
    { new: true },
    (err, item) => {
      if (err) res.status(500).send({ error: err.message });
      if (item === null)
        return res.status(404).send({ error: 'Resource not found' });
      return res.json(item);
    }
  );
}

// delete delete
export async function remove(req: Request, res: Response) {
  GatewayModel.findByIdAndDelete(req.params.id, async (err, item) => {
    if (err) return res.status(500).send({ error: err.message });
    if (item === null)
      return res.status(404).send({ error: 'Resource not found' });
    await PeripheralModel.deleteMany({ gateway: item._id }).exec();
    return res.status(200).json(item);
  });
}

// get get peripherals from a given gateway
export async function getPeripherals(req: Request, res: Response) {
  await PeripheralModel.find({ gateway: req.params.id }, (err, items) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(items);
  });
}
