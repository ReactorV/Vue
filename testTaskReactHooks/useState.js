/***1. useState ***/
function useState(initValue) {
    let val = initValue
    const state = () => val

    const setState = newValue => {
        val = newValue
    }

    return [state, setState]
}

const [count, setCount] = useState(1)
console.log(count()) // 1
setCount(2)
console.log(count()) // ?