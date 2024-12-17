export interface ILineActivity {
    id: number
}

export interface LineActivityList extends ILineActivity {
    line_id: number,
    line_name: string,
    stream_id: number,
    stream_name: string,
    player: string,
    isp: string,
    ip: string,
    country: string,
    startAt: Date,
    endAt: Date,
    output: string
}

export interface LineChartResponse {
    country: string,
    count: number,
    percentage: string,
}
