function calculate(s) {
    /**
     * This is all preprocessing to make the calculation
     * algorithm more clear
     * 
     * Whats happening here is we are creating 
     * numbers from the individual digits, removing whitespace
     * and putting all that in order into an array
     * 
     * 
     */
    const tmp = s.replace(/\s/g, '').split('');
    const values = [];
    let num = null;
    
    for (let i = 0; i < tmp.length; i++) {
        const ch = tmp[i];
        
        if (isNaN(ch)) {
            if (num !== null) {
                values.push(num);
                num = null;
            }
            
            values.push(ch);
            continue;
        }
        const digit = parseInt(ch, 10);
        num = num * 10 + digit;
    }
    if (Number.isInteger(num)) values.push(num);

    return calc(values, 0);
}

const calc = (arr) => {
    const stack = [];
    let sign = 1;
    let result = 0;
    
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];

        if (Number.isInteger(val)) {
            stack.push(val);
            continue;
        }
        if (val === '+' || val === '-') {
            // Encountered a sign
            // evaluate the expression to the left
            // with existing result, sign, number
            result += sign * stack.pop();

            // We used the sign, so reset it
            sign = val === '+' ? 1 : -1;
        } else if (val === '(') {
            // Need to evaluate the inner parens
            // store the result and previous sign onto
            // the stack for use after all the parens
            // are processed
            stack.push(result);
            stack.push(sign);

            // reset the sign and result for the inner parens
            // to start fresh, thre previous values are stored
            // on the top of the stack
            sign = 1;
            result = 0;
        } else if (val === ')') {
            // eval the expr left to right
            // Same as with a + or -
            result += sign * stack.pop();

            // ')' marks the end of parens, since we
            // pushed the previous sign onto the stack before
            // the start of this paren pair we now need to eval
            // that in case of '-(5 + 6)' -> the stack has -1
            // on the top and the result has 11 from the 5 + 6
            result *= stack.pop();

            // reset the sign
            sign = 1;
        }
    }

    return result + sign * (stack.pop() || 0);
}

console.log(calculate("2-(5-6)"))