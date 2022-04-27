function isObject(obj) {
    return obj === Object(obj)
}

function isInt(x) {
    return x % 1 === 0
}

function isDate(dateStr) {
    return !isNaN(new Date(dateStr).getDate())
}

export function searchFilter(array, string) {

    const data = array.filter(o => {
        return Object.keys(o).some(k => {

            o[k] = o[k] === null ? "" : o[k]
            if (isObject(o[k])) {

                return Object.keys(o[k]).some(p => {
                    o[k][p] = o[k][p] === null ? "" : o[k][p]
                    if (isInt(o[k][p])) {
                        const stringValue = o[k][p].toString()

                        return stringValue.toLowerCase().includes(string.toLowerCase())
                    } else if (isDate(o[k][p])) {
                        return o[k][p] === string
                    } else {
                        return o[k][p].toLowerCase().includes(string.toLowerCase())

                    }
                })
            } else if (isInt(o[k])) {
                const stringValue = o[k].toString()

                return stringValue.toLowerCase().includes(string.toLowerCase())
            } else if (isDate(o[k])) {
                return o[k] === string
            } else {
                return o[k].toLowerCase().includes(string.toLowerCase())

            }
        })
    })
    return data
}