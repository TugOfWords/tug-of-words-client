import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// components
import { Button, Header, Modal } from 'semantic-ui-react';
import { NewRoomDialog } from './NewRoomDialog';

configure({ adapter: new Adapter() });

describe('<NewRoomDialog />', () => {
  let wrapper;

  beforeEach(() => {
    // stubs
    const doNothing = () => { };
    const content = <div />;

    wrapper = shallow(<NewRoomDialog
      trigger={doNothing}
      confirm={doNothing}
      cancel={doNothing}
      content={content}
    />);
  });

  it('should render the correct components', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Modal.Content)).toHaveLength(1);
    expect(wrapper.find(Modal.Actions)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
