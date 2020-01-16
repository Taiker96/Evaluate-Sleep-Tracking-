import { noteData } from "./firebaseConnect";

//Ôn lại kiến thức
//mapStateToProps thiết lập hàm trong store
//Muốn lấy hàm ra xài ta dùng mapDipatchToProps
//Truyền xong connect
var redux = require("redux");
const noteInitialState = {
  isEdit: false, //Hiện đang ẩn form
  editItem: {}, //Sau đó data (editObject) để lên state
  isAdd: false, //Khi nhấn nút sửa hiện tiêu đề là sửa và khi nhấn nút Thêm mới thì....
  alertShow: false,
  AlertContent: "",
  AlertType: "",
//   strHeading: {
//     main: "Heading",
//     sub: "sub"
//   }
};
const allReducer = (state = noteInitialState, action) => {
  //reducer quản lý state
  switch (action.type) {
    case "ADD_DATA":
      noteData.push(action.getItem);
      console.log(
        "Đã thêm dữ liệu " + JSON.stringify(action.getItem) + " Thành công"
      );
      return state;

    case "CHANGE_EDIT_STATUS":
      return { ...state, isEdit: !state.isEdit };

    case "CHANGE_ADD_STATUS":
      return { ...state, isAdd: !state.isAdd };

    case "GET_EDIT_DATA":
      return { ...state, editItem: action.editObject }; //Truyền vào data (editObject) từ NoteItem

    case "EDIT":
      //Sau khi có du lieu sữa rồi ta update nó lên firebase
      noteData.child(action.getItem.id).update({
        //child kiểm tra và lấy ra phần tử có id tương ứng trong firebase
        noteTitle: action.getItem.noteTitle,
        noteContent: action.getItem.noteContent
      });
      console.log(
        "Đã cấp nhập dữ liệu sữa " +
          JSON.stringify(action.getItem) +
          "Thành Công"
      );
      return { ...state, editItem: {} };

    case "DELETE":
      noteData.child(action.deleteId).remove();
      console.log("Đã xóa dữ liệu có id là " + action.deleteId + " Thành công");
      return state;

    case "ALERT_ON":
      return {
        ...state,
        alertShow: true,
        AlertContent: action.alertContent,
        AlertType: action.alertType
      };
    //Text thông báo (alertContent) được truyền từ NoteForm

    case "ALERT_OFF":
      return { ...state, alertShow: false };

    default:
      return state;
  }
};
var store = redux.createStore(allReducer); //store quản lý reducer
store.subscribe(function() {
  //Hàm subscribe là hàm nghe ngóng bất kì sự thay đổi trong store
  console.log(JSON.stringify(store.getState())); //Kiểm tra xem thằng NoteItem có chuyền data vào state trong store chưa
});
export default store;
