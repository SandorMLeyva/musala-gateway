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

  @prop()
  public gatewayId: string;

  public static async checkAmount(gatewayId: string
  ) {
    const peripheralModel = getModelForClass(Peripheral);
    const itemsCount: number = await peripheralModel.count({  gatewayId: gatewayId });

    if (itemsCount >= 10)
      return {
        name: 'Validation error ',
        message: 'Gateway already has its 10 devices',
      };
  }
}

export default getModelForClass(Peripheral);
