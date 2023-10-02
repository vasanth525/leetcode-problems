function longestValidParentheses(s: string): number {    
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



    let temp = s;
    temp = temp.slice(temp.indexOf('('));
    temp = temp.slice(0, temp.lastIndexOf(')') + 1);
    let stringSets: string[] = temp.split('()');
    // if (temp[temp.length - 1] === ')' && temp[temp.length - 2] === '(') {
    //     stringSets.pop();
    // }
    // else if (temp[0] === '(' && temp[1] === ')') {
    //     stringSets.shift();
    // }
    let countSets: number[] = [];
    let closeCount: number = 0;
    let limit: number = stringSets.length + (stringSets.length - 1);
    for (let i: number = 0; i < limit; i++) {
        if (i % 2 !== 0) {
            stringSets.splice(i, 0, 'validparentheses');
            if (stringSets[i].length) {
                let closeCount1: number = 1;
                // let closeCount1 = closeCount ? closeCount + 1 : 1;
                // closeCount = 0;
                let prevStringSetIndex: number = i - 1;
                let prevStringSet: string = stringSets[i - 1];
                if (!prevStringSet.length) {
                    closeCount++;
                    for (let j: number = i - 2; j >= 0; j--) {
                        if (!stringSets[j].length) {
                            closeCount++;
                        } else {
                            prevStringSetIndex = j;
                            prevStringSet = stringSets[j];
                            break;
                        }
                    }
                }
                let nextStringSetIndex: number = i + 1;
                let nextStringSet: string = stringSets[i + 1];
                if (!nextStringSet.length) {
                    // closeCount1++;
                    if (i + 1 < stringSets.length - 1) {
                        closeCount1++;
                    }
                    for (let j: number = i + 2; j < stringSets.length; j++) {
                        if (!stringSets[j].length) {
                            // closeCount1++;
                            if (j < stringSets.length - 1) {
                                closeCount1++;
                            }
                        } else if (prevStringSet.length) {
                            nextStringSetIndex = j;
                            nextStringSet = stringSets[j];
                            break;
                        }
                    }
                }
                let tempPrevStringSet: string = prevStringSet;
                prevStringSet = tempPrevStringSet.split(')')[tempPrevStringSet.split(')').length - 1];
                let tempNextStringSet: string = nextStringSet;
                nextStringSet = tempNextStringSet.split('(')[0];
                let limit1: number = prevStringSet.length > nextStringSet.length ? nextStringSet.length : prevStringSet.length;
                for (let j: number = 0; j < limit1; j++) {
                    if (prevStringSet[prevStringSet.length - (j + 1)] === '(' && nextStringSet[j] === ')') {
                        // if (!closeCount || (closeCount && prevStringSet.length === limit)) {
                            closeCount1++;
                        // }
                        if (closeCount && prevStringSet.length === nextStringSet.length) {
                            closeCount1 += closeCount;
                            closeCount = 0;
                        } else if (closeCount && prevStringSet.length !== nextStringSet.length) {
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
                } else if (!prevStringSet.length && !nextStringSet.length && closeCount) {
                    countSets.push(closeCount * 2);
                    closeCount = 0;
                }
                if (!closeCount) {
                    countSets.push(closeCount1 * 2);
                    closeCount1 = 0;
                }
            }
        }
    }
    console.log(stringSets);
    console.log(countSets);
    return countSets.length ? Math.max(...countSets) : 0;
}

function run() {
    let input: HTMLInputElement = document.getElementById('customtestcaseinput') as HTMLInputElement;
    let output: Element = document.getElementById('output') as Element;
    output.innerHTML = '';
    output.innerHTML = longestValidParentheses(input.value) + '';
    // shelljs.exec("npm run run");
}