export function getUserData(users, id) {
  return users.find(user => user.id === id);
}