/***4. Multiple hooks ***/
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

    function render(Component) {
        idx = 0 //go through all hooks from scratch
        const Comp = Component()
        Comp.render()
        return Comp
    }

    return { useState, render }
})()

function Component() {
    const [count, setCount] = React.useState(1)
    const [text, setText] = React.useState("coffee")

    return {
        render: () => console.log(count, text),
        click: () => setCount(count + 1),
        type: () => setText("tea")
    }
}

var App = React.render(Component)
App.click()
App = React.render(Component)
App.type()
App = React.render(Component)