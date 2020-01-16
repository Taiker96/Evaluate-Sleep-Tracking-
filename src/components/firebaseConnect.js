import * as firebase from 'firebase';

const firebaseConfig = {   
    apiKey : "AIzaSyAfP6SDDY4lgIho_ZTtrVlWaY1RcJ1QJx4" ,   
authDomain : "notereact-8df24.firebaseapp.com" ,   
databaseURL : "https://notereact-8df24.firebaseio.com" ,   
projectId : "notereact-8df24" ,   
storageBucket : "notereact -8df24.appspot.com " ,   
messagingSenderId : " 613967689647 " ,   
appId : " 1: 613967689647: web: 05b35a8a83b6ed20 " 
}; 

// var data = firebase.database().ref('dataForNote');
// data.once('value').then(function(snapshot){
//     console.log(snapshot.val());
// })
firebase.initializeApp(firebaseConfig);
export const noteData = firebase.database().ref('dataForNote'); //Xuất ra bảng trong firebase tên là dataForNote
