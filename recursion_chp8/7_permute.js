const s = 'abc'.split('');
const container = [];

function permute(s, c, p = []) {
  if (s.length === 0) {
    c.push(p.join(''));
  } else {
    for (let i = 0; i < s.length; i++) {
      p.push(s[i]);
      s.splice(i, 1);

      permute(s, c, p);

      s.splice(i, 0, p.pop());
    }
  }
}

permute(s, container);
console.assert(container.length > 0, 'Nothing was permuted');
container.forEach(s => console.log(s));
