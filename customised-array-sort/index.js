/**
 * This function can sort the given array according to the option.
 * 
 * Sample Options: (assuming the element is the array in an object)
 *  [
 *    { attribute: 'obj_attr1', descending: true },
 *    { attribute: 'obj_attr2' }, // default is ascending
 *    { attribute: 'obj_attr3', ascending: true },
 *  ]
 * 
 * According to these options, it will first sort the obj_attr1 descendingly 
 *  ar the primary key, and then sort obj_attr2 ascendingly as secondary
 *  key, and then obj_attr3 as the third key, and has more, it goes on.
 * 
 * @param {array} array the array about to sort
 * @param {array} options optional, given this to specify the sort descriptions
 * 
 * @returns the sorted array. The given array is also sorted.
 */
const sortArray = function (array, options) {
  if (!options || options.length === 0) {
    // no option specify, do the default sort
    return array.sort();
  }

  const { attribute, descending } = options.splice(0, 1)[0];
  array.sort((a, b) => {
    if (a.hasOwnProperty(attribute) && b.hasOwnProperty(attribute)) {
      if (typeof a[attribute] === 'number' && typeof b[attribute] === 'number') {
        return a[attribute] - b[attribute];
      } else {
        return a[attribute].toString().localeCompare(b[attribute].toString());
      }
    } else 
      return 1;
  });
  descending && array.reverse(); 

  if (options.length > 0) {
    // group array items based on the attribute
    //  for next recursive iteration
    var subArrays = {};
    array.forEach((item, index) => {
      if (!subArrays[item[attribute]]) {
        subArrays[item[attribute]] = {
          lastIndex: index,
          array: []
        }
      }

      subArrays[item[attribute]].lastIndex = index;
      subArrays[item[attribute]].array.push(item);

    });

    Object.keys(subArrays).forEach(key => {
      var subArray = subArrays[key];
      // generate a copy of the options to avoid options were 
      //  modified by another run in the same iteration
      sortArray(subArray.array, options.slice()); 

      // until now the subArray should be sorted,
      //  add it back to the original array
      for (var i = subArray.lastIndex; i > subArray.lastIndex - subArray.array.length; i--) {
        array[i] = subArray.array[subArray.array.length - 1 - subArray.lastIndex + i];
      }
    });
    return array;
  } else {
    return array;
  }
}