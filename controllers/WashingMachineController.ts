import express from 'express';

import errorHandler from '../utils/errorHandler';
import {
  IWashingMachine,
  WashingMachineDocumentInterface,
  WashingMachineModel,
} from '../models/WashingMachine';

class WashingMachineController {
  async getAll(_: any, res: express.Response): Promise<void> {
    try {
      const machines: WashingMachineDocumentInterface[] = await WashingMachineModel.find(
          {}).exec();

      res.status(200).json({
        status: 'success',
        data: machines,
      });

    } catch (err) {
      errorHandler(err, res);
    }
  }

  async getMachinesByStatus(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const status: boolean = JSON.parse(req.params.status);

    try {
      const machines: WashingMachineDocumentInterface[] = await WashingMachineModel.find(
          {status}).exec();

      res.status(200).json({
        status: 'success',
        data: machines,
      });

    } catch (err) {
      errorHandler(err, res);
    }
  }

  async addNewMachine(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const data: IWashingMachine = {
      model: req.body.model,
      serialNumber: req.body.serialNumber,
      dateOfManufacture: req.body.dateOfManufacture,
      washingCycles: req.body.washingCycles,
      status: req.body.status,
      historyOfErrors: req.body.historyOfErrors,
    };

    try {
      const machine: WashingMachineDocumentInterface = await WashingMachineModel.create(
          data);

      res.status(201).json({
        status: 'success',
        data: machine,
      });

    } catch (err) {
      errorHandler(err, res);
    }
  }

  async removeMachineBySerialNumber(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const serialNumber: number = +req.params.serialNumber;

    try {
      const removedData = await WashingMachineModel.deleteOne({serialNumber}).
          exec();

      if (!removedData.deletedCount) {
        res.status(404).json({
          status: 'failed',
          message: `Машина с серийным номером ${serialNumber} не найдена`,
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: serialNumber,
      });

    } catch (err) {
      errorHandler(err, res);
    }
  }

  async removeMachineByModel(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const model: string = req.body.model;

    try {
      const removedData = await WashingMachineModel.deleteMany({model}).exec();

      if (!removedData.deletedCount) {
        res.status(404).json({
          status: 'failed',
          message: `Машины по модели ${model} не найдены`,
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: model,
      });

    } catch (err) {
      errorHandler(err, res);
    }

  }

  async updateMachineBySerialNumber(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const serialNumber: number = +req.params.serialNumber;
    const updates: object = req.body.updates;
    try {
      const machine: WashingMachineDocumentInterface | null = await WashingMachineModel.findOneAndUpdate(
          {serialNumber},
          {$set: updates},
          {new: true},
      );
      if (!machine) {
        res.status(404).json({
          status: 'failed',
          message: `Машина с серийным номером ${serialNumber} не найдена`,
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: machine,
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }

  async updateMachineStatusBySerialNumber(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const serialNumber: number = +req.params.serialNumber;

    try {
      const machine: WashingMachineDocumentInterface | null = await WashingMachineModel.findOne(
          {serialNumber}, {status: 1, serialNumber: 1}).exec();

      if (machine) {
        machine.status = !machine.status;
        res.status(200).json({
          status: 'success',
          data: machine,
        });
        await machine.save();
        return;
      }

      res.status(404).json({
        status: 'failed',
        message: `Машина с серийным номером ${serialNumber} не найдена`,
      });

    } catch (err) {
      errorHandler(err, res);
    }
  }

  async updateErrorList(
      req: express.Request,
      res: express.Response,
  ): Promise<void> {
    const serialNumber = +req.params.serialNumber;
    const {error} = req.body;
    const machine: WashingMachineDocumentInterface | null = await WashingMachineModel.findOne(
        {serialNumber}, {historyOfErrors: 1});
    if (machine) {
      machine.historyOfErrors?.push(error);
      res.status(200).json({
        status: 'success',
        data: {
          errorList: machine.historyOfErrors,
          serialNumber,
        },
      });
      await machine.save();
      return;
    }

    res.status(404).json({
      status: 'failed',
      message: `Машина с серийным номером ${serialNumber} не найдена!`
    })
  }

}

export const WashingMachineCtrl = new WashingMachineController();
