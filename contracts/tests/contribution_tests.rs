use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey::Pubkey;
use anchor_lang::solana_program::system_program;
use anchor_lang::prelude::Account;
use anchor_lang::prelude::Signer;
use anchor_lang::prelude::ProgramError;
use std::collections::HashMap;

use crate::contribution::{self, ContributionAccount};

#[cfg(test)]
mod tests {
    use super::*;
    use anchor_lang::prelude::*;
    use anchor_lang::solana_program::program::invoke;
    use anchor_lang::solana_program::system_program;
    use anchor_lang::solana_program::pubkey::Pubkey;
    use anchor_lang::solana_program::account_info::AccountInfo;
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    #[test]
    fn test_initialize() {
        let mut program_test = ProgramTest::new(
            "contribution",
            contribution::id(),
            processor!(contribution::process_instruction),
        );

        let (mut banks_client, payer, recent_blockhash) = program_test.start().await.unwrap();

        let contribution_account = Keypair::new();
        let accounts = vec![
            AccountMeta::new(payer.pubkey(), true),
            AccountMeta::new(contribution_account.pubkey(), false),
            AccountMeta::new(system_program::id(), false),
        ];

        let instruction = contribution::initialize(accounts.clone()).unwrap();

        let _ = banks_client.process_transaction(Transaction::new_signed_with_payer(
            &[instruction],
            Some(&payer.pubkey()),
            &[&payer, &contribution_account],
            recent_blockhash,
        )).await.unwrap();

        let account_data = banks_client.get_account(contribution_account.pubkey()).await.unwrap().unwrap();
        let contribution_account_data: ContributionAccount = bincode::deserialize(&account_data.data).unwrap();

        assert_eq!(contribution_account_data.total_contributions, 0);
        assert!(contribution_account_data.contributors.is_empty());
    }

    #[test]
    fn test_contribute() {
        let mut program_test = ProgramTest::new(
            "contribution",
            contribution::id(),
            processor!(contribution::process_instruction),
        );

        let (mut banks_client, payer, recent_blockhash) = program_test.start().await.unwrap();

        let contribution_account = Keypair::new();
        let contributor = Keypair::new();
        let accounts = vec![
            AccountMeta::new(payer.pubkey(), true),
            AccountMeta::new(contribution_account.pubkey(), false),
            AccountMeta::new(contributor.pubkey(), true),
            AccountMeta::new(system_program::id(), false),
        ];

        let _ = banks_client.process_transaction(Transaction::new_signed_with_payer(
            &[contribution::initialize(accounts.clone()).unwrap()],
            Some(&payer.pubkey()),
            &[&payer, &contribution_account],
            recent_blockhash,
        )).await.unwrap();

        let contribution_amount = 1000;
        let contribute_instruction = contribution::contribute(accounts.clone(), contribution_amount).unwrap();

        let _ = banks_client.process_transaction(Transaction::new_signed_with_payer(
            &[contribute_instruction],
            Some(&payer.pubkey()),
            &[&payer, &contributor],
            recent_blockhash,
        )).await.unwrap();

        let account_data = banks_client.get_account(contribution_account.pubkey()).await.unwrap().unwrap();
        let contribution_account_data: ContributionAccount = bincode::deserialize(&account_data.data).unwrap();

        assert_eq!(contribution_account_data.total_contributions, contribution_amount);
        assert_eq!(contribution_account_data.contributors.get(&contributor.pubkey()), Some(&contribution_amount));
    }

    #[test]
    fn test_invalid_contribution_amount() {
        let mut program_test = ProgramTest::new(
            "contribution",
            contribution::id(),
            processor!(contribution::process_instruction),
        );

        let (mut banks_client, payer, recent_blockhash) = program_test.start().await.unwrap();

        let contribution_account = Keypair::new();
        let contributor = Keypair::new();
        let accounts = vec![
            AccountMeta::new(payer.pubkey(), true),
            AccountMeta::new(contribution_account.pubkey(), false),
            AccountMeta::new(contributor.pubkey(), true),
            AccountMeta::new(system_program::id(), false),
        ];

        let _ = banks_client.process_transaction(Transaction::new_signed_with_payer(
            &[contribution::initialize(accounts.clone()).unwrap()],
            Some(&payer.pubkey()),
            &[&payer, &contribution_account],
            recent_blockhash,
        )).await.unwrap();

        let contribute_instruction = contribution::contribute(accounts.clone(), 0).unwrap();

        let result = banks_client.process_transaction(Transaction::new_signed_with_payer(
            &[contribute_instruction],
            Some(&payer.pubkey()),
            &[&payer, &contributor],
            recent_blockhash,
        )).await;

        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), ProgramError::Custom(0)); // InvalidAmount error
    }
}
