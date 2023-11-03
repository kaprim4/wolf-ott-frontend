import { ChatUser } from "./chat.model";

//list of chat users
const USERS: ChatUser[] = [
    {
        id: 1,
        name: 'Margaret Clayton',
        avatar: 'assets/images/users/user-2.jpg',
        lastMessage: 'I have finished it! See you so...',
        lastMessageOn: '05 min',
        status: 'online',
    },
    {
        id: 2,
        name: 'Jason Bent',
        icon: 'mdi mdi-account',
        variant: 'success',
        lastMessage: 'Hey! there I am available',
        lastMessageOn: '20 min',
        status: 'online',
    },
    {
        id: 3,
        name: 'Mark Nieto',
        avatar: 'assets/images/users/user-3.jpg',
        lastMessage: 'This theme is awesome!',
        lastMessageOn: '32 min',
        lastMessageSeen: false,
        status: 'offline',
    },
    {
        id: 4,
        name: 'Garret Sauer',
        avatar: 'assets/images/users/user-4.jpg',
        lastMessage: 'Nice to meet you',
        lastMessageOn: '01 hr',
        lastMessageSeen: false,
        status: 'online',
    },
    {
        id: 5,
        name: 'Michael James',
        avatar: 'assets/images/users/user-5.jpg',
        lastMessage: 'Good morning',
        lastMessageOn: '01 hr',
        status: 'offline',
    },
    {
        id: 6,
        name: 'Felicia Johnson',
        icon: 'mdi mdi-account',
        variant: 'primary',
        lastMessage: 'Meeting 10am',
        lastMessageOn: '02 hr',
        lastMessageSeen: false,
        status: 'offline',
    },
    {
        id: 7,
        name: 'Tracy Marsh',
        avatar: 'assets/images/users/user-6.jpg',
        lastMessage: 'Hey! there I am available',
        lastMessageOn: '04 hr',
        status: 'online',
    },
    {
        id: 8,
        name: 'Richard Lopez',
        avatar: 'assets/images/users/user-7.jpg',
        lastMessage: 'Nice to meet you',
        lastMessageOn: '05 hr',
        status: 'offline',
    },

];

export { USERS };