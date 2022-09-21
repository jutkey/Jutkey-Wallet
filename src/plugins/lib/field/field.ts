export default interface IField<I = object, O = I> {
  // eslint-disable-next-line no-unused-vars
  set(value: I): void;
  get(): O;
  toString(): string;
}
