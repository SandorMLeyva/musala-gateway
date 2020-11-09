import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export enum PeripheralStatus {
  offline,
  online,
}

export interface IPeripheral extends Document {
  uid: number;
  vendor: string;
  dateCreated?: Date;
  status?: PeripheralStatus;
  gateway?: string;
}

export const PeripheralSchema: Schema = new Schema({
  uid: { type: Number, required: true },
  vendor: String,
  dateCreated: { type: Date, default: Date.now },
  status: { type: Number, required: true, default: PeripheralStatus.offline },
  gateway: {
    type: Schema.Types.ObjectId,
    ref: 'GatewayModel',
    validate: {
      validator: async (value) => {
        const itemsCount: number = await PeripheralModel.countDocuments({
          gateway: value,
        });
        return itemsCount < 10;
      },
      message: 'Gateway already has its 10 devices',
    },
  },
});

export const PeripheralModel = mongoose.model<IPeripheral>(
  'PeripheralModel',
  PeripheralSchema
);
