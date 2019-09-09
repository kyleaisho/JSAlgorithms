function _gen(n, container, comb = '', setOfCombs = new Set()) {
  if (n === 0) {
    if (!setOfCombs.has(comb)) {
      container.push(comb);
      setOfCombs.add(comb);
    }
  } else {
    // The algorithm is to try the new paren at
    // each of the below positions and use a set to
    // remove duplicates
    const comb1 = '()' + comb;
    const comb2 = '(' + comb + ')';
    const comb3 = comb + '()';

    _gen(n - 1, container, comb1, setOfCombs);
    _gen(n - 1, container, comb2, setOfCombs);
    _gen(n - 1, container, comb3, setOfCombs);
  }
}

function genValidParens(n) {
  const container = [];

  _gen(n, container);

  return container;
}

[1, 2, 3, 4, 5].forEach(n => {
  console.log('-----' + n + '-----');
  genValidParens(n).forEach(n => console.log(n));
});
