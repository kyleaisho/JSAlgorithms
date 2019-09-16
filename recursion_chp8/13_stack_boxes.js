const getBox = (h, w, d) => ({
  h,
  w,
  d
});

const boxes = [getBox(1, 10, 1), getBox(10, 1, 1), getBox(3, 3, 3), getBox(1, 1, 1), getBox(1, 1, 1)];

function sortBoxes(boxes) {
  boxes.sort((a, b) => {
    const v1 = a.h * a.w * a.d;
    const v2 = b.h * b.w * b.d;

    return v2 - v1;
  });
}

function byHeight(boxes, prevVolume = 0, stack = []) {
  if (boxes.length === 0) {
    return stack.reduce((acc, { height }) => acc + height, 0);
  }

  const box = boxes.pop();
  const v = box.h * box.w * box.d;
  if (v === prevVolume) {
    const sBox = stack[stack.length - 1];
    sBox.height = Math.max(box.h, sBox.height);
  } else {
    stack.push({ volume: v, height: box.h });
  }

  return byHeight(boxes, v, stack);
}

function maxHeight(boxes) {
  sortBoxes(boxes);

  return byHeight(boxes);
}

console.log(maxHeight(boxes));
