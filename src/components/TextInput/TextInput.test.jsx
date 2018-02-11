import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// components
import { Form, Message } from 'semantic-ui-react';
import TextInput from './TextInput';

configure({ adapter: new Adapter() });

describe('<TextInput />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TextInput />);
  });

  it('should render the correct sub-elements', () => {
    expect(wrapper.find(Form.Input)).toHaveLength(1);
    expect(wrapper.find(Message)).toHaveLength(0);
  });

  it('should render a Message field if there is an error', () => {
    wrapper.setProps({ hasError: true });
    expect(wrapper.find(Message)).toHaveLength(1);
  });
});
