import { ChartDataset } from "./chartjs.model";

// chart data
const LINECHART: ChartDataset =
{
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
        datasets: [{
            label: "Sales Analytics",
            fill: false,
            backgroundColor: "#10c469",
            borderColor: "#10c469",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#039cfd",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#039cfd",
            pointHoverBorderColor: "#eef0f2",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 35, 30]
        }],
    },
    chartOptions: {
        maintainAspectRatio: false,
        plugins: {
            filler: {
                propagate: false,
            },
            legend: {
                display: true,
            },
            tooltip: {
                intersect: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 10,
                },

            },
        },
    },
};

const BARCHART: ChartDataset = {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Sales Analytics",
                backgroundColor: "RGBA(3,149,253,0.3)",
                borderColor: "#0388FD",
                borderWidth: 1,
                hoverBackgroundColor: "RGBA(3,149,253,0.6)",
                hoverBorderColor: "#0388FD",
                data: [65, 59, 80, 81, 56, 55, 40, 20]
            }
        ],
    },
    chartOptions: {
        maintainAspectRatio: false,
    }
}

const DONUTCHART: ChartDataset<'doughnut'> = {
    type: 'doughnut',
    data: {
        labels: [
            "Desktops",
            "Tablets",
            "Mobiles"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#0388FD",
                    "#10c469",
                    "#f1b53d"
                ],
                hoverBackgroundColor: [
                    "#0388FD",
                    "#10c469",
                    "#f1b53d"
                ],
                hoverBorderColor: "#fff"
            }],
    },
    chartOptions: {
        maintainAspectRatio: false,
        cutout: 10
    }
}

const PIECHART: ChartDataset = {
    type: 'pie',
    data: {
        labels: [
            "Desktops",
            "Tablets",
            "Mobiles"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#ff8acc",
                    "#5b69bc",
                    "#f1b53d"
                ],
                hoverBackgroundColor: [
                    "#ff8acc",
                    "#5b69bc",
                    "#f1b53d"
                ],
                hoverBorderColor: "#fff"
            }],
    },
    chartOptions: {
        maintainAspectRatio: false,
    }
}

const RADARCHART: ChartDataset = {
    type: 'radar',
    data: {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "Desktops",
                backgroundColor: "rgba(57,175,209,0.2)",
                borderColor: "#39afd1",
                pointBackgroundColor: "#39afd1",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#39afd1",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "Tablets",
                backgroundColor: "rgba(161, 127, 224,0.2)",
                borderColor: "#a17fe0",
                pointBackgroundColor: "#a17fe0",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#a17fe0",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ],
    },
    chartOptions: {
        maintainAspectRatio: false,
        scales: {
            r: {
                ticks: {
                    backdropColor: 'transparent',
                },
                grid: {
                    color: 'rgba(150, 150, 150, 0.1)',
                },
                angleLines: {
                    color: 'rgba(150, 150, 150, 0.1)',
                },
            },
        },
    },

}

const POLARAREACHART: ChartDataset = {
    type: 'polarArea',
    data: {
        labels: [
            "Series 1",
            "Series 2",
            "Series 3",
            "Series 4",
            "Series 5"
        ],
        datasets: [{
            data: [
                11,
                16,
                7,
                3,
                14
            ],
            backgroundColor: [
                "#ff8acc",
                "#5b69bc",
                "#f1b53d",
                "#E7E9ED",
                "#10c469"
            ],
            label: 'My dataset', // for legend
            hoverBorderColor: "#fff"
        }],
    },
    chartOptions: {
        maintainAspectRatio: false,
        scales: {
            r: {
                ticks: {
                    backdropColor: 'transparent',
                },
                angleLines: {
                    color: 'rgba(150, 150, 150, 0.1)', // lines radiating from the center
                },
                grid: {
                    color: 'rgba(150, 150, 150, 0.1)',
                },
            },
        },
    }
}

export { LINECHART, BARCHART, DONUTCHART, RADARCHART, PIECHART, POLARAREACHART };