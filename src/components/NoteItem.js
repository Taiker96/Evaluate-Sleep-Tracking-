import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteItem extends Component {

  twoActionButton = () => {
    this.props.changeEditStatus();
    console.log(this.props.note);
    this.props.getEditData(this.props.note);
  }
  deleteData = () => {
    //console.log(this.props.note);
    this.props.getDeleteData(this.props.note.ifd);
    this.props.alertOn("Xóa ghi chú " + this.props.noteTitle + " thành công", "danger");
  }
  reviewYourTimeSleep(time){
    let parseNumber = parseFloat(time);
    let message = "";
    
    if(parseNumber > 6 && parseNumber < 7){
      return message.concat("6h ~ 7h Is Not Good Enought");
    }
    if(parseNumber >= 7 && parseNumber <= 7.5){
      return message.concat("7h ~ 7h30 Is Ok Time But I Can Permit You SomeThing Like Just 1 Day Per Week");
    }if(parseNumber > 7.5 && parseNumber < 8.5){
      return message.concat("7h30 ~ 8h30 Absolutely Fantatic Time You Will Can Do Anything, God Bless You");
    }if(parseNumber > 8.5){
      return message.concat("8h, Hey Dude You Sleep To Much So Is Maybe Can Harm Your Health");
    }else{
      return message.concat("Less Than 6h, OMG! Dude You Need To Fix This If You Don't Wanna Die Young");
    }
  return <div>{message}</div>;
  }
    render() {
        return (
            <div className="card">
      <div className="card-header" role="tab" id="note1">
        <h5 className="mb-0">
          <a data-toggle="collapse" data-parent="#noteList" href={"#number" + this.props.y} aria-expanded="true" aria-controls="noteContent1">
            {this.props.noteTitle}
          </a>
          <div className="btn-group float-right">
              <button className="btn btn-outline-info" onClick={() => this.twoActionButton()}> Sửa </button>
              <button className="btn btn-outline-secondary" onClick={() => this.deleteData ()}> Xóa </button>
          </div>
        </h5>
      </div>
      <div id={"number" + this.props.y} className="collapse in" role="tabpanel" aria-labelledby="note1">
        <div className="card-body">
          {this.reviewYourTimeSleep(this.props.noteContent)}
        </div>
      </div>
    </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        //editStatus: state.isEdit
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeEditStatus: () => {
            dispatch({
                type:"CHANGE_EDIT_STATUS"
            })
        },
        getEditData: (editObject) => {
          dispatch({
            type: "GET_EDIT_DATA", 
            editObject
          })
        },
        getDeleteData: (deleteId) => {
          dispatch({
            type: "DELETE", 
            deleteId
          })
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);