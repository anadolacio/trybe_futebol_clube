export type User = {
  email: string,
  password: string,
};

export type Token = {
  token: string;
};

export default interface TokenGenerator {
  decode(token: string): string;
  generate(user: User): string;
  verify(token: string): boolean;
}
