import { getModelForClass, prop } from '@typegoose/typegoose';

export enum PeripheralStatus {
  offline,
  online,
}

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
}

export default getModelForClass(Peripheral);
