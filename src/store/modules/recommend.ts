import { getArtistList, getBanners, getHotRecommend, getNewAlum, getPlaylistDetail } from '@/service/modules/recommend'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const bannerListAction = createAsyncThunk('bannerListAction', async (payload, { dispatch }) =>{
    const res = await getBanners()
    dispatch(changeBanners(res.data.banners))
})

export const hotRecommendAction = createAsyncThunk('hotRecommendAction', async (payload, { dispatch }) =>{
    const res = await getHotRecommend(8)
    dispatch(hotRecommend(res.data.result))
})

export const newAlbumAction = createAsyncThunk('newAlbumAction', async (payload, { dispatch }) =>{
    const res = await getNewAlum()
    dispatch(newAlbum(res.data.albums))
})

export const playListAction = createAsyncThunk('playListAction', async (payload, { dispatch }) =>{
    const rankId = [ 19723756, 3779629, 2884035 ]
    const promise: Promise<any>[] = []
    for (const id of rankId) {
        promise.push((getPlaylistDetail(id)))
    }
    Promise.all(promise).then(res =>{
        const list = res.map(item => item?.data?.playlist)
        dispatch(playDetail(list))
    })
})

export const artistListAction = createAsyncThunk('artistListAction', async (payload, { dispatch }) =>{
    const res = await getArtistList(10)
    dispatch(artist(res.data.artists))
})

interface recommendState{
    banners:any[],
    hotRecommendList:any[],
    newAlbumList:any[],
    playList: any[],
    artistList:any[]
}

const initialState: recommendState = {
    banners:[],
    hotRecommendList:[],
    newAlbumList:[],
    playList:[],
    artistList:[]
}

const recommendSlice = createSlice({
    name:"recommend",
    initialState,
    reducers:{
        changeBanners(state, { payload }){
            state.banners = payload
        },
        hotRecommend(state, { payload }){
            state.hotRecommendList = payload
        },
        newAlbum(state, { payload }){
            state.newAlbumList = payload
        },
        playDetail(state, { payload }){
            state.playList = payload
        },
        artist(state, { payload }){
            state.artistList = payload
        }
    }
})

export const { changeBanners, hotRecommend, newAlbum, playDetail, artist } = recommendSlice.actions

export default recommendSlice.reducer