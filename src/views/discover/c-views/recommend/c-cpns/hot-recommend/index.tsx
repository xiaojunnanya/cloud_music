import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotRecommentStyled } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector, useAppShallowEqual } from '@/store'
import SongMenuItem from '@/components/song-menu-item'

interface IPerson{
  children?: ReactNode
}

const HotRecommend: FC<IPerson> = memo(() => {
  const { hotRecommends} = useAppSelector((state)=> ({
    hotRecommends: state.recommend.hotRecommendList
  }), useAppShallowEqual)


  return (
    <HotRecommentStyled>
      <AreaHeaderV1 title='热门推荐' kewords={['华语','流行','摇滚','民谣','电子']} moreLink='/discover/songs'></AreaHeaderV1>

      <div className='recommend-list'>
        {
          hotRecommends.map((item, index) =>{
            return (
              <SongMenuItem key={index} itemData={item}></SongMenuItem>
            )
          })
        }
      </div>
    </HotRecommentStyled>
  )
})

export default HotRecommend