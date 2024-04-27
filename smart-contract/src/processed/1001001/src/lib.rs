#![cfg_attr(not(feature = "std"), no_std)]
use concordium_cis2::*;
use concordium_std::{collections::BTreeMap, EntrypointName, *};

const SUPPORTS_STANDARDS: [StandardIdentifier<'static>; 2] =
    [CIS0_STANDARD_IDENTIFIER, CIS2_STANDARD_IDENTIFIER];


const SUPPORTS_PERMIT_ENTRYPOINTS: [EntrypointName; 2] =
    [EntrypointName::new_unchecked("updateOperator"), EntrypointName::new_unchecked("transfer")];


/// Event tags.
pub const UPDATE_BLACKLIST_EVENT_TAG: u8 = 0;
pub const GRANT_ROLE_EVENT_TAG: u8 = 1;
pub const REVOKE_ROLE_EVENT_TAG: u8 = 2;
pub const NONCE_EVENT_TAG: u8 = 250;

const TRANSFER_ENTRYPOINT: EntrypointName<'_> = EntrypointName::new_unchecked("transfer");
const UPDATE_OPERATOR_ENTRYPOINT: EntrypointName<'_> =
    EntrypointName::new_unchecked("updateOperator");

const MINT_ENTRYPOINT: EntrypointName<'_> = EntrypointName::new_unchecked("mint");



#[derive(Debug, Serial, Deserial, PartialEq, Eq)]
#[concordium(repr(u8))]
pub enum Event {
    #[concordium(tag = 0)]
    UpdateBlacklist(UpdateBlacklistEvent),
    
    
    /// Cis3 event.
    /// The event tracks the nonce used by the signer of the `PermitMessage`
    /// whenever the `permit` function is invoked.
    #[concordium(tag = 250)]
    Nonce(NonceEvent),
    
    /// Cis2 token events.
    #[concordium(forward = cis2_events)]
    Cis2Event(Cis2Event<ContractTokenId, ContractTokenAmount>),
}


#[derive(Debug, Serialize, SchemaType, PartialEq, Eq)]
pub struct NonceEvent {
    pub account: AccountAddress,
    pub nonce:   u64,
}


#[derive(Debug, Serialize, SchemaType, PartialEq, Eq)]
pub struct UpdateBlacklistEvent {
    pub update:  BlacklistUpdate,
    pub address: Address,
}



impl schema::SchemaType for Event {
    fn get_type() -> schema::Type {
        let mut event_map = BTreeMap::new();
        
        event_map.insert(
            NONCE_EVENT_TAG,
            (
                "Nonce".to_string(),
                schema::Fields::Named(vec![
                    (String::from("account"), AccountAddress::get_type()),
                    (String::from("nonce"), u64::get_type()),
                ]),
            ),
        );
        
        
        event_map.insert(
            UPDATE_BLACKLIST_EVENT_TAG,
            (
                "UpdateBlacklist".to_string(),
                schema::Fields::Named(vec![
                    (String::from("update"), BlacklistUpdate::get_type()),
                    (String::from("address"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            TRANSFER_EVENT_TAG,
            (
                "Transfer".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("from"), Address::get_type()),
                    (String::from("to"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            MINT_EVENT_TAG,
            (
                "Mint".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        
        event_map.insert(
            UPDATE_OPERATOR_EVENT_TAG,
            (
                "UpdateOperator".to_string(),
                schema::Fields::Named(vec![
                    (String::from("update"), OperatorUpdate::get_type()),
                    (String::from("owner"), Address::get_type()),
                    (String::from("operator"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            TOKEN_METADATA_EVENT_TAG,
            (
                "TokenMetadata".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("metadata_url"), MetadataUrl::get_type()),
                ]),
            ),
        );
        schema::Type::TaggedEnum(event_map)
    }
}

// Types

pub type ContractTokenId = TokenIdU8;

pub type ContractTokenAmount = TokenAmountU64;

#[derive(Serial, Deserial, SchemaType)]
pub struct TokenParams {
    amount: TokenAmountU64,
    max_supply: ContractTokenAmount,
}

#[derive(Serialize, SchemaType)]
pub struct InitParams {
    pub premint_tokens: collections::BTreeMap<ContractTokenId, (MetadataUrl, TokenParams)>,
}


#[derive(Serialize, SchemaType)]
pub struct MintParams {
    pub owner:          Address,
    pub tokens:         collections::BTreeMap<ContractTokenId, (MetadataUrl, TokenParams)>,
}





#[derive(Debug, Serialize, SchemaType)]
pub struct SupportsPermitQueryParams {
    #[concordium(size_length = 2)]
    pub queries: Vec<OwnedEntrypointName>,
}


#[derive(Debug, Serialize, SchemaType)]
struct SetImplementorsParams {
    id:           StandardIdentifierOwned,
    /// The addresses of the implementors of the standard.
    implementors: Vec<ContractAddress>,
}


#[derive(SchemaType, Serialize)]
pub struct PermitMessage {
    /// The contract_address that the signature is intended for.
    pub contract_address: ContractAddress,
    /// A nonce to prevent replay attacks.
    pub nonce:            u64,
    /// A timestamp to make signatures expire.
    pub timestamp:        Timestamp,
    /// The entry_point that the signature is intended for.
    pub entry_point:      OwnedEntrypointName,
    /// The serialized payload that should be forwarded to either the `transfer`
    /// or the `updateOperator` function.
    #[concordium(size_length = 2)]
    pub payload:          Vec<u8>,
}

#[derive(Serialize, SchemaType)]
pub struct PermitParam {
    pub signature: AccountSignatures,
    pub signer:    AccountAddress,
    pub message:   PermitMessage,
}

#[derive(Serialize)]
pub struct PermitParamPartial {
    pub signature: AccountSignatures,
    pub signer:    AccountAddress,
}








#[derive(Serial, DeserialWithState, Deletable)]
#[concordium(state_parameter = "S")]
struct AddressState<S = StateApi> {
    balances:  StateMap<ContractTokenId, ContractTokenAmount, S>,
    operators: StateSet<Address, S>,
}

impl AddressState {
    fn empty(state_builder: &mut StateBuilder) -> Self {
        AddressState {
            balances:  state_builder.new_map(),
            operators: state_builder.new_set(),
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
struct State<S = StateApi> {
    /// The state of addresses.
    state:              StateMap<Address, AddressState<S>, S>,
    /// All of the token IDs.
    tokens:             StateMap<ContractTokenId, MetadataUrl, S>,
    max_supply:         StateMap<ContractTokenId, ContractTokenAmount, S>,
    token_balance:      StateMap<ContractTokenId, ContractTokenAmount, S>,
    /// A map with contract addresses providing implementations of additional
    /// standards.
    implementors:       StateMap<StandardIdentifierOwned, Vec<ContractAddress>, S>,
    
    /// A registry to link an account to its next nonce. The nonce is used to
    /// prevent replay attacks of the signed message. The nonce is increased
    /// sequentially every time a signed message (corresponding to the
    /// account) is successfully executed in the `permit` function. This
    /// mapping keeps track of the next nonce that needs to be used by the
    /// account to generate a signature.
    nonces_registry:    StateMap<AccountAddress, u64, S>,
    
    blacklist:          StateSet<Address, S>,
    
    
}

/// The different errors the contract can produce.
#[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType)]
pub enum CustomContractError {
    /// Failed parsing the parameter.
    #[from(ParseError)]
    ParseParams, // -1
    /// Failed logging: Log is full.
    LogFull, // -2
    /// Failed logging: Log is malformed.
    LogMalformed, // -3
    /// Invalid contract name.
    InvalidContractName, // -4
    /// Only a smart contract can call this function.
    ContractOnly, // -5
    /// Failed to invoke a contract.
    InvokeContractError, // -6
    
    /// Failed to verify signature because signer account does not exist on
    /// chain.
    MissingAccount, // -7
    /// Failed to verify signature because data was malformed.
    MalformedData, // -8
    /// Failed signature verification: Invalid signature.
    WrongSignature, // -9
    /// Failed signature verification: A different nonce is expected.
    NonceMismatch, // -10
    /// Failed signature verification: Signature was intended for a different
    /// contract.
    WrongContract, // -11
    /// Failed signature verification: Signature was intended for a different
    /// entry_point.
    WrongEntryPoint, // -12
    /// Failed signature verification: Signature is expired.
    Expired, // -13
    
    /// Token owner address is blacklisted.
    Blacklisted, // -14
    /// Account address has no canonical address.
    NoCanonicalAddress, // -15
    
    
    
    /// Max supply reached
    MaxSupplyReached, // -22
    
}

pub type ContractError = Cis2Error<CustomContractError>;

pub type ContractResult<A> = Result<A, ContractError>;




impl From<CheckAccountSignatureError> for CustomContractError {
    fn from(e: CheckAccountSignatureError) -> Self {
        match e {
            CheckAccountSignatureError::MissingAccount => Self::MissingAccount,
            CheckAccountSignatureError::MalformedData => Self::MalformedData,
        }
    }
}


impl From<LogError> for CustomContractError {
    fn from(le: LogError) -> Self {
        match le {
            LogError::Full => Self::LogFull,
            LogError::Malformed => Self::LogMalformed,
        }
    }
}

impl<T> From<CallContractError<T>> for CustomContractError {
    fn from(_cce: CallContractError<T>) -> Self { Self::InvokeContractError }
}

impl From<CustomContractError> for ContractError {
    fn from(c: CustomContractError) -> Self { Cis2Error::Custom(c) }
}

impl State {
    fn empty(state_builder: &mut StateBuilder) -> Self {
        State {
            state: state_builder.new_map(),
            tokens: state_builder.new_map(),
            max_supply: state_builder.new_map(),
            token_balance: state_builder.new_map(),
            implementors: state_builder.new_map(),
            
            nonces_registry: state_builder.new_map(),
            
            blacklist: state_builder.new_set(),
            
            
        }
    }

    fn mint(
        &mut self,
        token_id: &ContractTokenId,
        metadata_url: &MetadataUrl,
        amount: ContractTokenAmount,
        owner: &Address,
        state_builder: &mut StateBuilder,
    ) {
        let token_metadata = self.tokens.get(token_id).map(|x| x.to_owned());
        if token_metadata.is_none() {
            let _ = self.tokens.insert(*token_id, metadata_url.to_owned());
        }
        let mut owner_state = self
            .state
            .entry(*owner)
            .or_insert_with(|| AddressState::empty(state_builder));
        let mut owner_balance = owner_state.balances.entry(*token_id).or_insert(0.into());
        *owner_balance += amount;
    
        let mut circulating_supply = self.token_balance.entry(*token_id).or_insert(0.into());
        *circulating_supply += amount;
    }

    

    /// Check that the token ID currently exists in this contract.
    #[inline(always)]
    fn contains_token(&self, token_id: &ContractTokenId) -> bool {
        self.tokens.get(token_id).map(|x| x.to_owned()).is_some()
    }

    fn balance(
        &self,
        token_id: &ContractTokenId,
        address: &Address,
    ) -> ContractResult<ContractTokenAmount> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        let balance = self.state.get(address).map_or(0.into(), |address_state| {
            address_state.balances.get(token_id).map_or(0.into(), |x| *x)
        });
        Ok(balance)
    }

    #[inline(always)]
    fn set_max_supply(&mut self, token_id: &ContractTokenId, max_supply: ContractTokenAmount) {
        let _ = self.max_supply.insert(*token_id, max_supply);
    }

    #[inline(always)]
    fn get_token_supply(&self, token_id: &ContractTokenId) -> ContractResult<ContractTokenAmount> {
        ensure!(
            self.contains_token(&token_id),
            ContractError::InvalidTokenId
        );
        let supply = self.max_supply.get(token_id).map_or(0.into(), |x| *x);
        Ok(supply)
    }

    #[inline(always)]
    fn get_circulating_supply(
        &self,
        token_id: &ContractTokenId,
    ) -> ContractResult<ContractTokenAmount> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        let circulating_supply = self.token_balance.get(token_id).map_or(0.into(), |x| *x);
        Ok(circulating_supply)
    }

    /// Check if an address is an operator of a given owner address.
    fn is_operator(&self, address: &Address, owner: &Address) -> bool {
        self.state
            .get(owner)
            .map(|address_state| address_state.operators.contains(address))
            .unwrap_or(false)
    }

    fn transfer(
        &mut self,
        token_id: &ContractTokenId,
        amount: ContractTokenAmount,
        from: &Address,
        to: &Address,
        state_builder: &mut StateBuilder,
    ) -> ContractResult<()> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        if amount == 0.into() {
            return Ok(());
        }

        {
            let mut from_address_state =
                self.state.entry(*from).occupied_or(ContractError::InsufficientFunds)?;
            let mut from_balance = from_address_state
                .balances
                .entry(*token_id)
                .occupied_or(ContractError::InsufficientFunds)?;
            ensure!(*from_balance >= amount, ContractError::InsufficientFunds);
            *from_balance -= amount;
        }

        let mut to_address_state =
            self.state.entry(*to).or_insert_with(|| AddressState::empty(state_builder));
        let mut to_address_balance = to_address_state.balances.entry(*token_id).or_insert(0.into());
        *to_address_balance += amount;

        Ok(())
    }

    fn add_operator(
        &mut self,
        owner: &Address,
        operator: &Address,
        state_builder: &mut StateBuilder,
    ) {
        let mut owner_state =
            self.state.entry(*owner).or_insert_with(|| AddressState::empty(state_builder));
        owner_state.operators.insert(*operator);
    }

    fn remove_operator(&mut self, owner: &Address, operator: &Address) {
        self.state.entry(*owner).and_modify(|address_state| {
            address_state.operators.remove(operator);
        });
    }

    fn add_blacklist(&mut self, address: Address) { self.blacklist.insert(address); }

    fn remove_blacklist(&mut self, address: &Address) { self.blacklist.remove(address); }

    /// Check if state contains any implementors for a given standard.
    fn have_implementors(&self, std_id: &StandardIdentifierOwned) -> SupportResult {
        if let Some(addresses) = self.implementors.get(std_id) {
            SupportResult::SupportBy(addresses.to_vec())
        } else {
            SupportResult::NoSupport
        }
    }

    /// Set implementors for a given standard.
    fn set_implementors(
        &mut self,
        std_id: StandardIdentifierOwned,
        implementors: Vec<ContractAddress>,
    ) {
        let _ = self.implementors.insert(std_id, implementors);
    }

    
}

/// Convert the address into its canonical account address (in case it is an
/// account address).
fn get_canonical_address(address: Address) -> ContractResult<Address> {
    let canonical_address = match address {
        Address::Account(account) => {
            Address::Account(account.get_alias(0).ok_or(CustomContractError::NoCanonicalAddress)?)
        }
        Address::Contract(contract) => Address::Contract(contract),
    };
    Ok(canonical_address)
}

// Contract functions

#[init(
    contract = "mint_wizard_1001001_v1",
    parameter = "InitParams",
    event = "Cis2Event<ContractTokenId, ContractTokenAmount>",
    enable_logger
)]
fn contract_init(
    ctx: &InitContext,
    state_builder: &mut StateBuilder,
    logger: &mut impl HasLogger,
) -> InitResult<State> {
    let params: InitParams = ctx.parameter_cursor().get()?;

    let mut state = State::empty(state_builder);

    let invoker = Address::Account(ctx.init_origin());

    

    // Preminting of tokens
    for (token_id, token_info) in params.premint_tokens {
        state.set_max_supply(&token_id, token_info.1.max_supply);

        state.mint(
            &token_id,
            &token_info.0,
            token_info.1.amount,
            &invoker,
            state_builder,
        );

        logger.log(&Cis2Event::Mint(MintEvent {
            token_id,
            amount: token_info.1.amount,
            owner: invoker,
        }))?;

        logger.log(&Cis2Event::TokenMetadata::<_, ContractTokenAmount>(
            TokenMetadataEvent {
                token_id,
                metadata_url: token_info.0,
            },
        ))?;
    }

    Ok(state)
}

#[derive(Serialize, SchemaType, PartialEq, Eq, Debug)]
pub struct ViewAddressState {
    pub balances:  Vec<(ContractTokenId, ContractTokenAmount)>,
    pub operators: Vec<Address>,
}

#[derive(Serialize, SchemaType, PartialEq, Eq)]
pub struct ViewState {
    pub state:           Vec<(Address, ViewAddressState)>,
    pub tokens:          Vec<ContractTokenId>,
    
    pub nonces_registry: Vec<(AccountAddress, u64)>,
    
    pub blacklist:       Vec<Address>,
    
    
    pub implementors:    Vec<(StandardIdentifierOwned, Vec<ContractAddress>)>,
}

/// View function for testing. This reports on the entire state of the contract
/// for testing purposes.
#[receive(contract = "mint_wizard_1001001_v1", name = "view", return_value = "ViewState")]
fn contract_view(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<ViewState> {
    let state = host.state();

    let contract_state = state
        .state
        .iter()
        .map(|(key, value)| {
            let mut balances = Vec::new();
            let mut operators = Vec::new();
            for (token_id, amount) in value.balances.iter() {
                balances.push((*token_id, *amount));
            }
            for operator in value.operators.iter() {
                operators.push(*operator);
            }
            (*key, ViewAddressState {
                balances,
                operators,
            })
        })
        .collect();

    let tokens = state.tokens.iter().map(|a| *a.0).collect();
    
    let nonces_registry = state.nonces_registry.iter().map(|(a, b)| (*a, *b)).collect();
    
    let blacklist = state.blacklist.iter().map(|a| *a).collect();
    

    let implementors: Vec<(StandardIdentifierOwned, Vec<ContractAddress>)> = state
        .implementors
        .iter()
        .map(|(key, value)| {
            let mut implementors = Vec::new();
            for test in value.iter() {
                implementors.push(*test);
            }

            ((*key).clone(), implementors)
        })
        .collect();

    Ok(ViewState {
        state: contract_state,
        tokens,
        
        nonces_registry,
        
        blacklist,
        
        implementors,
        
    })
}


fn mint(
    params: MintParams,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let is_blacklisted = host.state().blacklist.contains(&get_canonical_address(params.owner)?);

    ensure!(!is_blacklisted, CustomContractError::Blacklisted.into());

    

    let (state, builder) = host.state_and_builder();
    for (token_id, token_info) in params.tokens {
        if !state.contains_token(&token_id) {
            state.set_max_supply(&token_id, token_info.1.max_supply);
        } else {
            let max_supply = state.get_token_supply(&token_id)?;
            let circulating_supply = state.get_circulating_supply(&token_id)?;

            ensure!(
                circulating_supply <= max_supply,
                ContractError::Custom(CustomContractError::MaxSupplyReached)
            );

            ensure!(
                &token_info.1.amount <= &(max_supply - circulating_supply),
                ContractError::Custom(CustomContractError::MaxSupplyReached)
            );
        }

        state.mint(
            &token_id,
            &token_info.0,
            token_info.1.amount,
            &params.owner,
            builder,
        );

        logger.log(&Cis2Event::Mint(MintEvent {
            token_id,
            amount: token_info.1.amount,
            owner: params.owner,
        }))?;

        logger.log(&Cis2Event::TokenMetadata::<_, ContractTokenAmount>(
            TokenMetadataEvent {
                token_id,
                metadata_url: token_info.0,
            },
        ))?;
    }

    Ok(())
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "mint",
    parameter = "MintParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn contract_mint(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let owner = ctx.owner();
    let sender = ctx.sender();

    ensure!(sender.matches_account(&owner), ContractError::Unauthorized);

    
    ensure!(
        sender == Address::from(ctx.owner()),
    );
    
    
    let params: MintParams = ctx.parameter_cursor().get()?;

    mint(params, host, logger)?;

    Ok(())
}




type TransferParameter = TransferParams<ContractTokenId, ContractTokenAmount>;

fn transfer(
    transfer: concordium_cis2::Transfer<ContractTokenId, ContractTokenAmount>,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let to_address = transfer.to.address();

    ensure!(
        !host.state().blacklist.contains(&get_canonical_address(to_address)?),
        CustomContractError::Blacklisted.into()
    );

    ensure!(
        !host.state().blacklist.contains(&get_canonical_address(transfer.from)?),
        CustomContractError::Blacklisted.into()
    );

    

    let (state, builder) = host.state_and_builder();

    state.transfer(&transfer.token_id, transfer.amount, &transfer.from, &to_address, builder)?;

    logger.log(&Cis2Event::Transfer(TransferEvent {
        token_id: transfer.token_id,
        amount:   transfer.amount,
        from:     transfer.from,
        to:       to_address,
    }))?;

    if let Receiver::Contract(address, function) = transfer.to {
        let parameter = OnReceivingCis2Params {
            token_id: transfer.token_id,
            amount:   transfer.amount,
            from:     transfer.from,
            data:     transfer.data,
        };
        host.invoke_contract(&address, &parameter, function.as_entrypoint_name(), Amount::zero())?;
    }

    Ok(())
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "transfer",
    parameter = "TransferParameter",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn contract_transfer(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let TransferParams(transfers): TransferParameter = ctx.parameter_cursor().get()?;
    let sender = ctx.sender();

    for transfer_entry in transfers {
        ensure!(
            transfer_entry.from == sender
                || host.state().is_operator(&sender, &transfer_entry.from),
            ContractError::Unauthorized
        );

        transfer(transfer_entry, host, logger)?;
    }
    Ok(())
}


/// Helper function that can be invoked at the front-end to serialize the
/// `PermitMessage` before signing it in the wallet.
#[receive(contract = "mint_wizard_1001001_v1", name = "serializationHelper", parameter = "PermitMessage")]
fn contract_serialization_helper(_ctx: &ReceiveContext, _host: &Host<State>) -> ContractResult<()> {
    Ok(())
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "viewMessageHash",
    parameter = "PermitParam",
    return_value = "[u8;32]",
    error = "ContractError",
    crypto_primitives,
    mutable
)]
fn contract_view_message_hash(
    ctx: &ReceiveContext,
    _host: &mut Host<State>,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ContractResult<[u8; 32]> {
    let mut cursor = ctx.parameter_cursor();
    let param: PermitParamPartial = cursor.get()?;

    // The input parameter is `PermitParam` but we have only read the initial part
    // of it with `PermitParamPartial` so far. We read in the `message` now.
    // `(cursor.size() - cursor.cursor_position()` is the length of the message in
    // bytes.
    let mut message_bytes = vec![0; (cursor.size() - cursor.cursor_position()) as usize];

    cursor.read_exact(&mut message_bytes)?;

    // The message signed in the Concordium browser wallet is prepended with the
    // `account` address and 8 zero bytes. Accounts in the Concordium browser wallet
    // can either sign a regular transaction (in that case the prepend is
    // `account` address and the nonce of the account which is by design >= 1)
    // or sign a message (in that case the prepend is `account` address and 8 zero
    // bytes). Hence, the 8 zero bytes ensure that the user does not accidentally
    // sign a transaction. The account nonce is of type u64 (8 bytes).
    let mut msg_prepend = [0; 32 + 8];
    msg_prepend[0..32].copy_from_slice(param.signer.as_ref());
    msg_prepend[32..40].copy_from_slice(&[0u8; 8]);
    let message_hash =
        crypto_primitives.hash_sha2_256(&[&msg_prepend[0..40], &message_bytes].concat()).0;

    Ok(message_hash)
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "permit",
    parameter = "PermitParam",
    error = "ContractError",
    crypto_primitives,
    mutable,
    enable_logger
)]
fn contract_permit(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ContractResult<()> {
    let param: PermitParam = ctx.parameter_cursor().get()?;

    let mut entry = host.state_mut().nonces_registry.entry(param.signer).or_insert_with(|| 0);

    let nonce = *entry;
    *entry += 1;
    drop(entry);

    let message = param.message;

    ensure_eq!(message.nonce, nonce, CustomContractError::NonceMismatch.into());

    ensure_eq!(
        message.contract_address,
        ctx.self_address(),
        CustomContractError::WrongContract.into()
    );

    ensure!(message.timestamp > ctx.metadata().slot_time(), CustomContractError::Expired.into());

    let message_hash = contract_view_message_hash(ctx, host, crypto_primitives)?;

    let valid_signature =
        host.check_account_signature(param.signer, &param.signature, &message_hash)?;
    ensure!(valid_signature, CustomContractError::WrongSignature.into());

    match message.entry_point.as_entrypoint_name() {
        TRANSFER_ENTRYPOINT => {
            let TransferParams(transfers): TransferParameter = from_bytes(&message.payload)?;

            for transfer_entry in transfers {
                ensure!(
                    transfer_entry.from.matches_account(&param.signer)
                        || host
                            .state()
                            .is_operator(&Address::from(param.signer), &transfer_entry.from),
                    ContractError::Unauthorized
                );

                transfer(transfer_entry, host, logger)?
            }
        }
        UPDATE_OPERATOR_ENTRYPOINT => {
            let UpdateOperatorParams(updates): UpdateOperatorParams = from_bytes(&message.payload)?;

            let (state, builder) = host.state_and_builder();

            for update in updates {
                update_operator(
                    update.update,
                    concordium_std::Address::Account(param.signer),
                    update.operator,
                    state,
                    builder,
                    logger,
                )?;
            }
        }
        
        MINT_ENTRYPOINT => {
            let params: MintParams = from_bytes(&message.payload)?;

            ensure!(
                 Address::from(param.signer) == Address::from(ctx.owner()),
                ContractError::Unauthorized
            );

            mint(params, host, logger)?;
        }
        
        
        _ => {
            bail!(CustomContractError::WrongEntryPoint.into())
        }
    }

    logger.log(&Event::Nonce(NonceEvent {
        account: param.signer,
        nonce,
    }))?;

    Ok(())
}


fn update_operator(
    update: OperatorUpdate,
    sender: Address,
    operator: Address,
    state: &mut State,
    builder: &mut StateBuilder,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    

    match update {
        OperatorUpdate::Add => state.add_operator(&sender, &operator, builder),
        OperatorUpdate::Remove => state.remove_operator(&sender, &operator),
    }

    logger.log(&Cis2Event::<ContractTokenId, ContractTokenAmount>::UpdateOperator(
        UpdateOperatorEvent {
            owner: sender,
            operator,
            update,
        },
    ))?;
    
    Ok(())
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "updateOperator",
    parameter = "UpdateOperatorParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn contract_update_operator(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let UpdateOperatorParams(params) = ctx.parameter_cursor().get()?;
    let sender = ctx.sender();
    let (state, builder) = host.state_and_builder();
    for param in params {
        update_operator(param.update, sender, param.operator, state, builder, logger)?;
    }
    Ok(())
}

pub type ContractBalanceOfQueryParams = BalanceOfQueryParams<ContractTokenId>;

pub type ContractBalanceOfQueryResponse = BalanceOfQueryResponse<ContractTokenAmount>;

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "balanceOf",
    parameter = "ContractBalanceOfQueryParams",
    return_value = "ContractBalanceOfQueryResponse",
    error = "ContractError"
)]
fn contract_balance_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<ContractBalanceOfQueryResponse> {
    let params: ContractBalanceOfQueryParams = ctx.parameter_cursor().get()?;
    let mut response = Vec::with_capacity(params.queries.len());
    for query in params.queries {
        let amount = host.state().balance(&query.token_id, &query.address)?;
        response.push(amount);
    }
    let result = ContractBalanceOfQueryResponse::from(response);
    Ok(result)
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "operatorOf",
    parameter = "OperatorOfQueryParams",
    return_value = "OperatorOfQueryResponse",
    error = "ContractError"
)]
fn contract_operator_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<OperatorOfQueryResponse> {
    let params: OperatorOfQueryParams = ctx.parameter_cursor().get()?;
    let mut response = Vec::with_capacity(params.queries.len());
    for query in params.queries {
        let is_operator = host.state().is_operator(&query.address, &query.owner);
        response.push(is_operator);
    }
    let result = OperatorOfQueryResponse::from(response);
    Ok(result)
}

#[derive(Debug, Serialize, SchemaType)]
#[concordium(transparent)]
pub struct VecOfAddresses {
    #[concordium(size_length = 2)]
    pub queries: Vec<Address>,
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "isBlacklisted",
    parameter = "VecOfAddresses",
    return_value = "Vec<bool>",
    error = "ContractError"
)]
fn contract_is_blacklisted(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<Vec<bool>> {
    let params: VecOfAddresses = ctx.parameter_cursor().get()?;
    let mut response = Vec::with_capacity(params.queries.len());
    for address in params.queries {
        let is_blacklisted = host.state().blacklist.contains(&get_canonical_address(address)?);
        response.push(is_blacklisted);
    }
    Ok(response)
}

#[derive(Debug, Serialize, SchemaType)]
#[concordium(transparent)]
pub struct PublicKeyOfQueryResponse(
    #[concordium(size_length = 2)] pub Vec<Option<AccountPublicKeys>>,
);

impl From<Vec<Option<AccountPublicKeys>>> for PublicKeyOfQueryResponse {
    fn from(results: concordium_std::Vec<Option<AccountPublicKeys>>) -> Self {
        PublicKeyOfQueryResponse(results)
    }
}

#[derive(Debug, Serialize, SchemaType)]
#[concordium(transparent)]
pub struct VecOfAccountAddresses {
    #[concordium(size_length = 2)]
    pub queries: Vec<AccountAddress>,
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "publicKeyOf",
    parameter = "VecOfAccountAddresses",
    return_value = "PublicKeyOfQueryResponse",
    error = "ContractError"
)]
fn contract_public_key_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<PublicKeyOfQueryResponse> {
    let params: VecOfAccountAddresses = ctx.parameter_cursor().get()?;
    let mut response: Vec<Option<AccountPublicKeys>> = Vec::with_capacity(params.queries.len());
    for account in params.queries {
        let public_keys = host.account_public_keys(account).ok();
        response.push(public_keys);
    }
    let result = PublicKeyOfQueryResponse::from(response);
    Ok(result)
}

#[derive(Debug, Serialize, SchemaType)]
#[concordium(transparent)]
pub struct NonceOfQueryResponse(#[concordium(size_length = 2)] pub Vec<u64>);

impl From<Vec<u64>> for NonceOfQueryResponse {
    fn from(results: concordium_std::Vec<u64>) -> Self { NonceOfQueryResponse(results) }
}


#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "nonceOf",
    parameter = "VecOfAccountAddresses",
    return_value = "NonceOfQueryResponse",
    error = "ContractError"
)]
fn contract_nonce_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<NonceOfQueryResponse> {
    let params: VecOfAccountAddresses = ctx.parameter_cursor().get()?;
    let mut response: Vec<u64> = Vec::with_capacity(params.queries.len());
    for account in params.queries {
        let nonce = host.state().nonces_registry.get(&account).map(|nonce| *nonce).unwrap_or(0);
        response.push(nonce);
    }
    Ok(NonceOfQueryResponse::from(response))
}


type ContractTokenMetadataQueryParams = TokenMetadataQueryParams<ContractTokenId>;

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "tokenMetadata",
    parameter = "ContractTokenMetadataQueryParams",
    return_value = "TokenMetadataQueryResponse",
    error = "ContractError"
)]
fn contract_token_metadata(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<TokenMetadataQueryResponse> {
    let params: ContractTokenMetadataQueryParams = ctx.parameter_cursor().get()?;
    let mut response = Vec::with_capacity(params.queries.len());
    for token_id in params.queries {
        let metadata_url = match host.state().tokens.get(&token_id) {
            Some(metadata_url) => metadata_url.clone(),
            None => bail!(ContractError::InvalidTokenId),
        };
        response.push(metadata_url);
    }
    let result = TokenMetadataQueryResponse::from(response);
    Ok(result)
}

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "supports",
    parameter = "SupportsQueryParams",
    return_value = "SupportsQueryResponse",
    error = "ContractError"
)]
fn contract_supports(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<SupportsQueryResponse> {
    let params: SupportsQueryParams = ctx.parameter_cursor().get()?;

    let mut response = Vec::with_capacity(params.queries.len());
    for std_id in params.queries {
        if SUPPORTS_STANDARDS.contains(&std_id.as_standard_identifier()) {
            response.push(SupportResult::Support);
        } else {
            response.push(host.state().have_implementors(&std_id));
        }
    }
    let result = SupportsQueryResponse::from(response);
    Ok(result)
}


#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "supportsPermit",
    parameter = "SupportsPermitQueryParams",
    return_value = "SupportsQueryResponse",
    error = "ContractError"
)]
fn contract_supports_permit(
    ctx: &ReceiveContext,
    _host: &Host<State>,
) -> ContractResult<SupportsQueryResponse> {
    let params: SupportsPermitQueryParams = ctx.parameter_cursor().get()?;

    let mut response = Vec::with_capacity(params.queries.len());
    for entrypoint in params.queries {
        if SUPPORTS_PERMIT_ENTRYPOINTS.contains(&entrypoint.as_entrypoint_name()) {
            response.push(SupportResult::Support);
        } else {
            response.push(SupportResult::NoSupport);
        }
    }
    let result = SupportsQueryResponse::from(response);
    Ok(result)
}


/// Set the addresses for an implementation given a standard identifier and a
/// list of contract addresses.
#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "setImplementors",
    parameter = "SetImplementorsParams",
    error = "ContractError",
    mutable
)]
fn contract_set_implementor(ctx: &ReceiveContext, host: &mut Host<State>) -> ContractResult<()> {
    ensure!(ctx.sender().matches_account(&ctx.owner()), ContractError::Unauthorized);
    let params: SetImplementorsParams = ctx.parameter_cursor().get()?;
    host.state_mut().set_implementors(params.id, params.implementors);
    Ok(())
}

#[derive(Debug, Serialize, Clone, Copy, SchemaType, PartialEq, Eq)]
pub enum BlacklistUpdate {
    Remove,
    Add,
}

#[derive(Debug, Serialize, Clone, SchemaType, PartialEq, Eq)]
pub struct UpdateBlacklist {
    pub update:  BlacklistUpdate,
    pub address: Address,
}

#[derive(Debug, Serialize, Clone, SchemaType)]
#[concordium(transparent)]
pub struct UpdateBlacklistParams(#[concordium(size_length = 2)] pub Vec<UpdateBlacklist>);

#[receive(
    contract = "mint_wizard_1001001_v1",
    name = "updateBlacklist",
    parameter = "UpdateBlacklistParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn contract_update_blacklist(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let sender = ctx.sender();

    
    ensure!(sender.matches_account(&ctx.owner()), ContractError::Unauthorized);
    

    let UpdateBlacklistParams(params) = ctx.parameter_cursor().get()?;

    for param in params {
        let canonical_address = get_canonical_address(param.address)?;

        match param.update {
            BlacklistUpdate::Add => host.state_mut().add_blacklist(canonical_address),
            BlacklistUpdate::Remove => host.state_mut().remove_blacklist(&canonical_address),
        }

        logger.log(&Event::UpdateBlacklist(UpdateBlacklistEvent {
            address: canonical_address,
            update:  param.update,
        }))?;
    }

    Ok(())
}





