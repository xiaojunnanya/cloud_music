import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NoFinishedfStyled } from './style'

import img from '@/assets/pic/2.gif'

interface IPerson{
  children?: ReactNode
}

const NoFinished: FC<IPerson> = memo(() => {
  return (
    <NoFinishedfStyled className='wrap-v2'>
        <img src={img} alt="" />
        <div>页面还没开发呢</div>
    </NoFinishedfStyled>
  )
})

export default NoFinished