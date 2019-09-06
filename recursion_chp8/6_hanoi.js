


const n = 3;
const peg1 = [2, 1, 0];
const peg2 = [];
const peg3 = [];
moveDiscs(n, peg1, peg3, peg2);
console.assert(peg1.length === 0, "Still stuff on 1");
console.assert(peg2.length === 0, "Still stuff on 2");
console.assert(peg3.length === n, "Still stuff on 1 or 2");

function log(n) {
    [peg1, peg2, peg3].forEach((peg, i) => {
        console.log(`${'  '.repeat(3 - n)} ${i + 1}: ${peg}`)
    });
    console.log(`${'  '.repeat(3 - n)} -----`);
}

function moveDiscs(n, origin, destination, buffer) {
    log(n);

    if (n <= 0) return;

    // Move discs from the origin to the buffer
    moveDiscs(n - 1, origin, buffer, destination);

    // Move the top disc to the destination
    destination.push(origin.pop());

    // Move the discs from the buffer to the origin
    moveDiscs(n - 1, buffer, destination, origin);
}