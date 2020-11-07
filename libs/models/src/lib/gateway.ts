import { getModelForClass, Ref, prop } from "@typegoose/typegoose";
import { Peripheral } from "./peripheral";

// from https://www.regexpal.com/96770
const ipV4Format = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;


export class Gateway {
  @prop({ required: true, unique: true })
  public id!: string;

  @prop()
  public name?: string;

  @prop({ required: true, match: ipV4Format })
  public ipv4Address!: string;

  @prop({
    ref: () => Peripheral,
    localField: "_id",
    foreignField: "gatewayId",
  })

  public peripherals?: Ref<Peripheral>[];
}

export default getModelForClass(Gateway);