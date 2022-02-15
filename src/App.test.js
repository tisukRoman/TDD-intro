import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });


describe('<App/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    const appComponent = wrapper.find(`[data-test="component-app"]`);
    expect(appComponent.length).toBe(1);
  });
  it('renders "Increment Counter" button', () => {
    const wrapper = shallow(<App />);
    const incrementButton = wrapper.find(`[data-test="increment-counter"]`);
    expect(incrementButton.length).toBe(1);
    expect(incrementButton.text()).toBe("Increment Counter");
  });
  it('renders "Decrement Counter" button', () => {
    const wrapper = shallow(<App />);
    const decrementButton = wrapper.find(`[data-test="decrement-counter"]`);
    expect(decrementButton.length).toBe(1);
    expect(decrementButton.text()).toBe("Decrement Counter");
  })
  it('renders counter display', () => {
    const wrapper = shallow(<App />);
    const counterDisplay = wrapper.find(`[data-test="counter-display"]`);
    expect(counterDisplay.length).toBe(1);
  });
  it('Initial counter state is 0', () => {
    const wrapper = shallow(<App />);
    const initialCounterState = wrapper.state().counter;
    expect(initialCounterState).toBe(0);
  });
  it('increments counter value after button click', () => {
    const wrapper = shallow(<App />);
    const incrementButton = wrapper.find(`[data-test="increment-counter"]`);
    wrapper.setState({ counter: 7 });
    incrementButton.simulate('click');
    expect(wrapper.state().counter).toBe(8);
  });
  it('decrements counter value after button click', () => {
    const wrapper = shallow(<App />);
    const decrementButton = wrapper.find(`[data-test="decrement-counter"]`);
    wrapper.setState({ counter: 7 });
    decrementButton.simulate('click');
    expect(wrapper.state().counter).toBe(6);
  });
  it('does not decrement counter value below zero', () => {
    const wrapper = shallow(<App />);
    const decrementButton = wrapper.find(`[data-test="decrement-counter"]`);
    wrapper.setState({ counter: 0 });
    decrementButton.simulate('click');
    expect(wrapper.state().counter).toBe(0);
  });
  it('shows error message if user trying to decrement zero value', () => {
    const wrapper = shallow(<App />);
    const decrementButton = wrapper.find(`[data-test="decrement-counter"]`);
    wrapper.setState({ counter: 0 });
    decrementButton.simulate('click');
    wrapper.update();
    const errorMessage = wrapper.find(`[data-test="error-message"]`);
    expect(errorMessage.length).toBe(1);
    expect(errorMessage.text()).toBe('cannot decrement counter below zero');
  });
  it('clears error message on increment', () => {
    const wrapper = shallow(<App />);
    const incrementButton = wrapper.find(`[data-test="increment-counter"]`);

    wrapper.setState({
      counter: 0,
      error: true
    });

    incrementButton.simulate('click');
    wrapper.update();

    expect(wrapper.state().counter).toBe(1);
    expect(wrapper.state().error).toBe(false);

    const errorMessage = wrapper.find(`[data-test="error-message"]`);
    expect(errorMessage.length).toBe(0);
  });
})