use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey::Pubkey;

pub fn is_valid_contributor(contributor: &Pubkey) -> bool {
    // Add logic to validate contributor (e.g., check if they are whitelisted)
    // For now, we will just return true
    true
}

pub fn calculate_fee(amount: u64) -> u64 {
    // Calculate a fee (e.g., 5% of the contribution)
    (amount * 5) / 100
}

pub fn log_contribution(contributor: &Pubkey, amount: u64) {
    // Log the contribution details (this could be to an external logging service)
    msg!("Contributor: {:?}, Amount: {}", contributor, amount);
}
