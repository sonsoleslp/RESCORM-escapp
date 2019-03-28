import React from 'react';

import * as Utils from '../../vendors/Utils.js';
import {objectiveAccomplished, objectiveAccomplishedThunk} from './../../reducers/actions';

import MCQuestionChoice from './MCQuestionChoice.jsx';
import MCQuestionChoiceSingle from './MCQuestionChoiceSingle.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class TFQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      answered:false,
    };
    this.choices = [{id:true, value:"Verdadero"}, {id:false, value:"Falso"}];
  }
  componentWillUpdate(prevProps, prevState){
    if(prevProps.question !== this.props.question){
      this.setState({selected_choices_ids:[], answered:false});
    }
  }
  handleChoiceChange(choice){
    let newSelectedChoices = Object.assign([], this.state.selected_choices_ids);
    this.setState({selected_choices_ids:[choice.id]});
  }
  onAnswerQuestion(){
    // Calculate score
    let choices = this.choices;
    let nChoices = choices.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let blankAnswers = 0;
    if(this.state.selected_choices_ids.indexOf(this.props.question.answer) !== -1){
      correctAnswers = 1;
    } else if(this.state.selected_choices_ids.indexOf(!this.props.question.answer) !== -1){
      incorrectAnswers = 1;
    } else {
      blankAnswers = 1;
    }

    let scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers));

    // Send data via SCORM
    let objective = this.props.objective;
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion(){
    this.setState({selected_choices_ids:[], answered:false});
  }
  onNextQuestion(){
    this.props.onNextQuestion();
  }
  render(){
    let choices = [];
    for(let i = 0; i < this.choices.length; i++){
      choices.push(<MCQuestionChoiceSingle key={"MyQuestion_" + "question_choice_" + i} correct={this.choices[i].id === this.props.question.answer} choice={this.choices[i]} checked={this.state.selected_choices_ids.indexOf(this.choices[i].id) !== -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered} config={this.props.config} tf/>);
    }
    return (
    [<div className="question">
        <h1>{this.props.question.value}</h1>
        {choices}
      </div>,
      <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>]
    );
  }
}