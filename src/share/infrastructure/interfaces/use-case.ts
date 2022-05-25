export abstract class UseCase<Arguments extends Array<any>, Return> {
  public abstract run(...args: Arguments): Promise<Return>
}
