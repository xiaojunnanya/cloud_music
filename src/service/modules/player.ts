import { jlReq } from ".."

// 歌曲
export const getSongDetial = (ids: number) =>{
    return jlReq.get({
        url:"/song/detail",
        params:{
            ids
        }
    })
}

// 歌词

export const getSongLyric = (id: number) =>{
    return jlReq.get({
        url:"/lyric",
        params:{
            id
        }
    })
}