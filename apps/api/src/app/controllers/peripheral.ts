import { PeripheralModel, Peripheral } from '@gateway/models';
import { Request, Response } from 'express';

// post create
export async function create(req: Request, res: Response) {
  const model = new PeripheralModel(req.body);

  await model.save((err, item) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).json(item as Peripheral);
  });
}

// get list
export async function list(req: Request, res: Response) {
  await PeripheralModel.find().exec((err, items) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(items as [Peripheral]);
  });
}

// get detail
export async function detail(req: Request, res: Response) {
  await PeripheralModel.findById(req.params.id, function (err, item) {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(item as Peripheral);
  });
}

// get update
export async function update(req: Request, res: Response) {
  PeripheralModel.findOneAndUpdate({ _id: req.params.id }, req.body, function (
    err,
    item
  ) {
    if (err) res.status(500).send({ error: err.message });
    return res.json(item as Peripheral);
  });
}

// get delete
export async function remove(req: Request, res: Response) {
  await PeripheralModel.findByIdAndRemove(req.params.id, function (err, item) {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(item as Peripheral);
  });
}
