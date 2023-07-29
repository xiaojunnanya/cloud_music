import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppPlayerBarStyled, BarControl, BarOperator, BarPlayerInfo } from './style'
import { Slider, message } from 'antd'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import { changeLyricIndex, changeMusicAction, changePlayMode } from '@/store/modules/player'

interface IPerson{
  children?: ReactNode
}

const AppPlayerBar: FC<IPerson> = memo(() => {
    /** 组件内部定义的数据 */
    const [isPlaying, setIsPlaying] = useState(false)
    // 进度
    const [ progress, setProgress ] = useState(0)
    // 总时间
    const [ duration, setDuration ] = useState(0)
    // 当前时间
    const [ currentTime, setCurrentTime ] = useState(0)
    // 是否正在拖拽
    const [ isSliding, setIsSliding ] = useState(false)
    // 歌词
    const [ lyricsText, setLyricsText ] = useState('')

    const audioRef = useRef<HTMLAudioElement>(null)

    const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector((state) =>({
        currentSong: state.player.currentSong,
        lyrics: state.player.lyric,
        lyricIndex: state.player.lyricIndex,
        playMode:state.player.playMode
    }),useAppShallowEqual)

    const dispatch = useAppDispatch()

     /** 组件内的副作用操作 */
    useEffect(() => {
        // 1.播放音乐
        audioRef.current!.src = getSongPlayUrl(currentSong.id)
        // 自动播放，主要用在切歌的功能
        audioRef.current?.play().then(() => {
            setIsPlaying(true)
        }).catch((err) => {
            setIsPlaying(false)
        })

        // 2.获取音乐的总时长
        setDuration(currentSong.dt)
    }, [currentSong])

    /** 组件内部的事件处理 */
    function handlePlayBtnClick() {
        // 1.控制播放器的播放/暂停
        isPlaying ? audioRef.current?.pause() : audioRef.current?.play().catch(() => setIsPlaying(false))

        // 2.改变isPlaying的状态
        setIsPlaying(!isPlaying)
    }

    // 音乐播放的进度
    function handleTimeUpdate(){
        // 获取当前播放时间
        const time = audioRef.current!.currentTime

        // 计算当前播放的进度
        if(!isSliding){
            const progress = ( time * 1000 / duration ) * 100
            setProgress(progress)
            setCurrentTime(time * 1000)
        }

        // 根据时间匹配歌词：默认我们的index为最后一句歌词的index
        let index = lyrics.length -1 
        for (let i = 0; i < lyrics.length; i++) {
            const lyric = lyrics[i]
            if (lyric.time > currentTime) {
                index = i - 1
                break
            }
        }
        
        // 纪录当前的idnex值，可能会在其他页面有用
        // 只有当i歌词变化的时候才能发请求
        if (lyricIndex === index || index === -1) return

        dispatch(changeLyricIndex(index))
        // 5.展示对应的歌词
        setLyricsText(lyrics[index]?.text)
        
        // message.open({
        //     content: lyrics[index].text,
        //     key: 'lyric',
        //     duration: 0
        // })
    }

    // 进度条点击
    function handleSliderChanged(value: number){
        // 1.获取点击位置的进度
        const currentTime = (value / 100) * duration
        
        // 2. 设置 当前播放的时间
        audioRef.current!.currentTime = currentTime / 1000
        
        // 设置进度条和当期播放时间
        setProgress(value)
        setCurrentTime(currentTime)

        // 结束拖拽的时候将进度条继续
        setIsSliding(false)
    }

    // 进度条拖拽
    function handleSliderChanging(value: number){
        // 拖拽的时候不要设置时间和进度
        setIsSliding(true)

        // 设置progress
        setProgress(value)

        // 设置拖拽对应的时间
        const currentTime = (value / 100 ) * duration
        
        setCurrentTime(currentTime)
    }

    // 单曲循环/随机/顺序的切换
    function handleChangePlayMode() {
        let newPlayMode = playMode + 1
        if (newPlayMode > 2) newPlayMode = 0
        dispatch(changePlayMode(newPlayMode))
    }

    // 切换歌曲
    function handleChangeMusic(isNext = true) {
        dispatch(changeMusicAction(isNext))
    }

    // 歌曲播放全切换下一首
    function handleTimeEnd(){
        if (playMode === 2) {
            audioRef.current!.currentTime = 0
            audioRef.current?.play()
        } else {
            handleChangeMusic(true)
        }
    }

  return (
    <AppPlayerBarStyled className='sprite_playbar'>
        <div className="content wrap-v2">
            <BarControl isPlaying={isPlaying}>
                <button className="btn sprite_playbar prev" onClick={() => handleChangeMusic(false)}></button>
                <button className="btn sprite_playbar play" onClick={handlePlayBtnClick}></button>
                <button className="btn sprite_playbar next" onClick={() => handleChangeMusic()}></button>
            </BarControl>
            <BarPlayerInfo>
                <img className='image' src={getImageSize(currentSong.al.picUrl, 50)} alt="" />
                <div className="info">
                    <div className="song">
                        <span className="song-name">{ currentSong.name }</span>
                        <span className="singer-name">{ currentSong.ar?.[0]?.name }</span>
                        <span className="singer-name">{ lyricsText }</span>
                    </div>
                    <div className="progress">
                        <Slider value={progress} step={0.5} tooltip={{formatter: null}} onAfterChange={handleSliderChanged} onChange={handleSliderChanging}></Slider>
                        <div className="time">
                            <span className="current">{ formatTime(currentTime) }</span>
                            <span className="divider">/</span>
                            <span className="duration">{ formatTime(duration) }</span>
                        </div>
                    </div>
                </div>
            </BarPlayerInfo>
            <BarOperator playMode={playMode}>
                <div className="left">
                    <button className="btn pip"></button>
                    <button className="btn sprite_playbar favor"></button>
                    <button className="btn sprite_playbar share"></button>
                </div>
                <div className="right sprite_playbar">
                    <button className="btn sprite_playbar volume"></button>
                    <button className="btn sprite_playbar loop" onClick={handleChangePlayMode}></button>
                    <button className="btn sprite_playbar playlist"></button>
                </div>
            </BarOperator>
        </div>

        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleTimeEnd}/>
    </AppPlayerBarStyled>
  )
})

export default AppPlayerBar