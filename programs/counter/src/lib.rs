use anchor_lang::prelude::*;

declare_id!("HRg4xDkNsQ2AT61zQcWedJUkoEVRKjoejipS9YErj9XM");

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

    pub fn reset(ctx: Context<Decrement>) -> Result<()>{
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn close(_ctx: Context<Close>) -> Result<()> {
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

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(
        mut, 
        seeds = [b"counter", owner.key().as_ref()], 
        bump = counter.bump,
        has_one = owner,
        close = owner
    )]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub owner: Signer<'info>
}

#[account]
pub struct Counter {
    pub owner: Pubkey,
    pub count: u64,
    pub bump: u8,
}
