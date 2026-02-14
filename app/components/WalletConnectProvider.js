import { useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// Import individual wallet adapters
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { GlowWalletAdapter } from '@solana/wallet-adapter-glow'
import { SlopeWalletAdapter } from '@solana/wallet-adapter-slope'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus'

export const WalletConnectProvider = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet

    const endpoint = useMemo(() => {
        if (network === WalletAdapterNetwork.Devnet) {
            return 'https://api.devnet.solana.com'
        }
        return clusterApiUrl(network)
    }, [network])

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(), 
        new GlowWalletAdapter(), 
        new SlopeWalletAdapter(), 
        new SolflareWalletAdapter({ network }), 
        new TorusWalletAdapter()
    ], [network])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}