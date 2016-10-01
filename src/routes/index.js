import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import PostDetailView from 'views/PostDetailView/PostDetailView'
import FourZeroFourView from 'views/FourZeroFourView/FourZeroFourView'

export default (store) => (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route component={PostDetailView} path='/posts/:id' />
    <Route path='*' component={FourZeroFourView} />
  </Route>
)
