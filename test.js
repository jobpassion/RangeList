class Range {
    constructor(range) {
        this.left = range[0];
        this.right = range[1];
    }
}

class RangeList {
    constructor() {
        this.list = [];
    }

    add(range) {
        if (range[0] == range[1]) {
            return;
        }
        range = new Range(range);
        let i = 0;
        for (; i < this.list.length; i++) {
            if (range.right < this.list[i].left) {
                break;
            } else if (range.right < this.list[i].right) {
                this.list[i].left = Math.min(this.list[i].left, range.left);
                range = this.list.splice(i, 1)[0];
                i--;
            } else if (range.left <= this.list[i].right) {
                range = this.list.splice(i, 1, range)[0];
                i--;
            }
        }
        this.list.splice(i, 0, range);
    }
    remove(range) {
        if (range[0] == range[1]) {
            return;
        }
        range = new Range(range);
        for (let i = 0; i < this.list.length; i++) {
            if (range.right < this.list[i].left) {
                break;
            }
            if (!(this.list[i].right <= range.left || range.right <= this.list[i].left)) {
                let result = [new Range([this.list[i].left, range.left]), new Range([range.right, this.list[i].right])];
                let resultRange = result.filter((r) => r.right > r.left);
                this.list.splice(i, 1, ...resultRange);
                i += (resultRange.length - 1);
            }
        }
    }

    toString() {
        return this.list.map(range=>`[${range.left}, ${range.right})`).join(" ");
    }
}


const rl = new RangeList();
rl.toString(); // Should be ""
rl.add([1, 5]);
rl.toString(); // Should be: "[1, 5)"
rl.add([10, 20]);
rl.toString(); // Should be: "[1, 5) [10, 20)"
rl.add([20, 20]);
rl.toString(); // Should be: "[1, 5) [10, 20)"
rl.add([20, 21]);
rl.toString(); // Should be: "[1, 5) [10, 21)"
rl.add([2, 4]);
rl.toString(); // Should be: "[1, 5) [10, 21)"
rl.add([3, 8]);
rl.toString(); // Should be: "[1, 8) [10, 21)"
rl.remove([10, 10]);
rl.toString(); // Should be: "[1, 8) [10, 21)"
rl.remove([10, 11]);
rl.toString(); // Should be: "[1, 8) [11, 21)"
rl.remove([15, 17]);
rl.toString(); // Should be: "[1, 8) [11, 15) [17, 21)"
rl.remove([3, 19]);
rl.toString(); // Should be: "[1, 3) [19, 21)"
