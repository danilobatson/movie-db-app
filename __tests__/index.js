import React from 'react'
import renderer from 'react-test-renderer'
import Discover from '../screens/Discover'

test('renders correctly', () => {
  const tree = renderer.create(<Discover />).toJSON()
  expect(tree).toMatchSnapshot()
})
