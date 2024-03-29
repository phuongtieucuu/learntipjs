const initApp = () => {
    const button = document.getElementById("btn-click")
    button.addEventListener("click", throttle(handleClick, 2000))
}

const handleClick = () => console.log("Click");

document.addEventListener("DOMContentLoaded", initApp)

const debounce = (fn, delay = 0) => {
    let timerId
    console.log("timerId imediate load:::", timerId);
    return () => {
        console.log("previus timerId:::", timerId);
        if (timerId) {
            clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            fn()
        }, delay);
    }
}

const throttle = (fn, delay = 0) => {
    let last = 0;
    return () => {
        const now = new Date().getTime()
        if (now - last > delay) {
            last = now
            fn()
        }
    }
}