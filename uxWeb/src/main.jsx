import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Team from './pages/team.jsx'
import Homepage from './pages/homepage.jsx'
import Events from "./pages/events.jsx";
import Hackathon from './pages/hackathon.jsx'
import Layout from "./components/Layout.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./styles/index.css";
import Sponsorship from './pages/sponsorship.jsx'
import Projects from "./pages/projects.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,       // Wrap everything in Layout
    children: [
      { 
        path: '/', 
        element: <Homepage /> 
      },
      { 
        path: '/team', 
        element: <Team /> 
      },
      {
        path: "/events",
        element: <Events />
      },
      { 
        path: '/hackathon', 
        element: <Hackathon /> 
      },
      {
        path: "/sponsorship",
        element: <Sponsorship />
      },
      {
        path: "/projects",
        element: <Projects />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)