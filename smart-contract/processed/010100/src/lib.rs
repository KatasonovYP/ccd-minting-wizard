#![cfg_attr(not(feature = "std"), no_std)]
use concordium_cis2::*;
use concordium_std::{collections::BTreeMap, EntrypointName, *};

const SUPPORTS_STANDARDS: [StandardIdentifier<'static>; 2] =
    [CIS0_STANDARD_IDENTIFIER, CIS2_STANDARD_IDENTIFIER];



/// Event tags.

pub const GRANT_ROLE_EVENT_TAG: u8 = 1;
pub const REVOKE_ROLE_EVENT_TAG: u8 = 2;





#[derive(Debug, Serial, Deserial, PartialEq, Eq)]
#[concordium(repr(u8))]
pub enum Event {
    
    #[concordium(tag = 1)]
    GrantRole(GrantRoleEvent),
    #[concordium(tag = 2)]
    RevokeRole(RevokeRoleEvent),
    
    
    /// Cis2 token events.
    #[concordium(forward = cis2_events)]
    Cis2Event(Cis2Event<ContractTokenId, ContractTokenAmount>),
}




#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct GrantRoleEvent {
    pub address: Address,
    pub role:    Roles,
}

/// The RevokeRoleEvent is logged when a role is revoked from an address.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct RevokeRoleEvent {
    pub address: Address,
    pub role:    Roles,
}


