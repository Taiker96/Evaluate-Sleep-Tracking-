import React, { Component } from 'react';
import NoteItem from './NoteItem';
import { noteData } from './firebaseConnect';
import moment from 'moment';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFirebase: []
    };
  }

  componentWillMount() {
    //Cái này phải được thực hiện trước khi mình render
    noteData.on('value', notes => {
      var arrayData = [];
      notes.forEach(element => {
        //mỗi 1 phần tử đặt tên là element
        const key = element.key;
        const noteTitle = element.val().noteTitle; //val là value
        const noteContent = element.val().noteContent; //val là value
        const toDay = element.val().toDay;
        arrayData.push({
          ifd: key,
          noteTitle: noteTitle,
          noteContent: noteContent,
          toDay: toDay
        });
      });
      this.setState({
        dataFirebase: arrayData
      });
      // console.log(notes.val());
      // console.log(arrayData);
    });
  }

  getData = () => {
    //Trong firebase có bao nhiêu thì return in ra
    if (this.state.dataFirebase) {
      // console.log(this.state.dataFirebase);
      return this.state.dataFirebase.map((value, key) => {
        //console.log(value.ifd); //Trong firebase nó đặt tên id là ifd ?? :v ??
        return (
          <NoteItem
            key={key}
            y={key} //Nhằm để cho thẻ href và thẻ id bên NoteItem collapse đúng
            note={value}
            noteTitle={value.noteTitle}
            noteContent={value.noteContent}
          />
        );
      });
    }
  };

  checkPoint(data) {
    let value = 0;
    const aaa = data.map(item => {
        const { noteContent = "" } = item;
        let parseDot = parseFloat(noteContent);
        value += parseDot;
        return value;
    });
    // console.log(aaa.slice(-1)[0]);
    // const getLast = aaa.slice(-1)[0];
    // if(getlast > 7.5){}
    // return aaa.slice(-1)[0];
  }

  groupWeek(data) {
    data.map(item => {
      const format = moment.unix(item.toDay).format('MM/DD/YYYY');
      const weekOfList = moment(format).week();
    });
  }
  render() {
    const arrayData = this.state.dataFirebase.length;
    const nowYear = moment().format('YYYY');
    const weekOfYear = moment().week();
    
    return (
      <div className="col">
        <div id="noteList" role="tablist" aria-multiselectable="true">
          <div className="test">
            Week {weekOfYear} Of {nowYear}
          </div>
          {this.getData()}

          {arrayData === 2
            ?  this.checkPoint(this.state.dataFirebase)
            : // <div className="">
              //     <img src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjy-erdsIXnAhVrKqYKHRWLDUIQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fgood%2Bjob&psig=AOvVaw0mWtfWDkuFoeQkXGJ953UO&ust=1579169974448163"></img>
              // </div>
              ''}
        </div>
      </div>
    );
  }
}
export default NoteList;
