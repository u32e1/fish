import * as aesjs from 'aes-js';
import { MurmurHash3_x86_128 } from './hashes';

export interface FishOptions {
	seed?: number;
}

export class Fish {
	private key: Uint8Array;

	constructor(password: string, options: FishOptions = {}) {
		this.key = new Uint8Array(
			MurmurHash3_x86_128(password, options.seed)
				.map((h) => h.toString())
				.reduce(
					(hs, h) => [
						...hs,
						...h
							.slice(0, 8)
							.split('')
							.map((v) => parseInt(v)),
					],
					[],
				),
		);
	}

	public encrypt(text: string): string {
		const ctr = new aesjs.ModeOfOperation.ctr(this.key);

		return aesjs.utils.hex.fromBytes(
			ctr.encrypt(aesjs.utils.utf8.toBytes(text)),
		);
	}

	public decrypt(encryptedHex: string) {
		const ctr = new aesjs.ModeOfOperation.ctr(this.key);

		return aesjs.utils.utf8.fromBytes(
			ctr.decrypt(aesjs.utils.hex.toBytes(encryptedHex)),
		);
	}
}
