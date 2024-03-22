export type Img = {
    _id:string,
    filename: string,
    path: string,
}

export type Error = {
    message: string,
    status?: number,
    code?: string,
    syscall?:string,
}

export type User = {
    _id: string,
    first_name: string,
    last_name: string,
    username: string,
    date_of_birth?: string,
    user_profile_img_id?: string,
    is_admin?: boolean,
    phone_number: string,
    email: string,
    password?: string,
}

export type UserPayload = {
    first_name?: string,
    last_name?: string,
    username: string,
    date_of_birth?: string,
    user_profile_img?: File,
    is_admin?: boolean,
    phone_number: string,
    email: string,
    password: string,
}


export type MessagePayload = {
    user_id: string | null,
    chat_id: string | null,
    body: string,
}

export type Message = {
    chat_id: string,
    user_id: string,

    body: string,
    status: "new" | "edited" | "deleted",

    message_img_id?: string,

    created_at?: string,
    updated_at?: string,
}

export type ChatPayload = {
    chat_users: string,
    is_group_chat?:boolean
}

export type Chat= {
    _id: string,
    chat_name?: string,
    chat_users: User[],
    is_group_chat?:boolean,
    status: "active" | "deleted",
}

export type SignInPayload = {
    identity_field: string,
    password: string,
}