impl schema::SchemaType for Event {
    fn get_type() -> schema::Type {
        let mut event_map = BTreeMap::new();
        
        
        event_map.insert(
            GRANT_ROLE_EVENT_TAG,
            (
                "GrantRole".to_string(),
                schema::Fields::Named(vec![
                    (String::from("address"), Address::get_type()),
                    (String::from("role"), Roles::get_type()),
                ]),
            ),
        );
        event_map.insert(
            REVOKE_ROLE_EVENT_TAG,
            (
                "RevokeRole".to_string(),
                schema::Fields::Named(vec![
                    (String::from("address"), Address::get_type()),
                    (String::from("role"), Roles::get_type()),
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
            BURN_EVENT_TAG,
            (
                "Burn".to_string(),
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
    pub amount: TokenAmountU64,
    pub max_supply: ContractTokenAmount,
}

#[derive(Serialize, SchemaType)]
pub struct InitParams {
    pub premint_tokens: collections::BTreeMap<ContractTokenId, (MetadataUrl, TokenParams)>,
}




#[derive(Serialize, SchemaType)]
pub struct BurnParams {
    pub owner:          Address,
    pub token_id:       ContractTokenId,
    pub amount:         ContractTokenAmount,
}




#[derive(Debug, Serialize, SchemaType)]
struct SetImplementorsParams {
    id:           StandardIdentifierOwned,
    /// The addresses of the implementors of the standard.
    implementors: Vec<ContractAddress>,
}








#[derive(Serialize, SchemaType)]
pub struct GrantRoleParams {
    pub address: Address,
    pub role:    Roles,
}

#[derive(Serialize, SchemaType)]
pub struct RevokeRoleParams {
    pub address: Address,
    pub role:    Roles,
}

#[derive(Serial, DeserialWithState, Deletable)]
#[concordium(state_parameter = "S")]
struct AddressRoleState<S> {
    roles: StateSet<Roles, S>,
}

#[derive(Serialize, PartialEq, Eq, Reject, SchemaType, Clone, Copy, Debug)]
pub enum Roles {
    ADMIN,
    
    
    
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
    
    
    
    /// A map containing all roles granted to addresses.
    roles:              StateMap<Address, AddressRoleState<S>, S>,
    
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
    
    
    
    
    /// Failed to revoke role because it was not granted in the first place.
    RoleWasNotGranted, // -20
    /// Failed to grant role because it was granted already in the first place.
    RoleWasAlreadyGranted, // -21
    
    /// Max supply reached
    MaxSupplyReached, // -22
    
    /// No balance to burn
    NoBalanceToBurn, // -23
    
}

pub type ContractError = Cis2Error<CustomContractError>;

pub type ContractResult<A> = Result<A, ContractError>;





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
            
            
            
            roles: state_builder.new_map(),
            
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

    
    fn burn(
        &mut self,
        token_id: &ContractTokenId,
        amount: ContractTokenAmount,
        owner: &Address,
    ) -> ContractResult<ContractTokenAmount> {
    
        if amount == 0u64.into() {
            return Ok(amount);
        }
    
        match self.state.get_mut(owner) {
            Some(mut address_state) => match address_state.balances.get_mut(token_id) {
                Some(mut b) => {
                    ensure!(
                        *b >= amount,
                        Cis2Error::Custom(CustomContractError::NoBalanceToBurn)
                    );
    
                    *b -= amount;
                    Ok(*b)
                }
                None => Err(Cis2Error::Custom(CustomContractError::NoBalanceToBurn)),
            },
            None => Err(Cis2Error::Custom(CustomContractError::NoBalanceToBurn)),
        }
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

    
    fn grant_role(&mut self, account: &Address, role: Roles, state_builder: &mut StateBuilder) {
        self.roles.entry(*account).or_insert_with(|| AddressRoleState {
            roles: state_builder.new_set(),
        });

        self.roles.entry(*account).and_modify(|entry| {
            entry.roles.insert(role);
        });
    }

    fn revoke_role(&mut self, account: &Address, role: Roles) {
        self.roles.entry(*account).and_modify(|entry| {
            entry.roles.remove(&role);
        });
    }

    fn has_role(&self, account: &Address, role: Roles) -> bool {
        return match self.roles.get(account) {
            None => false,
            Some(roles) => roles.roles.contains(&role),
        };
    }
    
}

// Contract functions

#[init(
    contract = "mint_wizard_010100",
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

    
    state.grant_role(&invoker, Roles::ADMIN, state_builder);
    logger.log(&Event::GrantRole(GrantRoleEvent {
        address: invoker,
        role:    Roles::ADMIN,
    }))?;
    

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
    
    
    pub roles:           Vec<(Address, Vec<Roles>)>,
    
    
    pub implementors:    Vec<(StandardIdentifierOwned, Vec<ContractAddress>)>,
}

/// View function for testing. This reports on the entire state of the contract
/// for testing purposes.
#[receive(contract = "mint_wizard_010100", name = "view", return_value = "ViewState")]
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
    
    
    let roles: Vec<(Address, Vec<Roles>)> = state
        .roles
        .iter()
        .map(|(key, value)| {
            let mut roles_vec = Vec::new();
            for role in value.roles.iter() {
                roles_vec.push(*role);
            }
            (*key, roles_vec)
        })
        .collect();
    

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
        
        
        roles,
        
        implementors,
        
    })
}




fn burn(
    params: BurnParams,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    

    let (state, _builder) = host.state_and_builder();

    let token_id = params.token_id;

    let amount = params.amount;
    ensure!(
        state.contains_token(&token_id),
        ContractError::InvalidTokenId
    );

    let _: ContractTokenAmount = state.burn(&token_id, amount, &params.owner)?;

    logger.log(&Cis2Event::Burn(BurnEvent {
        token_id,
        amount,
        owner: params.owner,
    }))?;

    Ok(())
}

#[receive(
    contract = "mint_wizard_010100",
    name = "burn",
    parameter = "BurnParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn contract_burn(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let owner = ctx.owner();
    let sender = ctx.sender();

    ensure!(sender.matches_account(&owner), ContractError::Unauthorized);

    let params: BurnParams = ctx.parameter_cursor().get()?;

    burn(params, host, logger)?;

    Ok(())
}


type TransferParameter = TransferParams<ContractTokenId, ContractTokenAmount>;

fn transfer(
    transfer: concordium_cis2::Transfer<ContractTokenId, ContractTokenAmount>,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let to_address = transfer.to.address();

    

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
    contract = "mint_wizard_010100",
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
    contract = "mint_wizard_010100",
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
    contract = "mint_wizard_010100",
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
    contract = "mint_wizard_010100",
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

type ContractTokenMetadataQueryParams = TokenMetadataQueryParams<ContractTokenId>;

#[receive(
    contract = "mint_wizard_010100",
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
    contract = "mint_wizard_010100",
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



/// Set the addresses for an implementation given a standard identifier and a
/// list of contract addresses.
#[receive(
    contract = "mint_wizard_010100",
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






#[receive(
    contract = "mint_wizard_010100",
    name = "grantRole",
    parameter = "GrantRoleParams",
    enable_logger,
    mutable
)]
fn contract_grant_role(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let params: GrantRoleParams = ctx.parameter_cursor().get()?;

    let (state, state_builder) = host.state_and_builder();

    let sender = ctx.sender();
    ensure!(state.has_role(&sender, Roles::ADMIN), ContractError::Unauthorized);

    ensure!(
        !state.has_role(&params.address, params.role),
        CustomContractError::RoleWasAlreadyGranted.into()
    );

    state.grant_role(&params.address, params.role, state_builder);
    logger.log(&Event::GrantRole(GrantRoleEvent {
        address: params.address,
        role:    params.role,
    }))?;
    Ok(())
}

#[receive(
    contract = "mint_wizard_010100",
    name = "revokeRole",
    parameter = "RevokeRoleParams",
    enable_logger,
    mutable
)]
fn contract_revoke_role(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let params: RevokeRoleParams = ctx.parameter_cursor().get()?;

    let (state, _) = host.state_and_builder();

    let sender = ctx.sender();
    ensure!(state.has_role(&sender, Roles::ADMIN), ContractError::Unauthorized);

    ensure!(
        state.has_role(&params.address, params.role),
        CustomContractError::RoleWasNotGranted.into()
    );

    state.revoke_role(&params.address, params.role);
    logger.log(&Event::RevokeRole(RevokeRoleEvent {
        address: params.address,
        role:    params.role,
    }))?;
    Ok(())
}
