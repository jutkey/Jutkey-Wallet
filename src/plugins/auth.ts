import util from './util';
import { handleGetObjUrl } from './common';

export default {
  getNetwork() {
    const networkIp = util.getCache('networkIp');
    if (networkIp) {
      return networkIp;
    }
  },
  getChainUrl() {
    const obj = handleGetObjUrl() as any;
    let url = obj.ip;
    const networkIp = util.getCache('networkIp');
    if (networkIp) {
      url = networkIp.ip;
    }
    console.log(url);
    return url;
  }
};
