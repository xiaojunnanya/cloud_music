import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd';

import { BannerControlStyled, BannerLeftStyled, BannerRightStyled, BannerStyled } from './style'
import { useAppSelector, useAppShallowEqual } from '@/store'

interface IPerson{
  children?: ReactNode
}

const Banner: FC<IPerson> = memo(() => {
  
  // 纪录当前轮播图是哪个
  const [currentIndex, setCurrentIndex ] = useState(0)

  const bannerRel = useRef<ElementRef<typeof Carousel>>(null)

  // 从store中获取数据
  const { banners } = useAppSelector((state) =>({
    banners: state.recommend.banners
  }), useAppShallowEqual)

  // 事件处理函数
  const handlePreClick = () =>{
    bannerRel.current?.prev()
  }
  const handleNextClick = () =>{
    bannerRel.current?.next()
  }

  const bannerChange = (current: number) =>{
    setCurrentIndex(current)
  }

  const bgImageUrl = banners[currentIndex] && (banners[currentIndex].imageUrl + "?imageView&blur=40x20")
  
  return (
    <BannerStyled style={{background: `url('${bgImageUrl}') center center / 6000px`}}>
        <div className="banner wrap-v2">
          <BannerLeftStyled>
            <Carousel autoplay ref={bannerRel} effect="fade" afterChange={bannerChange}>
                {
                  banners.map((item, index) =>{
                    return (
                      <div key={index} className='banner-item'>
                        <a href={item.url} target='blank'>
                          <img className='image' src={item.imageUrl} alt="" />
                        </a>
                      </div>
                    )
                  })
                }
            </Carousel>
          </BannerLeftStyled>
          <BannerRightStyled></BannerRightStyled>
          <BannerControlStyled className="control">
            <button className="btn left" onClick={handlePreClick}></button>
            <button className="btn right" onClick={handleNextClick}></button>
          </BannerControlStyled>
        </div>
    </BannerStyled>
  )
})

export default Banner