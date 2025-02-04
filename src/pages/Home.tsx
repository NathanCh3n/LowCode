import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()
  function clickHandler() {
    nav('/login')
  }
  return (
    <div>
      <h1>Home</h1>
      <div>
        <button onClick={clickHandler}>登陆</button>
        {/* 换种方式实现： */}
        {/* <Link to="/register">注册</Link> */}
      </div>
    </div>
  )
}

export default Home
