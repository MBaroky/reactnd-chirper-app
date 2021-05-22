import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { setAuthedUser } from './authedUser'

const AUTH_ID = 'tylermcginnis'

export function handleInitialData(){
    return (dispatch)=>{
        return getInitialData()
        .then(({users, tweets}) => {
            dispatch(receiveUsers(users));
            dispatch(receiveTweets(tweets));
            dispatch(setAuthedUser(AUTH_ID))
        })
    }
}