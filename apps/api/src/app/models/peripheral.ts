import { getModelForClass, prop } from '@typegoose/typegoose';

export enum PeripheralStatus {
  offline,
  online,
}

export class Peripheral {
  @prop({ required: true, unique: true })
  public id: number;

  @prop()
  public vendor?: string;

  @prop()
  public dateCreated: string;

  @prop({ default: PeripheralStatus.offline })
  public status?: PeripheralStatus;

  @prop({ required: true })
  public gatewayId: string;
}

export default getModelForClass(Peripheral);
