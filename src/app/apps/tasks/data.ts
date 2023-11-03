import { Comment, TaskItem } from "./tasks.model";

const KANBANTASKS: TaskItem[] = [
    {
        id: 1,
        title: 'Improve animation loader',
        status: 'Upcoming',
        priority: 'Urgent',
        avatar: 'assets/images/users/user-1.jpg',
        username: 'Latasha B. Seibel',
        totalTasks: 5,
        totalComments: 3,
    },
    {
        id: 2,
        title: 'Write a release note for Admin v1.5',
        status: 'Upcoming',
        priority: 'High',
        avatar: 'assets/images/users/user-2.jpg',
        username: 'Janie R. Pinheiro',
        totalTasks: 2,
        totalComments: 4,
    },
    {
        id: 3,
        title: 'Invite user to a project',
        status: 'Upcoming',
        avatar: 'assets/images/users/user-3.jpg',
        username: 'Brian M. Behrens',
        totalTasks: 9,
        totalComments: 5,
    },
    {
        id: 4,
        title: 'Code HTML email template for welcome email',
        status: 'Upcoming',
        priority: 'Urgent',
        avatar: 'assets/images/users/user-4.jpg',
        username: 'Keith S. Lindstrom',
        totalTasks: 6,
        totalComments: 9,
    },
    {
        id: 5,
        title: 'File Uploads on Cards',
        status: 'Inprogress',
        priority: 'Urgent',
        avatar: 'assets/images/users/user-5.jpg',
        username: 'Russell H. Benson',
        totalTasks: 2,
        totalComments: 4,
    },
    {
        id: 6,
        title: 'Enable analytics tracking',
        status: 'Inprogress',
        priority: 'High',
        avatar: 'assets/images/users/user-6.jpg',
        username: 'Jacquelyn R. Oleary',
        totalTasks: 5,
        totalComments: 3,
    },
    {
        id: 7,
        title: 'Improve animation order',
        status: 'Inprogress',
        avatar: 'assets/images/users/user-7.jpg',
        username: 'John A. Sherrill',
        totalTasks: 8,
        totalComments: 6,
    },
    {
        id: 8,
        title: 'Improve animation order',
        status: 'Completed',
        priority: 'Urgent',
        avatar: 'assets/images/users/user-8.jpg',
        username: 'Jamie D. Schwartz',
        totalTasks: 1,
        totalComments: 3,
    },
    {
        id: 9,
        title: 'Write a release note for Admin v1.5',
        status: 'Completed',
        priority: 'High',
        avatar: 'assets/images/users/user-9.jpg',
        username: 'Russell B. Clancy',
        totalTasks: 7,
        totalComments: 3,
    },
    {
        id: 10,
        title: 'Invite user to a project',
        status: 'Completed',
        avatar: 'assets/images/users/user-10.jpg',
        username: 'Robert B. Brown',
        totalTasks: 6,
        totalComments: 2,
    },
    {
        id: 11,
        title: 'Code HTML email template for welcome email',
        status: 'Completed',
        priority: 'Urgent',
        avatar: 'assets/images/users/user-5.jpg',
        username: 'Maria K. Trevino',
        totalTasks: 3,
        totalComments: 5,
    },
];

const COMMENTS: Comment[] = [
    {
        id: 1,
        username: 'Mat Helme',
        avatar: 'assets/images/users/user-1.jpg',
        text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.'
    },
    {
        id: 2,
        username: 'Greeva Navadiya',
        avatar: 'assets/images/users/user-2.jpg',
        text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.',
        replies: [
            {
                id: 3,
                username: 'Michael John',
                avatar: 'assets/images/users/user-3.jpg',
                text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.'
            }
        ]
    },
    {
        id: 4,
        username: 'Mat Helme',
        avatar: 'assets/images/users/user-1.jpg',
        text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.'
    },
    {
        id: 5,
        username: 'Mat Helme',
        avatar: 'assets/images/users/user-1.jpg',
        text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.'
    }
];

export { KANBANTASKS, COMMENTS }