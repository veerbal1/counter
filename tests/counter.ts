import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { expect } from "chai";

describe("counter", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.counter as Program<Counter>;

  const provider = anchor.AnchorProvider.env();
  const counterAccount = anchor.web3.Keypair.generate();

  it("Initialize the counter", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counterAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterAccount])
      .rpc();

    console.log("✅ Transaction signature:", tx);

    const account = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter value:", account.count.toString());
    expect(account.count.toNumber()).to.equal(0);
    console.log("✅ Counter initialized successfully");
  });

  it("Increment the counter", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();
    console.log("✅ Transaction signature:", tx);

    const account = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter value:", account.count.toString());
    expect(account.count.toNumber()).to.equal(1);
    console.log("✅ Counter incremented successfully");
  });

  it("Decrement the COunter", async () => {
    const tx = await program.methods
      .decrement()
      .accounts({
        counter: counterAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();
    console.log("✅ Transaction signature:", tx);

    const account = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter value:", account.count.toString());
    expect(account.count.toNumber()).to.equal(0);
    console.log("✅ Counter decremented successfully");
  });

  it("Increments the counter multiple times", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();
    console.log("✅ Transaction signature:", tx);

    const account = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter value:", account.count.toString());
    expect(account.count.toNumber()).to.equal(1);
    console.log("✅ Counter incremented successfully");

    const tx2 = await program.methods.increment().accounts({
      counter: counterAccount.publicKey,
      user: provider.wallet.publicKey,
    })
    .rpc();
    console.log("✅ Transaction signature:", tx2);
    
    const account2 = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter value:", account2.count.toString());
    expect(account2.count.toNumber()).to.equal(2);
    console.log("✅ Counter incremented successfully");

    const tx3 = await program.methods.increment().accounts({
      counter: counterAccount.publicKey,
      user: provider.wallet.publicKey,
    })
    .rpc();
    console.log("✅ Transaction signature:", tx3);

    const account3 = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter value:", account3.count.toString());
    expect(account3.count.toNumber()).to.equal(3);
    console.log("✅ Counter incremented successfully");
  });
});
