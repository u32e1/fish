# @u32e1/fish

A simple AES-128 encryption library.

## Usage

```typescript
const fish = new Fish('A_SUPER_SAFE_STRING');
const text = 'Hello, World';

const encrypted = fish.encrypt(text); // 8675c1590eea19c0feaad4d3
const decrypted = fish.decrypt(encrypted); // Hello, World
```
