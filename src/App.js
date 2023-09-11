import React, { Suspense } from 'react'

// ** Router Import
import Router from './router/Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <Suspense fallback={null}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Router />
    </Suspense>
  )
}

export default App
