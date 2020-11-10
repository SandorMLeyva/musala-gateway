import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';


export interface IPeripheral {
  _id?: any;
  uid: number;
  vendor: string;
  dateCreated?: Date;
  status?: boolean;
  gateway?: string;
}

export const PeripheralSchema: Schema = new Schema({
  uid: { type: Number, required: true },
  vendor: String,
  dateCreated: { type: Date, default: Date.now },
  status: { type: Number, required: true, default: false },
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

export const PeripheralModel = mongoose.model<IPeripheral & Document>(
  'PeripheralModel',
  PeripheralSchema
);
