import { test, assert } from 'vitest';
import { Fish } from './index';

test('Simple ASCII', () => {
	const text = 'hello world!';
	const fish = new Fish('1');

	const encrypted = fish.encrypt(text);
	assert.equal(encrypted, 'dc81d0762b52736c83b5b9c9');

	const decrypted = fish.decrypt(encrypted);
	assert.equal(decrypted, text);
});

test('Some cooler inputs', () => {
	const text = 'h㋡㋡ world';
	const fish = new Fish('1㋡㋡');

	const encrypted = fish.encrypt(text);
	assert.equal(encrypted, '70a7e0a9e3bc23bfe4a56c23b5');

	const decrypted = fish.decrypt(encrypted);
	assert.equal(decrypted, text);
});

test('Different seeds', () => {
	const text = 'hello world!';
	const password = '1';
	const fish1 = new Fish(password);
	const fish2 = new Fish(password, { seed: 500 });

	const encrypted1 = fish1.encrypt(text);
	assert.equal(encrypted1, 'dc81d0762b52736c83b5b9c9');

	const encrypted2 = fish2.encrypt(text);
	assert.equal(encrypted2, 'ded821d860a5cd11581de7ce');

	const decrypted1 = fish1.decrypt(encrypted1);
	assert.equal(decrypted1, text);

	const decrypted2 = fish2.decrypt(encrypted2);
	assert.equal(decrypted2, text);
});

test('A lot of text', () => {
	const text = 'hello world!'.repeat(1e4);
	const fish = new Fish('1234567890'.repeat(1e4));

	const encrypted = fish.encrypt(text);
	const decrypted = fish.decrypt(encrypted);
	assert.equal(decrypted, text);
});
