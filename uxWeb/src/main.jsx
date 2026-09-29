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
import AdminLayout from "./components/AdminLayout.jsx"
import AdminLogin from "./pages/admin/login.jsx"
import AdminDashboard from "./pages/admin/dashboard.jsx"
import AdminEventForm from "./pages/admin/eventForm.jsx"

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
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'events/new',
        element: <AdminEventForm />
      },
      {
        path: 'events/:id',
        element: <AdminEventForm />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)