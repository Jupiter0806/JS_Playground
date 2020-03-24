var values = []

for (var i = 0; i < 500000; i++) {
    values[i] = generateRandomInt()
}

shell_sort(values);

function shell_sort(array) {
    // 5-sort
    theNumSrot(array, 5);
    // console.log(array);

    // 3-sort
    theNumSrot(array, 3);
    // console.log(array);

    insertionSort(array);
    // console.log(array);
}

function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
        var v = array[i];
        var j = i - 1;
        while (j >= 0 && array[j] > v) {
            array[j+1] = array[j];
            j = j - 1;
        }
        array[j + 1] = v;
    }
}

function theNumSrot(array, theNum) {
    for (var i = 0; i < theNum; i++) {
        var index = [];
        var currentIndex = i;
        while(currentIndex < array.length) {
            index.push(currentIndex);
            currentIndex += theNum;
        }
        sortThese(array, ...index);
    }
}

function sortThese(array, ...index) {
    // bubble
    for (var i = 0; i < index.length; i++) {
        for (var j = 0; j < index.length - 1; j++) {
            if (array[index[i]] < array[index[j]]) {
                var temp = array[index[i]];
                array[index[i]] = array[index[j]];
                array[index[j]] = temp;
            }
        }
    }
}

function generateRandomInt(max=100000) {
    return Math.floor(Math.random() * max)
}