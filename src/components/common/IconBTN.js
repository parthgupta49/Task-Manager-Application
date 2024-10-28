import React from 'react'

const IconBTN = ({

    text,
    onclick,
    children,
    outline=false,
    disabled,
    customClasses,
    type
}) => {
    return (
        <button
        disabled = {disabled}
        onClick={onclick}
        type={type}
        className={`${customClasses}`}
        >
            {
                children ? (<><span>{text}</span>{children}</>) : (text)
            }

        </button>
    )
}

export default IconBTN