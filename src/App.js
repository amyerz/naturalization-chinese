import React, { Component } from 'react';
import './App.css';
import './uswds.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: [],
      showAnswer: false,
    };
    this.fetchData();
  }

  fetchData () {
    var myInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    var myRequest = new Request('chinese_20.json', myInit);

    fetch(myRequest).then(response => {
      return response.json();
    }).then(data => {
      const seniorQuestions = data.questions.filter(function(question){ return question.seniorExcemption === true});
      console.log(seniorQuestions);
      this.setState({ data: seniorQuestions });
    });
  }

  showAnswer() {
      this.setState({showAnswer: true});
  }

  nextQuestion() {
    this.setState({index: this.state.index+1, showAnswer: false});
  }

  previousQuestion() {
    this.setState({index: this.state.index-1, showAnswer: false});
  }

  render() {
    const questionsArray = this.state.data;
    const currQuestion = questionsArray[this.state.index];
    console.log(this.state.index, currQuestion);

    const answer = this.state.showAnswer?
      (
        <h2 className="answer">
            {currQuestion && currQuestion.answer.map(function(answer){return <div>{answer}</div>})}
        </h2>
      ) :
      (
        <div className="answer button_wrapper">
          <button className="usa-button-big" type="button" onClick={() => this.showAnswer()}> 答案</button>
        </div>
      );

    const previousButton = (this.state.index > 0 )? (<button className="usa-button previous-question" onClick={() => this.previousQuestion()}>&lt;</button>) : (<button className="usa-button-disabled previous-question" disabled>&lt;</button>);
    const nextButton = (this.state.index < (questionsArray.length-1) )? (<button className="usa-button next-question" onClick={() => this.nextQuestion()}>&gt;</button>) : (<button className="usa-button-disabled previous-question" disabled>&gt;</button>);

    return (
      <div className="App">

          <h3 className="category">
            {currQuestion && currQuestion.category}
          </h3>

          <h1 className="question">
            {currQuestion && currQuestion.question}
          </h1>

          <section className="answer-section">
            {answer}
          </section>

          <section>
            {previousButton}
            {nextButton}
          </section>

          <div className="counter">
            第 {this.state.index + 1} 題
          </div>
      </div>
    );
  }
}

export default App;
