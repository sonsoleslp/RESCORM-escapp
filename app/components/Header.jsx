import React from 'react';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let loggedText;
    let score = 0;
    let trackingTexts = [];
    let progress = 0;
    if(typeof this.props.tracking.progress_measure === "number"){
      progress = (this.props.tracking.progress_measure * 100).toFixed(0);
      // trackingTexts.push(this.props.I18n.getTrans("i.progress_measure") + ": " + (this.props.tracking.progress_measure * 100).toFixed(1) + "%");
    } else {
      // trackingTexts.push(this.props.I18n.getTrans("i.progress_measure") + ": null");
    }
    if(typeof this.props.tracking.score === "number"){
      score = (this.props.tracking.score * 100).toFixed(2) + '%';
      trackingTexts.push(this.props.I18n.getTrans("i.score") + ": " + (this.props.tracking.score * 100).toFixed(1) + "%");
    } else {
      score = "0.00%";
      trackingTexts.push(this.props.I18n.getTrans("i.score") + ": null");
    }
/*    if(this.props.user_profile){
      if((typeof this.props.user_profile.name === "string")){
        loggedText = (this.props.I18n.getTrans("i.logged_as") + " " + this.props.user_profile.name);
      }
      if(typeof this.props.user_profile.learner_preference === "object"){
        if(typeof this.props.user_profile.learner_preference.difficulty === "number"){
          trackingTexts.push(this.props.I18n.getTrans("i.difficulty") + ": " + this.props.user_profile.learner_preference.difficulty);
        }
      }
    }*/

    return (
      <div className="header_wrapper">
        <header>
        <div className="progressbar-container">
          <div className="progressbar primary-color" style={{width:progress + "%"}} />
        </div>
        </header>
      </div>
    );
  }
}