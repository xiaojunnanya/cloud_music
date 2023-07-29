import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV2Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}

const AreaHeader: FC<IProps> = (props) => {
  const { title = '标题', moreText = '更多', moreLink = '/' } = props

  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {moreText && moreLink && <a href={moreLink}>{moreText}</a>}
    </HeaderV2Wrapper>
  )
}

export default memo(AreaHeader)
