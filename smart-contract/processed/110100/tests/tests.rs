use mint_wizard::{ContractBalanceOfQueryParams, ContractBalanceOfQueryResponse, *};
use concordium_cis2::*;
use concordium_smart_contract_testing::*;
use concordium_std::{
    collections::BTreeMap, AccountSignatures, CredentialSignatures, HashSha2256,
    SignatureEd25519, Timestamp,
};
use concordium_std_derive::*;

/// The tests accounts.
const ALICE: AccountAddress =
    account_address!("2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3");
const ALICE_ADDR: Address = Address::Account(ALICE);
const BOB: AccountAddress = account_address!("2xBpaHottqhwFZURMZW4uZduQvpxNDSy46iXMYs9kceNGaPpZX");
const BOB_ADDR: Address = Address::Account(BOB);

const UPGRADER: AccountAddress =
    account_address!("2xdTv8awN1BjgYEw8W1BVXVtiEwG2b29U8KoZQqJrDuEqddseE");
const UPGRADER_ADDR: Address = Address::Account(UPGRADER);
const PAUSER: AccountAddress =
    account_address!("2yWkbp92JL9LYVmxgP1QfTDsJs9sMLAWJBYMy8md3SQz5ErzEd");
const PAUSER_ADDR: Address = Address::Account(PAUSER);


/// Token IDs.
const TOKEN_0: ContractTokenId = TokenIdU8(2);
const TOKEN_1: ContractTokenId = TokenIdU8(42);

const TOKEN_0_METADATA: &str = "https://some.example/token/2A";
const TOKEN_1_METADATA: &str = "https://some.example/token/3F";

/// Initial balance of the accounts.
const ACC_INITIAL_BALANCE: Amount = Amount::from_ccd(10000);

/// A signer with one key.
const SIGNER: Signer = Signer::with_one_key();




/// Test minting succeeds and the tokens are owned by the given address and
/// the appropriate events are logged.
#[test]
fn test_minting() {
    let (mut chain, _keypairs, contract_address, _module_reference) =
        initialize_chain_and_contract();

    let token_params = TokenParams {
        amount: TokenAmountU64(100),
        max_supply: TokenAmountU64(1000),
    };

    let mut mint_tokens = BTreeMap::new();
    mint_tokens.insert(TOKEN_1, (
        MetadataUrl {
            url:  TOKEN_1_METADATA.to_string(),
            hash: None,
        }, token_params
    ));

    let mint_params = MintParams {
        owner:      ALICE_ADDR,
        tokens:     mint_tokens,
    };

    // Mint TOKEN_1 to Alice as the owner.
    let update = chain
        .contract_update(SIGNER, ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.mint".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&mint_params).expect("Mint params"),
        })
        .expect("Mint tokens");

    // Invoke the view entrypoint and check that the tokens are owned by Alice.
    let invoke = chain
        .contract_invoke(ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.view".to_string()),
            address:      contract_address,
            message:      OwnedParameter::empty(),
        })
        .expect("Invoke view");

    // Check that the tokens are owned by Alice.
    let rv: ViewState = invoke.parse_return_value().expect("ViewState return value");
    assert_eq!(rv.tokens[..], [TOKEN_0, TOKEN_1]);
    assert_eq!(rv.state, vec![(ALICE_ADDR, ViewAddressState {
        balances:  vec![(TOKEN_0, 100.into()), (TOKEN_1, 200.into())],
        operators: Vec::new(),
    })]);

    // Check that the events are logged.
    let events = update.events().flat_map(|(_addr, events)| events);

    let events: Vec<Cis2Event<ContractTokenId, ContractTokenAmount>> =
        events.map(|e| e.parse().expect("Deserialize event")).collect();

    assert_eq!(events, [
        Cis2Event::Mint(MintEvent {
            token_id: TOKEN_1,
            amount:   TokenAmountU64(100),
            owner:    ALICE_ADDR,
        }),
        Cis2Event::TokenMetadata(TokenMetadataEvent {
            token_id:     TOKEN_1,
            metadata_url: MetadataUrl {
                url:  "https://some.example/token/3F".to_string(),
                hash: None,
            },
        }),
    ]);
}


/// Test regular transfer where sender is the owner.
#[test]
fn test_account_transfer() {
    let (mut chain, _keypairs, contract_address, _module_reference) =
        initialize_chain_and_contract();

    // Transfer one token from Alice to Bob.
    let transfer_params = TransferParams::from(vec![concordium_cis2::Transfer {
        from:     ALICE_ADDR,
        to:       Receiver::Account(BOB),
        token_id: TOKEN_0,
        amount:   TokenAmountU64(1),
        data:     AdditionalData::empty(),
    }]);

    let update = chain
        .contract_update(SIGNER, ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.transfer".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&transfer_params).expect("Transfer params"),
        })
        .expect("Transfer tokens");

    // Check that Bob has 1 `TOKEN_0` and Alice has 99. Also check that Alice still
    // has 100 `TOKEN_1`.
    let invoke = chain
        .contract_invoke(ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.view".to_string()),
            address:      contract_address,
            message:      OwnedParameter::empty(),
        })
        .expect("Invoke view");
    let rv: ViewState = invoke.parse_return_value().expect("ViewState return value");
    assert_eq!(rv.state, vec![
        (ALICE_ADDR, ViewAddressState {
            balances:  vec![(TOKEN_0, 99.into()), (TOKEN_1, 100.into())],
            operators: Vec::new(),
        }),
        (BOB_ADDR, ViewAddressState {
            balances:  vec![(TOKEN_0, 1.into())],
            operators: Vec::new(),
        }),
    ]);

    // Check that the events are logged.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Cis2Event<_, _>>>();

    assert_eq!(events, [Cis2Event::Transfer(TransferEvent {
        token_id: TOKEN_0,
        amount:   TokenAmountU64(1),
        from:     ALICE_ADDR,
        to:       BOB_ADDR,
    }),]);
}

