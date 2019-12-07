function perm(s) {
    const set = [];

    _perm(s.split(''), set);

    return set;
}

function _perm(arr, set, buff = []) {
    if (arr.length === 0) {
        console.log(set.join(''))
    };

    for (let i = 0; i < arr.length; i++) {
        set.push(arr[i]);
        arr.splice(i, 1);

        _perm(arr, set);

        arr.splice(i, 0, set.pop());
    }
}

console.log(perm('aba'))