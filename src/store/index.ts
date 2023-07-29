import { configureStore } from "@reduxjs/toolkit"
import recommendSlice from './modules/recommend'
import playerSlice from './modules/player'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
    reducer: {
        recommend: recommendSlice,
        player: playerSlice
    }
})

// 好好理解理解
// 将 useSelector 与ts进行一个结合封装一下 到时候我们直接使用 useAppSelector 就会类型推断自动判断我们的类型

// 拿useSelector的类型
type StateFnType = typeof store.getState
export type RootState = ReturnType<StateFnType>

// 拿useDispatch的类型
type DispatchType = typeof store.dispatch


export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector
export const useAppDispatch: ()=> DispatchType = useDispatch
// 这部其实意义不大，但是为了统一一下，我们就进行一个赋值，然后都在这个文件导出
export const useAppShallowEqual = shallowEqual

export default store 