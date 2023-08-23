export const changeUserNameAction = (name) => {
  return {
    type: "changeUserName",
    name,
  }
}
export const changeUserAgeAction = (age) => {
  return {
    type: "changeUserAge",
    age
  }
}