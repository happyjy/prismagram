export const COMMENT_FRAGMENT = `
  fragment CommentParts on Comment{
    id
    text
    user {
      username
    }
  }
`

//사용하지 않음
// me resolver에서 사용되었음
export const USER_FRAGMENT = `
  fragment UserParts on User {
    id
    username
    email
    firstName
    lastName
    bio
    posts {
      id
      caption   
    }
  }
`;
