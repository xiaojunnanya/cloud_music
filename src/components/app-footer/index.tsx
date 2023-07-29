import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AppFooterStyled } from './style'

interface IPerson{
  children?: ReactNode
}

const AppFooter: FC<IPerson> = memo(() => {
  return (
    <AppFooterStyled className='wrap-v2'></AppFooterStyled>
  )
})

export default AppFooter