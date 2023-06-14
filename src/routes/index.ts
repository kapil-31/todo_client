import React from 'react'
import { useRoutes } from 'react-router-dom'
import todoRoute from './todo.route'

function Routes() {
  return useRoutes([...todoRoute])
}

export default Routes
