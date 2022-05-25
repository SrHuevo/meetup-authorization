import { DomainEvent } from './bus/event/domain-event'

export abstract class AggregateRoot<C extends new (...args: any[]) => any> {
  abstract toPrimitives(): ConstructorParameters<C>

  private domainEvents = []
  private timeout

  constructor(
    private config: { timeInMillisForTimeout: number } = {
      timeInMillisForTimeout: 5000,
    },
  ) {}

  public pullDomainEvents(): any[] {
    const domainEvents = this.domainEvents
    this.domainEvents = []

    return domainEvents
  }

  protected record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent)

    this.timeout = setTimeout(() => {
      console.warn('These events might not be running', this.domainEvents)
    }, this.config.timeInMillisForTimeout)
  }

  public changeTimeForTimeoutRecordedEvents(timeInMillis: number) {
    this.config.timeInMillisForTimeout = timeInMillis
  }
}
