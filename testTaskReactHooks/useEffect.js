/***5. Multiple hooks ***/
const React = (function() {
    const hooks = []
    let idx = 0 //which hook we are currently operating

    function useState(initValue) {
        const state = hooks[idx] || initValue
        const _idx = idx //to freeze internal hook index

        const setState = newValue => {
            hooks[_idx] = newValue
        }

        idx++ //next hook can be taken

        return [state, setState]
    }

    function useEffect(cb, depArray) {
        const oldDependencies = hooks[idx]
        let hasChanged = true

        if (oldDependencies) {
            hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDependencies[i]))
        }

        hasChanged && cb()
        hooks[idx] = depArray
        idx++
    }

    function render(Component) {
        idx = 0 //go through all hooks from scratch
        const Comp = Component()
        Comp.render()
        return Comp
    }

    return { useState, render, useEffect }
})()

function Component() {
    const [count, setCount] = React.useState(1)
    const [text, setText] = React.useState("coffee")
    const location = {
        pathname: "pathname", params: [1, 2, 3]
    }

    React.useEffect(() => {
        console.log("My side effect!")
    }, [location])

    return {
        render: () => console.log(count, text),
        click: () => setCount(count + 1),
        type: newText => setText(newText)
    }
}

var App = React.render(Component)
App.click()
App = React.render(Component)
App.type("tea")
App = React.render(Component)