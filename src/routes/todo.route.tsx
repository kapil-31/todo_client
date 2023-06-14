import { Outlet } from 'react-router-dom'

export default [
  {
    path: '/',
    element: (
      <div>
        <div>Create,track,estimate your work</div> <Outlet />
      </div>
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
