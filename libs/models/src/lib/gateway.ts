import { IPeripheral } from './peripheral';
import * as mongoose from 'mongoose';


// from https://www.regexpal.com/96770
const ipV4Format = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

export interface IGateway extends mongoose.Document {
  serial: string;
  name?: string;
  ipv4Address: string;
}

export const GatewaySchema: mongoose.Schema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  name: { type: String },
  ipv4Address: { type: String, required: true, match: ipV4Format },
  
});

const GatewayModel = mongoose.model<IGateway>('GatewayModel', GatewaySchema);

export default GatewayModel;
