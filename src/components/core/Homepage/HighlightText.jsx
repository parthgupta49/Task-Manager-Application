import React from 'react'

const HighlightText = ({text,size}) => {
  return (
    <span className={`font-bold gradient-text ${size && `text-${size}` } `}> {text}</span>
  )
}   
export default HighlightText