export type machineErrors = {code: string, errorText: string}
export type initialStateUseMainForm = {
  model: string,
  serialNumber: number,
  dateOfManufacture: string,
  washingCycles: number,
  status?: boolean
}
export type initialStateUseErrorForm = {
  code: string,
  errorText: string
}
