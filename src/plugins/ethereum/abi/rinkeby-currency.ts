import usdt from '@/assets/image/tokens/usdt.png';
import uni from '@/assets/image/tokens/uni.png';
import link from '@/assets/image/tokens/link.png';
import czrx from '@/assets/image/tokens/compound-zrx.png';
import UNIV2 from '@/assets/image/tokens/UNI-V2.png';
import cUSDT from '@/assets/image/tokens/cUSDT.png';
import weth from '@/assets/image/tokens/weth.png';

const tokenList = [
  {
    id: 1,
    chainId: 4,
    name: 'ChainLink Token',
    symbol: 'LINK',
    type: 'ERC20',
    address: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    logoURI: link,
    decimals: '18'
  },
  {
    id: 2,
    chainId: 4,
    name: 'Uniswap',
    symbol: 'UNI',
    type: 'ERC20',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    logoURI: uni,
    decimals: '18'
  },
  {
    id: 3,
    chainId: 4,
    name: 'Compound USDT',
    symbol: 'USDT',
    type: 'ERC20',
    address: '0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02',
    logoURI: usdt,
    decimals: '18'
  },

  {
    id: 4,
    chainId: 4,
    name: 'Compound 0x &#128200',
    symbol: 'cZRX',
    type: 'ERC20',
    address: '0x52201ff1720134bBbBB2f6BC97Bf3715490EC19B',
    logoURI: czrx,
    decimals: '8'
  },
  {
    id: 5,
    chainId: 4,
    name: 'Compound USDT (cUSDT)',
    symbol: 'cUSDT',
    type: 'ERC20',
    address: '0x2fB298BDbeF468638AD6653FF8376575ea41e768',
    logoURI: cUSDT,
    decimals: '8'
  },
  {
    id: 6,
    chainId: 4,
    name: 'Wrapped Ether',
    symbol: 'WETH',
    type: 'ERC20',
    address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    logoURI: weth,
    decimals: '8'
  },
  {
    id: 7,
    chainId: 4,
    name: 'Uniswap V2',
    symbol: 'UNI-V2',
    type: 'ERC20',
    address: '0xAe38bC7C3903512481b79a3AA05a3eeDb6ba2882',
    logoURI: UNIV2,
    decimals: '18'
  }
  /* {
    id: 7,
    chainId: 4,
    name: 'Prize Ticket USDT Compound',
    symbol: 'ptUSDTc',
    type: 'ERC20',
    address: '0xe7C6CDd91201Ce977D9406E4a4aDe7928d649f7D',
    logoURI: UNIV2,
    decimals: '18'
  } */
];
export default tokenList;
