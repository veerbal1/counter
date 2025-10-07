use anchor_lang::prelude::*;

declare_id!("EWV8Q3PXyaHQUBW3D7GexkUX2rb7v6xrQKwizpJKJPLF");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.bump = ctx.bumps.counter;
        counter.count = 0;
        counter.owner = ctx.accounts.owner.key();
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        let result = counter.count.checked_sub(1);
        match result {
            Some(value) =>{
                counter.count = value
            },
            None => {
                counter.count = 0
            }
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,
              payer = owner, 
              seeds = [b"counter", owner.key().as_ref()], 
              bump, 
              space = 8 + 8 + 32 + 1)
              ]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, seeds = [b"counter", owner.key().as_ref()], bump= counter.bump, has_one = owner)]
    pub counter: Account<'info, Counter>,
    pub owner: Signer<'info>
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut, seeds = [b"counter", owner.key().as_ref()], bump= counter.bump, has_one = owner)]
    pub counter: Account<'info, Counter>,
    pub owner: Signer<'info>
}

#[account]
pub struct Counter {
    pub owner: Pubkey,
    pub count: u64,
    pub bump: u8,
}
