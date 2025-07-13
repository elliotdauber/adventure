function Queue() {
	this.count = 0;
	this.capacity = 10;
	this.elements = new Array(this.capacity);

	this.expand = function () {
		var newElements = new Array(this.capacity * 2);
		for (var i = 0; i < this.elements.length; i++) {
			newElements[i] = this.elements[i];
		}
		this.elements = newElements;
		this.capacity *= 2;
	}

	this.enqueue = function (elem) {
		if (this.count == this.capacity) {
			this.expand();
		}
		this.elements[this.count] = elem;
		this.count++;
	}

	this.dequeue = function () {
		var toReturn = this.elements[0];
		for (var i = 1; i < this.elements.length; i++) {
			this.elements[i - 1] = this.elements[i];
		}
		this.count--;
		return toReturn;
	}

	this.peek = function () {
		if (this.count > 0) {
			return this.elements[0];
		}
		return null;
	}

	this.isEmpty = function () {
		return this.count == 0;
	}
}

function Vector() {
	this.count = 0;
	this.capacity = 10;
	this.elements = new Array(this.capacity);

	this.expand = function () {
		var newElements = new Array(this.capacity * 2);
		for (var i = 0; i < this.elements.length; i++) {
			newElements[i] = this.elements[i];
		}
		this.elements = newElements;
		this.capacity *= 2;
	}

	this.push = function (elem) {
		if (this.count == this.capacity) {
			this.expand();
		}
		this.elements[this.count] = elem;
		this.count++;
	}

	this.remove = function (index, numToRemove) {
		for (var i = index + numToRemove; i < this.count; i++) {
			this.elements[i - numToRemove] = this.elements[i];
		}
		this.count -= numToRemove;
	}

	this.getElemAtIndex = function (index) {
		return this.elements[index];
	}

	this.size = function () {
		return this.count;
	}

	this.contains = function (elem) {
		for (var i = 0; i < this.count; i++) {
			if (this.elements[i] == elem) {
				return true;
			}
		}
		return false;
	}

	this.clear = function () {
		this.count = 0;
	}
}

function Stack() {
	this.count = 0;
	this.capacity = 10;
	this.elements = new Array(this.capacity);

	this.expand = function () {
		var newElements = new Array(this.capacity * 2);
		for (var i = 0; i < this.elements.length; i++) {
			newElements[i] = this.elements[i];
		}
		this.elements = newElements;
		this.capacity *= 2;
	}

	this.push = function (elem) {
		if (this.count == this.capacity) {
			this.expand();
		}
		this.elements[this.count] = elem;
		this.count++;
	}

	this.pop = function () {
		var toReturn = this.elements[this.count - 1];
		this.count--;
		return toReturn;
	}

	return validMoves; {
		if (this.count > 0) {
			return this.elements[this.count - 1];
		}
		return null;
	}

	this.isEmpty = function () {
		return this.count == 0;
	}
}

function runVectorTests() {
	var v = new Vector();
	v.push(3);
	v.push(5);
	v.push(7);
	v.push(9);
	v.push(11);
	v.push(13);
	v.push(15);
	v.push(17);
	v.push(19);
	v.push(21);
	v.push(23);
	v.push(25);
	v.push(27);
	v.push(29);
	v.push(31);
	console.log(v.getElemAtIndex(1));
	console.log(v.elements);
	console.log("SIZE: " + v.size());
	v.remove(1, 1);
	console.log(v.elements);
	console.log("SIZE: " + v.size());
	v.push(33);
	console.log(v.elements);
	console.log("SIZE: " + v.size());
	v.remove(5, 8);
	console.log(v.elements);
	console.log("SIZE: " + v.size());
}
