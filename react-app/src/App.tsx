import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import MapGrid from './components/MapGrid'

export default function App(){
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/map-grid" element={<MapGrid/>} />
      </Routes>
    </div>
  )
}
