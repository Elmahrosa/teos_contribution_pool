use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_program;
use std::collections::HashMap;

declare_id!("YourProgramIDHere");

#[program]
pub mod contribution {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let contribution_account = &mut ctx.accounts.contribution_account;
        contribution_account.total_contributions = 0;
        contribution_account.contributors = HashMap::new();
        Ok(())
    }

    pub fn contribute(ctx: Context<Contribute>, amount: u64) -> ProgramResult {
        let contribution_account = &mut ctx.accounts.contribution_account;
        let contributor = &ctx.accounts.contributor;

        // Validate contribution amount
        if amount < 1 {
            return Err(ErrorCode::InvalidAmount.into());
        }

        // Transfer SOL to the program
        let cpi_accounts = system_program::Transfer {
            from: contributor.to_account_info(),
            to: ctx.accounts.treasury.to_account_info(),
        };
        let cpi_program = ctx.accounts.system_program.to_account_info();
        let ix = system_program::transfer(cpi_accounts, amount)?;
        invoke(&ix, &[contributor.to_account_info(), ctx.accounts.treasury.to_account_info(), cpi_program])?;

        // Update contribution account
        contribution_account.total_contributions += amount;
        contribution_account.contributors.insert(*contributor.key, amount);

        emit!(ContributionEvent {
            contributor: *contributor.key,
            amount,
        });

        Ok(())
    }
}

#[account]
pub struct ContributionAccount {
    pub total_contributions: u64,
    pub contributors: HashMap<Pubkey, u64>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + std::mem::size_of::<ContributionAccount>())]
    pub contribution_account: Account<'info, ContributionAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Contribute<'info> {
    #[account(mut)]
    pub contribution_account: Account<'info, ContributionAccount>,
    #[account(mut)]
    pub contributor: Signer<'info>,
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[event]
pub struct ContributionEvent {
    pub contributor: Pubkey,
    pub amount: u64,
}

#[error]
pub enum ErrorCode {
    #[msg("The contribution amount must be greater than zero.")]
    InvalidAmount,
}
