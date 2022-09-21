import IField from './field';

export interface ISchema {
  header: Uint8Array;
  fields: {
    [type: string]: new () => IField<any>;
  };
  network: number;
}
