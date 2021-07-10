/***2. React module and a Component ***/
const React = (function() {
    function useState(initValue) {
        let val = initValue
        const state = () => val

        const setState = newValue => {
            val = newValue
        }

        return [state, setState]
    }

    return { useState }
})()

function Component() {
    const [count, setCount] = useState(1)

    return {
        render: () => console.log(count),
        click: () => setCount(count + 1)
    }
}

