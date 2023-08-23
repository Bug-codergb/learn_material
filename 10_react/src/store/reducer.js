const defaultState = {
  user: {
    age: 10,
    name:"gblina"
  },
  lina: {
    
  }
}
const reducer = (state=defaultState, action) => {
  const { type } = action;
  switch (type) {
    case "changeUserAge":
      return { ...state, user:{...state.user,age:action.age}};
    case "changeUserName":
      return state = { ...state ,user:{...state.user,name:action.name}};
    default:
      return state
  }
}
export {
  reducer
}