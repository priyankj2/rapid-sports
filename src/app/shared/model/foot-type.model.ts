export interface IFootType {
  id?: number;
  name?: string;
  description?: string;
  leftFront?: number;
  leftHeel?: number;
  rightFront?: number;
  rightHeel?: number;
  leftFootDescription?: string;
  rightFootDescription?: string;
  forefootMedial?: number;
  forefootLateral?: number;
  midfootMedial?: number;
  midfootLateral?: number;
  rearfootMedial?: number;
  rearfootLateral?: number;
  orthoCondition?: string;
}

export class FootType implements IFootType {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public leftFront?: number,
    public leftHeel?: number,
    public rightFront?: number,
    public rightHeel?: number,
    public leftFootDescription?: string,
    public rightFootDescription?: string,
    public forefootMedial?: number,
    public forefootLateral?: number,
    public midfootMedial?: number,
    public midfootLateral?: number,
    public rearfootMedial?: number,
    public rearfootLateral?: number,
    public orthoCondition?: string
  ) {}
}
