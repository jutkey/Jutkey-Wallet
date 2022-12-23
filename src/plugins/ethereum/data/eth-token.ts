const tokenList = [
  {
    id: 1,
    chainId: 1,
    name: 'WETH',
    symbol: 'WETH',
    type: 'ERC20',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 18
  },
  {
    id: 2,
    chainId: 1,
    name: 'TrueUSD',
    symbol: 'TUSD',
    type: 'ERC20',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png',
    decimals: 18
  },
  {
    id: 3,
    chainId: 1,
    name: 'Tokenlon',
    symbol: 'LON',
    type: 'ERC20',
    address: '0x0000000000095413afC295d19EDeb1Ad7B71c952',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0000000000095413afC295d19EDeb1Ad7B71c952/logo.png',
    decimals: 18
  },
  {
    id: 4,
    chainId: 1,
    name: 'AllianceBlock',
    symbol: 'ALBT',
    type: 'ERC20',
    address: '0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0/logo.png',
    decimals: 18
  },
  {
    id: 5,
    chainId: 1,
    name: 'SKALE Network',
    symbol: 'SKL',
    type: 'ERC20',
    address: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7/logo.png',
    decimals: 18
  },
  {
    id: 6,
    chainId: 1,
    name: 'UniLend',
    symbol: 'UFT',
    type: 'ERC20',
    address: '0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    decimals: 18
  },
  {
    id: 7,
    chainId: 1,
    name: 'Orion Protocol',
    symbol: 'ORN',
    type: 'ERC20',
    address: '0x0258F474786DdFd37ABCE6df6BBb1Dd5dfC4434a',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0258F474786DdFd37ABCE6df6BBb1Dd5dfC4434a/logo.png',
    decimals: 8
  },
  {
    id: 8,
    chainId: 1,
    name: 'Rai Reflex Index',
    symbol: 'RAI',
    type: 'ERC20',
    address: '0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919/logo.png',
    decimals: 18
  },
  {
    id: 9,
    chainId: 1,
    name: 'SparkPoint',
    symbol: 'SRK',
    type: 'ERC20',
    address: '0x0488401c3F535193Fa8Df029d9fFe615A06E74E6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0488401c3F535193Fa8Df029d9fFe615A06E74E6/logo.png',
    decimals: 18
  },
  {
    id: 10,
    chainId: 1,
    name: 'UMA',
    symbol: 'UMA',
    type: 'ERC20',
    address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828/logo.png',
    decimals: 18
  },
  {
    id: 11,
    chainId: 1,
    name: 'SmartKey',
    symbol: 'Skey',
    type: 'ERC20',
    address: '0x06A01a4d579479Dd5D884EBf61A31727A3d8D442',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x06A01a4d579479Dd5D884EBf61A31727A3d8D442/logo.png',
    decimals: 8
  },
  {
    id: 12,
    chainId: 1,
    name: 'Base Protocol',
    symbol: 'BASE',
    type: 'ERC20',
    address: '0x07150e919B4De5fD6a63DE1F9384828396f25fDC',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x07150e919B4De5fD6a63DE1F9384828396f25fDC/logo.png',
    decimals: 9
  },
  {
    id: 13,
    chainId: 1,
    name: 'Mirror Protocol',
    symbol: 'MIR',
    type: 'ERC20',
    address: '0x09a3EcAFa817268f77BE1283176B946C4ff2E608',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x09a3EcAFa817268f77BE1283176B946C4ff2E608/logo.png',
    decimals: 18
  },
  {
    id: 14,
    chainId: 1,
    name: 'Growth DeFi',
    symbol: 'GRO',
    type: 'ERC20',
    address: '0x09e64c2B61a5f1690Ee6fbeD9baf5D6990F8dFd0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x09e64c2B61a5f1690Ee6fbeD9baf5D6990F8dFd0/logo.png',
    decimals: 18
  },
  {
    id: 15,
    chainId: 1,
    name: 'LGO Token',
    symbol: 'LGO',
    type: 'ERC20',
    address: '0x0a50C93c762fDD6E56D86215C24AaAD43aB629aa',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0a50C93c762fDD6E56D86215C24AaAD43aB629aa/logo.png',
    decimals: 8
  },
  {
    id: 16,
    chainId: 1,
    name: 'xDai',
    symbol: 'STAKE',
    type: 'ERC20',
    address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
    decimals: 18
  },
  {
    id: 17,
    chainId: 1,
    name: 'yearn.finance',
    symbol: 'YFI',
    type: 'ERC20',
    address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png',
    decimals: 18
  },
  {
    id: 18,
    chainId: 1,
    name: 'Bifrost',
    symbol: 'BFC',
    type: 'ERC20',
    address: '0x0c7D5ae016f806603CB1782bEa29AC69471CAb9c',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0c7D5ae016f806603CB1782bEa29AC69471CAb9c/logo.png',
    decimals: 18
  },
  {
    id: 19,
    chainId: 1,
    name: 'Public Mint',
    symbol: 'MINT',
    type: 'ERC20',
    address: '0x0CDF9acd87E940837ff21BB40c9fd55F68bba059',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0CDF9acd87E940837ff21BB40c9fd55F68bba059/logo.png',
    decimals: 18
  },
  {
    id: 20,
    chainId: 1,
    name: 'PoolTogether',
    symbol: 'POOL',
    type: 'ERC20',
    address: '0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e/logo.png',
    decimals: 18
  },
  {
    id: 21,
    chainId: 1,
    name: 'Basic Attention Token',
    symbol: 'BAT',
    type: 'ERC20',
    address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png',
    decimals: 18
  },
  {
    id: 22,
    chainId: 1,
    name: 'DAO Maker',
    symbol: 'DAO',
    type: 'ERC20',
    address: '0x0f51bb10119727a7e5eA3538074fb341F56B09Ad',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0f51bb10119727a7e5eA3538074fb341F56B09Ad/logo.png',
    decimals: 18
  },
  {
    id: 23,
    chainId: 1,
    name: 'Decentraland',
    symbol: 'MANA',
    type: 'ERC20',
    address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png',
    decimals: 18
  },
  {
    id: 24,
    chainId: 1,
    name: 'Blockzero Labs',
    symbol: 'XIO',
    type: 'ERC20',
    address: '0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704/logo.png',
    decimals: 18
  },
  {
    id: 25,
    chainId: 1,
    name: 'Pundi X',
    symbol: 'PUNDIX',
    type: 'ERC20',
    address: '0x0FD10b9899882a6f2fcb5c371E17e70FdEe00C38',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0FD10b9899882a6f2fcb5c371E17e70FdEe00C38/logo.png',
    decimals: 18
  },
  {
    id: 26,
    chainId: 1,
    name: 'Unilayer',
    symbol: 'LAYER',
    type: 'ERC20',
    address: '0x0fF6ffcFDa92c53F615a4A75D982f399C989366b',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0fF6ffcFDa92c53F615a4A75D982f399C989366b/logo.png',
    decimals: 18
  },
  {
    id: 27,
    chainId: 1,
    name: 'UniMex Network',
    symbol: 'UMX',
    type: 'ERC20',
    address: '0x10Be9a8dAe441d276a5027936c3aADEd2d82bC15',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x10Be9a8dAe441d276a5027936c3aADEd2d82bC15/logo.png',
    decimals: 18
  },
  {
    id: 28,
    chainId: 1,
    name: '1INCH Token',
    symbol: '1INCH',
    type: 'ERC20',
    address: '0x111111111117dC0aa78b770fA6A738034120C302',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png',
    decimals: 18
  },
  {
    id: 29,
    chainId: 1,
    name: 'ARMOR',
    symbol: 'ARMOR',
    type: 'ERC20',
    address: '0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a/logo.png',
    decimals: 18
  },
  {
    id: 30,
    chainId: 1,
    name: 'Armor NXM',
    symbol: 'arNXM',
    type: 'ERC20',
    address: '0x1337DEF18C680aF1f9f45cBcab6309562975b1dD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD/logo.png',
    decimals: 18
  },
  {
    id: 31,
    chainId: 1,
    name: 'DeFi Pulse Index',
    symbol: 'DPI',
    type: 'ERC20',
    address: '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b/logo.png',
    decimals: 18
  },
  {
    id: 32,
    chainId: 1,
    name: 'DeltaHub Community',
    symbol: 'DHC',
    type: 'ERC20',
    address: '0x152687Bc4A7FCC89049cF119F9ac3e5aCF2eE7ef',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x152687Bc4A7FCC89049cF119F9ac3e5aCF2eE7ef/logo.png',
    decimals: 18
  },
  {
    id: 33,
    chainId: 1,
    name: 'EthereumMax',
    symbol: 'eMax',
    type: 'ERC20',
    address: '0x15874d65e649880c2614e7a480cb7c9A55787FF6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x15874d65e649880c2614e7a480cb7c9A55787FF6/logo.png',
    decimals: 18
  },
  {
    id: 34,
    chainId: 1,
    name: 'PAID Network',
    symbol: 'PAID',
    type: 'ERC20',
    address: '0x1614F18Fc94f47967A3Fbe5FfcD46d4e7Da3D787',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1614F18Fc94f47967A3Fbe5FfcD46d4e7Da3D787/logo.png',
    decimals: 18
  },
  {
    id: 35,
    chainId: 1,
    name: 'KIRA Network',
    symbol: 'KEX',
    type: 'ERC20',
    address: '0x16980b3B4a3f9D89E33311B5aa8f80303E5ca4F8',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x16980b3B4a3f9D89E33311B5aa8f80303E5ca4F8/logo.png',
    decimals: 6
  },
  {
    id: 36,
    chainId: 1,
    name: 'Polychain Monsters',
    symbol: 'PMON',
    type: 'ERC20',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1796ae0b0fa4862485106a0de9b654eFE301D0b2/logo.png',
    decimals: 18
  },
  {
    id: 37,
    chainId: 1,
    name: 'Cryptocurrency Top 10 Tokens Index',
    symbol: 'CC10',
    type: 'ERC20',
    address: '0x17aC188e09A7890a1844E5E65471fE8b0CcFadF3',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x17aC188e09A7890a1844E5E65471fE8b0CcFadF3/logo.png',
    decimals: 18
  },
  {
    id: 38,
    chainId: 1,
    name: 'Audius',
    symbol: 'AUDIO',
    type: 'ERC20',
    address: '0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998/logo.png',
    decimals: 18
  },
  {
    id: 39,
    chainId: 1,
    name: 'Augur',
    symbol: 'REP',
    type: 'ERC20',
    address: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1985365e9f78359a9B6AD760e32412f4a445E862/logo.png',
    decimals: 18
  },
  {
    id: 40,
    chainId: 1,
    name: 'Vesper',
    symbol: 'VSP',
    type: 'ERC20',
    address: '0x1b40183EFB4Dd766f11bDa7A7c3AD8982e998421',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1b40183EFB4Dd766f11bDa7A7c3AD8982e998421/logo.png',
    decimals: 18
  },
  {
    id: 41,
    chainId: 1,
    name: 'Antimatter.Finance Governance Token',
    symbol: 'MATTER',
    type: 'ERC20',
    address: '0x1C9491865a1DE77C5b6e19d2E6a5F1D7a6F2b25F',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1C9491865a1DE77C5b6e19d2E6a5F1D7a6F2b25F/logo.png',
    decimals: 18
  },
  {
    id: 42,
    chainId: 1,
    name: 'TOWER',
    symbol: 'TOWER',
    type: 'ERC20',
    address: '0x1C9922314ED1415c95b9FD453c3818fd41867d0B',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1C9922314ED1415c95b9FD453c3818fd41867d0B/logo.png',
    decimals: 18
  },
  {
    id: 43,
    chainId: 1,
    name: 'Non-Fungible Yearn',
    symbol: 'NFY',
    type: 'ERC20',
    address: '0x1cBb83EbcD552D5EBf8131eF8c9CD9d9BAB342bC',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1cBb83EbcD552D5EBf8131eF8c9CD9d9BAB342bC/logo.png',
    decimals: 18
  },
  {
    id: 44,
    chainId: 1,
    name: 'Keep3rV1',
    symbol: 'KP3R',
    type: 'ERC20',
    address: '0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44/logo.png',
    decimals: 18
  },
  {
    id: 45,
    chainId: 1,
    name: 'Lead Wallet',
    symbol: 'LEAD',
    type: 'ERC20',
    address: '0x1dD80016e3d4ae146Ee2EBB484e8edD92dacC4ce',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1dD80016e3d4ae146Ee2EBB484e8edD92dacC4ce/logo.png',
    decimals: 18
  },
  {
    id: 46,
    chainId: 1,
    name: 'Uniswap',
    symbol: 'UNI',
    type: 'ERC20',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    decimals: 18
  },
  {
    id: 47,
    chainId: 1,
    name: 'ChainGuardians Governance Token',
    symbol: 'CGG',
    type: 'ERC20',
    address: '0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43/logo.png',
    decimals: 18
  },
  {
    id: 48,
    chainId: 1,
    name: 'OVR',
    symbol: 'OVR',
    type: 'ERC20',
    address: '0x21BfBDa47A0B4B5b1248c767Ee49F7caA9B23697',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x21BfBDa47A0B4B5b1248c767Ee49F7caA9B23697/logo.png',
    decimals: 18
  },
  {
    id: 49,
    chainId: 1,
    name: 'Reputation',
    symbol: 'REPv2',
    type: 'ERC20',
    address: '0x221657776846890989a759BA2973e427DfF5C9bB',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x221657776846890989a759BA2973e427DfF5C9bB/logo.png',
    decimals: 18
  },
  {
    id: 50,
    chainId: 1,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    type: 'ERC20',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    decimals: 8
  },
  {
    id: 51,
    chainId: 1,
    name: 'UNION Protocol Governance Token',
    symbol: 'UNN',
    type: 'ERC20',
    address: '0x226f7b842E0F0120b7E194D05432b3fd14773a9D',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x226f7b842E0F0120b7E194D05432b3fd14773a9D/logo.png',
    decimals: 18
  },
  {
    id: 52,
    chainId: 1,
    name: 'Unisocks Edition 0',
    symbol: 'SOCKS',
    type: 'ERC20',
    address: '0x23B608675a2B2fB1890d3ABBd85c5775c51691d5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x23B608675a2B2fB1890d3ABBd85c5775c51691d5/logo.png',
    decimals: 18
  },
  {
    id: 53,
    chainId: 1,
    name: 'Bidao',
    symbol: 'BID',
    type: 'ERC20',
    address: '0x25e1474170c4c0aA64fa98123bdc8dB49D7802fa',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x25e1474170c4c0aA64fa98123bdc8dB49D7802fa/logo.png',
    decimals: 18
  },
  {
    id: 54,
    chainId: 1,
    name: 'Cellframe',
    symbol: 'CELL',
    type: 'ERC20',
    address: '0x26c8AFBBFE1EBaca03C2bB082E69D0476Bffe099',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x26c8AFBBFE1EBaca03C2bB082E69D0476Bffe099/logo.png',
    decimals: 18
  },
  {
    id: 55,
    chainId: 1,
    name: 'DegenVC',
    symbol: 'DGVC',
    type: 'ERC20',
    address: '0x26E43759551333e57F073bb0772F50329A957b30',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x26E43759551333e57F073bb0772F50329A957b30/logo.png',
    decimals: 18
  },
  {
    id: 56,
    chainId: 1,
    name: 'DOGE KILLER',
    symbol: 'LEASH',
    type: 'ERC20',
    address: '0x27C70Cd1946795B66be9d954418546998b546634',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x27C70Cd1946795B66be9d954418546998b546634/logo.png',
    decimals: 18
  },
  {
    id: 57,
    chainId: 1,
    name: 'Froge Finance',
    symbol: 'FROGE',
    type: 'ERC20',
    address: '0x29502fE4d233EF0b45C3647101Fa1252cE0634BD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x29502fE4d233EF0b45C3647101Fa1252cE0634BD/logo.png',
    decimals: 9
  },
  {
    id: 58,
    chainId: 1,
    name: 'HEX',
    symbol: 'HEX',
    type: 'ERC20',
    address: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png',
    decimals: 8
  },
  {
    id: 59,
    chainId: 1,
    name: 'Cream Finance',
    symbol: 'CREAM',
    type: 'ERC20',
    address: '0x2ba592F78dB6436527729929AAf6c908497cB200',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2ba592F78dB6436527729929AAf6c908497cB200/logo.png',
    decimals: 18
  },
  {
    id: 60,
    chainId: 1,
    name: 'Mettalex',
    symbol: 'MTLX',
    type: 'ERC20',
    address: '0x2e1E15C44Ffe4Df6a0cb7371CD00d5028e571d14',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2e1E15C44Ffe4Df6a0cb7371CD00d5028e571d14/logo.png',
    decimals: 18
  },
  {
    id: 61,
    chainId: 1,
    name: 'Yfi.mobi',
    symbol: 'YFIM',
    type: 'ERC20',
    address: '0x2e2f3246b6c65CCc4239c9Ee556EC143a7E5DE2c',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2e2f3246b6c65CCc4239c9Ee556EC143a7E5DE2c/logo.png',
    decimals: 18
  },
  {
    id: 62,
    chainId: 1,
    name: 'ZeroSwap',
    symbol: 'ZEE',
    type: 'ERC20',
    address: '0x2eDf094dB69d6Dcd487f1B3dB9febE2eeC0dd4c5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2eDf094dB69d6Dcd487f1B3dB9febE2eeC0dd4c5/logo.png',
    decimals: 18
  },
  {
    id: 63,
    chainId: 1,
    name: 'Decentr',
    symbol: 'DEC',
    type: 'ERC20',
    address: '0x30f271C9E86D2B7d00a6376Cd96A1cFBD5F0b9b3',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x30f271C9E86D2B7d00a6376Cd96A1cFBD5F0b9b3/logo.png',
    decimals: 18
  },
  {
    id: 64,
    chainId: 1,
    name: 'THORChain ETH.RUNE',
    symbol: 'RUNE',
    type: 'ERC20',
    address: '0x3155BA85D5F96b2d030a4966AF206230e46849cb',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3155BA85D5F96b2d030a4966AF206230e46849cb/logo.png',
    decimals: 18
  },
  {
    id: 65,
    chainId: 1,
    name: 'Akita Inu',
    symbol: 'AKITA',
    type: 'ERC20',
    address: '0x3301Ee63Fb29F863f2333Bd4466acb46CD8323E6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3301Ee63Fb29F863f2333Bd4466acb46CD8323E6/logo.png',
    decimals: 18
  },
  {
    id: 66,
    chainId: 1,
    name: 'Anatha',
    symbol: 'wANATHA',
    type: 'ERC20',
    address: '0x3383c5a8969Dc413bfdDc9656Eb80A1408E4bA20',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3383c5a8969Dc413bfdDc9656Eb80A1408E4bA20/logo.png',
    decimals: 18
  },
  {
    id: 67,
    chainId: 1,
    name: 'RAMP DEFI',
    symbol: 'RAMP',
    type: 'ERC20',
    address: '0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f/logo.png',
    decimals: 18
  },
  {
    id: 68,
    chainId: 1,
    name: 'MANTRA DAO',
    symbol: 'OM',
    type: 'ERC20',
    address: '0x3593D125a4f7849a1B059E64F4517A86Dd60c95d',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3593D125a4f7849a1B059E64F4517A86Dd60c95d/logo.png',
    decimals: 18
  },
  {
    id: 69,
    chainId: 1,
    name: 'PARSIQ',
    symbol: 'PRQ',
    type: 'ERC20',
    address: '0x362bc847A3a9637d3af6624EeC853618a43ed7D2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x362bc847A3a9637d3af6624EeC853618a43ed7D2/logo.png',
    decimals: 18
  },
  {
    id: 70,
    chainId: 1,
    name: 'The Sandbox',
    symbol: 'SAND',
    type: 'ERC20',
    address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3845badAde8e6dFF049820680d1F14bD3903a5d0/logo.png',
    decimals: 18
  },
  {
    id: 71,
    chainId: 1,
    name: 'FEG Token',
    symbol: 'FEGeth',
    type: 'ERC20',
    address: '0x389999216860AB8E0175387A0c90E5c52522C945',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x389999216860AB8E0175387A0c90E5c52522C945/logo.png',
    decimals: 9
  },
  {
    id: 72,
    chainId: 1,
    name: 'Concentrated Voting Power',
    symbol: 'CVP',
    type: 'ERC20',
    address: '0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1/logo.png',
    decimals: 18
  },
  {
    id: 73,
    chainId: 1,
    name: 'DSLA',
    symbol: 'DSLA',
    type: 'ERC20',
    address: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe/logo.png',
    decimals: 18
  },
  {
    id: 74,
    chainId: 1,
    name: 'Vidya',
    symbol: 'VIDYA',
    type: 'ERC20',
    address: '0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30/logo.png',
    decimals: 18
  },
  {
    id: 75,
    chainId: 1,
    name: 'Ren',
    symbol: 'REN',
    type: 'ERC20',
    address: '0x408e41876cCCDC0F92210600ef50372656052a38',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x408e41876cCCDC0F92210600ef50372656052a38/logo.png',
    decimals: 18
  },
  {
    id: 76,
    chainId: 1,
    name: 'SORA',
    symbol: 'XOR',
    type: 'ERC20',
    address: '0x40FD72257597aA14C7231A7B1aaa29Fce868F677',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x40FD72257597aA14C7231A7B1aaa29Fce868F677/logo.png',
    decimals: 18
  },
  {
    id: 77,
    chainId: 1,
    name: 'FunFair',
    symbol: 'FUN',
    type: 'ERC20',
    address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b/logo.png',
    decimals: 8
  },
  {
    id: 78,
    chainId: 1,
    name: 'GoBlank',
    symbol: 'BLANK',
    type: 'ERC20',
    address: '0x41A3Dba3D677E573636BA691a70ff2D606c29666',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x41A3Dba3D677E573636BA691a70ff2D606c29666/logo.png',
    decimals: 18
  },
  {
    id: 79,
    chainId: 1,
    name: 'Pickle Finance',
    symbol: 'PICKLE',
    type: 'ERC20',
    address: '0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5/logo.png',
    decimals: 18
  },
  {
    id: 80,
    chainId: 1,
    name: 'dForce',
    symbol: 'DF',
    type: 'ERC20',
    address: '0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0/logo.png',
    decimals: 18
  },
  {
    id: 81,
    chainId: 1,
    name: 'FLOKI',
    symbol: 'FLOKI',
    type: 'ERC20',
    address: '0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E/logo.png',
    decimals: 9
  },
  {
    id: 82,
    chainId: 1,
    name: 'Orchid',
    symbol: 'OXT',
    type: 'ERC20',
    address: '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4575f41308EC1483f3d399aa9a2826d74Da13Deb/logo.png',
    decimals: 18
  },
  {
    id: 83,
    chainId: 1,
    name: 'PAX Gold',
    symbol: 'PAXG',
    type: 'ERC20',
    address: '0x45804880De22913dAFE09f4980848ECE6EcbAf78',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x45804880De22913dAFE09f4980848ECE6EcbAf78/logo.png',
    decimals: 18
  },
  {
    id: 84,
    chainId: 1,
    name: 'WOO Network',
    symbol: 'WOO',
    type: 'ERC20',
    address: '0x4691937a7508860F876c9c0a2a617E7d9E945D4B',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4691937a7508860F876c9c0a2a617E7d9E945D4B/logo.png',
    decimals: 18
  },
  {
    id: 85,
    chainId: 1,
    name: 'Quant',
    symbol: 'QNT',
    type: 'ERC20',
    address: '0x4a220E6096B25EADb88358cb44068A3248254675',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4a220E6096B25EADb88358cb44068A3248254675/logo.png',
    decimals: 18
  },
  {
    id: 86,
    chainId: 1,
    name: 'Jupiter',
    symbol: 'JUP',
    type: 'ERC20',
    address: '0x4B1E80cAC91e2216EEb63e29B957eB91Ae9C2Be8',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4B1E80cAC91e2216EEb63e29B957eB91Ae9C2Be8/logo.png',
    decimals: 18
  },
  {
    id: 87,
    chainId: 1,
    name: 'Oraichain Token',
    symbol: 'ORAI',
    type: 'ERC20',
    address: '0x4c11249814f11b9346808179Cf06e71ac328c1b5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4c11249814f11b9346808179Cf06e71ac328c1b5/logo.png',
    decimals: 18
  },
  {
    id: 88,
    chainId: 1,
    name: 'TrueFi',
    symbol: 'TRU',
    type: 'ERC20',
    address: '0x4C19596f5aAfF459fA38B0f7eD92F11AE6543784',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4C19596f5aAfF459fA38B0f7eD92F11AE6543784/logo.png',
    decimals: 8
  },
  {
    id: 89,
    chainId: 1,
    name: 'MCDEX Token',
    symbol: 'MCB',
    type: 'ERC20',
    address: '0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42/logo.png',
    decimals: 18
  },
  {
    id: 90,
    chainId: 1,
    name: 'NuCypher',
    symbol: 'NU',
    type: 'ERC20',
    address: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4fE83213D56308330EC302a8BD641f1d0113A4Cc/logo.png',
    decimals: 18
  },
  {
    id: 91,
    chainId: 1,
    name: 'Razor Network',
    symbol: 'RAZOR',
    type: 'ERC20',
    address: '0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd/logo.png',
    decimals: 18
  },
  {
    id: 92,
    chainId: 1,
    name: 'Chainlink',
    symbol: 'LINK',
    type: 'ERC20',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    decimals: 18
  },
  {
    id: 93,
    chainId: 1,
    name: 'unFederalReserve',
    symbol: 'eRSDL',
    type: 'ERC20',
    address: '0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6/logo.png',
    decimals: 18
  },
  {
    id: 94,
    chainId: 1,
    name: 'pTokens BTC',
    symbol: 'pBTC',
    type: 'ERC20',
    address: '0x5228a22e72ccC52d415EcFd199F99D0665E7733b',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5228a22e72ccC52d415EcFd199F99D0665E7733b/logo.png',
    decimals: 18
  },
  {
    id: 95,
    chainId: 1,
    name: 'BarterTrade',
    symbol: 'BART',
    type: 'ERC20',
    address: '0x54C9EA2E9C9E8eD865Db4A4ce6711C2a0d5063Ba',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x54C9EA2E9C9E8eD865Db4A4ce6711C2a0d5063Ba/logo.png',
    decimals: 18
  },
  {
    id: 96,
    chainId: 1,
    name: 'REVV',
    symbol: 'REVV',
    type: 'ERC20',
    address: '0x557B933a7C2c45672B610F8954A3deB39a51A8Ca',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x557B933a7C2c45672B610F8954A3deB39a51A8Ca/logo.png',
    decimals: 18
  },
  {
    id: 97,
    chainId: 1,
    name: 'sUSD',
    symbol: 'sUSD',
    type: 'ERC20',
    address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51/logo.png',
    decimals: 18
  },
  {
    id: 98,
    chainId: 1,
    name: 'Hegic',
    symbol: 'HEGIC',
    type: 'ERC20',
    address: '0x584bC13c7D411c00c01A62e8019472dE68768430',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x584bC13c7D411c00c01A62e8019472dE68768430/logo.png',
    decimals: 18
  },
  {
    id: 99,
    chainId: 1,
    name: 'UnMarshal',
    symbol: 'MARSH',
    type: 'ERC20',
    address: '0x5a666c7d92E5fA7Edcb6390E4efD6d0CDd69cF37',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5a666c7d92E5fA7Edcb6390E4efD6d0CDd69cF37/logo.png',
    decimals: 18
  },
  {
    id: 100,
    chainId: 1,
    name: 'Xfinance',
    symbol: 'XFI',
    type: 'ERC20',
    address: '0x5BEfBB272290dD5b8521D4a938f6c4757742c430',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5BEfBB272290dD5b8521D4a938f6c4757742c430/logo.png',
    decimals: 18
  },
  {
    id: 101,
    chainId: 1,
    name: 'Dev',
    symbol: 'DEV',
    type: 'ERC20',
    address: '0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26/logo.png',
    decimals: 18
  },
  {
    id: 102,
    chainId: 1,
    name: 'BOND',
    symbol: 'BOND',
    type: 'ERC20',
    address: '0x5Dc02Ea99285E17656b8350722694c35154DB1E8',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5Dc02Ea99285E17656b8350722694c35154DB1E8/logo.png',
    decimals: 8
  },
  {
    id: 103,
    chainId: 1,
    name: 'DEXTF Token',
    symbol: 'DEXTF',
    type: 'ERC20',
    address: '0x5F64Ab1544D28732F0A24F4713c2C8ec0dA089f0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5F64Ab1544D28732F0A24F4713c2C8ec0dA089f0/logo.png',
    decimals: 18
  },
  {
    id: 104,
    chainId: 1,
    name: 'Liquity USD',
    symbol: 'LUSD',
    type: 'ERC20',
    address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png',
    decimals: 18
  },
  {
    id: 105,
    chainId: 1,
    name: 'iExec RLC',
    symbol: 'RLC',
    type: 'ERC20',
    address: '0x607F4C5BB672230e8672085532f7e901544a7375',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x607F4C5BB672230e8672085532f7e901544a7375/logo.png',
    decimals: 9
  },
  {
    id: 106,
    chainId: 1,
    name: 'Launchpool',
    symbol: 'LPOOL',
    type: 'ERC20',
    address: '0x6149C26Cd2f7b5CCdb32029aF817123F6E37Df5B',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6149C26Cd2f7b5CCdb32029aF817123F6E37Df5B/logo.png',
    decimals: 18
  },
  {
    id: 107,
    chainId: 1,
    name: 'cVault.finance',
    symbol: 'CORE',
    type: 'ERC20',
    address: '0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7/logo.png',
    decimals: 18
  },
  {
    id: 108,
    chainId: 1,
    name: 'Reflexer Ungovernance Token',
    symbol: 'FLX',
    type: 'ERC20',
    address: '0x6243d8CEA23066d098a15582d81a598b4e8391F4',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6243d8CEA23066d098a15582d81a598b4e8391F4/logo.png',
    decimals: 18
  },
  {
    id: 109,
    chainId: 1,
    name: 'AIOZ Network',
    symbol: 'AIOZ',
    type: 'ERC20',
    address: '0x626E8036dEB333b408Be468F951bdB42433cBF18',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x626E8036dEB333b408Be468F951bdB42433cBF18/logo.png',
    decimals: 18
  },
  {
    id: 110,
    chainId: 1,
    name: 'CyberFi Token',
    symbol: 'CFi',
    type: 'ERC20',
    address: '0x63b4f3e3fa4e438698CE330e365E831F7cCD1eF4',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x63b4f3e3fa4e438698CE330e365E831F7cCD1eF4/logo.png',
    decimals: 18
  },
  {
    id: 111,
    chainId: 1,
    name: 'Wise Token',
    symbol: 'WISE',
    type: 'ERC20',
    address: '0x66a0f676479Cee1d7373f3DC2e2952778BfF5bd6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x66a0f676479Cee1d7373f3DC2e2952778BfF5bd6/logo.png',
    decimals: 18
  },
  {
    id: 112,
    chainId: 1,
    name: 'Kylin',
    symbol: 'KYL',
    type: 'ERC20',
    address: '0x67B6D479c7bB412C54e03dCA8E1Bc6740ce6b99C',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x67B6D479c7bB412C54e03dCA8E1Bc6740ce6b99C/logo.png',
    decimals: 18
  },
  {
    id: 113,
    chainId: 1,
    name: 'Benchmark Protocol',
    symbol: 'MARK',
    type: 'ERC20',
    address: '0x67c597624B17b16fb77959217360B7cD18284253',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x67c597624B17b16fb77959217360B7cD18284253/logo.png',
    decimals: 9
  },
  {
    id: 114,
    chainId: 1,
    name: 'Gnosis',
    symbol: 'GNO',
    type: 'ERC20',
    address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png',
    decimals: 18
  },
  {
    id: 115,
    chainId: 1,
    name: 'chads.vc',
    symbol: 'CHADS',
    type: 'ERC20',
    address: '0x69692D3345010a207b759a7D1af6fc7F38b35c5E',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x69692D3345010a207b759a7D1af6fc7F38b35c5E/logo.png',
    decimals: 18
  },
  {
    id: 116,
    chainId: 1,
    name: 'Poolz Finance',
    symbol: 'POOLZ',
    type: 'ERC20',
    address: '0x69A95185ee2a045CDC4bCd1b1Df10710395e4e23',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x69A95185ee2a045CDC4bCd1b1Df10710395e4e23/logo.png',
    decimals: 18
  },
  {
    id: 117,
    chainId: 1,
    name: 'Mask Network',
    symbol: 'MASK',
    type: 'ERC20',
    address: '0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074/logo.png',
    decimals: 18
  },
  {
    id: 118,
    chainId: 1,
    name: 'Dai',
    symbol: 'DAI',
    type: 'ERC20',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    decimals: 18
  },
  {
    id: 119,
    chainId: 1,
    name: 'SushiSwap',
    symbol: 'SUSHI',
    type: 'ERC20',
    address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png',
    decimals: 18
  },
  {
    id: 120,
    chainId: 1,
    name: 'Fyooz',
    symbol: 'FYZ',
    type: 'ERC20',
    address: '0x6BFf2fE249601ed0Db3a87424a2E923118BB0312',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6BFf2fE249601ed0Db3a87424a2E923118BB0312/logo.png',
    decimals: 18
  },
  {
    id: 121,
    chainId: 1,
    name: 'Holo',
    symbol: 'HOT',
    type: 'ERC20',
    address: '0x6c6EE5e31d828De241282B9606C8e98Ea48526E2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6c6EE5e31d828De241282B9606C8e98Ea48526E2/logo.png',
    decimals: 18
  },
  {
    id: 122,
    chainId: 1,
    name: 'QuiverX',
    symbol: 'QRX',
    type: 'ERC20',
    address: '0x6e0daDE58D2d89eBBe7aFc384e3E4f15b70b14D8',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6e0daDE58D2d89eBBe7aFc384e3E4f15b70b14D8/logo.png',
    decimals: 18
  },
  {
    id: 123,
    chainId: 1,
    name: 'UniTrade',
    symbol: 'TRADE',
    type: 'ERC20',
    address: '0x6F87D756DAf0503d08Eb8993686c7Fc01Dc44fB1',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6F87D756DAf0503d08Eb8993686c7Fc01Dc44fB1/logo.png',
    decimals: 18
  },
  {
    id: 124,
    chainId: 1,
    name: 'Umbrella Network',
    symbol: 'UMB',
    type: 'ERC20',
    address: '0x6fC13EACE26590B80cCCAB1ba5d51890577D83B2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6fC13EACE26590B80cCCAB1ba5d51890577D83B2/logo.png',
    decimals: 18
  },
  {
    id: 125,
    chainId: 1,
    name: 'Bird.Money',
    symbol: 'BIRD',
    type: 'ERC20',
    address: '0x70401dFD142A16dC7031c56E862Fc88Cb9537Ce0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x70401dFD142A16dC7031c56E862Fc88Cb9537Ce0/logo.png',
    decimals: 18
  },
  {
    id: 126,
    chainId: 1,
    name: 'Axion',
    symbol: 'AXN',
    type: 'ERC20',
    address: '0x71F85B2E46976bD21302B64329868fd15eb0D127',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x71F85B2E46976bD21302B64329868fd15eb0D127/logo.png',
    decimals: 18
  },
  {
    id: 127,
    chainId: 1,
    name: 'Bridge Mutual',
    symbol: 'BMI',
    type: 'ERC20',
    address: '0x725C263e32c72dDC3A19bEa12C5a0479a81eE688',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x725C263e32c72dDC3A19bEa12C5a0479a81eE688/logo.png',
    decimals: 18
  },
  {
    id: 128,
    chainId: 1,
    name: 'Paypolitan Token',
    symbol: 'EPAN',
    type: 'ERC20',
    address: '0x72630B1e3B42874bf335020Ba0249e3E9e47Bafc',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x72630B1e3B42874bf335020Ba0249e3E9e47Bafc/logo.png',
    decimals: 18
  },
  {
    id: 129,
    chainId: 1,
    name: 'Metaverse Index',
    symbol: 'MVI',
    type: 'ERC20',
    address: '0x72e364F2ABdC788b7E918bc238B21f109Cd634D7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x72e364F2ABdC788b7E918bc238B21f109Cd634D7/logo.png',
    decimals: 18
  },
  {
    id: 130,
    chainId: 1,
    name: 'SmartCredit Token',
    symbol: 'SMARTCREDIT',
    type: 'ERC20',
    address: '0x72e9D9038cE484EE986FEa183f8d8Df93f9aDA13',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x72e9D9038cE484EE986FEa183f8d8Df93f9aDA13/logo.png',
    decimals: 18
  },
  {
    id: 131,
    chainId: 1,
    name: 'Dogelon',
    symbol: 'ELON',
    type: 'ERC20',
    address: '0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3/logo.png',
    decimals: 18
  },
  {
    id: 132,
    chainId: 1,
    name: 'XCAD Network',
    symbol: 'XCAD',
    type: 'ERC20',
    address: '0x7659CE147D0e714454073a5dd7003544234b6Aa0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7659CE147D0e714454073a5dd7003544234b6Aa0/logo.png',
    decimals: 18
  },
  {
    id: 133,
    chainId: 1,
    name: 'Boolberry',
    symbol: 'BBR',
    type: 'ERC20',
    address: '0x7671904eed7f10808B664fc30BB8693FD7237abF',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7671904eed7f10808B664fc30BB8693FD7237abF/logo.png',
    decimals: 18
  },
  {
    id: 134,
    chainId: 1,
    name: 'Tornado Cash',
    symbol: 'TORN',
    type: 'ERC20',
    address: '0x77777FeDdddFfC19Ff86DB637967013e6C6A116C',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x77777FeDdddFfC19Ff86DB637967013e6C6A116C/logo.png',
    decimals: 18
  },
  {
    id: 135,
    chainId: 1,
    name: 'WAXE',
    symbol: 'WAXE',
    type: 'ERC20',
    address: '0x7a2Bc711E19ba6aff6cE8246C546E8c4B4944DFD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7a2Bc711E19ba6aff6cE8246C546E8c4B4944DFD/logo.png',
    decimals: 8
  },
  {
    id: 136,
    chainId: 1,
    name: 'DFOhub',
    symbol: 'buidl',
    type: 'ERC20',
    address: '0x7b123f53421b1bF8533339BFBdc7C98aA94163db',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7b123f53421b1bF8533339BFBdc7C98aA94163db/logo.png',
    decimals: 18
  },
  {
    id: 137,
    chainId: 1,
    name: 'Polygon',
    symbol: 'MATIC',
    type: 'ERC20',
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    decimals: 18
  },
  {
    id: 138,
    chainId: 1,
    name: 'Robonomics',
    symbol: 'XRT',
    type: 'ERC20',
    address: '0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7/logo.png',
    decimals: 9
  },
  {
    id: 139,
    chainId: 1,
    name: 'xToken',
    symbol: 'XTK',
    type: 'ERC20',
    address: '0x7F3EDcdD180Dbe4819Bd98FeE8929b5cEdB3AdEB',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7F3EDcdD180Dbe4819Bd98FeE8929b5cEdB3AdEB/logo.png',
    decimals: 18
  },
  {
    id: 140,
    chainId: 1,
    name: 'Aave',
    symbol: 'AAVE',
    type: 'ERC20',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
    decimals: 18
  },
  {
    id: 141,
    chainId: 1,
    name: 'Tenset',
    symbol: '10SET',
    type: 'ERC20',
    address: '0x7FF4169a6B5122b664c51c95727d87750eC07c84',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7FF4169a6B5122b664c51c95727d87750eC07c84/logo.png',
    decimals: 18
  },
  {
    id: 142,
    chainId: 1,
    name: 'Origin Protocol',
    symbol: 'OGN',
    type: 'ERC20',
    address: '0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26/logo.png',
    decimals: 18
  },
  {
    id: 143,
    chainId: 1,
    name: 'Polkastarter',
    symbol: 'POLS',
    type: 'ERC20',
    address: '0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa/logo.png',
    decimals: 18
  },
  {
    id: 144,
    chainId: 1,
    name: 'Unibright',
    symbol: 'UBT',
    type: 'ERC20',
    address: '0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e/logo.png',
    decimals: 8
  },
  {
    id: 145,
    chainId: 1,
    name: 'DIA',
    symbol: 'DIA',
    type: 'ERC20',
    address: '0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419/logo.png',
    decimals: 18
  },
  {
    id: 146,
    chainId: 1,
    name: 'Frax',
    symbol: 'FRAX',
    type: 'ERC20',
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x853d955aCEf822Db058eb8505911ED77F175b99e/logo.png',
    decimals: 18
  },
  {
    id: 147,
    chainId: 1,
    name: 'KEEP Token',
    symbol: 'KEEP',
    type: 'ERC20',
    address: '0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC/logo.png',
    decimals: 18
  },
  {
    id: 148,
    chainId: 1,
    name: '88mph.app',
    symbol: 'MPH',
    type: 'ERC20',
    address: '0x8888801aF4d980682e47f1A9036e589479e835C5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8888801aF4d980682e47f1A9036e589479e835C5/logo.png',
    decimals: 18
  },
  {
    id: 149,
    chainId: 1,
    name: 'Alchemist',
    symbol: '⚗️',
    type: 'ERC20',
    address: '0x88ACDd2a6425c3FaAE4Bc9650Fd7E27e0Bebb7aB',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x88ACDd2a6425c3FaAE4Bc9650Fd7E27e0Bebb7aB/logo.png',
    decimals: 18
  },
  {
    id: 150,
    chainId: 1,
    name: 'Dego Finance',
    symbol: 'DEGO',
    type: 'ERC20',
    address: '0x88EF27e69108B2633F8E1C184CC37940A075cC02',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x88EF27e69108B2633F8E1C184CC37940A075cC02/logo.png',
    decimals: 18
  },
  {
    id: 151,
    chainId: 1,
    name: 'pNetwork',
    symbol: 'PNT',
    type: 'ERC20',
    address: '0x89Ab32156e46F46D02ade3FEcbe5Fc4243B9AAeD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x89Ab32156e46F46D02ade3FEcbe5Fc4243B9AAeD/logo.png',
    decimals: 18
  },
  {
    id: 152,
    chainId: 1,
    name: 'Finxflo',
    symbol: 'FXF',
    type: 'ERC20',
    address: '0x8a40c222996f9F3431f63Bf80244C36822060f12',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8a40c222996f9F3431f63Bf80244C36822060f12/logo.png',
    decimals: 18
  },
  {
    id: 153,
    chainId: 1,
    name: 'GET',
    symbol: 'GET',
    type: 'ERC20',
    address: '0x8a854288a5976036A725879164Ca3e91d30c6A1B',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8a854288a5976036A725879164Ca3e91d30c6A1B/logo.png',
    decimals: 18
  },
  {
    id: 154,
    chainId: 1,
    name: 'Saitama Inu',
    symbol: 'SAITAMA',
    type: 'ERC20',
    address: '0x8B3192f5eEBD8579568A2Ed41E6FEB402f93f73F',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8B3192f5eEBD8579568A2Ed41E6FEB402f93f73F/logo.png',
    decimals: 9
  },
  {
    id: 155,
    chainId: 1,
    name: 'PolkaFoundry',
    symbol: 'PKF',
    type: 'ERC20',
    address: '0x8B39B70E39Aa811b69365398e0aACe9bee238AEb',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8B39B70E39Aa811b69365398e0aACe9bee238AEb/logo.png',
    decimals: 18
  },
  {
    id: 156,
    chainId: 1,
    name: 'Function X',
    symbol: 'FX',
    type: 'ERC20',
    address: '0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057/logo.png',
    decimals: 18
  },
  {
    id: 157,
    chainId: 1,
    name: 'Swipe',
    symbol: 'SXP',
    type: 'ERC20',
    address: '0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9/logo.png',
    decimals: 18
  },
  {
    id: 158,
    chainId: 1,
    name: 'tBTC',
    symbol: 'TBTC',
    type: 'ERC20',
    address: '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa/logo.png',
    decimals: 18
  },
  {
    id: 159,
    chainId: 1,
    name: 'SingularityNET Token',
    symbol: 'AGI',
    type: 'ERC20',
    address: '0x8eB24319393716668D768dCEC29356ae9CfFe285',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8eB24319393716668D768dCEC29356ae9CfFe285/logo.png',
    decimals: 8
  },
  {
    id: 160,
    chainId: 1,
    name: 'Request Token',
    symbol: 'REQ',
    type: 'ERC20',
    address: '0x8f8221aFbB33998d8584A2B05749bA73c37a938a',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x8f8221aFbB33998d8584A2B05749bA73c37a938a/logo.png',
    decimals: 18
  },
  {
    id: 161,
    chainId: 1,
    name: 'WHALE',
    symbol: 'WHALE',
    type: 'ERC20',
    address: '0x9355372396e3F6daF13359B7b607a3374cc638e0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9355372396e3F6daF13359B7b607a3374cc638e0/logo.png',
    decimals: 4
  },
  {
    id: 162,
    chainId: 1,
    name: 'Pinakion',
    symbol: 'PNK',
    type: 'ERC20',
    address: '0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d/logo.png',
    decimals: 18
  },
  {
    id: 163,
    chainId: 1,
    name: 'Evolution Land Global Token',
    symbol: 'RING',
    type: 'ERC20',
    address: '0x9469D013805bFfB7D3DEBe5E7839237e535ec483',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9469D013805bFfB7D3DEBe5E7839237e535ec483/logo.png',
    decimals: 18
  },
  {
    id: 164,
    chainId: 1,
    name: 'Cardstack',
    symbol: 'CARD',
    type: 'ERC20',
    address: '0x954b890704693af242613edEf1B603825afcD708',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x954b890704693af242613edEf1B603825afcD708/logo.png',
    decimals: 18
  },
  {
    id: 165,
    chainId: 1,
    name: 'Fei USD',
    symbol: 'FEI',
    type: 'ERC20',
    address: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x956F47F50A910163D8BF957Cf5846D573E7f87CA/logo.png',
    decimals: 18
  },
  {
    id: 166,
    chainId: 1,
    name: 'APY.Finance',
    symbol: 'APY',
    type: 'ERC20',
    address: '0x95a4492F028aa1fd432Ea71146b433E7B4446611',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x95a4492F028aa1fd432Ea71146b433E7B4446611/logo.png',
    decimals: 18
  },
  {
    id: 167,
    chainId: 1,
    name: 'SHIBA INU',
    symbol: 'SHIB',
    type: 'ERC20',
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE/logo.png',
    decimals: 18
  },
  {
    id: 168,
    chainId: 1,
    name: 'DeFi Yield Protocol',
    symbol: 'DYP',
    type: 'ERC20',
    address: '0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17/logo.png',
    decimals: 18
  },
  {
    id: 169,
    chainId: 1,
    name: 'Ocean Protocol',
    symbol: 'OCEAN',
    type: 'ERC20',
    address: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x967da4048cD07aB37855c090aAF366e4ce1b9F48/logo.png',
    decimals: 18
  },
  {
    id: 170,
    chainId: 1,
    name: 'Strong',
    symbol: 'STRONG',
    type: 'ERC20',
    address: '0x990f341946A3fdB507aE7e52d17851B87168017c',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x990f341946A3fdB507aE7e52d17851B87168017c/logo.png',
    decimals: 18
  },
  {
    id: 171,
    chainId: 1,
    name: 'Shopping.io',
    symbol: 'SPI',
    type: 'ERC20',
    address: '0x9B02dD390a603Add5c07f9fd9175b7DABE8D63B7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9B02dD390a603Add5c07f9fd9175b7DABE8D63B7/logo.png',
    decimals: 18
  },
  {
    id: 172,
    chainId: 1,
    name: 'Binance Wrapped BTC',
    symbol: 'BBTC',
    type: 'ERC20',
    address: '0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541/logo.png',
    decimals: 8
  },
  {
    id: 173,
    chainId: 1,
    name: 'Doki Doki Finance',
    symbol: 'DOKI',
    type: 'ERC20',
    address: '0x9cEB84f92A0561fa3Cc4132aB9c0b76A59787544',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9cEB84f92A0561fa3Cc4132aB9c0b76A59787544/logo.png',
    decimals: 18
  },
  {
    id: 174,
    chainId: 1,
    name: 'Delta Financial',
    symbol: 'DELTA',
    type: 'ERC20',
    address: '0x9EA3b5b4EC044b70375236A281986106457b20EF',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9EA3b5b4EC044b70375236A281986106457b20EF/logo.png',
    decimals: 18
  },
  {
    id: 175,
    chainId: 1,
    name: 'Unistake',
    symbol: 'UNISTAKE',
    type: 'ERC20',
    address: '0x9Ed8e7C9604790F7Ec589F99b94361d8AAB64E5E',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9Ed8e7C9604790F7Ec589F99b94361d8AAB64E5E/logo.png',
    decimals: 18
  },
  {
    id: 176,
    chainId: 1,
    name: 'Tadpole',
    symbol: 'TAD',
    type: 'ERC20',
    address: '0x9f7229aF0c4b9740e207Ea283b9094983f78ba04',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9f7229aF0c4b9740e207Ea283b9094983f78ba04/logo.png',
    decimals: 18
  },
  {
    id: 177,
    chainId: 1,
    name: 'Maker',
    symbol: 'MKR',
    type: 'ERC20',
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png',
    decimals: 18
  },
  {
    id: 178,
    chainId: 1,
    name: 'GraphLinq',
    symbol: 'GLQ',
    type: 'ERC20',
    address: '0x9F9c8ec3534c3cE16F928381372BfbFBFb9F4D24',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9F9c8ec3534c3cE16F928381372BfbFBFb9F4D24/logo.png',
    decimals: 18
  },
  {
    id: 179,
    chainId: 1,
    name: 'Harvest Finance',
    symbol: 'FARM',
    type: 'ERC20',
    address: '0xa0246c9032bC3A600820415aE600c6388619A14D',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa0246c9032bC3A600820415aE600c6388619A14D/logo.png',
    decimals: 18
  },
  {
    id: 180,
    chainId: 1,
    name: 'Wrapped CrescoFin',
    symbol: 'wCRES',
    type: 'ERC20',
    address: '0xa0afAA285Ce85974c3C881256cB7F225e3A1178a',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa0afAA285Ce85974c3C881256cB7F225e3A1178a/logo.png',
    decimals: 18
  },
  {
    id: 181,
    chainId: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    type: 'ERC20',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    decimals: 6
  },
  {
    id: 182,
    chainId: 1,
    name: 'Aragon',
    symbol: 'ANT',
    type: 'ERC20',
    address: '0xa117000000f279D81A1D3cc75430fAA017FA5A2e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa117000000f279D81A1D3cc75430fAA017FA5A2e/logo.png',
    decimals: 18
  },
  {
    id: 183,
    chainId: 1,
    name: 'RFOX',
    symbol: 'RFOX',
    type: 'ERC20',
    address: '0xa1d6Df714F91DeBF4e0802A542E13067f31b8262',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa1d6Df714F91DeBF4e0802A542E13067f31b8262/logo.png',
    decimals: 18
  },
  {
    id: 184,
    chainId: 1,
    name: 'Lattice Token',
    symbol: 'LTX',
    type: 'ERC20',
    address: '0xa393473d64d2F9F026B60b6Df7859A689715d092',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa393473d64d2F9F026B60b6Df7859A689715d092/logo.png',
    decimals: 8
  },
  {
    id: 185,
    chainId: 1,
    name: 'Meta',
    symbol: 'MTA',
    type: 'ERC20',
    address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2/logo.png',
    decimals: 18
  },
  {
    id: 186,
    chainId: 1,
    name: 'Rubic',
    symbol: 'RBC',
    type: 'ERC20',
    address: '0xA4EED63db85311E22dF4473f87CcfC3DaDCFA3E3',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA4EED63db85311E22dF4473f87CcfC3DaDCFA3E3/logo.png',
    decimals: 18
  },
  {
    id: 187,
    chainId: 1,
    name: 'LUKSO',
    symbol: 'LYXe',
    type: 'ERC20',
    address: '0xA8b919680258d369114910511cc87595aec0be6D',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA8b919680258d369114910511cc87595aec0be6D/logo.png',
    decimals: 18
  },
  {
    id: 188,
    chainId: 1,
    name: 'Syntropy',
    symbol: 'NOIA',
    type: 'ERC20',
    address: '0xa8c8CfB141A3bB59FEA1E2ea6B79b5ECBCD7b6ca',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xa8c8CfB141A3bB59FEA1E2ea6B79b5ECBCD7b6ca/logo.png',
    decimals: 18
  },
  {
    id: 189,
    chainId: 1,
    name: 'Bella Protocol',
    symbol: 'BEL',
    type: 'ERC20',
    address: '0xA91ac63D040dEB1b7A5E4d4134aD23eb0ba07e14',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA91ac63D040dEB1b7A5E4d4134aD23eb0ba07e14/logo.png',
    decimals: 18
  },
  {
    id: 190,
    chainId: 1,
    name: 'ETH 2x Flexible Leverage Index',
    symbol: 'ETH2x-FLI',
    type: 'ERC20',
    address: '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD/logo.png',
    decimals: 18
  },
  {
    id: 191,
    chainId: 1,
    name: 'Trace Token',
    symbol: 'TRAC',
    type: 'ERC20',
    address: '0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F/logo.png',
    decimals: 18
  },
  {
    id: 192,
    chainId: 1,
    name: 'Celsius',
    symbol: 'CEL',
    type: 'ERC20',
    address: '0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d/logo.png',
    decimals: 4
  },
  {
    id: 193,
    chainId: 1,
    name: 'Monolith TKN',
    symbol: 'TKN',
    type: 'ERC20',
    address: '0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a/logo.png',
    decimals: 8
  },
  {
    id: 194,
    chainId: 1,
    name: 'Crowns',
    symbol: 'CWS',
    type: 'ERC20',
    address: '0xaC0104Cca91D167873B8601d2e71EB3D4D8c33e0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaC0104Cca91D167873B8601d2e71EB3D4D8c33e0/logo.png',
    decimals: 18
  },
  {
    id: 195,
    chainId: 1,
    name: 'OptionRoom Token',
    symbol: 'ROOM',
    type: 'ERC20',
    address: '0xAd4f86a25bbc20FfB751f2FAC312A0B4d8F88c64',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xAd4f86a25bbc20FfB751f2FAC312A0B4d8F88c64/logo.png',
    decimals: 18
  },
  {
    id: 196,
    chainId: 1,
    name: 'UniCrypt',
    symbol: 'UNCX',
    type: 'ERC20',
    address: '0xaDB2437e6F65682B85F814fBc12FeC0508A7B1D0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaDB2437e6F65682B85F814fBc12FeC0508A7B1D0/logo.png',
    decimals: 18
  },
  {
    id: 197,
    chainId: 1,
    name: 'Ambire AdEx',
    symbol: 'ADX',
    type: 'ERC20',
    address: '0xADE00C28244d5CE17D72E40330B1c318cD12B7c3',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xADE00C28244d5CE17D72E40330B1c318cD12B7c3/logo.png',
    decimals: 18
  },
  {
    id: 198,
    chainId: 1,
    name: 'YOP',
    symbol: 'YOP',
    type: 'ERC20',
    address: '0xAE1eaAE3F627AAca434127644371b67B18444051',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xAE1eaAE3F627AAca434127644371b67B18444051/logo.png',
    decimals: 8
  },
  {
    id: 199,
    chainId: 1,
    name: 'LGCY Network',
    symbol: 'LGCY',
    type: 'ERC20',
    address: '0xaE697F994Fc5eBC000F8e22EbFfeE04612f98A0d',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaE697F994Fc5eBC000F8e22EbFfeE04612f98A0d/logo.png',
    decimals: 18
  },
  {
    id: 200,
    chainId: 1,
    name: 'Rio Fuel Token',
    symbol: 'RFuel',
    type: 'ERC20',
    address: '0xaf9f549774ecEDbD0966C52f250aCc548D3F36E5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xaf9f549774ecEDbD0966C52f250aCc548D3F36E5/logo.png',
    decimals: 18
  },
  {
    id: 201,
    chainId: 1,
    name: 'Zenfuse',
    symbol: 'ZEFU',
    type: 'ERC20',
    address: '0xB1e9157c2Fdcc5a856C8DA8b2d89b6C32b3c1229',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB1e9157c2Fdcc5a856C8DA8b2d89b6C32b3c1229/logo.png',
    decimals: 18
  },
  {
    id: 202,
    chainId: 1,
    name: 'Minds',
    symbol: 'MINDS',
    type: 'ERC20',
    address: '0xB26631c6dda06aD89B93C71400D25692de89c068',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB26631c6dda06aD89B93C71400D25692de89c068/logo.png',
    decimals: 18
  },
  {
    id: 203,
    chainId: 1,
    name: 'MahaDAO',
    symbol: 'MAHA',
    type: 'ERC20',
    address: '0xB4d930279552397bbA2ee473229f89Ec245bc365',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB4d930279552397bbA2ee473229f89Ec245bc365/logo.png',
    decimals: 18
  },
  {
    id: 204,
    chainId: 1,
    name: 'Nexo',
    symbol: 'NEXO',
    type: 'ERC20',
    address: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206/logo.png',
    decimals: 18
  },
  {
    id: 205,
    chainId: 1,
    name: 'SYNC',
    symbol: 'SYNC',
    type: 'ERC20',
    address: '0xB6ff96B8A8d214544Ca0dBc9B33f7AD6503eFD32',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB6ff96B8A8d214544Ca0dBc9B33f7AD6503eFD32/logo.png',
    decimals: 18
  },
  {
    id: 206,
    chainId: 1,
    name: 'saffron.finance',
    symbol: 'SFI',
    type: 'ERC20',
    address: '0xb753428af26E81097e7fD17f40c88aaA3E04902c',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xb753428af26E81097e7fD17f40c88aaA3E04902c/logo.png',
    decimals: 18
  },
  {
    id: 207,
    chainId: 1,
    name: 'Stabilize Token',
    symbol: 'STBZ',
    type: 'ERC20',
    address: '0xB987D48Ed8f2C468D52D6405624EADBa5e76d723',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB987D48Ed8f2C468D52D6405624EADBa5e76d723/logo.png',
    decimals: 18
  },
  {
    id: 208,
    chainId: 1,
    name: 'K21',
    symbol: 'K21',
    type: 'ERC20',
    address: '0xB9d99C33eA2d86EC5eC6b8A4dD816EBBA64404AF',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xB9d99C33eA2d86EC5eC6b8A4dD816EBBA64404AF/logo.png',
    decimals: 18
  },
  {
    id: 209,
    chainId: 1,
    name: '0chain',
    symbol: 'ZCN',
    type: 'ERC20',
    address: '0xb9EF770B6A5e12E45983C5D80545258aA38F3B78',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xb9EF770B6A5e12E45983C5D80545258aA38F3B78/logo.png',
    decimals: 10
  },
  {
    id: 210,
    chainId: 1,
    name: 'Balancer',
    symbol: 'BAL',
    type: 'ERC20',
    address: '0xba100000625a3754423978a60c9317c58a424e3D',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png',
    decimals: 18
  },
  {
    id: 211,
    chainId: 1,
    name: 'Band Protocol',
    symbol: 'BAND',
    type: 'ERC20',
    address: '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55/logo.png',
    decimals: 18
  },
  {
    id: 212,
    chainId: 1,
    name: 'Swapfolio',
    symbol: 'SWFL',
    type: 'ERC20',
    address: '0xBa21Ef4c9f433Ede00badEFcC2754B8E74bd538A',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xBa21Ef4c9f433Ede00badEFcC2754B8E74bd538A/logo.png',
    decimals: 18
  },
  {
    id: 213,
    chainId: 1,
    name: 'Loopring',
    symbol: 'LRC',
    type: 'ERC20',
    address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD/logo.png',
    decimals: 18
  },
  {
    id: 214,
    chainId: 1,
    name: 'Ethernity Chain',
    symbol: 'ERN',
    type: 'ERC20',
    address: '0xBBc2AE13b23d715c30720F079fcd9B4a74093505',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xBBc2AE13b23d715c30720F079fcd9B4a74093505/logo.png',
    decimals: 18
  },
  {
    id: 215,
    chainId: 1,
    name: 'Perpetual',
    symbol: 'PERP',
    type: 'ERC20',
    address: '0xbC396689893D065F41bc2C6EcbeE5e0085233447',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xbC396689893D065F41bc2C6EcbeE5e0085233447/logo.png',
    decimals: 18
  },
  {
    id: 216,
    chainId: 1,
    name: 'StormX',
    symbol: 'STMX',
    type: 'ERC20',
    address: '0xbE9375C6a420D2eEB258962efB95551A5b722803',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xbE9375C6a420D2eEB258962efB95551A5b722803/logo.png',
    decimals: 18
  },
  {
    id: 217,
    chainId: 1,
    name: 'GYSR',
    symbol: 'GYSR',
    type: 'ERC20',
    address: '0xbEa98c05eEAe2f3bC8c3565Db7551Eb738c8CCAb',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xbEa98c05eEAe2f3bC8c3565Db7551Eb738c8CCAb/logo.png',
    decimals: 18
  },
  {
    id: 218,
    chainId: 1,
    name: 'World Token',
    symbol: 'WORLD',
    type: 'ERC20',
    address: '0xBF494F02EE3FdE1F20BEE6242bCe2d1ED0c15e47',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xBF494F02EE3FdE1F20BEE6242bCe2d1ED0c15e47/logo.png',
    decimals: 18
  },
  {
    id: 219,
    chainId: 1,
    name: 'Compound',
    symbol: 'COMP',
    type: 'ERC20',
    address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png',
    decimals: 18
  },
  {
    id: 220,
    chainId: 1,
    name: 'Synthetix',
    symbol: 'SNX',
    type: 'ERC20',
    address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets//logo.png',
    decimals: 18
  },
  {
    id: 221,
    chainId: 1,
    name: 'DLP Duck Token',
    symbol: 'DUCK',
    type: 'ERC20',
    address: '0xC0bA369c8Db6eB3924965e5c4FD0b4C1B91e305F',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC0bA369c8Db6eB3924965e5c4FD0b4C1B91e305F/logo.png',
    decimals: 18
  },
  {
    id: 222,
    chainId: 1,
    name: 'Ethereum Name Service',
    symbol: 'ENS',
    type: 'ERC20',
    address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72/logo.png',
    decimals: 18
  },
  {
    id: 223,
    chainId: 1,
    name: 'Chain Games',
    symbol: 'CHAIN',
    type: 'ERC20',
    address: '0xC4C2614E694cF534D407Ee49F8E44D125E4681c4',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC4C2614E694cF534D407Ee49F8E44D125E4681c4/logo.png',
    decimals: 18
  },
  {
    id: 224,
    chainId: 1,
    name: 'ZEN Exchange Token',
    symbol: 'ZCX',
    type: 'ERC20',
    address: '0xC52C326331E9Ce41F04484d3B5E5648158028804',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC52C326331E9Ce41F04484d3B5E5648158028804/logo.png',
    decimals: 18
  },
  {
    id: 225,
    chainId: 1,
    name: 'PowerTrade Fuel',
    symbol: 'PTF',
    type: 'ERC20',
    address: '0xC57d533c50bC22247d49a368880fb49a1caA39F7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC57d533c50bC22247d49a368880fb49a1caA39F7/logo.png',
    decimals: 18
  },
  {
    id: 226,
    chainId: 1,
    name: 'Decentralized Insurance Protocol',
    symbol: 'DIP',
    type: 'ERC20',
    address: '0xc719d010B63E5bbF2C0551872CD5316ED26AcD83',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xc719d010B63E5bbF2C0551872CD5316ED26AcD83/logo.png',
    decimals: 18
  },
  {
    id: 227,
    chainId: 1,
    name: 'Tribe',
    symbol: 'TRIBE',
    type: 'ERC20',
    address: '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B/logo.png',
    decimals: 18
  },
  {
    id: 228,
    chainId: 1,
    name: 'Convergence',
    symbol: 'CONV',
    type: 'ERC20',
    address: '0xc834Fa996fA3BeC7aAD3693af486ae53D8aA8B50',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xc834Fa996fA3BeC7aAD3693af486ae53D8aA8B50/logo.png',
    decimals: 18
  },
  {
    id: 229,
    chainId: 1,
    name: 'The Graph',
    symbol: 'GRT',
    type: 'ERC20',
    address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xc944E90C64B2c07662A292be6244BDf05Cda44a7/logo.png',
    decimals: 18
  },
  {
    id: 230,
    chainId: 1,
    name: 'Rootkit Finance',
    symbol: 'ROOT',
    type: 'ERC20',
    address: '0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E/logo.png',
    decimals: 18
  },
  {
    id: 231,
    chainId: 1,
    name: 'Kine Governance Token',
    symbol: 'KINE',
    type: 'ERC20',
    address: '0xCbfef8fdd706cde6F208460f2Bf39Aa9c785F05D',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xCbfef8fdd706cde6F208460f2Bf39Aa9c785F05D/logo.png',
    decimals: 18
  },
  {
    id: 232,
    chainId: 1,
    name: 'TrustSwap Token',
    symbol: 'SWAP',
    type: 'ERC20',
    address: '0xCC4304A31d09258b0029eA7FE63d032f52e44EFe',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xCC4304A31d09258b0029eA7FE63d032f52e44EFe/logo.png',
    decimals: 18
  },
  {
    id: 233,
    chainId: 1,
    name: 'BEPRO Network',
    symbol: 'BEPRO',
    type: 'ERC20',
    address: '0xCF3C8Be2e2C42331Da80EF210e9B1b307C03d36A',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xCF3C8Be2e2C42331Da80EF210e9B1b307C03d36A/logo.png',
    decimals: 18
  },
  {
    id: 234,
    chainId: 1,
    name: 'Terra Virtua Kolect',
    symbol: 'TVK',
    type: 'ERC20',
    address: '0xd084B83C305daFD76AE3E1b4E1F1fe2eCcCb3988',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xd084B83C305daFD76AE3E1b4E1F1fe2eCcCb3988/logo.png',
    decimals: 18
  },
  {
    id: 235,
    chainId: 1,
    name: 'SIREN',
    symbol: 'SI',
    type: 'ERC20',
    address: '0xD23Ac27148aF6A2f339BD82D0e3CFF380b5093de',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xD23Ac27148aF6A2f339BD82D0e3CFF380b5093de/logo.png',
    decimals: 18
  },
  {
    id: 236,
    chainId: 1,
    name: 'OMG Network',
    symbol: 'OMG',
    type: 'ERC20',
    address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets//logo.png',
    decimals: 18
  },
  {
    id: 237,
    chainId: 1,
    name: 'Terra',
    symbol: 'LUNA',
    type: 'ERC20',
    address: '0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9/logo.png',
    decimals: 18
  },
  {
    id: 238,
    chainId: 1,
    name: 'Dextrust',
    symbol: 'DETS',
    type: 'ERC20',
    address: '0xd379700999F4805Ce80aa32DB46A94dF64561108',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xd379700999F4805Ce80aa32DB46A94dF64561108/logo.png',
    decimals: 18
  },
  {
    id: 239,
    chainId: 1,
    name: 'Ampleforth',
    symbol: 'AMPL',
    type: 'ERC20',
    address: '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets//logo.png',
    decimals: 9
  },
  {
    id: 240,
    chainId: 1,
    name: 'Polkamarkets',
    symbol: 'POLK',
    type: 'ERC20',
    address: '0xD478161C952357F05f0292B56012Cd8457F1cfbF',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xD478161C952357F05f0292B56012Cd8457F1cfbF/logo.png',
    decimals: 18
  },
  {
    id: 241,
    chainId: 1,
    name: 'Curve DAO Token',
    symbol: 'CRV',
    type: 'ERC20',
    address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png',
    decimals: 18
  },
  {
    id: 242,
    chainId: 1,
    name: 'MEME',
    symbol: 'MEME',
    type: 'ERC20',
    address: '0xD5525D397898e5502075Ea5E830d8914f6F0affe',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xD5525D397898e5502075Ea5E830d8914f6F0affe/logo.png',
    decimals: 8
  },
  {
    id: 243,
    chainId: 1,
    name: 'ExNetwork Token',
    symbol: 'EXNT',
    type: 'ERC20',
    address: '0xD6c67B93a7b248dF608a653d82a100556144c5DA',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xD6c67B93a7b248dF608a653d82a100556144c5DA/logo.png',
    decimals: 16
  },
  {
    id: 244,
    chainId: 1,
    name: 'Tether',
    symbol: 'USDT',
    type: 'ERC20',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    decimals: 6
  },
  {
    id: 245,
    chainId: 1,
    name: 'Atari Token',
    symbol: 'ATRI',
    type: 'ERC20',
    address: '0xdacD69347dE42baBfAEcD09dC88958378780FB62',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdacD69347dE42baBfAEcD09dC88958378780FB62/logo.png',
    decimals: 0
  },
  {
    id: 246,
    chainId: 1,
    name: 'Yield',
    symbol: 'YLD',
    type: 'ERC20',
    address: '0xDcB01cc464238396E213a6fDd933E36796eAfF9f',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xDcB01cc464238396E213a6fDd933E36796eAfF9f/logo.png',
    decimals: 18
  },
  {
    id: 247,
    chainId: 1,
    name: 'COTI',
    symbol: 'COTI',
    type: 'ERC20',
    address: '0xDDB3422497E61e13543BeA06989C0789117555c5',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xDDB3422497E61e13543BeA06989C0789117555c5/logo.png',
    decimals: 18
  },
  {
    id: 248,
    chainId: 1,
    name: 'Curate',
    symbol: 'XCUR',
    type: 'ERC20',
    address: '0xE1c7E30C42C24582888C758984f6e382096786bd',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xE1c7E30C42C24582888C758984f6e382096786bd/logo.png',
    decimals: 8
  },
  {
    id: 249,
    chainId: 1,
    name: 'Injective',
    symbol: 'INJ',
    type: 'ERC20',
    address: '0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30/logo.png',
    decimals: 18
  },
  {
    id: 250,
    chainId: 1,
    name: 'PILLAR',
    symbol: 'PLR',
    type: 'ERC20',
    address: '0xe3818504c1B32bF1557b16C238B2E01Fd3149C17',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xe3818504c1B32bF1557b16C238B2E01Fd3149C17/logo.png',
    decimals: 18
  },
  {
    id: 251,
    chainId: 1,
    name: '0x',
    symbol: 'ZRX',
    type: 'ERC20',
    address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png',
    decimals: 18
  },
  {
    id: 252,
    chainId: 1,
    name: 'WCELO',
    symbol: 'WCELO',
    type: 'ERC20',
    address: '0xE452E6Ea2dDeB012e20dB73bf5d3863A3Ac8d77a',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xE452E6Ea2dDeB012e20dB73bf5d3863A3Ac8d77a/logo.png',
    decimals: 18
  },
  {
    id: 253,
    chainId: 1,
    name: 'SuperFarm',
    symbol: 'SUPER',
    type: 'ERC20',
    address: '0xe53EC727dbDEB9E2d5456c3be40cFF031AB40A55',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xe53EC727dbDEB9E2d5456c3be40cFF031AB40A55/logo.png',
    decimals: 18
  },
  {
    id: 254,
    chainId: 1,
    name: 'Ferrum Network',
    symbol: 'FRM',
    type: 'ERC20',
    address: '0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C/logo.png',
    decimals: 6
  },
  {
    id: 255,
    chainId: 1,
    name: 'COIN',
    symbol: 'COIN',
    type: 'ERC20',
    address: '0xE61fDAF474Fac07063f2234Fb9e60C1163Cfa850',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xE61fDAF474Fac07063f2234Fb9e60C1163Cfa850/logo.png',
    decimals: 18
  },
  {
    id: 256,
    chainId: 1,
    name: 'ankrETH',
    symbol: 'aETHc',
    type: 'ERC20',
    address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xE95A203B1a91a908F9B9CE46459d101078c2c3cb/logo.png',
    decimals: 18
  },
  {
    id: 257,
    chainId: 1,
    name: 'Modefi',
    symbol: 'MOD',
    type: 'ERC20',
    address: '0xEA1ea0972fa092dd463f2968F9bB51Cc4c981D71',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEA1ea0972fa092dd463f2968F9bB51Cc4c981D71/logo.png',
    decimals: 18
  },
  {
    id: 258,
    chainId: 1,
    name: 'SURF Finance',
    symbol: 'SURF',
    type: 'ERC20',
    address: '0xEa319e87Cf06203DAe107Dd8E5672175e3Ee976c',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEa319e87Cf06203DAe107Dd8E5672175e3Ee976c/logo.png',
    decimals: 18
  },
  {
    id: 259,
    chainId: 1,
    name: 'renBTC',
    symbol: 'renBTC',
    type: 'ERC20',
    address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D/logo.png',
    decimals: 8
  },
  {
    id: 260,
    chainId: 1,
    name: 'Everest',
    symbol: 'ID',
    type: 'ERC20',
    address: '0xEBd9D99A3982d547C5Bb4DB7E3b1F9F14b67Eb83',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEBd9D99A3982d547C5Bb4DB7E3b1F9F14b67Eb83/logo.png',
    decimals: 18
  },
  {
    id: 261,
    chainId: 1,
    name: 'DMM: Governance',
    symbol: 'DMG',
    type: 'ERC20',
    address: '0xEd91879919B71bB6905f23af0A68d231EcF87b14',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEd91879919B71bB6905f23af0A68d231EcF87b14/logo.png',
    decimals: 18
  },
  {
    id: 262,
    chainId: 1,
    name: 'Exeedme',
    symbol: 'XED',
    type: 'ERC20',
    address: '0xee573a945B01B788B9287CE062A0CFC15bE9fd86',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xee573a945B01B788B9287CE062A0CFC15bE9fd86/logo.png',
    decimals: 18
  },
  {
    id: 263,
    chainId: 1,
    name: 'GOVI',
    symbol: 'GOVI',
    type: 'ERC20',
    address: '0xeEAA40B28A2d1b0B08f6f97bB1DD4B75316c6107',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xeEAA40B28A2d1b0B08f6f97bB1DD4B75316c6107/logo.png',
    decimals: 18
  },
  {
    id: 264,
    chainId: 1,
    name: 'Dopex Governance Token',
    symbol: 'DPX',
    type: 'ERC20',
    address: '0xEec2bE5c91ae7f8a338e1e5f3b5DE49d07AfdC81',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEec2bE5c91ae7f8a338e1e5f3b5DE49d07AfdC81/logo.png',
    decimals: 18
  },
  {
    id: 265,
    chainId: 1,
    name: 'Hermez Network Token',
    symbol: 'HEZ',
    type: 'ERC20',
    address: '0xEEF9f339514298C6A857EfCfC1A762aF84438dEE',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xEEF9f339514298C6A857EfCfC1A762aF84438dEE/logo.png',
    decimals: 18
  },
  {
    id: 266,
    chainId: 1,
    name: 'DxSale Network',
    symbol: 'SALE',
    type: 'ERC20',
    address: '0xF063fE1aB7a291c5d06a86e14730b00BF24cB589',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xF063fE1aB7a291c5d06a86e14730b00BF24cB589/logo.png',
    decimals: 18
  },
  {
    id: 267,
    chainId: 1,
    name: 'Rally',
    symbol: 'RLY',
    type: 'ERC20',
    address: '0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b/logo.png',
    decimals: 18
  },
  {
    id: 268,
    chainId: 1,
    name: 'Realio Network',
    symbol: 'RIO',
    type: 'ERC20',
    address: '0xf21661D0D1d76d3ECb8e1B9F1c923DBfffAe4097',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xf21661D0D1d76d3ECb8e1B9F1c923DBfffAe4097/logo.png',
    decimals: 18
  },
  {
    id: 269,
    chainId: 1,
    name: 'Verasity',
    symbol: 'VRA',
    type: 'ERC20',
    address: '0xF411903cbC70a74d22900a5DE66A2dda66507255',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xF411903cbC70a74d22900a5DE66A2dda66507255/logo.png',
    decimals: 18
  },
  {
    id: 270,
    chainId: 1,
    name: 'PUSH',
    symbol: 'PUSH',
    type: 'ERC20',
    address: '0xf418588522d5dd018b425E472991E52EBBeEEEEE',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xf418588522d5dd018b425E472991E52EBBeEEEEE/logo.png',
    decimals: 18
  },
  {
    id: 271,
    chainId: 1,
    name: 'YfDAI.finance',
    symbol: 'Yf-DAI',
    type: 'ERC20',
    address: '0xf4CD3d3Fda8d7Fd6C5a500203e38640A70Bf9577',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xf4CD3d3Fda8d7Fd6C5a500203e38640A70Bf9577/logo.png',
    decimals: 18
  },
  {
    id: 272,
    chainId: 1,
    name: 'Fractal',
    symbol: 'FCL',
    type: 'ERC20',
    address: '0xF4d861575ecC9493420A3f5a14F85B13f0b50EB3',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xF4d861575ecC9493420A3f5a14F85B13f0b50EB3/logo.png',
    decimals: 18
  },
  {
    id: 273,
    chainId: 1,
    name: 'Enjin Coin',
    symbol: 'ENJ',
    type: 'ERC20',
    address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c/logo.png',
    decimals: 18
  },
  {
    id: 274,
    chainId: 1,
    name: 'GIVLY Coin',
    symbol: 'GIV',
    type: 'ERC20',
    address: '0xf6537FE0df7F0Cc0985Cf00792CC98249E73EFa0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xf6537FE0df7F0Cc0985Cf00792CC98249E73EFa0/logo.png',
    decimals: 8
  },
  {
    id: 275,
    chainId: 1,
    name: 'Visor.Finance',
    symbol: 'VISR',
    type: 'ERC20',
    address: '0xF938424F7210f31dF2Aee3011291b658f872e91e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xF938424F7210f31dF2Aee3011291b658f872e91e/logo.png',
    decimals: 18
  },
  {
    id: 276,
    chainId: 1,
    name: 'Yield',
    symbol: 'YLD',
    type: 'ERC20',
    address: '0xF94b5C5651c888d928439aB6514B93944eEE6F48',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xF94b5C5651c888d928439aB6514B93944eEE6F48/logo.png',
    decimals: 18
  },
  {
    id: 277,
    chainId: 1,
    name: 'Hoge Finance',
    symbol: 'HOGE',
    type: 'ERC20',
    address: '0xfAd45E47083e4607302aa43c65fB3106F1cd7607',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xfAd45E47083e4607302aa43c65fB3106F1cd7607/logo.png',
    decimals: 9
  },
  {
    id: 278,
    chainId: 1,
    name: 'DuckDaoDime',
    symbol: 'DDIM',
    type: 'ERC20',
    address: '0xFbEEa1C75E4c4465CB2FCCc9c6d6afe984558E20',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xFbEEa1C75E4c4465CB2FCCc9c6d6afe984558E20/logo.png',
    decimals: 18
  },
  {
    id: 279,
    chainId: 1,
    name: 'Moss Carbon Credit',
    symbol: 'MCO2',
    type: 'ERC20',
    address: '0xfC98e825A2264D890F9a1e68ed50E1526abCcacD',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xfC98e825A2264D890F9a1e68ed50E1526abCcacD/logo.png',
    decimals: 18
  },
  {
    id: 280,
    chainId: 1,
    name: 'Rarible',
    symbol: 'RARI',
    type: 'ERC20',
    address: '0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF/logo.png',
    decimals: 18
  },
  {
    id: 281,
    chainId: 1,
    name: 'Reef',
    symbol: 'REEF',
    type: 'ERC20',
    address: '0xFE3E6a25e6b192A42a44ecDDCd13796471735ACf',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xFE3E6a25e6b192A42a44ecDDCd13796471735ACf/logo.png',
    decimals: 18
  },
  {
    id: 282,
    chainId: 1,
    name: 'Amp',
    symbol: 'AMP',
    type: 'ERC20',
    address: '0xfF20817765cB7f73d4bde2e66e067E58D11095C2',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xfF20817765cB7f73d4bde2e66e067E58D11095C2/logo.png',
    decimals: 18
  },
  {
    id: 283,
    chainId: 1,
    name: 'FalconSwap Token',
    symbol: 'FSW',
    type: 'ERC20',
    address: '0xfffffffFf15AbF397dA76f1dcc1A1604F45126DB',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xfffffffFf15AbF397dA76f1dcc1A1604F45126DB/logo.png',
    decimals: 18
  },
  {
    id: 284,
    chainId: 1,
    name: 'OlympusDAO',
    symbol: 'OHM',
    type: 'ERC20',
    address: '0x383518188C0C6d7730D91b2c03a03C837814a899',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x383518188C0C6d7730D91b2c03a03C837814a899/logo.png',
    decimals: 9
  },
  {
    id: 285,
    chainId: 1,
    name: 'Illuvium',
    symbol: 'ILV',
    type: 'ERC20',
    address: '0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E/logo.png',
    decimals: 18
  },
  {
    id: 286,
    chainId: 1,
    name: 'Gala',
    symbol: 'GALA',
    type: 'ERC20',
    address: '0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA/logo.png',
    decimals: 8
  },
  {
    id: 287,
    chainId: 1,
    name: 'Convex Token',
    symbol: 'CVX',
    type: 'ERC20',
    address: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B/logo.png',
    decimals: 18
  },
  {
    id: 288,
    chainId: 1,
    name: 'Spell Token',
    symbol: 'SPELL',
    type: 'ERC20',
    address: '0x090185f2135308BaD17527004364eBcC2D37e5F6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x090185f2135308BaD17527004364eBcC2D37e5F6/logo.png',
    decimals: 18
  },
  {
    id: 289,
    chainId: 1,
    name: 'OpenDAO',
    symbol: 'SOS',
    type: 'ERC20',
    address: '0x3b484b82567a09e2588A13D54D032153f0c0aEe0',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x3b484b82567a09e2588A13D54D032153f0c0aEe0/logo.png',
    decimals: 18
  },
  {
    id: 290,
    chainId: 1,
    name: 'Gas DAO',
    symbol: 'GAS',
    type: 'ERC20',
    address: '0x6Bba316c48b49BD1eAc44573c5c871ff02958469',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6Bba316c48b49BD1eAc44573c5c871ff02958469/logo.png',
    decimals: 18
  },
  {
    id: 291,
    chainId: 1,
    name: 'Binance USD',
    symbol: 'BUSD',
    type: 'ERC20',
    address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png',
    decimals: 18
  },
  {
    id: 292,
    chainId: 1,
    name: 'MetisDAO',
    symbol: 'Metis',
    type: 'ERC20',
    address: '0x9E32b13ce7f2E80A01932B42553652E053D6ed8e',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x9E32b13ce7f2E80A01932B42553652E053D6ed8e/logo.png',
    decimals: 18
  },
  {
    id: 293,
    chainId: 1,
    name: 'LooksRare',
    symbol: 'LOOKS',
    type: 'ERC20',
    address: '0xf4d2888d29D722226FafA5d9B24F9164c092421E',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xf4d2888d29D722226FafA5d9B24F9164c092421E/logo.png',
    decimals: 18
  },
  {
    id: 294,
    chainId: 1,
    name: 'X2Y2Token',
    symbol: 'X2Y2',
    type: 'ERC20',
    address: '0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9/logo.png',
    decimals: 18
  },
  {
    id: 295,
    chainId: 1,
    name: 'ApeCoin (APE)',
    symbol: 'APE',
    type: 'ERC20',
    address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4d224452801ACEd8B2F0aebE155379bb5D594381/logo.png',
    decimals: 18
  },
  {
    id: 296,
    chainId: 1,
    name: 'StargateToken',
    symbol: 'STG',
    type: 'ERC20',
    address: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
    logoURI:
      'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6/logo.png',
    decimals: 18
  }
];

export default tokenList;
