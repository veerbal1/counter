# 🚀 Counter Program - Day 1

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

- **Initialize Counter**: Create a new counter account starting at 0
- **Increment**: Increase the counter value by 1
- **Decrement**: Decrease the counter value by 1 (with underflow protection)
- **Error Handling**: Prevents counter from going below zero
- **Comprehensive Tests**: Full test suite with multiple scenarios

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
- Creates a new counter account
- Initializes count to 0
- Requires user signature and pays for account creation

```rust
pub fn increment(ctx: Context<Change>) -> Result<()>
```
- Increments counter by 1
- Requires mutable counter account

```rust
pub fn decrement(ctx: Context<Change>) -> Result<()>
```
- Decrements counter by 1
- Includes underflow protection
- Returns error if count is already 0

### Account Structure

```rust
pub struct Counter {
    pub count: u64,
}
```
- Single field storing a 64-bit unsigned integer
- Account space: 8 bytes (discriminator) + 8 bytes (count)

### Error Handling

```rust
pub enum ErrorCode {
    #[msg("Cannot decrement below zero")]
    CounterUnderflow,
}
```

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

✅ **Initialize Test**: Verifies counter starts at 0  
✅ **Increment Test**: Confirms counter increases by 1  
✅ **Decrement Test**: Confirms counter decreases by 1  
✅ **Multiple Increments**: Tests consecutive operations  
✅ **Underflow Protection**: (Implicit) Prevents negative values  

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

---

## 🤝 Skills Demonstrated

- ✅ Rust programming
- ✅ Blockchain smart contract development
- ✅ Anchor framework proficiency
- ✅ Test-driven development (TDD)
- ✅ Error handling and validation
- ✅ TypeScript integration
- ✅ Solana CLI operations

---

## 📝 Notes

This is a learning project created on **Day 1** of my Solana development journey. The code is intentionally simple to focus on understanding core concepts before moving to more complex patterns.

**Program ID**: `EWV8Q3PXyaHQUBW3D7GexkUX2rb7v6xrQKwizpJKJPLF`

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

*Day 1 of my blockchain development journey*

</div>

