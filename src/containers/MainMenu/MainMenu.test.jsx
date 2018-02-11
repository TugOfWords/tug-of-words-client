import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// components
import { Button } from 'semantic-ui-react';
import { MainMenu } from './MainMenu';
import TextInput from '../../components/TextInput/TextInput';

configure({ adapter: new Adapter() });

describe('<MainMenu />', () => {
  let wrapper;

  beforeEach(() => {
    // stubs
    const doNothing = () => { };

    wrapper = shallow(<MainMenu
      isNewUser
      username="some-user"
      onCreateUser={doNothing}
      onCreateRoom={doNothing}
      onRemoveUser={doNothing}
    />);
  });

  it('should render the correct components for users that are new', () => {
    expect(wrapper.find(TextInput)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should render the correct components for users that are not new', () => {
    wrapper.setProps({ isNewUser: false });
    expect(wrapper.find(TextInput)).toHaveLength(0);
  });
});
