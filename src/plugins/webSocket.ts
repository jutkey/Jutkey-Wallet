import Centrifuge from 'centrifuge';
import store from '@/store';

class Socket {
  private url: string;

  private token: string;

  // eslint-disable-next-line no-restricted-globals
  [name: string]: any;

  constructor() {
    this.url = '';
    this.token = '';
  }

  public async handleGetSocket(fn: Function, subscribe: string) {
    const { url, token } = await store.dispatch('handleActSocket');
    this.url = url;
    this.token = token;
    this[subscribe] = new Centrifuge(this.url);
    console.log(this[subscribe]);
    this[subscribe].setToken(this.token);
    // start contact
    this[subscribe].connect();
    const callbacks = {
      // See below description of message format
      publish(message: any) {
        fn(message.data);
        //  console.log(message);
        const info = 'Data  successful';
        console.log(`%c${subscribe}:${info};`, `color:green; font-size: 14px;`);
      },
      // See below description of join message format
      join(message: any) {
        console.log(222);
        console.log(message);
      },
      // See below description of leave message format
      leave(message: any) {
        console.log(333);
        console.log(message);
      },
      // See below description of subscribe callback context format
      subscribe(context: any) {
        const info = 'Subscribe Success';
        console.log(
          `%c${context.channel}:${info};`,
          `color:blue; font-size: 14px;`
        );
      },
      // See below description of subscribe error callback context format
      error(context: any) {
        console.error(`${context.channel}:Subscription Success;`);
      },
      // See below description of unsubscribe event callback context format
      unsubscribe(context: any) {
        console.log(
          `%c${context.channel}:Break off;`,
          `background:#000;color:yellow; font-size: 14px;`
        );
      }
    };
    this[subscribe].subscribe(subscribe, callbacks);
  }

  public handleDisconnect(subscribe: string) {
    if (this[subscribe]) {
      this[subscribe].disconnect();
    }
  }
}
export default new Socket();
