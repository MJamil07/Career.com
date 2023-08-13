
import React from 'react'

export default function Navbar() {
  return (
            <nav style={{borderBottom : '2px solid tomato'}} class="navbar navbar-expand-lg navbar-light bg-light">
                  <a 
                        style={{
                              marginLeft : 30 , 
                              fontSize : 27 , 
                              fontWeight : 'inherit' , 
                              color : 'tomato'
                        }} 
                        class="navbar-brand" 
                        href="#">Career.com</a>
            </nav>
  )
}