/// Test that you can add an operator.
/// Initialize the contract with two tokens owned by Alice.
/// Then add Bob as an operator for Alice.
#[test]
fn test_add_operator() {
    let (mut chain, _keypairs, contract_address, _module_reference) =
        initialize_chain_and_contract();

    // Add Bob as an operator for Alice.
    let params = UpdateOperatorParams(vec![UpdateOperator {
        update:   OperatorUpdate::Add,
        operator: BOB_ADDR,
    }]);

    let update = chain
        .contract_update(SIGNER, ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.updateOperator".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&params).expect("UpdateOperator params"),
        })
        .expect("Update operator");

    // Check that an operator event occurred.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Cis2Event<ContractTokenId, ContractTokenAmount>>>();
    assert_eq!(events, [Cis2Event::UpdateOperator(UpdateOperatorEvent {
        operator: BOB_ADDR,
        owner:    ALICE_ADDR,
        update:   OperatorUpdate::Add,
    }),]);

    // Construct a query parameter to check whether Bob is an operator for Alice.
    let query_params = OperatorOfQueryParams {
        queries: vec![OperatorOfQuery {
            owner:   ALICE_ADDR,
            address: BOB_ADDR,
        }],
    };

    // Invoke the operatorOf entrypoint and check that Bob is an operator for
    // Alice.
    let invoke = chain
        .contract_invoke(ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.operatorOf".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&query_params).expect("OperatorOf params"),
        })
        .expect("Invoke opeatorOf");

    let rv: OperatorOfQueryResponse = invoke.parse_return_value().expect("OperatorOf return value");
    assert_eq!(rv, OperatorOfQueryResponse(vec![true]));
}

/// Test that a transfer fails when the sender is neither an operator or the
/// owner. In particular, Bob will attempt to transfer some of Alice's tokens to
/// himself.
#[test]
fn test_unauthorized_sender() {
    let (mut chain, _keypairs, contract_address, _module_reference) =
        initialize_chain_and_contract();

    // Construct a transfer of `TOKEN_0` from Alice to Bob, which will be submitted
    // by Bob.
    let transfer_params = TransferParams::from(vec![concordium_cis2::Transfer {
        from:     ALICE_ADDR,
        to:       Receiver::Account(BOB),
        token_id: TOKEN_0,
        amount:   TokenAmountU64(1),
        data:     AdditionalData::empty(),
    }]);

    // Notice that Bob is the sender/invoker.
    let update = chain
        .contract_update(SIGNER, BOB, BOB_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.transfer".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&transfer_params).expect("Transfer params"),
        })
        .expect_err("Transfer tokens");

    // Check that the correct error is returned.
    let rv: ContractError = update.parse_return_value().expect("ContractError return value");
    assert_eq!(rv, ContractError::Unauthorized);
}

/// Test that an operator can make a transfer.
#[test]
fn test_operator_can_transfer() {
    let (mut chain, _keypairs, contract_address, _module_reference) =
        initialize_chain_and_contract();

    // Add Bob as an operator for Alice.
    let params = UpdateOperatorParams(vec![UpdateOperator {
        update:   OperatorUpdate::Add,
        operator: BOB_ADDR,
    }]);
    chain
        .contract_update(SIGNER, ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.updateOperator".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&params).expect("UpdateOperator params"),
        })
        .expect("Update operator");

    // Let Bob make a transfer to himself on behalf of Alice.
    let transfer_params = TransferParams::from(vec![concordium_cis2::Transfer {
        from:     ALICE_ADDR,
        to:       Receiver::Account(BOB),
        token_id: TOKEN_0,
        amount:   TokenAmountU64(1),
        data:     AdditionalData::empty(),
    }]);

    chain
        .contract_update(SIGNER, BOB, BOB_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.transfer".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&transfer_params).expect("Transfer params"),
        })
        .expect("Transfer tokens");

    // Check that Bob now has 1 of `TOKEN_0` and Alice has 99. Also check that
    // Alice still has 100 `TOKEN_1`.
    let invoke = chain
        .contract_invoke(ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.view".to_string()),
            address:      contract_address,
            message:      OwnedParameter::empty(),
        })
        .expect("Invoke view");
    let rv: ViewState = invoke.parse_return_value().expect("ViewState return value");
    assert_eq!(rv.state, vec![
        (ALICE_ADDR, ViewAddressState {
            balances:  vec![(TOKEN_0, 99.into()), (TOKEN_1, 100.into())],
            operators: vec![BOB_ADDR],
        }),
        (BOB_ADDR, ViewAddressState {
            balances:  vec![(TOKEN_0, 1.into())],
            operators: Vec::new(),
        }),
    ]);
}




