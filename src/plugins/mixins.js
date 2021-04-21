/*
 * @Author: abc
 * @Date: 2020-12-07 10:15:34
 * @LastEditors: abc
 * @LastEditTime: 2021-04-21 18:08:16
 * @Description:mixins
 */
import isElectron from 'is-electron';
import moment from 'moment';
import Centrifuge from 'centrifuge';
import echarts from '@/plugins/echarts.js';
import { Loading } from 'element-ui';
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          currency: 'IBXC',
          wholeLoading: '',
          isElectron: isElectron(),
          centrifuge: null
        };
      },
      methods: {
        handleOpenLoading() {
          this.wholeLoading = Loading.service({
            lock: true,
            text: 'Loading',
            fullscreen: false,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
          });
        },
        handleCloseLoading() {
          this.$nextTick(() => {
            this.wholeLoading.close();
          });
        },
        handleGetSocket({ url, token }, fn, subscribe) {
          // console.log(url, token);
          this.centrifuge = new Centrifuge(url);
          this.centrifuge.setToken(token);
          // start contact
          let that = this;
          this.centrifuge.connect();
          var callbacks = {
            // See below description of message format
            publish: function (message) {
              fn(message);
              //that.homeLoading = false;
              //  console.log(message);
              const info = 'Data  successful';
              console.log(`%c${subscribe}:${info};`, that.green);
            },
            // See below description of join message format
            join: function (message) {
              console.log(222);
              console.log(message);
            },
            // See below description of leave message format
            leave: function (message) {
              console.log(333);
              console.log(message);
            },
            // See below description of subscribe callback context format
            subscribe: function (context) {
              const info = 'Subscribe Success';
              console.log(`%c${context.channel}:${info};`, that.blue);
            },
            // See below description of subscribe error callback context format
            error: function (context) {
              console.error(`${context.channel}:Subscription Success;`);
            },
            // See below description of unsubscribe event callback context format
            unsubscribe: function (context) {
              console.log(`%c${context.channel}:Break off;`, that.yellow);
            }
          };
          this.centrifuge.subscribe(subscribe, callbacks);
          this.$once('hook:beforeDestroy', () => {
            this.centrifuge.disconnect();
          });
        },
        handleDisconnect() {
          this.centrifuge.disconnect();
        },
        hadnleDrawLine(
          dom,
          xAxisData,
          seriesData,
          label,
          lineColor = '#4366F1',
          color1 = 'rgba(67,102,241,1)',
          color2 = 'rgba(67,102,241,0)'
        ) {
          let indexeChart = echarts.init(dom);
          window.addEventListener('resize', function () {
            indexeChart.resize();
          });
          indexeChart.setOption({
            tooltip: {
              trigger: 'axis'
            },
            color: [lineColor],
            legend: {
              data: label,
              selectedMode: false,
              textStyle: {
                color: 'rgb(102, 102, 102)'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                  color: 'rgba(139,172,255,0.2)'
                }
              },
              axisLabel: {
                textStyle: {
                  color: 'rgb(102, 102, 102)'
                },
                margin: 15,
                interval: 0,
                rotate: 45,
                formatter: function (value) {
                  if (value.length > 10) {
                    return value.substr(0, 5) + '...';
                  } else {
                    return value;
                  }
                }
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(139,172,255,0.2)'
                }
              }
            },
            series: [
              {
                name: label[0],
                data: seriesData,
                type: 'line',
                smooth: true,
                showSymbol: true,
                symbol: 'circle',
                symbolSize: 12,
                lineStyle: {
                  width: 3,
                  type: 'solid',
                  color: lineColor
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: color1
                    },
                    {
                      offset: 1,
                      color: color2
                    }
                  ])
                }
              }
            ]
          });
        },
        handleDrawBar(dom, xAxisData, seriesData, seriesData1, label) {
          //  console.log(label);
          let indexeChart = echarts.init(dom);
          window.addEventListener('resize', function () {
            indexeChart.resize();
          });
          indexeChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: label,
              textStyle: {
                color: 'rgb(102, 102, 102)'
              }
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                  show: true,
                  type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            animationEasing: 'elasticOut',
            dataZoom: [
              {
                show: true,
                height: 30,
                xAxisIndex: [0],
                bottom: 40,
                start: 0,
                end: 80,
                startValue: 10,
                endValue: 100
              }
            ],
            grid: {
              bottom: 120
            },
            xAxis: [
              {
                type: 'category',
                axisTick: { show: false },
                data: xAxisData,
                axisLabel: {
                  rotate: 50,
                  splitNumber: 15,
                  formatter: function (value) {
                    return value.length > 10
                      ? value.slice(0, 10) + '...'
                      : value;
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'log',
                axisLabel: {
                  textStyle: {
                    color: '#333',
                    fontStyle: 'normal',
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 12
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#333'
                  }
                }
              }
            ],
            series: [
              {
                name: label[0],
                type: 'bar',
                barGap: '50%',
                stack: 'Total',
                barWidth: 10,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 30
                  },
                  normal: {
                    color: '#04B78A'
                  }
                },
                data: seriesData1
              },
              {
                name: label[1],
                type: 'bar',
                barGap: '50%',
                stack: 'Total',
                barWidth: 10,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 30
                  },
                  normal: {
                    barBorderRadius: [4, 4, 0, 0],
                    color: '#3961F5'
                  }
                },
                data: seriesData
              }
            ],
            noDataLoadingOption: {
              effect: 'bubble',
              text: 'No data available',
              effectOption: {
                effect: {
                  n: 0
                }
              },
              textStyle: {
                fontSize: 32,
                fontWeight: 'bold'
              }
            }
          });
        },
        /* in or out fouction */
        handleIncome(item, ecosystem) {
          let unit = this.util.formatUnit(ecosystem, true);
          let result = ``;
          const account = this.auth.getUser('key_id');
          // console.log(account);
          const objShow =
            item.sender_id == item.recipient_id
              ? { mark: '+-', color: '#3961f5' }
              : item.recipient_id == account
              ? { mark: '+', color: '#04B78A' }
              : item.sender_id == account
              ? { mark: '-', color: '#EE2E6B' }
              : { mark: '', color: '' };
          const { mark, color } = objShow;
          result = `<font color="${color}">${mark} ${this.util.formatAmountData(
            item.amount
          )} ${unit}</font>`;
          return result;
        }
      },
      filters: {
        formatTime(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
          return moment.unix(dataStr).format(pattern);
        },
        formatTimeCst(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
          return moment(dataStr).format(pattern);
        },
        formatTimeUtc(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
          return `${moment.unix(dataStr).utc().format(pattern)} (UTC)`;
        },
        formatMounthTimeUtc(dataStr, pattern = 'MM-DD HH:mm:ss') {
          return moment.unix(dataStr).utc().format(pattern);
        },
        formatTimeUtcCst(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
          return moment(dataStr).utc().format(pattern);
        }
      }
    });
  }
};
