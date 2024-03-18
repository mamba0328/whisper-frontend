import { Chat, Message } from "../../types/types";

const user_1 = {
    "is_admin": false,
    "_id": "65df1ad036918aa880405297",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe1234",
    "date_of_birth": "1990-01-01T00:00:00.000Z",
    "phone_number": "12345678905",
    "email": "john1.doe@example.com",
    "password": "$2a$10$p7ySJutXMwRuiMpvyD03/eCTGnLWprEgzvYMUkSZmzhzQfN4NtkoS",
    "writes_in_chat": null,
    "is_online": false,
    "status": "active",
    "created_at": "2024-02-28T11:36:40.588Z",
    "__v": 0
};
const user_2 = {
    "is_admin": false,
    "_id": "65dc92a0799061635d67bf6a",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe123",
    "date_of_birth": "1990-01-01T00:00:00.000Z",
    "user_profile_img_id": "65dc930e485595de9278b111",
    "phone_number": "1234567890",
    "email": "john.doe@example.com",
    "password": "$2a$10$ZQ0PgA.mGNVtp.PviR9sIOD9voNMQQFfnRIR8621aUGDRSTsjmzEO",
    "writes_in_chat": null,
    "is_online": false,
    "status": "active",
    "created_at": "2024-02-26T13:31:10.084Z",
    "__v": 0,
    "updated_at": "2024-02-26T13:33:02.975Z"
};

type ChatResponse = {
    chat:Chat,
    last_message:Message,
}
export const mockChatRespone:Array<ChatResponse> = [
    {
        chat: {
            _id: "asdasdsa123sdasd",
            chat_users: [user_2],
            status: "active"
        },
        last_message: {
            chat_id: "chat_user_2",
            user_id: user_2._id,
            body: "This is the last message in a chat without a name.",
            message_img_id: "asdasdsa123sdasd;l1[3pl12=3-asdasdq2",
            status: "new",
            created_at: new Date().toISOString()
        }
    },
    {
        chat: {
            _id: "asdasdsa123sdasdas",
            chat_users: [user_2],
            status: "active"
        },
        last_message: {
            chat_id: "chat_user_2",
            user_id: user_2._id,
            body: "This is the last message in a chat without a name 2.",
            message_img_id: "asdasdsa123sdasd;l1[3pl12=3-asdq2",
            status: "new",
            created_at: new Date().toISOString()
        }
    },
    {
        chat: {
            _id: "asdasdsa123sdasdas23",
            chat_users: [user_2],
            status: "active"
        },
        last_message: {
            chat_id: "chat_user_4",
            user_id: user_2._id,
            body: "This is the last message in a chat without a name 3.",
            message_img_id: "asdasdsa12sd;l1[3pl12=3-asdasdq2",
            status: "new",
            created_at: new Date().toISOString()
        }
    }
];
