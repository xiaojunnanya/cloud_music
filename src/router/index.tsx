import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'


// 一级路由
const Discover = lazy(()=> import('@/views/discover'))
const Me = lazy(()=> import('@/views/me'))
const DownLoad = lazy(()=> import('@/views/download'))
const Focus = lazy(()=> import('@/views/focus'))
const Player = lazy(()=> import('@/views/player'))

// discover下的二级路由
const Album = lazy(()=> import('@/views/discover/c-views/album'))
const Artist = lazy(()=> import('@/views/discover/c-views/artist'))
const Djradio = lazy(()=> import('@/views/discover/c-views/djradio'))
const Ranking = lazy(()=> import('@/views/discover/c-views/ranking'))
const Recommend = lazy(()=> import('@/views/discover/c-views/recommend'))
const Songs = lazy(()=> import('@/views/discover/c-views/songs'))

const routes: RouteObject[] = [
    {
        path:'/',
        element: <Navigate to="/discover"></Navigate>
    },
    {
        path:'/discover',
        element: <Discover />,
        children:[
            {
                path:'/discover',
                element: <Navigate to="/discover/recommend"></Navigate>
            },
            {
                path:"/discover/album",
                element: <Album></Album>
            },
            {
                path:"/discover/artist",
                element: <Artist></Artist>
            },
            {
                path:"/discover/djradio",
                element: <Djradio></Djradio>
            },
            {
                path:"/discover/ranking",
                element: <Ranking></Ranking>
            },
            {
                path:"/discover/recommend",
                element: <Recommend></Recommend>
            },
            {
                path:"/discover/songs",
                element: <Songs></Songs>
            }
        ]
    },
    {
        path:'/me',
        element: <Me />
    },
    {
        path:'/download',
        element: <DownLoad />
    },
    {
        path:'/focus',
        element: <Focus />
    },
    {
        path:'/player',
        element: <Player />
    }
]


export default routes