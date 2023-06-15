export type User = {
  email: string,
  password: string,
};

export type Token = {
  token: string;
};

export type TokenPayload = {
  email: number;
  password: string;
};

export default interface TokenGenerator {
  generate(user: User): string;
}
