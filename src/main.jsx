import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from './components/Form/Form.jsx';
import Results from './components/Results/Results.jsx';
import Home from './pages/Home.jsx';
import RootLayout from './layout/RootLayout.jsx';
import LearnMore from './components/LearnMore/LearnMore.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index:true, element: <Home />},
    ]

  },
  {
    path: "form",
    element: <Form />
  },
  {
    path: "learnMore",
    element: <LearnMore />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
