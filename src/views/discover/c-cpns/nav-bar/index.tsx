import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavBarStyled } from './style'
import { NavLink } from 'react-router-dom'

import discoverTitles from '@/assets/data/discover-titles.json'

interface IPerson{
  children?: ReactNode
}

const NavBar: FC<IPerson> = memo(() => {
  return (
    <NavBarStyled>
        <div className='wrap-v1'>
          <div className="nav">
            {
                discoverTitles.map((item, index) =>{
                    return (
                        <div className="item" key={index}>
                            <NavLink to={item.link}>{ item.title }</NavLink>
                        </div>
                    )
                })
            }
          </div>
        </div>
    </NavBarStyled>
  )
})

export default NavBar