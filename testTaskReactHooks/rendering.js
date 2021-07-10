/***3. Render ***/
const React = (function() {
    let val // lift up to the React module scope

    function useState(initValue) {
        const state = val || initValue // replace a function back to variable

        const setState = newValue => {
            val = newValue
        }

        return [state, setState]
    }

    function render(Component) {
        const Comp = Component()
        Comp.render()
        return Comp
    }

    return { useState, render }
})()

function Component() {
    const [count, setCount] = React.useState(1)

    return {
        render: () => console.log(count),
        click: () => setCount(count + 1)
    }
}

var App = React.render(Component) //simulation rendering via console.log()
App.click() //simulation event
App = React.render(Component)
App.click()
App = React.render(Component)
