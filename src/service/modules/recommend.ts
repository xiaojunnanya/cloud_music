import { jlReq } from ".."

export const getBanners = () =>{
    return jlReq.get({
        url:'/banner'
    })
}

export const getHotRecommend = (limit = 30) =>{
    return jlReq.get({
        url:'/personalized',
        params:{
            limit
        }
    })
}

export const getNewAlum = () =>{
    return jlReq.get({
        url:"/album/newest"
    })
}

export function getPlaylistDetail(id: number) {
    return jlReq.get({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}
  
export function getArtistList(limit = 30) {
    return jlReq.get({
        url: '/artist/list',
        params: {
             limit
        }
    })
}