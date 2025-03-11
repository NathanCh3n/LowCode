import React, { FC, useState } from 'react'

const Demo: FC = () => {
  const [arr, setArr] = useState(['a', 'b', 'c'])
  const handleClick = () => {
    setArr(prevArr => [...prevArr, 'd'])
  }
  return (
    <>
      <div>{arr}</div>
      <button onClick={handleClick}>add</button>
    </>
  )
}

export default Demo
