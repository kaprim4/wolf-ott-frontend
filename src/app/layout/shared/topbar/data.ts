import { NotificationItem } from "../models/notification.model";
import { ProfileOptionItem } from "../models/profileoption.model";

const NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        isActive: true,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        avatar: 'assets/images/users/user-1.jpg',
    },
    {
        id: 2,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 3,
        text: 'Karen Robinson',
        subText: 'Wow ! this admin looks good and awesome design',
        avatar: 'assets/images/users/user-4.jpg',
    },
    {
        id: 4,
        text: 'New user registered.',
        subText: '5 hours ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'warning',
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'info',
    },
    {
        id: 6,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'mdi mdi-heart',
        bgColor: 'secondary',
    },
];

const PROFILEOPTIONS: ProfileOptionItem[] = [
    {
        label: 'My Account',
        icon: 'fe-user',
        redirectTo: '/apps/contacts/profile',
    },
    {
        label: 'Lock Screen',
        icon: 'fe-lock',
        redirectTo: '/auth/lock-screen',
    },
    {
        label: 'Logout',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    }
];

export { NOTIFICATIONS, PROFILEOPTIONS };