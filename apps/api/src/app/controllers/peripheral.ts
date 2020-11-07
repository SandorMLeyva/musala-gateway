import { PeripheralModel } from '@gateway/models';
import { Request, Response } from 'express';

// post create
export async function create(req: Request, res: Response) {
  const model = new PeripheralModel(req.body);

  await model.save((err, item) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      res.status(201).json(item);
    }
  });
}
