export class Payment {
  constructor(
    public id: string,
    public amount: number,
    public info: string,
    public time: Date
  ) {}
}