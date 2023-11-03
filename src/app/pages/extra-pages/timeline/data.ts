import { TimelineItem } from "./timeline.model";

export const TIMELINEDATA: TimelineItem[] = [
    {
        id: 1,
        day: 'Today',
        posts: [{
            id: 1,
            variant: 'danger',
            postedOn: '1 hour ago',
            time: '08:25 am',
            content: `<p>Dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? </p>`,
        },
        {
            id: 2,
            variant: 'success',
            postedOn: '2 hour ago',
            time: '08:25 am',
            content: `<p>consectetur adipisicing elit. Iusto, optio, dolorum <a href="javascript:void(0)"> John deon </a> provident rerum aut hic quasi placeat iure tempora laudantium </p>`,
        },
        {
            id: 3,
            variant: 'primary',
            postedOn: '10 hour ago',
            time: '08:25 am',
            content: `
                <p>3 new photo Uploaded on facebook fan page</p>
                <div class="album">
                <a href="javascript:void(0)">
                    <img alt="" src="assets/images/small/img-1.jpg" class="img-fluid">
                </a>
                <a href="javascript:void(0)">
                    <img alt="" src="assets/images/small/img-2.jpg">
                </a>
                <a href="javascript:void(0)">
                    <img alt="" src="assets/images/small/img-3.jpg">
                </a>
                </div>
                <div class="clearfix"></div>
                `,
        },
        {
            id: 4,
            variant: 'purple',
            postedOn: '14 hour ago',
            time: '08:25 am',
            content: `<p>Outdoor visit at California State Route 85 with John Boltana & Harry Piterson regarding to setup a new show room.</p>`,
        },
        {
            id: 5,
            postedOn: '19 hour ago',
            time: '08:25 am',
            content: ` <p>Jonatha Smith added new milestone <span><a href="javascript:void(0)"> Pathek </a></span>Lorem ipsum dolor sit amet consiquest dio</p>`,
        }]
    },
    {
        id: 2,
        day: 'Yesterday',
        posts: [{
            id: 6,
            variant: 'warning',
            postedOn: '07 January 2018',
            time: '08:25 am',
            content: `<p>Montly Regular Medical check up at Greenland Hospital by the doctor <span><a href="javascript:void(0)"> Johm meon </a></span></p>`,
        },
        {
            id: 7,
            postedOn: '07 January 2018',
            variant: 'primary',
            time: '08:25 am',
            content: `<p>Download the new updates of Ubold admin dashboard</p>`,
        },
        {
            id: 8,
            variant: 'success',
            postedOn: '07 January 2018',
            time: '08:25 am',
            content: `<p>Jonatha Smith added new milestone <span><a class="blue" href="javascript:void(0)"> crishtian </a></span>Lorem ipsum dolor sit amet consiquest dio</p>`,
        }]
    },
    {
        id: 3,
        day: 'Last Month',
        posts: [{
            id: 9,
            postedOn: '31 December 2017',
            time: '08:25 am',
            content: `<p>Download the new updates of Ubold admin dashboard</p>`,
        },
        {
            id: 10,
            variant: 'danger',
            postedOn: '16 Decembar 2017',
            time: '08:25 am',
            content: `<p>Jonatha Smith added new milestone <span><a href="javascript:void(0)"> prank </a></span>Lorem ipsum dolor sit amet consiquest dio</p>`,
        }]
    }
];