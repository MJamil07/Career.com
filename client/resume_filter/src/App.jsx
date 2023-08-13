
import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import JobApply from './Components/JobApply'
import ViewApplication from './Components/ViewApplication'
import FilterApllication from './Components/FilterApllication'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<JobApply/>}/>
            <Route path='/view' element={<ViewApplication/>} />
            <Route path='/view/filter' element={<FilterApllication/>}/>
      </Routes>
    </BrowserRouter>
  )
}
