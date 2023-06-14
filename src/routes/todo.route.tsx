import { Outlet } from 'react-router-dom'

import Header from '../components/Headers'
import Board from '../containers/Board'

export default [
  {
    path: '/',
    element: (
      <>
        <Header />
        <Board />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/tod',
        element: <div>hi</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <div>log</div>,
  },
]
