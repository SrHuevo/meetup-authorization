export type Dictionary<V = any> = { [key: string | number]: V }

export type ObjectKeysFromValues<
  O extends { [key: string | number]: string | number },
  V = string,
> = Record<O[keyof O], V>

export type KeysOf<T> = keyof T
export type ValuesOf<T> = T[KeysOf<T>]

export type Class<C = any> = new (...args: any[]) => C

export type AnyFunction = (...args: any[]) => any

export type Properties<Class> = {
  [K in keyof Class as Class[K] extends AnyFunction ? never : K]: any
}
