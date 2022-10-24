import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import util from './util';

echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent
]);
const theme: string = window.localStorage.getItem('theme')! || 'light';
class Chart {
  private theme = theme;

  public dom!: HTMLElement;

  private echartsInit: any;

  constructor(dom: string) {
    this.dom = document.getElementById(dom)!;
    if (this.dom) {
      if (
        this.echartsInit !== null &&
        this.echartsInit !== '' &&
        this.echartsInit !== undefined
      ) {
        this.echartsInit.dispose();
      }
      this.echartsInit = echarts.init(this.dom);
    }
  }

  private themeValue() {
    this.theme = window.localStorage.getItem('theme')! || 'light';
    console.log(this.theme);
    return this.theme === 'light' ? '#4a5373' : 'rgba(255, 255, 255, 0.9)';
  }

  private themeyAxis() {
    this.theme = window.localStorage.getItem('theme')! || 'light';
    return this.theme === 'light' ? '#eaedf7' : '#646464';
  }

  public lineChart(xData: any, yData: any) {
    const color = this.themeValue();
    const option = {
      color: ['#00FFA6'],
      grid: {
        left: '2%',
        right: '2%',
        x2: '2%',
        y2: '2%',
        containLabel: true
      },
      textStyle: {
        color,
        fontFamily: 'Chakra Petch Light',
        fontWeight: '100'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        valueFormatter: (value: string) => `${util.format(value)} IBXC`
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisLine: {
          lineStyle: {
            color: this.themeyAxis()
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: this.themeyAxis()
          }
        }
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true
        }
      ]
    };
    this.echartsInit.setOption(option);
    window.onresize = () => {
      this.echartsInit.resize();
    };
  }
}
export default Chart;
