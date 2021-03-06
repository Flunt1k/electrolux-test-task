import { Document, model, Schema } from 'mongoose'
import {IErrorOfMachine} from '../core/interfaces';

export interface IWashingMachine {
  id?: string;
  serialNumber: number;
  model: string;
  dateOfManufacture: string;
  washingCycles?: number;
  status?: boolean;
  historyOfErrors?: IErrorOfMachine[]
}

export type WashingMachineDocumentInterface = IWashingMachine & Document;

export const WashingMachineSchema = new Schema<IWashingMachine>({
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  dateOfManufacture: {
    type: String,
    required: true,
  },
  washingCycles: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  historyOfErrors: {
    type: Array,
    default: [],
  },
})

export const WashingMachineModel = model<WashingMachineDocumentInterface>('WashingMachine', WashingMachineSchema)
