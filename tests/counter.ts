import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter.js";
import { expect } from "chai";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";

describe("counter", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.counter as Program<Counter>;

  const provider = anchor.AnchorProvider.env();
  const [counterPDA, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), provider.publicKey.toBuffer()],
    program.programId
  );

  it("should initialize the counter", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        owner: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Initialize tx:", tx);

    // Fetch the counter account to verify
    const counterAccount = await program.account.counter.fetch(counterPDA);

    // Assertions
    expect(counterAccount.owner.toString()).to.equal(
      provider.publicKey.toString()
    );
    expect(counterAccount.count.toNumber()).to.equal(0);
    expect(counterAccount.bump).to.equal(bump);

    console.log("Counter initialized:", {
      owner: counterAccount.owner.toString(),
      count: counterAccount.count.toNumber(),
      bump: counterAccount.bump,
    });
  });

  it("should increment the counter", async () => {
    await reset({ program, counterPDA, provider });
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterPDA,
        owner: provider.publicKey,
      })
      .rpc();
    console.log("Increment tx:", tx);

    const counterAccount = await program.account.counter.fetch(counterPDA);
    expect(counterAccount.count.toNumber()).to.equal(1);
    expect(counterAccount.bump).to.equal(bump);

    console.log("Counter incremented:", {
      owner: counterAccount.owner.toString(),
      count: counterAccount.count.toNumber(),
      bump: counterAccount.bump,
    });
  });

  it("should decrement the counter", async () => {
    await reset({ program, counterPDA, provider });

    const tx1 = await program.methods
      .increment()
      .accounts({
        counter: counterPDA,
        owner: provider.publicKey,
      })
      .rpc();
    console.log("Increment tx:", tx1);

    const tx2 = await program.methods
      .decrement()
      .accounts({
        counter: counterPDA,
        owner: provider.publicKey,
      })
      .rpc();
    console.log("Decrement tx:", tx2);

    const counterAccount = await program.account.counter.fetch(counterPDA);
    expect(counterAccount.count.toNumber()).to.equal(0);
    expect(counterAccount.bump).to.equal(bump);

    console.log("Counter decremented:", {
      owner: counterAccount.owner.toString(),
      count: counterAccount.count.toNumber(),
      bump: counterAccount.bump,
    });
  });

  it("should close the counter account", async () => {
    const tx = await program.methods
      .close()
      .accounts({
        counter: counterPDA,
        owner: provider.publicKey,
      })
      .rpc();
    console.log("Close tx:", tx);

    // Verify the account is closed by trying to fetch it
    try {
      await program.account.counter.fetch(counterPDA);
      throw new Error("Account should be closed");
    } catch (error) {
      expect(error.message).to.include("Account does not exist");
      console.log("Counter account successfully closed");
    }
  });

  it("should reinitialize the counter after closing", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        owner: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Reinitialize tx:", tx);

    // Fetch the counter account to verify
    const counterAccount = await program.account.counter.fetch(counterPDA);

    // Assertions
    expect(counterAccount.owner.toString()).to.equal(
      provider.publicKey.toString()
    );
    expect(counterAccount.count.toNumber()).to.equal(0);
    expect(counterAccount.bump).to.equal(bump);

    console.log("Counter reinitialized:", {
      owner: counterAccount.owner.toString(),
      count: counterAccount.count.toNumber(),
      bump: counterAccount.bump,
    });
  });
});

const reset = async ({
  program,
  counterPDA,
  provider,
}: {
  program: Program<Counter>;
  counterPDA: PublicKey;
  provider: AnchorProvider;
}) => {
  console.log("Resetting counter...");
  const tx = await program.methods
    .reset()
    .accounts({
      counter: counterPDA,
      owner: provider.publicKey,
    })
    .rpc();
  console.log("Reset tx:", tx);
};
