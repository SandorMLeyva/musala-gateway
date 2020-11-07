import {
  getModelForClass,
  prop,
  pre,
} from '@typegoose/typegoose';

export enum PeripheralStatus {
  offline,
  online,
}

@pre<Peripheral>("validate", async function (next) {
  console.log("fffffffffffffffffffffffffffffffffffffffffffffff");
  const err = await Peripheral.checkAmount(this.gatewayId);
  if (err) next(err);
  else next();
})

export class Peripheral {
  @prop({ unique: true })
  public uid: number;

  @prop()
  public vendor?: string;

  @prop({ default: Date.now })
  public dateCreated: Date;

  @prop({ default: PeripheralStatus.offline })
  public status?: PeripheralStatus;

  @prop({ required: true })
  public gatewayId: string;

  public static async checkAmount(gatewayId: string
  ) {
    const model = getModelForClass(Peripheral);
    const items: [Peripheral] = await model.find({
      gatewayId: gatewayId,
    }).exec();

    if (items.length >= 10)
      return {
        name: 'Validation error ',
        message: 'Gateway already has its 10 devices',
      };
  }
}

export default getModelForClass(Peripheral);
