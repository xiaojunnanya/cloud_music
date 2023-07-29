import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AreaHeaderV1Styled } from './style'

interface IPerson{
  children?: ReactNode
  title?: string,
  kewords?: string[],
  moreText?: string,
  moreLink?: string
}

const AreaHeaderV1: FC<IPerson> = memo((props) => {

  const { title="默认标题", kewords=[], moreText='更多', moreLink='/' } = props

  return (
    <AreaHeaderV1Styled className='sprite_02'>
      <div className="left">
        <h3 className="title">{ title }</h3>
        <div className="keywords">
          {
            kewords.map((item, index) =>{
              return (
                <div className="item" key={index}>
                  <span className="link">{ item }</span>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <a href={moreLink} className='more'>{ moreText }</a>
        <i className='icon sprite_02'></i>
      </div>
    </AreaHeaderV1Styled>
  )
})

export default AreaHeaderV1