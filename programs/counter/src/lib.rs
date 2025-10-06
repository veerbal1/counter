use anchor_lang::prelude::*;

declare_id!("EWV8Q3PXyaHQUBW3D7GexkUX2rb7v6xrQKwizpJKJPLF");

#[error_code]
pub enum ErrorCode {
    #[msg("Cannot decrement below zero")]
    CounterUnderflow,
}

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Change>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Change>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        require!(counter.count > 0, ErrorCode::CounterUnderflow);
        counter.count -= 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Change<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>,
}

#[account]
pub struct Counter {
    pub count: u64,
}
