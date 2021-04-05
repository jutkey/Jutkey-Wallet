/*
 * @Author: abc
 * @Date: 2020-11-05 19:00:54
 * @LastEditors: abc
 * @LastEditTime: 2021-03-22 15:27:03
 * @Description:echarts
 */
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
//  Component
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  DataZoomComponent
]);

export default echarts;
