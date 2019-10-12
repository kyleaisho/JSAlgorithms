const { commands, words } = require('./example');

const Node = function(data) {
    this.links = new Array(26);
    this.word = false;
}

/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.root = new Node(null);
};

const getCode = (ch) => ch.charCodeAt(0) - 'a'.charCodeAt(0);

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let curr = this.root;
    
    for (let i = 0; i < word.length; i++) {
        const code = getCode(word[i]);
        
        if (!curr.links[code]) {
            curr.links[code] = new Node(word[i]);
        }
        
        if (i === word.length - 1) {
            // At then end make sure the flag is flipped
            curr.word = true
        }
        
        curr = curr.links[code];
    }
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
        const code = getCode(word[i]);

        if (!curr.links[code]) return false;
        if (i === word.length - 1) {
            return curr.word;
        }

        curr = curr.links[code];
    }

    return false;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(word) {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
        const code = getCode(word[i]);

        if (!curr.links[code]) return false;

        curr = curr.links[code];
    }

    return true;
};

function Trie2() {
	const root = {};
	return { insert, search, startsWith };

	function insert(word) {
		let curr = root;
		word.split('').forEach(ch => curr = curr[ch] || {});
		curr.isWord = true;
	}

	function traverse(word) {
		let curr = root;
		for (var i = 0; i < word.length; i++) {
			if (!curr) return null;
			curr = curr[word[i]];
		}
		return curr;
	}

	function search(word) {
		let node = traverse(word);
		return !!node && !!node.isWord;
	}

	function startsWith(word) {
		return !!traverse(word);
    }
}


/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
//"Trie","insert","insert","search"
let trie;

const command = ["Trie","insert","search","search","startsWith","insert","search"]
const vals = [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]
const myAnswer = [];
command.forEach((command, i) => {
     const val = vals[i][0];

     switch (command) {
         case 'Trie':
             trie = new Trie();
             break;
        case 'insert':
            trie.insert(val);
            break;
        case 'search':
            myAnswer.push({ found: trie.search(val), val, index: i });
            break;
        case 'startsWith':
            myAnswer.push({ found: trie.startsWith(val), val, index: i });
            break;
         default:
             console.log(`${command}`);
     }
 });

 const expected = []
 command.forEach((command, i) => {
    const val = vals[i][0];

    switch (command) {
        case 'Trie':
            trie = new Trie2();
            break;
       case 'insert':
           trie.insert(val);
           break;
       case 'search':
            expected.push({ found: trie.search(val), val, index: i });
           break;
        case 'startsWith':
                expected.push({ found: trie.startsWith(val), val, index: i });
            break;
        default:
            throw command;
    }
});

console.assert(myAnswer.length === expected.length, 'cool')
const diff = myAnswer.filter(({ found }, i) => found !== expected[i].found)
console.log(diff)