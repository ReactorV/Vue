/*** static typing ***/
/*** example №1 (Wrong parameter) ***/
function sum(a, b) {
    return a + g
}

sum(4,4)


/*** example №2 (Number annotation and a number of parameters) ***/
function sum2(a: number, b: number) {
    return a + b
}

sum2("Hello",4)
sum2(3)



/*** example №3 Autocompletion ***/
type SumArguments = {
    firstArg: number
    secondArg: number
}

function sum3 ({firstArg, secondArg }: SumArguments) {
    return firstArg + secondArg
}

sum3({firstArg: 3, secondArg: 5})

/*** example №4 Explicit category declarations and code navigation ***/
//see to Props example