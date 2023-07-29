import { getSongDetial, getSongLyric } from "@/service/modules/player";
import { parseLyric } from "@/utils/parse-lyric";
import type { ILyric } from "@/utils/parse-lyric";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const currentSongAction = createAsyncThunk<void, number, { state: RootState }>('currentSongAction', async ( id: number, { dispatch, getState })=>{
    // 准备播放某一首歌曲时，分成两种情况
        // 从列表尝试是否可以获取到这首歌，获取到就直接播放
        // 获取不到添加到播放列表头部并播放
    const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item) => item.id === id)
    if(findIndex === -1){
        // 没找到
        const res = await getSongDetial(id) 
        dispatch(changeCurrentSong(res.data.songs[0]))
        let newPlaySongList = [...playSongList]
        newPlaySongList.push(res.data.songs[0])
        dispatch(changeSongList(newPlaySongList))
        // 纪录索引
        dispatch(changeSongIndex(newPlaySongList.length -1))
    }else{
        const song = playSongList[findIndex]
        // 将信息给当前播放的数据
        dispatch(changeCurrentSong(song))
        // 纪录当前播放的列表index
        dispatch(changeSongIndex(findIndex))
    }

    
})

export const getSongLyricAction = createAsyncThunk('getSongLyricAction', async ( id: number, { dispatch })=>{
    const res = await getSongLyric(id) 
    // 获取歌词信息并解析
    const { lyric } = res.data.lrc
    const lyrics = parseLyric(lyric)
    dispatch(songLyric(lyrics))
})

export const changeMusicAction = createAsyncThunk<void, boolean, { state: RootState } >('getSongLyricAction', async ( isNext, { dispatch, getState } )=>{
    // 1.获取state中的数据
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    // 2.根据不同的模式计算不同的下一首歌曲的索引
    let newIndex = songIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      // 单曲顺序和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }

    // // 3.获取当前的歌曲
    const song = songList[newIndex]
    dispatch(changeCurrentSong(song))
    dispatch(changeSongIndex(newIndex))

    // // 4.请求新的歌词
    getSongLyric(song.id).then((res) => {
      // 1.获取歌词的字符串
      const { lyric } = res.data.lrc
      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyric)
      // 3.将歌词放到state中
      dispatch(songLyric(lyrics))
    })
})

interface palyerState{
    currentSong: any//当前在播放的歌
    lyric:ILyric[]//歌词
    lyricIndex: number// 歌词的位置
    playSongList:any[]//播放列表
    playSongIndex: number  // 当前播放列表哪个
    playMode: number // 纪录是循环播放0 还是随机播放1 还是单曲循环2
} 

const initialState: palyerState = {
    currentSong:{
        "name": "Letting Go (Live版)",
        "id": 2048584480,
        "pst": 0,
        "t": 0,
        "ar": [
            {
                "id": 166018,
                "name": "吉克隽逸",
                "tns": [],
                "alias": []
            },
            {
                "id": 5538,
                "name": "汪苏泷",
                "tns": [],
                "alias": []
            }
        ],
        "alia": [],
        "pop": 100,
        "st": 0,
        "rt": "",
        "fee": 8,
        "v": 7,
        "crbt": null,
        "cf": "",
        "al": {
            "id": 165939450,
            "name": "天赐的声音第四季 第4期",
            "picUrl": "https://p2.music.126.net/4CH5UGoUznqVVMM3k69-QA==/109951168622343007.jpg",
            "tns": [],
            "pic_str": "109951168622343007",
            "pic": 109951168622343000
        },
        "dt": 263338,
        "h": {
            "br": 320000,
            "fid": 0,
            "size": 10536045,
            "vd": -47736,
            "sr": 48000
        },
        "m": {
            "br": 192000,
            "fid": 0,
            "size": 6321645,
            "vd": -45150,
            "sr": 48000
        },
        "l": {
            "br": 128000,
            "fid": 0,
            "size": 4214445,
            "vd": -43443,
            "sr": 48000
        },
        "sq": {
            "br": 1001854,
            "fid": 0,
            "size": 32978386,
            "vd": -48289,
            "sr": 48000
        },
        "hr": {
            "br": 1772369,
            "fid": 0,
            "size": 58341681,
            "vd": -47730,
            "sr": 48000
        },
        "a": null,
        "cd": "01",
        "no": 3,
        "rtUrl": null,
        "ftype": 0,
        "rtUrls": [],
        "djId": 0,
        "copyright": 0,
        "s_id": 0,
        "mark": 536879104,
        "originCoverType": 2,
        "originSongSimpleData": {
            "songId": 208891,
            "name": "Letting Go",
            "artists": [
                {
                    "id": 7214,
                    "name": "蔡健雅"
                }
            ],
            "albumMeta": {
                "id": 21250,
                "name": "说到爱"
            }
        },
        "tagPicList": null,
        "resourceState": true,
        "version": 7,
        "songJumpInfo": null,
        "entertainmentTags": null,
        "awardTags": null,
        "single": 0,
        "noCopyrightRcmd": null,
        "rtype": 0,
        "rurl": null,
        "mst": 9,
        "cp": 2713419,
        "mv": 0,
        "publishTime": 1684425600000
    },
    lyric:[],
    lyricIndex:-1,
    playSongList:[
        {
            "name": "水星记",
            "id": 441491828,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 2843,
                    "name": "郭顶",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 56,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 35005583,
                "name": "飞行器的执行周期",
                "picUrl": "https://p1.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg",
                "tns": [],
                "pic": 2946691248081599
            },
            "dt": 325266,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 13013203,
                "vd": -29142,
                "sr": 44100
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 7807939,
                "vd": -26509,
                "sr": 44100
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 5205307,
                "vd": -24735,
                "sr": 44100
            },
            "sq": {
                "br": 727754,
                "fid": 0,
                "size": 29589266,
                "vd": -29902,
                "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "1",
            "no": 5,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 56,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "cp": 7003,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "mv": 5404031,
            "publishTime": 1480003200000
        },
        {
            "name": "哪里都是你",
            "id": 488249475,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 1143033,
                    "name": "队长",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 39,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 35702116,
                "name": "哪里都是你",
                "picUrl": "https://p2.music.126.net/lnOnBbP_H-052Hv5ls-QjA==/109951162964628408.jpg",
                "tns": [],
                "pic_str": "109951162964628408",
                "pic": 109951162964628420
            },
            "dt": 222683,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 8909889,
                "vd": -52677,
                "sr": 44100
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 5345951,
                "vd": -50072,
                "sr": 44100
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 3563982,
                "vd": -48393,
                "sr": 44100
            },
            "sq": {
                "br": 1602865,
                "fid": 0,
                "size": 44616432,
                "vd": -52678,
                "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 8256,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 39,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "cp": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "mv": 14477247,
            "publishTime": 1499076297913
        }
    ],
    playSongIndex:-1,
    playMode:0
}

const playerSlice = createSlice({
    name:'playerSlice',
    initialState,
    reducers:{
        changeCurrentSong(state, { payload }){
            state.currentSong = payload
        },
        songLyric(state, { payload }){
            state.lyric = payload
        },
        changeLyricIndex(state, { payload }){
            state.lyricIndex = payload
        },
        changeSongIndex(state, { payload }){
            state.playSongIndex = payload
        },
        changeSongList(state, { payload }){
            state.playSongList = payload
        },
        changePlayMode(state, { payload }){
            state.playMode = payload
        }
    }
})

export const { changeCurrentSong, songLyric, changeLyricIndex, changeSongIndex, changeSongList, changePlayMode } = playerSlice.actions

export default playerSlice.reducer