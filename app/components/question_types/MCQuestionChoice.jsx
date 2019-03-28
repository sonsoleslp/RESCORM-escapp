import React from 'react';

export default class MCQuestionChoice extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let showCorrection = this.props.questionAnswered;
    let correct = false;
    let incorrect = false;
    if(showCorrection && this.props.config.feedback){
      if(this.props.checked){
        if(this.props.choice.answer === true){
          correct = true;
        } else {
          incorrect = true;
        }
      } else if(this.props.choice.answer === true){
        correct = true;
      }
    }
    return (
      <div className="question_choice">
        <div className="questionC1">
          <input type="checkbox" className=" " checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2" onClick={() => showCorrection ? null : this.props.handleChange(this.props.choice)}>
          <p>{this.props.choice.value}</p>
          {correct ? <i className="material-icons feedback-icon correct">check</i> : null}
          {incorrect ? <i className="material-icons feedback-icon incorrect">close</i> : null}
        </div>
      </div>
    );
  }
}