import React from 'react'
import './line.css'

const Line = ({h}) => {
    return (
        <hr className='line' style={{height: h}}/>
    ) 
}

export default Line