import router from '@/router';
import app from '@/main.js';
import keyring from '@/plugins/keyring.js';
const crypto = require('@/plugins/lib/crypto/index.js');
import clipboard from 'clipboard';
const md5 = require('md5');
const Decimal = require('decimal.js');
export default {
  getPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let data = {
              latitude: latitude,
              longitude: longitude
            };
            resolve(data);
          },
          function () {
            reject(arguments);
          }
        );
      } else {
        reject(
          'Your browser does not support the current geographic location information acquisition'
        );
      }
    });
  },
  toHexString(buffer) {
    function stringToBytes(str) {
      var ch,
        st,
        re = [];
      for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i); // get char
        st = []; // set up "stack"

        do {
          st.push(ch & 0xff); // push byte to stack
          ch = ch >> 8; // shift value down by 1 byte
        } while (ch);

        re = re.concat(st.reverse());
      }
      return re;
    }

    function Bytes2HexString(arrBytes) {
      var str = '';
      for (var i = 0; i < arrBytes.length; i++) {
        var tmp;
        var num = arrBytes[i];
        if (num < 0) {
          //When byte is negative due to coincidence bit, the data needs to be processed
          tmp = (255 + num + 1).toString(16);
        } else {
          tmp = num.toString(16);
        }
        if (tmp.length == 1) {
          tmp = '0' + tmp;
        }
        str += tmp;
      }
      return str;
    }
    if (buffer) {
      var arr = stringToBytes(window.atob(buffer.toString()));
      return Bytes2HexString(arr);
    }
  },
  setCache(name, data) {
    console.log(name, data);
    var type = typeof data;
    var info = { type: type, data };
    var string = encodeURI(JSON.stringify(info));
    localStorage.setItem(md5(name), keyring.encryptAES(string, md5(name)));
  },
  scrollBehavior(page) {
    var container = document.getElementById('container');
    container.scrollTop = page.____scrollTop || 0;
    container.onscroll = function () {
      page.____scrollTop = this.scrollTop;
    };
  },
  scrollTo(top) {
    document.getElementById('container').scrollTop = top;
  },
  getCache(name) {
    var data = localStorage.getItem(md5(name));
    try {
      data = decodeURI(keyring.decryptAES(data, md5(name)));
      data = JSON.parse(data);
      return data ? data.data : null;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  removeCache(name) {
    localStorage.removeItem(md5(name));
  },
  back() {
    router.back();
  },
  copyText(text) {
    let e = window.event || {};
    let copy = new clipboard('.null', {
      text: function () {
        return text;
      }
    });
    copy.on('success', () => {
      app.$message.success(app.$t('copysuccess'));
      copy.destroy();
    });
    copy.on('error', () => {
      app.$message.success(app.$t('copyfail'));
      copy.destroy();
    });
    copy.onClick(e);
  },
  shuffle(a) {
    var len = a.length;
    for (var i = 0; i < len; i++) {
      var end = len - 1;
      var index = (Math.random() * (end + 1)) >> 0;
      var t = a[end];
      a[end] = a[index];
      a[index] = t;
    }
    return a;
  },
  export(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    pom.setAttribute('download', filename);
    console.log(pom);
    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
      // pom.click();
    } else {
      pom.click();
    }
  },
  handleHasNickname(obj, val) {
    const arr = [];
    console.log(obj);
    for (const key in obj) {
      arr.push(obj[key]);
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].nickname == val.nickname) {
        return true;
      }
    }
    return false;
  },
  guid() {
    return 'vxxx-exxx-nxxx-axxx-sxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  showLoading(text) {
    if (this.loading) {
      return false;
    }
    this.loading = app.$loading({
      lock: true,
      text: text,
      spinner: 'el-icon-loading',
      fullscreen: false,
      customClass: 'show-loading' + (text ? '' : ' show-loading-no-text'),
      background: 'rgba(0, 0, 0, 0)'
    });
    return this;
  },
  hideLoading() {
    this.loading.close();
    this.loading = null;
  },
  searchArr(arr, field, value) {
    try {
      var d = arr.filter((f) => f[field] === value);
      return d[0];
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  isEmpty(obj) {
    if (typeof obj != 'object') return true;
    return (
      (Array.isArray(obj) && obj.length === 0) ||
      // eslint-disable-next-line no-prototype-builtins
      (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0)
    );
  },
  fillZero(num, length) {
    for (var len = (num + '').length; len < length; len = num.length) {
      num = '0' + num;
    }
    return num;
  },
  arraySumColumns(arr, field) {
    let total = Decimal(0);
    for (let i in arr) {
      var c = new Decimal(this.formatNumber(arr[i][field]));
      total = c.plus(total);
    }
    console.log(total);
    return total;
  },
  arraySumColumns2(arr, field) {
    let total = 0;
    for (let i in arr) {
      total += this.formatNumber(arr[i][field]);
    }
    return total;
  },
  arrayUpdateColumns(options) {
    for (let i in options.data) {
      let item = options.data[i];
      var d = options.list.filter((f) => f[options.key] === item[options.key]);
      for (var a in d) {
        for (var f in options.columns) {
          d[a][options.columns[f]] = item[options.columns[f]];
        }
      }
    }
    return options.list;
  },
  generateInviteCode(randomFlag = false, min = 8, max) {
    var str = '',
      range = min,
      arr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ];
    // Random generation
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      var pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },
  dateDiff(timestamp) {
    // The complete number is 13
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
        arrTimestamp[start] = '0';
      }
    }
    timestamp = arrTimestamp.join('') * 1;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;

    if (diffValue < 0) {
      return app.$t('formattime.lately');
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // The method of numerical complement 0
    var zero = function (value) {
      if (value < 10) {
        return '0' + value;
      }
      return value;
    };

    // use
    if (monthC > 4) {
      // If it is more than 1 year, the date and year will be displayed directly
      return (function () {
        var date = new Date(timestamp);
        return app.$t('formattime.fulldate', {
          year: date.getFullYear(),
          month: zero(date.getMonth() + 1),
          day: zero(date.getDate())
        });
      })();
    } else if (monthC >= 1) {
      return app.$t('formattime.monthago', {
        num: parseInt(monthC)
      });
    } else if (weekC >= 1) {
      return app.$t('formattime.weekago', {
        num: parseInt(weekC)
      });
    } else if (dayC >= 1) {
      return app.$t('formattime.dayago', {
        num: parseInt(dayC)
      });
    } else if (hourC >= 1) {
      return app.$t('formattime.hourago', {
        num: parseInt(hourC)
      });
    } else if (minC >= 1) {
      return app.$t('formattime.minuteago', {
        num: parseInt(minC)
      });
    }
    return app.$t('formattime.justnow');
  },
  publicKeyToKeyId(publicKey) {
    let address = crypto.address(publicKey);
    return this.formatKeyId(address);
  },
  formatKeyId(str) {
    if (str === '0') {
      return 'system';
    }
    if (str) {
      return crypto.addressString(str);
    } else {
      return str;
    }
  },
  money_format(money) {
    if (money != undefined) {
      var arr = money.toString().split('.');
      return (
        (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
        (arr[1] ? '.' + arr[1] : '')
      );
    } else {
      return money;
    }
  },
  toNonExponential(num) {
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  },
  formatAmountData(money) {
    const num = Number(money);
    let format;
    if (money >= 0) {
      format = num / 1000000000000;
    } else {
      format = 'NaN';
    }
    // console.log(this.toNonExponential(format));
    return this.toNonExponential(format);
  },
  formatAmount(money, fixed, format = 1) {
    // console.log(money);
    try {
      if (money > 0) {
        money = new Decimal(money).div(new Decimal(1000000000000));
        //var money =  money/1000000000000;
        if (fixed != undefined) {
          money = money.toFixed(fixed);
        }
        return format ? this.money_format(money) : money;
      } else {
        return 0;
      }
    } catch (e) {
      //console.log(e);
    }
  },
  formQrocdeData(account, amount, ecosystem) {
    return `jutkeywallet://transfer?${account}&${amount}&${ecosystem}`;
  },
  formatUnit(id = 1, uper) {
    var arr = this.getCache('ecosystems');
    var name = typeof arr == 'object' ? arr[id].token_title : 'NULL';
    name = name == 'NULL' && id == 1 ? 'ibxc' : name;
    try {
      return uper ? name.toUpperCase() : name;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  formatNumber(number) {
    try {
      var num = new Decimal(number);
      return num.isNaN() ? 0 : num.toNumber();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  formatTime: function (timestamp, format = 'y-m-d h:i:s') {
    if (timestamp > 0) {
      var date = new Date(timestamp * 1000);
      //var timezoneOffset = date.getTimezoneOffset();
      ///date.setTime(date.getTime() + timezoneOffset * 60 * 1000 + 480 * 60 * 1000);

      var Y = date.getFullYear();
      var M = this.fillZero(date.getMonth() + 1, 2);
      var D = this.fillZero(date.getDate(), 2);
      var h = this.fillZero(date.getHours(), 2);
      var m = this.fillZero(date.getMinutes(), 2);
      var s = this.fillZero(date.getSeconds(), 2);
      return format
        .replace(/y/g, Y)
        .replace(/m/g, M)
        .replace(/d/g, D)
        .replace(/h/g, h)
        .replace(/i/g, m)
        .replace(/s/g, s);
    }
  },
  transformArrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  },
  transfile(file, field, callback) {
    var reader = new FileReader();
    reader.onload = function () {
      //complete this.result Is a binary stream
      let data = {
        field: field,
        name: file.name,
        type: file.type,
        value: this.result
      };
      console.log(this.result);
      typeof callback == 'function' && callback(data);
    };
    reader.readAsArrayBuffer(file); //Convert binary stream, asynchronous method
  },
  Strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
        len += 2;
      } else {
        len++;
      }
    }
    return len;
  },
  time(date) {
    let dateinit = date ? new Date(date) : new Date();
    return Math.round(dateinit.getTime() / 1000).toString();
  },
  timezone() {
    return new Date().getTimezoneOffset() / 60;
  },
  getDate(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
    var y = dd.getFullYear();
    var m =
      dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
    return y + '-' + m + '-' + d;
  },
  getMonth(monthNum) {
    var dd = new Date();
    dd.setDate(1);
    // console.log(dd.getMonth() - monthNum);
    dd.setMonth(dd.getMonth() - monthNum);
    var y = dd.getFullYear();
    var m =
      dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
    return y + '-' + m;
  },
  pagination(pageNo = 1, pageSize, array) {
    var offset = (pageNo - 1) * pageSize;
    return offset + pageSize >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + pageSize);
  }
};
