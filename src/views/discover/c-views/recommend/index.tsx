import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { artistListAction, bannerListAction, hotRecommendAction, newAlbumAction, playListAction } from '@/store/modules/recommend'
import Banner from './c-cpns/banner'
import { RecommentStyled } from './style'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

interface IPerson{
  children?: ReactNode
}

const Recommend: FC<IPerson> = memo(() => {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(bannerListAction())
    dispatch(hotRecommendAction())
    dispatch(newAlbumAction())
    dispatch(playListAction())
    dispatch(artistListAction())
  },[])

  return (
    <RecommentStyled>
      <Banner></Banner>
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend></HotRecommend>
          <NewAlbum></NewAlbum>
          <TopRanking></TopRanking>
        </div>
        <div className="right">
          <UserLogin></UserLogin>
          <SettleSinger></SettleSinger>
          <HotAnchor></HotAnchor>
        </div>
      </div>
    </RecommentStyled>
  )
})

export default Recommend