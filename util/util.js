function removeArrElement(arr, element) {
    const index = arr.indexOf(element);
    arr.splice(index, 1);
    return arr;
}

module.exports = { removeArrElement };
