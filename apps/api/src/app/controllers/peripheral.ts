import { PeripheralModel, GatewayModel, IPeripheral } from '@gateway/models';
import { Request, Response } from 'express';

// post create
export async function create(req: Request, res: Response) {
  const model = new PeripheralModel(req.body);
  await model.save((err, item) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).json(item);
  });
}

// get list
export async function list(req: Request, res: Response) {
  await PeripheralModel.find().exec((err, items) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(items);
  });
}

// get detail
export async function detail(req: Request, res: Response) {
  await PeripheralModel.findById(req.params.id, function (err, item) {
    if (err) return res.status(500).send({ error: err.message });
    if (item === null)
      return res.status(404).send({ error: 'Resource not found' });
    return res.json(item);
  });
}

// put update
export async function update(req: Request, res: Response) {
  const body = req.body as IPeripheral;
  if (body.gateway) {
    if (!(await GatewayModel.exists({ _id: body.gateway })))
      return res.status(400).send({ error: 'Gateway not found' });
  }
  PeripheralModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true, new: true },
    function (err, item) {
      if (err) res.status(500).send({ error: err.message });
      if (item === null)
        return res.status(404).send({ error: 'Resource not found' });
      return res.json(item);
    }
  );
}

// delete delete
export async function remove(req: Request, res: Response) {
  await PeripheralModel.findByIdAndRemove(req.params.id, function (err, item) {
    if (err) return res.status(500).send({ error: err.message });
    // if (item === null)
    //   return res.status(404).send({ error: 'Resource not found' });
    return res.json(item);
  });
}
