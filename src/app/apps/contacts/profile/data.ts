import { Post } from "./profile.model";

export const POSTS: Post[] = [
    {
        id: 1,
        authorAvatar: 'assets/images/users/user-1.jpg',
        authorName: 'Adam Jansen',
        postedOn: 'about 2 minutes ago',
        content: {
            message: 'Story based around the idea of time lapse, animation to post soon!',
            media: `<div>
                    <a class='cursor-pointer'>
                    <img src="assets/images/small/img-1.jpg" class="avatar-md rounded">
                    </a>
                    <a class='cursor-pointer'>
                    <img src="assets/images/small/img-2.jpg" class="avatar-md rounded">
                    </a>
                    <a class='cursor-pointer'>
                    <img src="assets/images/small/img-3.jpg" class="avatar-md rounded">
                    </a>
                    </div>`
        },
        replies: [
            {
                id: 2,
                authorAvatar: 'assets/images/users/user-3.jpg',
                authorName: 'John Smith',
                postedOn: 'about 1 hour ago',
                content: {
                    message: 'Wow impressive!',
                },
            },
            {
                id: 3,
                authorAvatar: 'assets/images/users/user-4.jpg',
                authorName: 'Matt Cheuvront',
                postedOn: 'about 2 hour ago',
                content: {
                    message: 'Wow, that is really nice.',
                },
                replies: [
                    {
                        id: 4,
                        authorAvatar: 'assets/images/users/user-5.jpg',
                        authorName: 'Stephanie Walter',
                        postedOn: 'about 3 hour ago',
                        content: {
                            message: 'Nice work, makes me think of The Money Pit.',
                        }
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        authorAvatar: 'assets/images/users/user-6.jpg',
        authorName: 'John Smith',
        postedOn: 'about 4 hour ago',
        content: {
            message: 'i am in the middle of a timelapse animation myself!(Very different though.) Awesome stuff.',
        }

    },
    {
        id: 6,
        authorAvatar: 'assets/images/users/user-7.jpg',
        authorName: 'Nicolai Larson',
        postedOn: 'about 10 hour ago',
        content: {
            message: 'The parallax is a little odd but O.o that house build is awesome!!',
        }
    },
];