export const USER_FRAGMENT = `
  id
  username
`;

export const COMMENT_FRAGMENT = `
  id
  text
  user {
    ${USER_FRAGMENT}
  }
`;

export const FILE_FRGMENT = `
  id
  url
`;

export const FULL_POST_FRAGMENT = `
  fragment PostParts on Post {
    id
    location
    caption
    files {
      ${FILE_FRGMENT}
    }
    comments {
      ${COMMENT_FRAGMENT}
    }
    user {
      ${USER_FRAGMENT}
    }
  }
`;