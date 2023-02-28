const increment = (val) => {
    return {
        type : 'INCREMENT',
        inc : val
    }
}

const decrement = (val) => {
    return {
        type : 'DECREMENT',
        inc : val
    }
}
export {increment, decrement};