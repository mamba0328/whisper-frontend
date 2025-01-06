const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;

const GLOBAL_API_PATH = "/api";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const SIGN_OUT = "/sign-out";

export const USER = `${GLOBAL_API_PATH}/users`;

export const CHATS = `${GLOBAL_API_PATH}/chats`;
export const CHAT_MESSAGES = `${GLOBAL_API_PATH}/chat-messages`;
export const MESSAGES_IMGS = `${GLOBAL_API_PATH}/messages-imgs`;

export const MESSAGE_SEEN_BY = `${GLOBAL_API_PATH}/message-seen-by`;
export const CLOUDINARY_SIGNATURE = `${GLOBAL_API_PATH}/cloudinary/signature`;

export const CLOUDINARY_STORAGE = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`;
