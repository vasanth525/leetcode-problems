function longestValidParentheses(s) {
    // let temp = s;
    // temp = temp.slice(temp.indexOf('('));
    // temp = temp.slice(0, temp.lastIndexOf(')') + 1);
    // let stringSets: string[] = temp.split(')');
    // if (temp[temp.length - 1] === ')') {
    //     stringSets.pop();
    // }
    // let countSets: number[] = [];
    // let closeCount: number = 0;
    // for (let i: number = 0; i < stringSets.length && stringSets[i].length; i++) {
    //     let closeCount1: number = 1;
    //     for (let j: number = i + 1; j < stringSets.length; j++) {
    //         if (!stringSets[j].length && closeCount1 < stringSets[i].length) {
    //             closeCount1++;
    //             // stringSets.splice(j, 1);
    //             // j--;
    //         } else if (!stringSets[j].length && closeCount1 >= stringSets[i].length) {
    //             break;
    //         } else if (stringSets[j].length && stringSets[i].length === closeCount1) {
    //             closeCount += closeCount1;
    //             closeCount1 = 0;
    //             break;
    //         } else if (stringSets[j].length && stringSets[i].length !== closeCount1) {
    //             if (stringSets[i].length < closeCount1) {
    //                 closeCount1 = stringSets[i].length;
    //             }
    //             if (closeCount) {
    //                 closeCount += closeCount1;
    //                 countSets.push(closeCount * 2);
    //                 closeCount = 0;
    //                 closeCount1 = 0;
    //             } else {
    //                 countSets.push(closeCount1 * 2);
    //                 closeCount1 = 0;
    //             }
    //             break;
    //         }
    //     }
    //     if (i === stringSets.length - 1 && stringSets[i].length > 1) {
    //         if (closeCount) {
    //             countSets.push(closeCount * 2);
    //             countSets.push(closeCount1 * 2);
    //             closeCount1 = 0;
    //             closeCount = 0;
    //         } else {
    //             countSets.push(closeCount1 * 2);
    //             closeCount1 = 0;
    //         }
    //     } 
    //     else if (closeCount && closeCount1) {
    //         closeCount += closeCount1;
    //         countSets.push(closeCount * 2);
    //         closeCount = 0;
    //     } else if (closeCount1) {
    //         countSets.push(closeCount1 * 2);
    //         closeCount = 0;
    //         closeCount1 = 0;
    //     }
    // }
    // return countSets.length ? Math.max(...countSets) : 0;
    var temp = s;
    temp = temp.slice(temp.indexOf('('));
    temp = temp.slice(0, temp.lastIndexOf(')') + 1);
    var stringSets = temp.split('()');
    // if (temp[temp.length - 1] === ')' && temp[temp.length - 2] === '(') {
    //     stringSets.pop();
    // }
    // else if (temp[0] === '(' && temp[1] === ')') {
    //     stringSets.shift();
    // }
    var countSets = [];
    var closeCount = 0;
    var limit = stringSets.length + (stringSets.length - 1);
    for (var i = 0; i < limit; i++) {
        if (i % 2 !== 0) {
            stringSets.splice(i, 0, 'validparentheses');
            if (stringSets[i].length) {
                var closeCount1 = 1;
                // let closeCount1 = closeCount ? closeCount + 1 : 1;
                // closeCount = 0;
                var prevStringSetIndex = i - 1;
                var prevStringSet = stringSets[i - 1];
                if (!prevStringSet.length) {
                    closeCount++;
                    for (var j = i - 2; j >= 0; j--) {
                        if (!stringSets[j].length) {
                            closeCount++;
                        }
                        else {
                            prevStringSetIndex = j;
                            prevStringSet = stringSets[j];
                            break;
                        }
                    }
                }
                var nextStringSetIndex = i + 1;
                var nextStringSet = stringSets[i + 1];
                if (!nextStringSet.length) {
                    // closeCount1++;
                    // if (i + 1 < stringSets.length - 1) {
                    if (i + 1 < stringSets.length - 1 && !closeCount) {
                        closeCount1++;
                    } else if (i + 1 < stringSets.length - 1 && closeCount) {
                        closeCount++;
                        closeCount1 = 0;
                    }
                    for (var j = i + 2; j < stringSets.length; j++) {
                        if (!stringSets[j].length) {
                            // closeCount1++;
                            if (j < stringSets.length - 1 && !closeCount) {
                                closeCount1++;
                            } else if (j < stringSets.length - 1 && closeCount) {
                                closeCount++;
                                closeCount1 = 0;
                            }
                        }
                        else if (prevStringSet.length) {
                            nextStringSetIndex = j;
                            nextStringSet = stringSets[j];
                            break;
                        }
                    }
                }
                var tempPrevStringSet = prevStringSet;
                prevStringSet = tempPrevStringSet.split(')')[tempPrevStringSet.split(')').length - 1];
                var tempNextStringSet = nextStringSet;
                nextStringSet = tempNextStringSet.split('(')[0];
                var limit1 = prevStringSet.length > nextStringSet.length ? nextStringSet.length : prevStringSet.length;
                for (var j = 0; j < limit1; j++) {
                    if (prevStringSet[prevStringSet.length - (j + 1)] === '(' && nextStringSet[j] === ')') {
                        // if (!closeCount || (closeCount && prevStringSet.length === limit)) {
                        closeCount1++;
                        // }
                        if (closeCount && prevStringSet.length <= nextStringSet.length) {
                            closeCount1 += closeCount;
                            closeCount = 0;
                        }
                        else if (closeCount && prevStringSet.length !== nextStringSet.length) {
                            countSets.push(closeCount * 2);
                            closeCount = 0;
                        }
                        // if (j === limit - 1 && stringSets[nextStringSetIndex + 1]) {
                        // }
                    }
                }
                prevStringSet = tempPrevStringSet;
                nextStringSet = tempNextStringSet;
                // prevStringSet === stringSets[i - 1] stringSets[i - 1].includes(prevStringSet)
                if (prevStringSet === stringSets[i - 1] && prevStringSet.length && closeCount) {
                    countSets.push(closeCount * 2);
                    closeCount = 0;
                }
                else if (!prevStringSet.length && !nextStringSet.length && closeCount) {
                    countSets.push(closeCount * 2);
                    closeCount = 0;
                }
                if (!closeCount && closeCount1) {
                    countSets.push(closeCount1 * 2);
                    closeCount1 = 0;
                }
            }
        }
    }
    console.log(stringSets);
    console.log(countSets);
    return countSets.length ? Math.max.apply(Math, countSets) : 0;
}
function run() {
    var input = document.getElementById('customtestcaseinput');
    var output = document.getElementById('output');
    output.innerHTML = '';
    output.innerHTML = longestValidParentheses(input.value) + '';
    // shelljs.exec("npm run run");
}
