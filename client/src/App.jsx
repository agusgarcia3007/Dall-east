import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, CreatePost, Feed, NotFound } from './pages'
import MainLayout from './layouts/MainLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/feed/:user' element={<Feed />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
