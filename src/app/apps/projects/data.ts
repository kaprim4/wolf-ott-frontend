import { Project } from "./projects.model";

const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'New Admin Design',
        category: 'WEB DESIGN',
        state: 'Completed',
        shortDesc:
            'If several languages coalesce the grammar is more simple and regular than that of the individual languages...',
        totalQuestions: 56,
        totalComments: 452,
        teamMembers: [
            {
                image: 'assets/images/users/user-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-2.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/user-3.jpg',
                name: 'James Anderson',
            },
            {
                image: 'assets/images/users/user-4.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-5.jpg',
                name: 'Username',
            },
        ],
        progress: 80,
        variant: 'success',
    },
    {
        id: 2,
        title: 'App Design and Develop',
        category: 'ANDROID',
        state: 'Completed',
        shortDesc: 'New common language will be more simple and regular than the existing European languages...',
        totalQuestions: 77,
        totalComments: 875,
        teamMembers: [
            {
                image: 'assets/images/users/user-6.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-7.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/user-8.jpg',
                name: 'James Anderson',
            },
        ],
        progress: 45,
        variant: 'primary',
    },
    {
        id: 3,
        title: 'Landing page Design',
        category: 'WEB DESIGN',
        state: 'Completed',
        shortDesc:
            'It will be as simple as occidental in fact it will be to an english person it will seem like simplified English...',
        totalQuestions: 87,
        totalComments: 125,
        teamMembers: [
            {
                image: 'assets/images/users/user-9.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-10.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/user-1.jpg',
                name: 'James Anderson',
            },
            {
                image: 'assets/images/users/user-3.jpg',
                name: 'Mat Helme',
            },
        ],
        progress: 68,
        variant: 'pink',
    },
    {
        id: 4,
        title: 'App Design and Develop',
        category: 'ANDROID',
        state: 'Completed',
        shortDesc:
            'Everyone realizes why a new common language would be desirable one could refuse to pay expensive translators...',
        totalQuestions: 77,
        totalComments: 875,
        teamMembers: [
            {
                image: 'assets/images/users/user-5.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-8.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/user-9.jpg',
                name: 'James Anderson',
            },
        ],
        progress: 45,
        variant: 'purple',
    },
    {
        id: 5,
        title: 'Landing page Design',
        category: 'WEB DESIGN',
        state: 'Completed',
        shortDesc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium deleniti...',
        totalQuestions: 87,
        totalComments: 125,
        teamMembers: [
            {
                image: 'assets/images/users/user-3.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-4.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/user-5.jpg',
                name: 'James Anderson',
            },
            {
                image: 'assets/images/users/user-1.jpg',
                name: 'Mat Helme',
            },
        ],
        progress: 68,
        variant: 'danger',
    },
    {
        id: 6,
        title: 'New Admin Design',
        category: 'WEB DESIGN',
        state: 'Completed',
        shortDesc:
            'Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary....',
        totalQuestions: 56,
        totalComments: 452,
        teamMembers: [
            {
                image: 'assets/images/users/user-6.jpg',
                name: 'Mat Helme',
            },
            {
                image: 'assets/images/users/user-7.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: 'assets/images/users/user-8.jpg',
                name: 'James Anderson',
            },
        ],
        progress: 80,
        variant: 'warning',
    },
];

export { PROJECTS }