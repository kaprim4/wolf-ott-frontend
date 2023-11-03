import { Message, Project } from "./dashboard.model";

const MESSAGES: Message[] = [
    {
        id: 1,
        avatar: 'assets/images/users/user-1.jpg',
        sender: 'Chadengle',
        text: "Hey! there I'm available...",
        time: '13:40 PM',
    },
    {
        id: 2,
        avatar: 'assets/images/users/user-2.jpg',
        sender: 'Tomaslau',
        text: "I've finished it! See you so...",
        time: '13:34 PM',
    },
    {
        id: 3,
        avatar: 'assets/images/users/user-3.jpg',
        sender: 'Stillnotdavid',
        text: 'This theme is awesome!',
        time: '13:17 PM',
    },
    {
        id: 4,
        avatar: 'assets/images/users/user-4.jpg',
        sender: 'Kurafire',
        text: 'Nice to meet you',
        time: '12:20 PM',
    },
    {
        id: 5,
        avatar: 'assets/images/users/user-5.jpg',
        sender: 'Shahedk',
        text: "Hey! there I'm available...",
        time: '10:15 PM',
    },
];

const PROJECTS: Project[] = [
    {
        id: 1,
        name: 'Adminto Admin v1',
        startDate: '01/01/2017',
        dueDate: '26/04/2017',
        status: 'Released',
        variant: 'danger',
        assignee: 'Coderthemes',
    },
    {
        id: 2,
        name: 'Adminto Frontend v1',
        startDate: '01/01/2017',
        dueDate: '26/04/2017',
        status: 'Released',
        variant: 'success',
        assignee: 'Adminto admin',
    },
    {
        id: 3,
        name: 'Adminto Admin v1.1',
        startDate: '01/05/2017',
        dueDate: '10/05/2017',
        status: 'Pending',
        variant: 'pink',
        assignee: 'Coderthemes',
    },
    {
        id: 4,
        name: 'Adminto Frontend v1.1',
        startDate: '01/01/2017',
        dueDate: '31/05/2017',
        status: 'Work in Progress',
        variant: 'purple',
        assignee: 'Adminto admin',
    },
    {
        id: 5,
        name: 'Adminto Admin v1.3',
        startDate: '01/01/2017',
        dueDate: '31/05/2017',
        status: 'Coming soon',
        variant: 'warning',
        assignee: 'Coderthemes',
    },
    {
        id: 6,
        name: 'Adminto Admin v1.3',
        startDate: '01/01/2017',
        dueDate: '31/05/2017',
        status: 'Coming soon',
        variant: 'blue',
        assignee: 'Adminto admin',
    },
];


export { MESSAGES, PROJECTS };