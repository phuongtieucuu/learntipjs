const dataTest = {
    '0': [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'string',
            parentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            level: 0,
            documents: [],
        },
    ],
    '1': [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'string',
            parentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            level: 1,
            documents: [],
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            name: 'string',
            parentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            level: 1,
            documents: [],
        },
    ],
    '2': [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66asml',
            name: 'string',
            parentId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            level: 2,
            documents: [],
        },
    ],
};

console.log();

function test(objs) {
    const arr = Object.keys(objs)
    let obj
    let data
    obj = objs[arr[0]]
    data = obj
    for(let i = 1; i < arr.length; i ++) {
        obj = obj.map(item => {
            item.childen = objs[arr[i]]
        })
        obj = objs[arr[i]]
    }

    return data
}

console.log(test(dataTest)[0].childen[1].childen);