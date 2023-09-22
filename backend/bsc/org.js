const { Web3 } = require('web3');
const abi = require('./abi.js');
const memory = require('../memory.js');
const fetch = require('node-fetch');

var serverbnb = 'https://bsc.meowrpc.com';
const web3 = new Web3(serverbnb);

var WALLET = {
  ceksum: function (a) {
    return web3.utils.toChecksumAddress(a);
  },
  getPoolinfo: async function (c, pid) {
    try {
      var contract = new web3.eth.Contract(farm_abi, c);

      let a = await contract.methods
        .poolInfo(pid)
        .call()
        .then(function (resp) {
          return resp;
        });
      return a;
    } catch (error) {}
  },
  getrate: async function (c) {
    var abi = [
      {
        constant: true,
        inputs: [],
        name: 'getReserves',
        outputs: [
          { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
          { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
          {
            internalType: 'uint32',
            name: '_blockTimestampLast',
            type: 'uint32',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    try {
      var contract = new web3.eth.Contract(abi, c);

      let a = await contract.methods
        .getReserves()
        .call()
        .then(function (resp) {
          return resp[1] / resp[0];
        });
      return a;
    } catch (error) {}
  },

  getSupply: async function (co) {
    try {
      var abi = [
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];
      var contract = new web3.eth.Contract(abi, co);
      let a = await contract.methods
        .totalSupply()
        .call()
        .then(function (resp) {
          return resp;
        });
      return a;
    } catch (error) {
      console.log(error);
    }

    return -1;
  },
  getSym: async function (co) {
    var abi = [
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];
    try {
      var contract = new web3.eth.Contract(abi, co);
      let a = await contract.methods
        .symbol()
        .call()
        .then(function (resp) {
          return resp;
        });
      return a;
    } catch (error) {
      console.log(error);
    }
    return -1;
  },
  getName: async function (co) {
    var abi = [
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ];

    try {
      var contract = new web3.eth.Contract(abi, co);
      let a = await contract.methods
        .name()
        .call()
        .then(function (resp) {
          return resp;
        });
      return a;
    } catch (error) {
      console.log(error);
    }
    return -1;
  },
  getDigit: async function (co) {
    try {
      var abid = [
        {
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          stateMutability: 'view',
          type: 'function',
        },
      ];
      var contract = new web3.eth.Contract(abid, co);
      let a = await contract.methods
        .decimals()
        .call()
        .then(function (d) {
          return d;
        });

      return a;
    } catch (error) {
      console.log(co);
      console.log(error);
    }

    return -1;
  },
  getLpContractBnb: async function (co) {
    try {
      var abid = [
        {
          constant: true,
          inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'address', name: '', type: 'address' },
          ],
          name: 'getPair',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];
      var contract = new web3.eth.Contract(
        abid,
        '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
      );
      let a = await contract.methods
        .getPair(co, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
        .call()
        .then(function (d) {
          return d;
        });

      let b = await WALLET.getBalance(
        a,
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
      );
      let c = await WALLET.getBalance(a, co);

      return [a, b, c];
    } catch (error) {}

    return -1;
  },
  getLpContractBusd: async function (co) {
    try {
      var abid = [
        {
          constant: true,
          inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'address', name: '', type: 'address' },
          ],
          name: 'getPair',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];
      var contract = new web3.eth.Contract(
        abid,
        '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
      );
      let a = await contract.methods
        .getPair(co, '0xe9e7cea3dedca5984780bafc599bd69add087d56')
        .call()
        .then(function (d) {
          return d;
        });

      let b = await WALLET.getBalance(
        a,
        '0xe9e7cea3dedca5984780bafc599bd69add087d56'
      );
      let c = await WALLET.getBalance(a, co);

      return [a, b, c];
    } catch (error) {}

    return -1;
  },
  getListtx: async function (co, page = 1, ofset = 100) {
    let u =
      'https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=' +
      co +
      '&page=' +
      page +
      '&offset=' +
      ofset +
      '&sort=asc&apikey=RHUZQZCTP78FQ2D2JFJ3FMP1FKPI85Y85Z';
    let h = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // body: `secret=${cap}&response=${respon}`,
    };
    let a = await fetch(u, h)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    console.log(a);
  },
  getverifed: async function (co) {
    let u =
      'https://api.bscscan.com/api?module=contract&action=getabi&address=' +
      co +
      '&apikey=RHUZQZCTP78FQ2D2JFJ3FMP1FKPI85Y85Z';
    let h = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // body: `secret=${cap}&response=${respon}`,
    };
    let a = await fetch(u, h)
      .then((response) => response.json())
      .then((data) => {
        return data.status;
      });

    return a;
  },
  getLaunc: async function (co) {
    let u =
      'https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=' +
      co +
      '&address=0x0000000000000000000000000000000000000000&page=1&offset=1&sort=asc&apikey=RHUZQZCTP78FQ2D2JFJ3FMP1FKPI85Y85Z';
    let h = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // body: `secret=${cap}&response=${respon}`,
    };
    let a = await fetch(u, h)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return a;
    console.log(a);
  },
  last_contract: '',
  getWebDescription: async function (co) {
    let u =
      'https://assets.trustwalletapp.com/blockchains/smartchain/assets/' +
      co +
      '/info.json';
    let h = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // body: `secret=${cap}&response=${respon}`,
    };
    let a = await fetch(u, h)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return a;
    console.log(a);
  },
  getBalance: async function (addr, con) {
    var abi = [
      {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ];
    try {
      var contract = new web3.eth.Contract(abi, con);

      let a = await contract.methods
        .balanceOf(addr)
        .call()
        .then(function (resp) {
          return resp;
        });

      return a;
    } catch (error) {
      console.log(error);
    }
  },

  configinfo_reward: async function () {
    try {
      var contract = new web3.eth.Contract(abi.ABI_ORG, abi.ORG_ADDRESS);
      let a = await contract.methods
        .configinfo_reward()
        .call()
        .then(function (resp) {
          return resp;
        });
      return { success: true, data: a };
    } catch (error) {
      return { success: false, msg: error };
    }
  },
};

async function t() {
  try {
    let info = await WALLET.configinfo_reward();
    if (info.success) {
      memory.reward = [
        Number(info.data[0]),
        Number(info.data[1]),
        Number(info.data[2]),
        Number(info.data[3]),
        Number(info.data[4]),
        Number(info.data[5]),
      ];
    }
  } catch (error) {}
}
setInterval(t, 60000);
t();

async function apr() {
  try {
    let price_org = 10;
    let second = 31536000;
    memory.apr = [
      (((memory.reward[0] * second) / 1e18) * price_org) / 0.01,
      (((memory.reward[1] * second) / 1e18) * price_org) / 0.01,
      (((memory.reward[2] * second) / 1e18) * price_org) / 0.01,
      (((memory.reward[3] * second) / 1e18) * price_org) / 0.01,
      (((memory.reward[4] * second) / 1e18) * price_org) / 0.01,
      (((memory.reward[5] * second) / 1e18) * price_org) / 0.01,
    ];
  } catch (error) {}
}
setInterval(apr, 10000);
apr();

// setInterval(function(){
//     console.log(memory);
// },2000);

// module.exports = WALLET;
