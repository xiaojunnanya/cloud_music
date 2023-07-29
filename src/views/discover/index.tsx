import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'

interface IPerson{
  children?: ReactNode
}

const Discover: FC<IPerson> = memo(() => {
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
})

export default Discover