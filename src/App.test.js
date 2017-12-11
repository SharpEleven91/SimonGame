import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';

describe('component click tests', () => {
  const wrapper = mount(<App />);
  it('checks state when powered', () => {
    expect(wrapper.state().power).toBe(false);
    wrapper.find('PowerButton').simulate('click');
    expect(wrapper.state().power).toBe(true);
  });

  it('checks state when strict is clicked' , () => {
    expect(wrapper.state().strict).toBe(false);
    wrapper.find('StrictButton').simulate('click');
    expect(wrapper.state().strict).toBe(true);
    wrapper.find('StrictButton').simulate('click');
    expect(wrapper.state().strict).toBe(false);
  });

  it('checks that game is started properly', () => {
    expect(wrapper.state().gameStarted).toBe(false);
    expect(wrapper.state().active).toBe(false);
    expect(wrapper.state().count).toBe(0);
    wrapper.find('StartButton').simulate('click');
    expect(wrapper.state().gameStarted).toBe(true);
    expect(wrapper.state().active).toBe(true);
    expect(wrapper.state().actions.length).toBe(1);
    expect(wrapper.state().count).toBe(1);
  })
});