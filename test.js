Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback.call( this[i], i, this)
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7]


const forEachLoop = () => {
    arr.myForEach((item) => {
        console.log(item);
    })
}

forEachLoop()