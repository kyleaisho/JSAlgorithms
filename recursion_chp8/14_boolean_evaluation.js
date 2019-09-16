const isOperator = c => c === '|' || c === '&' || c === '^';
function getExpression(str) {
  const lhs = str[0];
  const operator = str[1];
  const rhs = str[2];

  if (!isOperator(lhs) && isOperator(operator) && !isOperator(rhs)) {
    return `${lhs}${operator}${rhs}`;
  }
}

function _countEval(exp, val, set, tmp = [], depth = 0) {
  console.log(`${' '.repeat(depth)} countEval(${exp}, ${tmp.join()})`);
  if (exp.length < 2) {
    const t = tmp.join('');
    // if (eval(t) === val) {
    //   set.add(t);
    // }
    set.add(t);
  } else {
    // Choose
    for (let i = 0; i < exp.length; ++i) {
      const s = exp.substring(i);
      const e = getExpression(s);
      if (e) {
        tmp.push(`(${e})`);

        // Explore
        _countEval(s.substring(e.length - 2), val, set, tmp, depth + 1);

        // Un-choose
        tmp.pop();
      }
    }
  }
}

function countEval(exp, val) {
  const set = new Set();
  _countEval(exp, val, set);
  return set;
}

countEval('1^0|0|1', false);
