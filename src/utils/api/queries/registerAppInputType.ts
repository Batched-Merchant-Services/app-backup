export class RegisterAppInputType {
  constructor(
    public email: string,
    public phoneNumber: number,
    public lada: string,
    public groupId: string
  ) { }
}