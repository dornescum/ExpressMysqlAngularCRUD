 function getBrandType(input) {
    if (input === 'apple') {
        return 1
    } else if (input === 'samsung') {
        return 2
    } else if (input === 'nokia') {
        return 3
    } else if (input === 'lenovo') {
        return 5
    } else if (input === 'dell') {
        return 6
    } else if (input === 'hp') {
        return 7
    } else if (input === 'asus') {
        return 8
    } else if (input === 'huawei') {
        return 9
    } else if (input === 'sony') {
        return 10
    } else if (input === 'lg') {
        return 11
    } else {
        return 0
    }
}
 function getCategoryNr(input) {
     console.log('input : ', input);
    if (input === 'phone') {
        return 1
    } else if (input === 'tablet') {
        return 2
    } else if (input === 'tv') {
        return 3
    } else if (input === 'laptop') {
        return 4
    } else if (input === 'pc') {
        return 5
    }
     else {
        return 0
    }
}



module.exports = { getBrandType, getCategoryNr };
