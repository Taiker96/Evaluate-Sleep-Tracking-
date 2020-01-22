import React, {Component} from 'react'; 
import RatingForm from './RatingForm';
import ItemPopup from './ItemPopup/ItemPopup';
import { AllRole } from './Helper';

  
class Calculating extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      cantPopup: true
    };
  }

    reviewYourTimeSleep(point){
      const {cantPopup = this.state.cantPopup} = this.props
        let messages = "";
        let contents = "";
        if(point > 6 && point < 7){
          let message = messages.concat("6h ~ 7h Is Not Good Enought");
          let content = contents.concat(AllRole.sixSeven);
          return <ItemPopup
          title={message}
          content={content}
          point={point}
          visible={cantPopup}
          className="Item-Popup"
          toggle={() => {
            this.setState({
              cantPopup: !cantPopup
          })
          }}
        />
        }
        if(point >= 7 && point <= 7.5){
            let message = messages.concat("7h ~ 7h30 Is Ok Time But I Can Permit You SomeThing Like Just 1 Day Per Week");
          return <RatingForm point = {message}/>
        }if(point > 7.5 && point <= 8.5){
            let message = messages.concat("7h30 ~ 8h30 Absolutely Fantatic Time You Will Can Do Anything, God Bless You");
          return <RatingForm point = {message}/>
        }if(point > 8.5){
            let message = messages.concat("8h, Hey Dude You Sleep To Much So Is Maybe Can Harm Your Health");
          return <RatingForm point = {message}/>
        }else{
            let message = messages.concat("Less Than 6h, OMG! Dude You Need To Fix This If You Don't Wanna Die Young");
          return <RatingForm point = {message}/>
        }
      }
      render() {
        return (
            <div className="card">
            {this.reviewYourTimeSleep(this.props.getPoint)}
            </div>
        )
    }
}   
  
export default Calculating; 