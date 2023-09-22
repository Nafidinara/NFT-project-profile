import {
  fetchBalance,
  getAccount,
  readContract,
  writeContract,
  web3modal,
  prepareWriteContract,
} from '/assets/js/wagmi.js';

import {
  ABI_NFT,
  ABI_ORG,
  NFT,
  USDT_ADDRESS,
  ORG_ADDRESS,
} from '/assets/js/abi.js';

let CONTRACT_ADDRESS = (nft) => {
  let p = 100;
  if (nft > 50000) p = 1000;
  if (nft > 60000) p = 10000;
  if (nft > 61000) p = 100000;
  return NFT[p];
};

let NFTP = (nft) => {
  let p = 100;
  if (nft > 50000) p = 1000;
  if (nft > 60000) p = 10000;
  if (nft > 61000) p = 100000;
  return p;
};

export const web3Helper = {
  checkBalance: async (address, token) => {
    return await fetchBalance({
      address: address,
      token: token ?? null,
    });
  },
  mintNFT: async (id) => {
    try {
      const request = await prepareWriteContract({
        address: CONTRACT_ADDRESS(id),
        abi: ABI_NFT,
        functionName: 'mint',
        args: [id],
      });

      const { hash } = await writeContract(request);
      return hash;
    } catch (e) {
      console.log(e);
    }
  },
  getAccount: async () => {
    return getAccount();
  },
  myAddress: async () => {
    let addr = getAccount();
    return addr.address;
  },
  getAllowance: async (token, owner, spender) => {
    return await readContract({
      address: token,
      abi: ABI_ORG,
      functionName: 'allowance',
      args: [owner, spender],
    });
  },
  isApprovedForAll: async (id) => {
    let owner = await web3Helper.myAddress();
    return await readContract({
      address: CONTRACT_ADDRESS(id),
      abi: ABI_NFT,
      functionName: 'isApprovedForAll',
      args: [owner, ORG_ADDRESS],
    });
  },
  isMinted: async (id) => {
    return await readContract({
      address: CONTRACT_ADDRESS(id),
      abi: ABI_NFT,
      functionName: 'minted',
      args: [id],
    });
  },
  ownerOf: async (id) => {
    return await readContract({
      address: CONTRACT_ADDRESS(id),
      abi: ABI_NFT,
      functionName: 'ownerOf',
      args: [id],
    });
  },
  approveContract: async (contract, price, owner) => {
    let geta = await web3Helper.getAllowance(USDT_ADDRESS, owner, contract);
    if (Number(geta >= price)) return true;
    const { hash } = await writeContract({
      address: USDT_ADDRESS,
      abi: ABI_ORG,
      functionName: 'approve',
      args: [contract, price],
    });
    return hash;
  },

  setApproveForAll: async (id) => {
    let geta = await web3Helper.isApprovedForAll(id);
    if (geta) return true;
    const { hash } = await writeContract({
      address: CONTRACT_ADDRESS(id),
      abi: ABI_NFT,
      functionName: 'setApprovalForAll',
      args: [ORG_ADDRESS, true],
    });
    return hash;
  },
  stake: async (upline, id, pid) => {
    // let geta = await web3Helper.isApprovedForAll(id);
    // if (!geta) return true;
    let arg = [upline, id, NFTP(id), pid];
    console.log(arg);
    const { hash } = await writeContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'stake',
      args: arg,
    });
    return hash;
  },
  claim_staking_reward: async (id) => {
    // let geta = await web3Helper.isApprovedForAll(id);
    // if (!geta) return true;
    let arg = [id];
    console.log(arg);
    const { hash } = await writeContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'claim_staking_reward',
      args: arg,
    });
    return hash;
  },
  web3Modal: () => {
    return web3modal;
  },
  myNft: async (nft, addr) => {
    return await readContract({
      address: NFT[nft],
      abi: ABI_NFT,
      functionName: 'balanceOf',
      args: [addr],
    });
  },
  myNftById: async (nft, addr, id) => {
    return await readContract({
      address: NFT[nft],
      abi: ABI_NFT,
      functionName: 'tokenOfOwnerByIndex',
      args: [addr, id],
    });
  },
  allmynft: async () => {
    let addr = getAccount();
    let mynft1 = await web3Helper.myNft(100, addr.address);

    let nft = [];
    if (Number(mynft1) > 0) {
      for (let b = 0; b < Number(mynft1); b++) {
        let nf = await web3Helper.myNftById(100, addr.address, b);
        nft.push(nf);
      }
    }
    return nft;
  },
  user_stakings_length: async () => {
    let addr = await web3Helper.myAddress();
    return await readContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'user_stakings_length',
      args: [addr],
    });
  },
  nftlogs: async (id, addr = '') => {
    if (addr == '') addr = await web3Helper.myAddress();
    let d = {
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'nftlogs',
      args: [addr, id],
    };
    // console.log(d)
    return await readContract(d);
  },
  nft_logs: async (id) => {
    return await readContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'nft_logs',
      args: [id],
    });
  },
  pendingreward: async (id) => {
    return await readContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'pendingreward',
      args: [id],
    });
  },
  upline: async () => {
    let addr = await web3Helper.myAddress();
    return await readContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'upline',
      args: [addr],
    });
  },
  configinfo_reward: async () => {
    let addr = await web3Helper.myAddress();
    return await readContract({
      address: ORG_ADDRESS,
      abi: ABI_ORG,
      functionName: 'configinfo_reward',
      args: [],
    });
  },
};
