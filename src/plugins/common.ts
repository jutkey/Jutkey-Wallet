import Cookies from 'js-cookie';
import walletUrl from './url/walletUrl';
import util from './util';

const num = 8;
const time = new Date(new Date().getTime() + num * 60 * 60 * 1000);
export const handleSetCookies = (name: string, value: any) => {
  Cookies.set(name, value, { expires: time });
};
export const handleGetCookies = (name: string) => {
  return Cookies.get(name);
};
export const handleRemoveCookies = (name: string) => {
  Cookies.remove(name);
};

export const handleGetObjUrl = () => {
  const arrUrl = walletUrl;
  const networkIp = util.getCache('networkIp');
  // console.log(networkIp);
  if (networkIp) {
    const obj = arrUrl.find((item) => item.networkId === networkIp.networkId);
    return obj || arrUrl[0];
  }
  return arrUrl[0];
};
export function handleWalletserver() {
  const objUrl = handleGetObjUrl() as any;
  return objUrl.walletserver;
}
export function handleBlockexplorer() {
  const objUrl = handleGetObjUrl() as any;
  return objUrl.blockexplorer;
}
export const zeroPadding = (num: number, digit: number) => {
  let zero = '';
  for (let i = 0; i < digit; i += 1) {
    zero += '0';
  }
  return (zero + num).slice(-digit);
};
export const handleUpdateTime = (d: Date) => {
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const time = `${zeroPadding(d.getUTCHours(), 2)}:${zeroPadding(
    d.getUTCMinutes(),
    2
  )}:${zeroPadding(d.getUTCSeconds(), 2)}`;
  const date = `${zeroPadding(d.getUTCFullYear(), 4)}-${zeroPadding(
    d.getUTCMonth() + 1,
    2
  )}-${zeroPadding(d.getUTCDate(), 2)} ${week[d.getUTCDay()]}`;
  //  console.log(time, date);
  return { time, date };
};
export const handleTransColor = (
  address: string,
  sender: string,
  recipient: string
) => {
  if (address === sender && address === recipient) {
    return { color: '', symbol: '+-' };
  }
  if (address === sender && address !== recipient) {
    return { color: '#EE2E6B', symbol: '-' };
  }
  if (address !== sender && address === recipient) {
    return { color: '#04B78A', symbol: '+' };
  }
  return { color: '', symbol: '' };
};
export const getMidNum = (str: string, start: number, len: number) => {
  if (start + len > 0) {
    return +str.substring(start < 0 ? 0 : start, start < 0 ? start + len : len);
  }
  return 0;
};
export const bigNumCompare = (a: string, b: string) => {
  let back = 0;
  const max = Math.ceil(Math.max(a.length, b.length) / 15);
  for (let i = max; i > 0; i -= 1) {
    const num1 = getMidNum(a, a.length - i * 15, 15);
    const num2 = getMidNum(b, b.length - i * 15, 15);
    const cur = num1 - num2;
    console.log(cur);
    if (cur < 0) {
      back = -1;
      break;
    } else if (cur > 0) {
      back = 1;
      break;
    }
  }
  return back;
};
export const handleIsTauri = () => {
  return Boolean(
    typeof window !== 'undefined' &&
      window !== undefined &&
      window.__TAURI_IPC__ !== undefined
  );
};
export const handleEventNumber = (num: number) => {
  let eventName = '';
  switch (num) {
    case 1:
      eventName = 'user.package';
      break;
    case 2:
      eventName = 'user.taxation';
      break;
    case 3:
      eventName = 'user.trade';
      break;
    case 4:
      eventName = 'user.create';
      break;
    case 5:
      eventName = 'user.iname';
      break;
    case 6:
      eventName = 'user.token';
      break;
    case 7:
      eventName = 'user.coin';
      break;
    case 8:
      eventName = 'user.private';
      break;
    case 9:
      eventName = 'user.foundation';
      break;
    case 10:
      eventName = 'user.team';
      break;
    case 11:
      eventName = 'user.partner';
      break;
    case 12:
      eventName = 'user.nft';
      break;
    case 13:
      eventName = 'user.mining';
      break;
    case 14:
      eventName = 'user.pledge';
      break;
    case 15:
      eventName = 'user.exchange';
      break;
    case 16:
      eventName = 'user.burning';
      break;
    case 17:
      eventName = 'user.detele';
      break;
    case 18:
      eventName = 'user.paid';
      break;
    case 19:
      eventName = 'user.nodes';
      break;
    case 20:
      eventName = 'user.voting';
      break;
    case 21:
      eventName = 'user.deposit';
      break;
    case 22:
      eventName = 'user.withdrawal';
      break;
    case 23:
      eventName = 'user.textcoin';
      break;
    case 25:
      eventName = 'user.privateye';
      break;
    case 26:
      eventName = 'user.offering';
      break;
    default:
      eventName = 'user.package';
      break;
  }
  return eventName;
};
export const handleEscapeHtml = (str: string) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
// eslint-disable-next-line import/prefer-default-export
export const handleRouter = () => {
  return [
    {
      path: '/',
      key: '1',
      title: 'nav.dashboard',
      icon: 'iconfont el-ui-Group9'
    },
    {
      path: '/assets',
      key: '2',
      title: 'nav.assets',
      icon: 'iconfont el-ui-zu3671'
    },
    {
      key: '3',
      title: 'nft.title',
      icon: 'iconfont el-ui-Group14',
      path: '/nft'
    },
    {
      key: '4',
      title: 'nav.eth',
      icon: 'iconfont el-ui-ETH',
      path: '/ethereum'
    },
    /* {
      key: '5',
      title: 'bnb.chain',
      icon: 'iconfont el-ui-BNB',
      path: '/bnb'
    }, */
    /*  {
      key: '6',
      title: 'tron.chain',
      icon: 'iconfont el-ui-a-outline-trontron-trx',
      path: '/tron'
    }, */
    {
      key: '7',
      title: 'nav.honor',
      icon: 'iconfont el-ui-oup10',
      path: '/honor'
    },
    {
      link: 'https://jutkey.com',
      key: '8',
      title: 'nav.help',
      icon: 'iconfont el-ui-fa'
    },
    {
      path: '/manage',
      key: '9',
      title: 'nav.manage',
      icon: 'iconfont el-ui-Group211'
    },
    {
      path: '/about',
      key: '10',
      title: 'nav.about',
      icon: 'iconfont el-ui-up10'
    }
  ];
};
