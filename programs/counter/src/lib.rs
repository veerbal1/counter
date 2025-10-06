use anchor_lang::prelude::*;

declare_id!("EWV8Q3PXyaHQUBW3D7GexkUX2rb7v6xrQKwizpJKJPLF");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
