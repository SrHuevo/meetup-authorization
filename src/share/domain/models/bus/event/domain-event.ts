import { DateValueObject } from '../../value-objects/date.value-object'

export abstract class DomainEvent {
  private _occurredOn: string

  constructor(private _aggregateId: string, private _eventId: string) {
    this._occurredOn = new DateValueObject(new Date().toISOString()).value
  }

  public abstract toPrimitives(): any

  public get aggregateId(): string {
    return this._aggregateId
  }

  public get eventId(): string {
    return this._eventId
  }

  public get occurredOn(): string {
    return this._occurredOn
  }
}
