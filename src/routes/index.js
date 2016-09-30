// We only need to import the modules necessary for initial render
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import PostDetailView from 'views/PostDetailView/PostDetailView'
import FourZeroFourView from 'views/FourZeroFourView/FourZeroFourView'

import { fetchDataOnEnter, fetchDataOnChange } from './hooks'

export default (store) => (
  <Route component={CoreLayout} path='/'>
    <Route onEnter={fetchDataOnEnter(store)} onChange={fetchDataOnChange(store)}>
      <IndexRoute component={HomeView} />
      <Route component={PostDetailView} path='/posts/:id' />
      <Route path='*' component={FourZeroFourView} />
    </Route>
  </Route>
)
