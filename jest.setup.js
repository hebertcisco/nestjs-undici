const { Blob, File } = require('node:buffer');
const { toUSVString } = require('node:util');

if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = Blob;
}

if (typeof globalThis.File === 'undefined') {
  globalThis.File = File;
}

if (typeof String.prototype.toWellFormed === 'undefined') {
  String.prototype.toWellFormed = function toWellFormed() {
    return toUSVString(this);
  };
}

if (typeof String.prototype.isWellFormed === 'undefined') {
  String.prototype.isWellFormed = function isWellFormed() {
    return toUSVString(this) === this.toString();
  };
}
