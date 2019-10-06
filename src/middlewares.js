export const isAuthenticated = reqeust => {
  if (!reqeust.user){
    throw Error("You need to log in to perform this action");
  }
  return;
};
