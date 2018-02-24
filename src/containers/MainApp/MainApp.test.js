import React from 'react'
import { shallow, mount } from 'enzyme'

import MainApp from './MainApp'

it('renders without crashing', () => {
  shallow(<MainApp />)
})