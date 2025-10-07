# 🚀 Counter Program - Day 3

> **Solana Learning Journey**: Building my first smart contract with Anchor Framework

<div align="center">

![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 📖 Overview

This is my first Solana smart contract built using the Anchor framework. It's a simple yet comprehensive counter program that demonstrates fundamental concepts of blockchain development on Solana.

**Project Goal**: Learn and showcase blockchain development skills by building a production-ready smart contract with proper testing and error handling.

---

## ✨ Features

- **Initialize Counter**: Create a new counter account starting at 0 with PDA-based addressing
- **Increment**: Increase the counter value by 1
- **Decrement**: Decrease the counter value by 1 (with underflow protection using `checked_sub`)
- **Reset**: Reset the counter back to 0
- **Close Account**: Close the counter account and reclaim rent
- **Owner Validation**: Only the owner can modify their counter
- **Comprehensive Tests**: Full test suite with account lifecycle management

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Rust** | Smart contract programming language |
| **Anchor Framework** | Solana development framework |
| **TypeScript** | Testing and client interaction |
| **Mocha & Chai** | Testing framework |
| **Solana Web3.js** | Blockchain interaction library |

---

## 📁 Project Structure

```
counter/
├── programs/
│   └── counter/
│       └── src/
│           └── lib.rs          # Main smart contract
├── tests/
│   └── counter.ts              # Test suite
├── target/
│   ├── deploy/                 # Compiled program
│   ├── idl/                    # Interface Definition Language
│   └── types/                  # TypeScript types
├── Anchor.toml                 # Anchor configuration
└── Cargo.toml                  # Rust dependencies
```

---

## 🎯 Smart Contract Details

### Program Instructions

```rust
pub fn initialize(ctx: Context<Initialize>) -> Result<()>
```
- Creates a new counter account using PDAs (Program Derived Addresses)
- Initializes count to 0, stores owner and bump seed
- Uses seeds: `["counter", owner.key()]`
- Requires user signature and pays for account creation

```rust
pub fn increment(ctx: Context<Increment>) -> Result<()>
```
- Increments counter by 1
- Validates owner using `has_one` constraint
- Requires mutable counter account

```rust
pub fn decrement(ctx: Context<Decrement>) -> Result<()>
```
- Decrements counter by 1
- Uses `checked_sub()` for safe underflow handling
- Sets to 0 if already at 0 (no error thrown)
- Validates owner using `has_one` constraint

```rust
pub fn reset(ctx: Context<Decrement>) -> Result<()>
```
- Resets counter to 0
- Useful for test cleanup and user resets
- Validates owner using `has_one` constraint

```rust
pub fn close(ctx: Context<Close>) -> Result<()>
```
- Closes the counter account
- Returns rent to the owner
- Uses `close = owner` constraint for automatic rent reclamation

### Account Structure

```rust
pub struct Counter {
    pub owner: Pubkey,  // 32 bytes
    pub count: u64,     // 8 bytes
    pub bump: u8,       // 1 byte
}
```
- **owner**: Stores the public key of the counter owner
- **count**: 64-bit unsigned integer for the counter value
- **bump**: PDA bump seed for efficient account derivation
- **Account space**: 8 bytes (discriminator) + 32 + 8 + 1 = 49 bytes

### Error Handling

Day 3 refactored error handling to use Rust's safe arithmetic:
```rust
let result = counter.count.checked_sub(1);
match result {
    Some(value) => { counter.count = value },
    None => { counter.count = 0 }  // Graceful handling instead of panic
}
```
- Removed custom `CounterUnderflow` error
- Uses `checked_sub()` for safe subtraction
- Gracefully sets to 0 on underflow instead of throwing error

---

## 🚀 Getting Started

### Prerequisites

- **Rust** (v1.70+): [Install Rust](https://rustup.rs/)
- **Solana CLI** (v1.18+): [Install Solana](https://docs.solana.com/cli/install-solana-cli-tools)
- **Anchor CLI** (v0.31+): [Install Anchor](https://www.anchor-lang.com/docs/installation)
- **Node.js** (v18+): [Install Node](https://nodejs.org/)
- **Yarn**: `npm install -g yarn`

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd counter
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Build the program**
   ```bash
   anchor build
   ```

4. **Configure Solana for local development**
   ```bash
   solana config set --url localhost
   ```

5. **Start local validator**
   ```bash
   solana-test-validator
   ```

6. **Deploy the program**
   ```bash
   anchor deploy
   ```

---

## 🧪 Testing

### Run All Tests
```bash
anchor test
```

### Run Tests with Local Validator
```bash
anchor test --skip-local-validator
```

### Test Coverage

✅ **Initialize Test**: Verifies counter starts at 0 with correct owner and bump
✅ **Increment Test**: Confirms counter increases by 1 (with reset)
✅ **Decrement Test**: Confirms counter decreases by 1 (with reset)
✅ **Close Account Test**: Verifies account closure and rent reclamation
✅ **Reinitialize Test**: Confirms account can be recreated after closing
✅ **Reset Helper**: Utility function for test isolation  

---

## 📚 What I Learned

### Day 1 Takeaways

1. **Anchor Framework Basics**
   - Program structure and organization
   - Account validation with `#[derive(Accounts)]`
   - Context pattern for instruction handlers

2. **Solana Account Model**
   - Accounts store data on the blockchain
   - Space calculation for account initialization
   - Rent exemption requirements

3. **Error Handling**
   - Custom error codes with descriptive messages
   - Using `require!` macro for validation
   - Preventing common vulnerabilities (underflow)

4. **Testing on Solana**
   - Setting up Anchor testing environment
   - Generating keypairs for accounts
   - Fetching and verifying on-chain data
   - Transaction signatures and confirmations

5. **Best Practices**
   - Proper account validation
   - Mutable vs immutable accounts
   - Signer requirements for security
   - Payer designation for account creation

### Day 2 Enhancements

1. **Program Derived Addresses (PDAs)**
   - Deterministic account addresses using seeds
   - `seeds = [b"counter", owner.key().as_ref()]`
   - Storing and using bump seeds for efficiency
   - No need for separate keypair generation

2. **Owner Management**
   - Added `owner` field to Counter struct
   - `has_one = owner` constraint for validation
   - Per-user counter isolation using PDAs

3. **Context Separation**
   - Renamed `Change` to `Increment` and `Decrement`
   - More explicit and self-documenting code
   - Better type safety and intent clarity

### Day 3 Advanced Features

1. **Safe Arithmetic in Rust**
   - `checked_sub()` for overflow/underflow protection
   - Pattern matching on `Option<T>` results
   - Graceful error handling vs panicking
   - Removed dependency on custom error types

2. **Account Lifecycle Management**
   - `close = owner` constraint for account closure
   - Automatic rent reclamation to owner
   - Account reinitialization after closing
   - Resource cleanup best practices

3. **Reset Functionality**
   - Reusable context for similar operations
   - Test isolation with helper functions
   - State management between tests

4. **Advanced Testing Patterns**
   - Helper functions for test setup (`reset()`)
   - Testing account closure with error validation
   - Testing full lifecycle: init → use → close → reinit
   - Proper test isolation to prevent flaky tests

---

## 🤝 Skills Demonstrated

- ✅ Rust programming with safe arithmetic
- ✅ Blockchain smart contract development
- ✅ Anchor framework proficiency
- ✅ Program Derived Addresses (PDAs)
- ✅ Account lifecycle management (init, close, reinit)
- ✅ Test-driven development (TDD)
- ✅ Error handling and validation
- ✅ TypeScript integration
- ✅ Solana CLI operations
- ✅ Test isolation and helper patterns

---

## 📝 Notes

This is a learning project tracking my Solana development journey:
- **Day 1**: Basic counter with increment/decrement
- **Day 2**: Added PDAs, owner management, and better structure
- **Day 3**: Added reset/close functionality, safe arithmetic, and advanced testing

The program has evolved from a simple counter to a production-ready smart contract with proper resource management and security patterns.

**Current Program ID**: `HRg4xDkNsQ2AT61zQcWedJUkoEVRKjoejipS9YErj9XM`

---

## 📄 License

ISC

---

## 🔗 Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Developer Docs](https://docs.solana.com/)
- [Rust Book](https://doc.rust-lang.org/book/)

---

<div align="center">

**Built with ❤️ while learning Solana**

*Day 3 of my blockchain development journey*

</div>

