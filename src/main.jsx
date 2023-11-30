import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
 
} from "@tanstack/react-query";
import router from './Routers/Router.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProviders>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>



  </AuthProviders>
  </React.StrictMode>,
)
