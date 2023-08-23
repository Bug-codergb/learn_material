import React, { memo, PureComponent } from "react";
import { connect } from "react-redux";
import { changeUserAgeAction,changeUserNameAction} from "../store/actionCreators";
class Recommend extends PureComponent{
  constructor(props) {
    super(props)  
    this.state = {
      book: [
        {
          id:111,
          name: "js高级程序设计",
          count:39
        },
        {
          id:13,
          name: "数据库系统",
          count:13
        }
      ]
    }
    console.log(props)
  }
  addBook = () => {
    /*this.state.book.push({
      name: "或者",
      count:12
    })  
    this.setState({
      book:this.state.book
    })*/
    let book = [...this.state.book];
    book.push({
      name: "活着",
      count:12
    })
    this.setState({
      book:book
    })
  }
  changeUserNameHandle() {
    const name = this.props.user.name === "gblina" ? "郭斌李娜" : "gblina";
    this.props.changeName(name)
  }
  render() {
    const { book } = this.state;
    return (
      <ul>
        {
          book.map((item, index) => {
            return <li key={item.id}>
              {item.name}-{item.count}
            </li>
          })
        }
        <button onClick={() => this.addBook()}>添加一本书</button>
        <div>用户名：{ this.props.user.name}</div>
        <div>年龄：{this.props.user.age}</div>
        <button onClick={()=>this.changeUserNameHandle()}>修改用户名</button>
      </ul>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user:state.user
  }
}
const mapToDispatch = (dispatch) => {
  return {
    changeAge(num) {
      dispatch(changeUserAgeAction(num))
    },
    changeName(name) {
      dispatch(changeUserNameAction(name))
    }
  }
}
export default connect(mapStateToProps,mapToDispatch)(Recommend);