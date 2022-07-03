"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fish = void 0;
const aesjs = require("aes-js");
const hashes_1 = require("./hashes");
class Fish {
    constructor(password, options = {}) {
        this.key = new Uint8Array((0, hashes_1.MurmurHash3_x86_128)(password, options.seed)
            .map((h) => h.toString())
            .reduce((hs, h) => [
            ...hs,
            ...h
                .slice(0, 8)
                .split('')
                .map((v) => parseInt(v)),
        ], []));
    }
    encrypt(text) {
        const ctr = new aesjs.ModeOfOperation.ctr(this.key);
        return aesjs.utils.hex.fromBytes(ctr.encrypt(aesjs.utils.utf8.toBytes(text)));
    }
    decrypt(encryptedHex) {
        const ctr = new aesjs.ModeOfOperation.ctr(this.key);
        return aesjs.utils.utf8.fromBytes(ctr.decrypt(aesjs.utils.hex.toBytes(encryptedHex)));
    }
}
exports.Fish = Fish;
