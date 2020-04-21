import React from 'react';
import './../assets/scss/finish_screen.scss';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class FinishScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      percentage: 0,
      overridenMsg: null
    }
  }
  _getFinishScreenTitle(progress_measure, score){
    let finishTitleText;
    let hasProgressMeasure = (typeof progress_measure === "number");
    let hasScore = (typeof score === "number");
    if(hasProgressMeasure && hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_full", {progress_measure:(progress_measure * 100).toFixed(1), score:(score * 100).toFixed(1)});
    } else if(hasProgressMeasure){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_wpm", {progress_measure:(progress_measure * 100).toFixed(1)});
    } else if(hasScore){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_ws", {score:(score * 100).toFixed(1)});
    }
    if(typeof finishTitleText === "undefined"){
      finishTitleText = this.props.I18n.getTrans("i.finish_screen_title_simple");
    }
    return finishTitleText;
  }
  render(){
    let finishTitleText = this._getFinishScreenTitle(this.props.tracking.progress_measure, this.props.tracking.score);
    let {percentage} = this.state;
    return (
      <div className="finish_screen">
        <h1 id="finish_title">{this.props.msg}</h1>
        <div className="circle">
        <CircularProgressbar percentage={percentage} initialAnimation text={(Math.round(this.props.tracking.score * 100) || 0) + "%"}/>
        </div>
        <br/>
        {this.state.overridenMsg ? <h5>{this.state.overridenMsg}</h5> : (this.props.config.closeMessage ? <h5>{this.props.config.closeMessage}</h5> : null)}
      </div>
    );
  }

  componentDidMount(){
    setTimeout(()=>{
      const percentage = Math.round(this.props.tracking.score * 100) || 0;
      this.setState({percentage})
      if (this.props.finishCallback && typeof this.props.finishCallback === "function" ) {
        this.props.finishCallback("completed", percentage, this.props.success_status)
      }
    }, 300);
    window.changeModalMsg  = (overridenMsg) => {
      this.setState({overridenMsg})
    }
  }
}