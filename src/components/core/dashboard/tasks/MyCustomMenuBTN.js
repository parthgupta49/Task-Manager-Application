import React from 'react'

const MyCustomMenuBTN = ({
    text,
    customCSS,
}) => {
  return (
    <button className = {`px-3 py-1 font-medium rounded-md ${customCSS}`}>{text}</button>
  )
}

export default MyCustomMenuBTN 