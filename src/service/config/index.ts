// export const BASE_URL = 'http://codercba.com:9002'
export const TIMEOUT = 10000

export let BASE_URL = ''
if(process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://codercba.com:9002'
}else{
    BASE_URL = 'http://codercba.com:9002'
}
