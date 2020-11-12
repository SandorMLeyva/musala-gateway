import { Document, Schema, model } from 'mongoose';

// from https://www.regexpal.com/96770
export const ipV4Format = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

export interface IGateway  {
  _id?: any;
  serial: string;
  name?: string;
  ipv4Address: string;
}

export const GatewaySchema: Schema = new Schema({
  serial: { type: String, required: true, unique: true },
  name: { type: String },
  ipv4Address: { type: String, required: true, match: ipV4Format },
});

export const GatewayModel = model<IGateway & Document>(
  'GatewayModel',
  GatewaySchema
);
