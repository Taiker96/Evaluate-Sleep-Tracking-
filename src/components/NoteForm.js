import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            id: ''
        }
    }

    componentWillMount(){ 
      if(this.props.editItem){ //Chủ yếu là khi có dữ liệu sữa thì lưu vào state trước khi sữa để thằng trước khi sữa và sau khi cũng cùng id
        //Mục đích chính là kiểm tra xem nếu có id là sửa và nếu ko có id là thêm mới
        this.setState({
          noteTitle: this.props.editItem.noteTitle,
            noteContent: this.props.editItem.noteContent,
            id: this.props.editItem.ifd //Vì bên firebase của mình nó đặt là ifd
        });
      }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
            
        })
    }

    addData = (title, content) => {
      if(this.state.id){ //Form hiện ra mà có id là đang sữa dữ liệu
        var editObject = {}; //Gom lại để đẩy lên store
        editObject.id = this.state.id;
        editObject.noteContent = this.state.noteContent;
        editObject.noteTitle = this.state.noteTitle;

        this.props.editDataStore(editObject);//Sau khi gom xong đẩy vào mapDispatchToProps để đưa lên store
        this.props.changeEditStatus(); //Tắt mở form khi nhấn nút submit
        this.props.alertOn("Sửa thành công"); //HIển thị form thông báo
        console.log("Đang sửa dữ liệu", "success");
      }
      else{ //Ngược lại là thêm mới
        var item = {}; //Tạo mãng rổng để chứ 2 phần tử vừa nhập vào
        item.noteTitle = content;
        item.noteContent = title;
        // if(title - parseInt(title) !== 0){
        //   console.log(title);
        //   // const subtract = title - parseInt(title);
        //   // console.log(subtract);
        //   // const nhan = subtract * 1.665;  
        //   // console.log(nhan);
        // }
        item.toDay = moment().unix();
        //this.props.getData(item); //Chuyền data vừa nhập lên thằng cha (App) cách này là cách thường ko phải Redux
         this.props.addDataStore(item); //Xử dụng reducer trong store //dispatch({type:"ADD_DATA"}) đây mới là Redux
         this.props.alertOn("Thêm thành công", "success"); //HIển thị form thông báo màu xanh (type: success)
    }
  }
  printTitle= () => { //Kiểm tra để in ra tiêu đề cho đúng
    if(this.props.addStatus){
      return <h3>Thêm Mới Status</h3>
    }else{
      return <h3>Sửa Status</h3>
    }
  }

    render() {
        return (
            <div className="col-4">
  {this.printTitle()}
  <form>
  <div className="form-group">
    <label htmlFor="noteTitle">Tiêu Đề Note</label>
    <input defaultValue={this.props.editItem.noteTitle} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle" placeholder="Tiêu đề Note" />
    <small id="helpIdNoteTitle" className="form-text text-muted">Điền tiêu đề vào đây</small>
  </div>
  <div className="form-group">
    <label htmlFor="noteContent">Số Giờ Và Phút</label>
    <input defaultValue={this.props.editItem.noteContent} onChange={(event) => this.isChange(event)} type="number" className="form-control" name="noteContent" id="noteContent" aria-describedby="helpIdNoteContent" placeholder="Tiêu đề Note" />
    <small id="helpIdNoteTitle" className="form-text text-muted">*VD: Bạn ngủ được 7h45 phút bạn điền là: 7.45</small>
  </div>
  <button onClick={() => this.addData(this.state.noteContent, this.state.noteTitle)} type="reset" className="btn btn-primary btn-block">Submit</button>
  </form>
</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      editItem: state.editItem, //Lấy data đã đc chuyền vào trong state in ra form 
      addStatus: state.isAdd
    }
  }
  //mapStateToProps thiết lập hàm trong store
  //Nó lấy được trong store ra là this.props.testThoi
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      addDataStore: (getItem) => {
        dispatch({type:"ADD_DATA",getItem})
      },
      editDataStore: (getItem) => { //Truyền dữ liệu sau khi sữa lên store
        dispatch({type:"EDIT",getItem})
      },
      changeEditStatus: () => { //Truyền dữ liệu sau khi sữa lên store
        dispatch({type:"CHANGE_EDIT_STATUS"})
      },
      alertOn: (alertContent, alertType) => { //Truyền dữ liệu sau khi sữa lên store
        dispatch({type:"ALERT_ON",
        alertContent, 
        alertType})
      },
      alertOff: () => { //Truyền dữ liệu sau khi sữa lên store
        dispatch({type:"ALERT_OFF"})
      }
    }
  }
  //Muốn lấy hàm ra xài ta dùng mapDipatchToProps
  //Nó lấy được trong store ra là this.props.addDataStore()
  export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
