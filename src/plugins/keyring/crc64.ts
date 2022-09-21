/*---------------------------------------------------------------------------------------------
 *  Copyright (c) IBAX All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Long from 'long';

export enum CRC64Type {
  // eslint-disable-next-line no-unused-vars
  ECMA182 = '0xC96C5795D7870F42',
  // eslint-disable-next-line no-unused-vars
  ISO3309 = '0xD800000000000000'
}

const LONG_255 = Long.fromInt(0xff);

const makeTable = (poly: Long) => {
  const crcTable = [];
  let crc;
  for (let i = 0; i < 256; i += 1) {
    crc = Long.fromInt(i, true);
    for (let j = 0; j < 8; j += 1) {
      if (crc.and(Long.ONE).eq(Long.ONE)) {
        crc = crc.shiftRightUnsigned(1);
        crc = crc.xor(poly);
      } else {
        crc = crc.shiftRightUnsigned(1);
      }
    }
    crcTable[i] = crc;
  }
  return crcTable;
};

const makeCRC = (table: Long[], value: number[]) => {
  let crc = Long.MAX_UNSIGNED_VALUE;
  for (let i = 0; i < value.length; i += 1) {
    const lookup = table[crc.xor(value[i]).and(LONG_255).toString() as any];
    crc = crc.shiftRightUnsigned(8).xor(lookup);
  }
  return crc.xor(Long.MAX_UNSIGNED_VALUE);
};

const _CRC64_TABLE = makeTable(Long.fromString(CRC64Type.ECMA182, false, 16));

export default (input: number[]) => makeCRC(_CRC64_TABLE, input).toString(10);
