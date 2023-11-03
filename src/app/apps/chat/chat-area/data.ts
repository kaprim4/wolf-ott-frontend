import { ChatMessage, ChatUser } from "../chat.model";
import { USERS } from "../data";

//sender
const defaultTo: ChatUser = {
    id: 9,
    name: 'Nowak Helme',
    avatar: 'assets/images/users/user-1.jpg',
};

// list of chat messages
const MESSAGES: ChatMessage[] = [];
for (const user of USERS) {
    MESSAGES.push(
        {
            id: 1,
            message: [{
                type: 'text',
                value: 'Hello!'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:00'
        },
        {
            id: 2,
            message: [{
                type: 'text',
                value: 'Hi, How are you? What about our next meeting?'
            }],
            to: user,
            from: defaultTo,
            sendOn: '10:01'
        },
        {
            id: 3,
            message: [{
                type: 'text',
                value: 'Yeah everything is fine'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:01'
        },
        {
            id: 4,
            message: [{
                type: 'text',
                value: '& Next meeting tomorrow 10.00AM'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:03'
        },
        {
            id: 5,
            message: [{
                type: 'text',
                value: 'Wow that\'s great'
            }],
            to: user,
            from: defaultTo,
            sendOn: '10:03'
        },

    );
}

export default MESSAGES;