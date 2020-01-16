import React, { Component } from 'react';
import Nav from './Nav';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import AlertInfo from './AlertInfo';
import { userInfo } from 'os';
import test from './test.css';

class App extends Component {
  // pushData = () => { // Hàm thêm dữ liệu vào data
  //   var connectData = firebase.database().ref('dataForNote');
  //   connectData.push({
  //     title: "Ghi chu so 4",
  //     content: "Noi dung ghi chu so 4"
  //   })
  //   console.log('Ban vua them data vao firebase');
  // }

  // deleteData = (id) => { // Hàm xóa dữ liệu trong firebase
  //   var connectData = firebase.database().ref('dataForNote');
  //   connectData.child(id).remove();
  //   console.log('Ban vua xoa du lieu co id la: ' + id);
  // }
  showForm = () => {
    if(this.props.isEdit){
      return <NoteForm/>
    }
  }

  // addData = (item) => { // Cách cũ viết thêm dữ liệu trong app (Giờ thì đã đc viết trong store rồi)
  //   noteData.push(item) //Đẩy dữ liệu vừa nhận từ thằng con vào firebase
  // }

  render() {
    const {strHeading: strHeading={main: 'loading'}} = this.props; //Ví dụ mẫu nếu state chưa có data thì chuyền vào chữ loading
    const {user: user={firstName: ''}} = this.props; //Hoặc để trống để nó không báo lỗi trắng
  return (
    <div className="App">
        {/* <button onClick={() => this.pushData()}>Nhấn để thêm dữ liệu vào firebase</button>
        <button onClick={() => this.deleteData('-Lll2xgbrLRUC7qduX6T')}>Nhấn để xóa dữ liệu trong firebase</button> */}

    <Nav/>
    <AlertInfo/>
    <div className="container">
    <div className="row">
    <NoteList/>
    {/* <NoteForm getData={(item) => this.addData(item)}/>  Nhận data từ thằng con rồi thằng cha đẩy lên function addData ở trên xử lý */}
    {
      this.showForm()
    }
    </div>

    <h1>{strHeading.main}</h1>

    <div>{user.firstName}</div>
    <div>{user.lastName}</div>
    <div>{user.email}</div>

  </div>
  
</div>
  );
}
}

//Kết nối với store nào
const mapStateToProps = (state, ownProps) => {
  
  return {
    isEdit: state.isEdit,
    strHeading: state.strHeading
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditStatus: () => {
      dispatch({
        type:"CHANGE_EDIT_STATUS"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
