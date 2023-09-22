import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from 'https://unpkg.com/@web3modal/ethereum@2.7.0';

import { Web3Modal } from 'https://unpkg.com/@web3modal/html@2.6.2';

const {
  configureChains,
  createConfig,
  connect,
  fetchBalance,
  writeContract,
  getAccount,
  readContract,
  signMessage,
  prepareWriteContract,
} = WagmiCore;

const { bsc } = WagmiCoreChains;
const chains = [bsc];

const projectId = '2aca272d18deb10ff748260da5f78bfd';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const web3modal = new Web3Modal({ projectId }, ethereumClient);

export {
  fetchBalance,
  getAccount,
  connect,
  writeContract,
  signMessage,
  web3modal,
  readContract,
  prepareWriteContract,
};
