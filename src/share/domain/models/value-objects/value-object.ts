export interface ValueObject<E> {
  get value(): E
  toString(): string
}
