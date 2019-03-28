import React from 'react';
import * as Utils from '../../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../../reducers/actions';
import QuestionButtons from './QuestionButtons.jsx';

export default class Numerical extends React.Component {
  constructor(props){
	  super(props);
	  this.state = {
	  	userAnswer:undefined,
	    answered:false,
	  };
  }
  componentWillUpdate(prevProps, prevState){
	  if(prevProps.question !== this.props.question){
	    this.setState({userAnswer:undefined, answered:false});
	  }
  }

  onResetQuestion(){
	  this.setState({userAnswer:undefined, answered:false});
  }
  handleChange(e){
    this.setState({userAnswer:e.target.value});
  }

  onNextQuestion(){
	  this.props.onNextQuestion();
  }

  onAnswerQuestion(){
    let scorePercentage = 0;
    let tolerance = this.props.question.tolerance || 0;
    let userAnswer = parseFloat(this.state.userAnswer);
    for(let a in this.props.question.answer){
      let an = this.props.question.answer[a];
      let ans = an._ !== undefined ? an._ : an;
      if(((ans + tolerance) >= userAnswer) &&
				((ans - tolerance) <= userAnswer)){
        scorePercentage = 1;
      }
    }

    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    this.setState({answered:true});
  }
  render(){
    let incorrect = this.props.objective.accomplished_score === 0;
    let feedback = !incorrect ? <i className="material-icons feedback-icon correct">check</i> : <i className="material-icons feedback-icon incorrect">close</i>;
    return [<div key="question" className="question">
        <h1>{this.props.question.value}</h1>
        <input type="number" className="form-control" value={this.state.userAnswer} onChange={this.handleChange.bind(this)}/>
        {(this.props.config.feedback && this.state.answered) ? feedback : null}
		{(this.props.config.feedback && this.state.answered && incorrect) ? <p className="feedbackInputAnswer">{this.props.question.answer.map(a=>a._ ? a._ : a).join(", ")}</p> : null}
      </div>,
      <QuestionButtons key="buttons" I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>];
  }

}