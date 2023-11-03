import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ApexAxisChartSeries, ApexStroke, ApexDataLabels, ApexXAxis, ApexLegend, ApexFill, ApexGrid, ApexYAxis, ApexTooltip, ApexResponsive, ApexTitleSubtitle, ApexAnnotations, ApexMarkers, ApexStates, } from "ng-apexcharts";

export interface ApexChartOptions {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    labels: string[];
    colors: string[];
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    xaxis: ApexXAxis;
    states: ApexStates;
    legend: ApexLegend;
    tooltip: ApexTooltip;
    fill: ApexFill;
    grid: ApexGrid;
    title: ApexTitleSubtitle,
    annotations: ApexAnnotations,
    markers: ApexMarkers,
    responsive: ApexResponsive[];
    yaxis: ApexYAxis | ApexYAxis[];
}
