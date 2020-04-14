export const COMMENT_FRAGMENT = `

fragment CommentParts on Comment{
id
text
user{
    id
    userName,
    avatar
}}`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants{
            id
            userName,
            avatar
        },
        messages{
            id,
            text,
            to{
                id
                userName,
                avatar
            },
            from {
                id
                userName,
                avatar
            }
        }
    }
`