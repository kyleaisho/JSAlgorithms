function _permute(s, c, buf = '') {
  if (s.length === 0) {
    c.push(buf);
  } else {
    for (let i = 0; i < s.length; i++) {
      // choose
      const ch = s[i];
      const newStr = s.substring(0, i) + s.substring(i + 1);
      buf = buf + ch;

      // explore
      _permute(newStr, c, buf);

      // unchoose
      buf = buf.substring(0, buf.length - 1);
    }
  }
}

function permute(s) {
  const c = [];
  _permute(s, c);
  return c;
}

permute('aab').forEach(s => console.log(s));
