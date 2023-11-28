export interface IDevice {
  id?: string;
  name?: string;
  address?: string;
  model?: string;
  className?: string;
}

export class Device implements IDevice {
  constructor(public id?: string, public name?: string, public address?: string, public model?: string, public className?: string) {}
}
