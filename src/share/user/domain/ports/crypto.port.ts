export default abstract class Crypto {
  abstract generate(password: string): Promise<string>
  abstract compare(
    clearPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}
