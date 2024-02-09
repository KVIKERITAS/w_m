import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import SingleTutorPage from './pages/SingleTutorPage'
import TutorsPage from './pages/TutorsPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <TutorsPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '/:tutorId',
		element: <SingleTutorPage />,
		errorElement: <NotFoundPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