/// Test burning tokens.
#[test]
fn test_burning_tokens() {
    let (mut chain, _keypairs, contract_address, _module_reference) =
        initialize_chain_and_contract();

    // Create input parameters to burn one of Alice's tokens.
    let burn_params = BurnParams {
        owner:    ALICE_ADDR,
        amount:   TokenAmountU64(1),
        token_id: TOKEN_1,
    };

    // Burn one of Alice's tokens.
    let update = chain
        .contract_update(
            Signer::with_one_key(),
            ALICE,
            ALICE_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      contract_address,
                receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.burn".to_string()),
                message:      OwnedParameter::from_serial(&burn_params)
                    .expect("Should be a valid inut parameter"),
            },
        )
        .expect("Should be able to burn tokens");

    // Check that the event is logged.
    let events = update.events().flat_map(|(_addr, events)| events);

    let events: Vec<Cis2Event<ContractTokenId, ContractTokenAmount>> =
        events.map(|e| e.parse().expect("Deserialize event")).collect();

    assert_eq!(events, [Cis2Event::Burn(BurnEvent {
        owner:    ALICE_ADDR,
        amount:   TokenAmountU64(1),
        token_id: TOKEN_1,
    })]);

    // Check balances in state.
    let balance_of_alice_and_bob = get_balances(&chain, contract_address);

    assert_eq!(balance_of_alice_and_bob.0, [TokenAmountU64(99), TokenAmountU64(0)]);
}









/// Get the `TOKEN_1` balances for Alice and Bob.
fn get_balances(
    chain: &Chain,
    contract_address: ContractAddress,
) -> ContractBalanceOfQueryResponse {
    let balance_of_params = ContractBalanceOfQueryParams {
        queries: vec![
            BalanceOfQuery {
                token_id: TOKEN_1,
                address:  ALICE_ADDR,
            },
            BalanceOfQuery {
                token_id: TOKEN_1,
                address:  BOB_ADDR,
            },
        ],
    };

    let invoke = chain
        .contract_invoke(ALICE, ALICE_ADDR, Energy::from(10000), UpdateContractPayload {
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("mint_wizard_110100_V3.balanceOf".to_string()),
            address:      contract_address,
            message:      OwnedParameter::from_serial(&balance_of_params)
                .expect("BalanceOf params"),
        })
        .expect("Invoke balanceOf");
    let rv: ContractBalanceOfQueryResponse =
        invoke.parse_return_value().expect("BalanceOf return value");
    rv
}


/// Setup chain and contract.
fn initialize_chain_and_contract() -> (Chain, AccountKeys, ContractAddress, ModuleReference) {
    let mut chain = Chain::new();

    let rng = &mut rand::thread_rng();

    let keypairs = AccountKeys::singleton(rng);

    let balance = AccountBalance {
        total:  ACC_INITIAL_BALANCE,
        staked: Amount::zero(),
        locked: Amount::zero(),
    };

    // Create some accounts on the chain.
    chain.create_account(Account::new_with_keys(ALICE, balance, (&keypairs).into()));
    chain.create_account(Account::new(BOB, ACC_INITIAL_BALANCE));
    
    chain.create_account(Account::new(UPGRADER, ACC_INITIAL_BALANCE));
    chain.create_account(Account::new(PAUSER, ACC_INITIAL_BALANCE));
    

    // Load and deploy the module.
    let module = module_load_v1("dist/module.wasm.v1").expect("Module exists");
    let deployment = chain.module_deploy_v1(SIGNER, ALICE, module).expect("Deploy valid module");

    // Init the contract
    let token_params = TokenParams {
        amount: TokenAmountU64(100),
        max_supply: TokenAmountU64(1000),
    };

    let mut premint_tokens = BTreeMap::new();
    premint_tokens.insert(TOKEN_0, (
        MetadataUrl {
            url:  TOKEN_0_METADATA.to_string(),
            hash: None,
        }, token_params
    ));

    let token_params = TokenParams {
        amount: TokenAmountU64(100),
        max_supply: TokenAmountU64(1000),
    };

    premint_tokens.insert(TOKEN_1, (
        MetadataUrl {
            url:  TOKEN_1_METADATA.to_string(),
            hash: None,
        }, token_params
    ));

    let init_params = InitParams {
        premint_tokens: premint_tokens,
    };

    let init = chain
        .contract_init(SIGNER, ALICE, Energy::from(10000), InitContractPayload {
            amount:    Amount::zero(),
            mod_ref:   deployment.module_reference,
            init_name: OwnedContractName::new_unchecked("init_mint_wizard_110100_V3".to_string()),
            param:     OwnedParameter::from_serial(&init_params).expect("Init params"),
        })
        .expect("Initialize contract");

    
    
    
    

    (chain, keypairs, init.contract_address, deployment.module_reference)
}