import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { HeaderLeft, HeaderRight, HeaderStyled } from './style'
import headerTitles from '@/assets/data/header_titles.json'


interface IPerson{
  children?: ReactNode
}

const AppHeader: FC<IPerson> = memo(() => {

  // 组件展示
  const showItem = (item: any) =>{
    if(item.type === 'path'){
      return <NavLink to={item.link}>
        { item.title }
        <i className='icon sprite_01'></i>
        </NavLink>
    }else{
      return <a href={item.link} target='_blank' rel='noreferrer'>{ item.title }</a>
    }
  }

  return (
    <HeaderStyled>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="/" className='logo sprite_01'>网易云</a>
          <div className='title-list'>
            {
              headerTitles.map((item, index) =>{
                return (
                  <div key={index} className='item'>{ showItem(item) }</div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <div className="input">
            <Input className='search' placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          </div>
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderStyled>
  )
})

export default AppHeader