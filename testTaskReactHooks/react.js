const React = function() {
    let hooks = []
    let idx = 0

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
        const oldDeps = hooks[idx] // can be undefined if it not exist
        let hasChanged = true

        if (oldDeps) {
            hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]))
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

    return { useState, render, useEffect}
})

function Component() {
    const [count, setCount] = React.useState(1)
    const [text, setText] = React.useState("coffee")

    React.useEffect(() => {
        console.log("Effect!")
    }, [text])

    return {
        render: () => console.log(count, text),
        click: () => setCount(count + 1),
        type: string => setText(string)
    }
}

var App = React.render(Component)
App.click()
App = React.render(Component)
App.type("tea")
App = React.render(Component)

