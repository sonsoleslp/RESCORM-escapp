import React from 'react';
import * as Utils from '../../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../../reducers/actions';
import QuestionButtons from './QuestionButtons.jsx';

export default class Essay extends React.Component {
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
    let userAnswer = this.state.userAnswer;
    userAnswer = userAnswer !== undefined ? userAnswer.toString().toLowerCase() : "";

    let scorePercentage = userAnswer.length > 0 ? 1 : 0;
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    this.setState({answered:true});
  }
  render(){
    return [<div key="question" className="question">
        {this.props.question.format === "html" ? <div dangerouslySetInnerHTML={{__html: this.props.question.value}}>
        </div> : 
        <h1>{this.props.question.value}</h1>}
        <textarea className="form-control" value={this.state.userAnswer} onChange={this.handleChange.bind(this)}/>
      </div>,
      <QuestionButtons key="buttons" I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>];
  }

}