import socialFIABI from './sociafiABI.json'


export const socialFIContractAddress = "0xe926353f87085a353349b75f438cb6352525b2a8"
export const SocialFiABI = socialFIABI


export const mainnet = {

    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'

}

export const morphSepolia = {
    chainId: 2710,
    name: 'Morph Testnet',
    currency: 'ETH',
    explorerUrl: 'https://explorer-testnet.morphl2.io',
    rpcUrl: 'https://rpc-testnet.morphl2.io'

}

export const Holesky = {
    chainId: 17000,
    name: 'Holesky',
    currency: 'ETH',
    rpcUrl: 'https://ethereum-holesky.publicnode.com'

}