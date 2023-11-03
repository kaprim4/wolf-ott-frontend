import { ChartData, ChartOptions, ChartType } from "chart.js";

export type ChartDataset<TType extends ChartType = ChartType> = {
    type?: ChartType;
    chartOptions?: ChartOptions<TType>;
    data?: ChartData<TType>;
}
