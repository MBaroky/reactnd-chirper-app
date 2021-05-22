const logger = (store) => (next) => (action) =>{
    console.group(action.type)
        console.log('The action is: ', action)
        const returnValue = next(action)
        console.log('The new state is: ', returnValue)
    console.groupEnd()

    return returnValue
}

export default logger