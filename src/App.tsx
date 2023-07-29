import React, { memo, Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch } from './store'
import { currentSongAction, getSongLyricAction } from './store/modules/player'

const App = memo(() => {

  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(currentSongAction(1330348068))
    dispatch(getSongLyricAction(1330348068))
  },[])

  return (
    <div>

      <AppHeader></AppHeader>
      
      <Suspense fallback="">
        <div>{ useRoutes(routes) }</div>
      </Suspense>

      <AppFooter></AppFooter>

      {/* 播放 */}
      <AppPlayerBar></AppPlayerBar>
    </div>
  )
})

export default App
