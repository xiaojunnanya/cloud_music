import { BASE_URL, TIMEOUT } from "./config";
import jlRequest from "./request";

const jlReq = new jlRequest({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})

// const jlReq1 = new jlRequest({
//     baseURL:BASE_URL,
//     timeout:TIMEOUT,
//     // 当我们这个接口需要额外的拦截器的时候，我们就可以配置
//     interceptors:{
//         requestSuccessFn(config){
//             return config
//         },
//         requestFailureFn(error){
//             return error
//         },
//         responseSuccessFn(res) {
//             return res
//         },
//         responseFailureFn(error) {
//             return error
//         },
//     }
// })

export { jlReq }