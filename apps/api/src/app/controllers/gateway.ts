import { GatewayModel, Gateway } from '@gateway/models';
import { Request, Response } from 'express';

// post create
export async function create(req: Request, res: Response) {
  const model = new GatewayModel(req.body);

  await model.save((err, item) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).json(item as Gateway);
  });
}

// get list
export async function list(req: Request, res: Response) {
  await GatewayModel.find().exec((err, items) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(items as [Gateway]);
  });
}

// get detail
export async function detail(req: Request, res: Response) {
  // TODO: capturar los errores
  const item = await GatewayModel.findById(req.params.id).populate(
    'peripherals'
  );
  return res.json({...item._doc, peripherals:item.peripherals} );
}

// put update
export async function update(req: Request, res: Response) {
  // const item:Gateway  = GatewayModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  // return res.json(item );

  GatewayModel.findOneAndUpdate({ _id: req.params.id }, req.body, function (
    err,
    item
  ) {
    if (err) res.status(500).send({ error: err.message });
    return res.json(item as Gateway);
  });

}

// delete delete
export async function remove(req: Request, res: Response) {
  await GatewayModel.findByIdAndRemove(req.params.id, function (err, item) {
    if (err) return res.status(500).send({ error: err.message });
    return res.json(item as Gateway);
  });
}
