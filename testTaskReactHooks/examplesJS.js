/*** example №1 (Wrong parameter) ***/
function sum(a, b) {
    return a + g
}

sum(4,4)


/*** example №2 (Number annotation and a number of parameters) ***/
function sum2(a, b) {
    return a + b
}

sum2("Hello",4)
sum2(3)


/*** example №3 Autocompletion ***/
function sum3 ({firstArg, secondArg }) {
    return firstArg + secondArg
}

sum3({firstArg: 3})

/*** example №4 Explicit category declarations and code navigation ***/
//see to Props example

