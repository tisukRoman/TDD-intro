import { Component } from 'react';
import s from './app.module.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false
    }
  }

  incrementCounter = () => {
    if (this.state.error) {
      this.setState({ error: false, counter: this.state.counter + 1 });
    } else {
      this.setState({ counter: this.state.counter + 1 });
    }
  }

  decrementCounter = () => {
    if (this.state.counter) {
      this.setState({ counter: this.state.counter - 1 });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { counter, error } = this.state;
    return (
      <div data-test="component-app" className={s.wrapper}>
        {error && <h2 data-test="error-message">cannot decrement counter below zero</h2>}
        <h1 data-test="counter-display">{counter}</h1>
        <button
          onClick={this.incrementCounter}
          data-test="increment-counter"
        >Increment Counter</button>
        <button
          onClick={this.decrementCounter}
          data-test="decrement-counter"
        >Decrement Counter</button>
      </div>
    );
  }
}

export default App;
