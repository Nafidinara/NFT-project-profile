import { web3Helper } from '/assets/js/web3Helper.js';

const Staking = {
  isApprovedForAll: async (a) => {
    let r = await web3Helper.isApprovedForAll(a);
    return r;
  },
  setApproveForAll: async (a) => {
    let r = await web3Helper.setApproveForAll(a);
    return r;
  },
  stake: async (upline, id, pid) => {
    let r = await web3Helper.stake(upline, id, pid);
    return r;
  },
  claim_staking_reward: async (id) => {
    let pr = await web3Helper.claim_staking_reward(id);
    $('.r-nft-' + id).html('0.00000000');
  },
  nftlogs: async (id, addr) => {
    let pr = await web3Helper.nftlogs(id, addr);
    return pr;
  },
};

function pp(id) {
  let p = '100 USDT';
  if (id > 50000) p = '1,000 USDT';
  if (id > 60000) p = '10,000 USDT';
  if (id > 61000) p = '100,000 USDT';

  return p;
}

// Function to generate the HTML for a single card
function generateCard(index) {
  let lockpercent = Math.floor(Math.random() * 10);
  return `
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 mt-5"  >
            <div class="card project-card">
                <div class="row p-1">
                    <div class="col-6 p-0 text-center">
                        <div class="col-12 text-center p-1">
                        <div class="col-12 text-center p-1 text-secondary"> Stake </div>
                        <div class="col-12 text-center p-1"> <img class="card-img-top avatar-max-lg" src="/nft/${index}.jpg" alt=""></div>
                        <div class="col-12 text-center p-1 text-secondary" > NFT#${index} </div>
                        </div>
                    </div>

                    <div class="col-6 p-0 text-center">
                        <div class="col-12 text-center p-1">
                        <div class="col-12 text-center  p-1 text-secondary"> Reward </div>
                        <div class="col-12 text-center p-1"> <img class="card-img-top avatar-max-lg " src="/assets/images/logos/org300.png" alt=""></div>
                        <div class="col-12 text-center p-1 text-secondary"> ORG </div>
                        </div>
                    </div>
                </div>
                
                   
                  
                <div class="row p-1">
                    <div class="col-12  h4 text-center text-info n-nft-${index}"> Name  Name </div>
                   <div class="single-item col-12">
                        <span>Lock time</span> : 
                        <span class="float-right lt-nft-${index}">01-01-20001</span>
                    </div>
                    <div class="single-item col-12">
                        <span>Unlock time</span> : 
                        <span class="float-right ut-nft-${index}">01-01-20001</span>
                    </div>
                    <div class="single-item col-12">
                        <span>Curent APR</span> : 
                        <span class="float-right"><span class="apr-nft-${index}">0</span>%</span>
                    </div>
                    <div class="single-item col-12">
                        <span>Lock value</span> : 
                        <span class="float-right">${pp(index)}</span>
                    </div>
                </div>
                    
                
               
                    <div class="item-progress">
                       <div class="progress mt-2">
                            <div class="progress-bar" role="progressbar" style="width: ${lockpercent}%;" aria-valuenow="${lockpercent}" aria-valuemin="0" aria-valuemax="100">${lockpercent}%</div>
                        </div>  
                        <div class="progress-sale d-flex justify-content-between ">
                            <span>Reward</span>
                            <span>
                            <span class="r-nft-${index}">0.00000000</span> ORG</span>
                        </div>
                    </div>
               
                <!-- Project Footer -->
                <div class="project-footer d-flex align-items-center mt-4  ">
                    <a class="btn btn-bordered-white btn-sm" onClick="claim_staking_reward(${index})" >Claim Reward</a>
                </div>
            </div>
        </div>`;
}

// Function to generate the HTML for a single card
function generateCardMynft(index) {
  let lockpercent = Math.floor(Math.random() * 100);
  return `
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 mt-5 mynft-${index}"  >
            <div class="card project-card">
                <div class="row p-1">
                    <div class="col-12 p-0 text-center">
                        <div class="col-12 text-center p-1">
                        <div class="col-12 text-center p-1 text-secondary"> Your nft </div>
                        <div class="col-12 text-center p-1"> <img style="max-width:40%" class="card-img-top" src="/nft/${index}.jpg" alt=""></div>
                        <div class="col-12 text-center p-1 text-secondary" > NFT#${index} </div>
                        </div>
                    </div>

                     
                </div>
                
                   
                  
                <div class="row p-1">
                    <div class="col-12  h4 text-center text-info n-nft-${index}"> Nft Name </div>

                    <div class="single-item col-12">
                        <span>Collection</span> : 
                        <span class="float-right c-nft-${index}"></span>
                    </div>

                    <div class="single-item col-12">
                        <span>Nft value</span> : 
                        <span class="float-right p-nft-${index}" ></span>
                    </div>

                   
                    <div class="single-item col-12">
                        <span>Average APR</span> : 
                        <span class="float-right">15%</span>
                    </div>
                   
                </div>
                    
                
               
                    <div class="item-progress">
                      
                        <div class="progress-sale text-center mt-3 p-2 text-secondary">
                             This NFT available at Your wallet<br>
                             This NFT available for Stake
                        </div>
                    </div>
               
                <!-- Project Footer -->
                <div class="project-footer d-flex align-items-center mt-4  ">
                    <a class="btn btn-bordered-white btn-sm" onClick="modalStake(${index})" >Stake this NFT</a>
                </div>
            </div>
        </div>`;
}

// Generate the cards and append them to the container
$(document).ready(function () {
  return;
  for (let a = 1; a < 4; a++) {
    let nft = Math.floor(Math.random() * 10) + 1;
    let cardHtml = generateCard(nft);
    $('#stakinglist').append(cardHtml);
    $.get(`/nft/metadata/${a}.json`, function (data, status) {
      $('.n-nft-' + nft).html(data.name);
    });
  }
});

async function feedStaking(nft) {
  let cardHtml = generateCard(nft);
  $('#stakinglist').append(cardHtml);
  $.get(`/nft/metadata/${nft}.json`, function (data, status) {
    $('.n-nft-' + nft).html(data.name);
  });
}

// Generate the cards and append them to the container
$(document).ready(async function () {
  let upline = await web3Helper.upline();
  if (upline != '0x0000000000000000000000000000000000000000') {
    if (upline) $('#upline-addr').val(upline);
    if (upline) $('#upline-addr').attr('readonly', 'readonly');
  } else {
  }
  await userstaking();
  loadLocal();

  feedMynft(100);
  feedMynft(1000);
  feedMynft(10000);
  feedMynft(100000);
});

async function ownerof(id) {
  let acc = await web3Helper.myAddress();
  if (acc) {
  } else return;
  let owner = await web3Helper.ownerOf(id);
  if (acc != owner) {
    removeNft(id);
    $('.mynft-' + id).hide();
  }
}

async function loadLocal() {
  let l = getLocalNft();
  Object.keys(l).forEach(async (e) => {
    // console.log(e)
    let nft = e.replace('nft', '');
    let cardHtml = generateCardMynft(nft);
    $('#stakinglist').append(cardHtml);
    feedData(nft);
    ownerof(nft);
  });
}

async function feedMynft(price) {
  let acc = await web3Helper.myAddress();
  if (acc) {
  } else return;
  let aa = await web3Helper.myNft(price, acc);
  for (let a = 0; a < Number(aa); a++) {
    let nft = await web3Helper.myNftById(price, acc, a);
    pushNft(nft);
    if ($('.mynft-' + nft).length > 0) {
    } else {
      let cardHtml = generateCardMynft(nft);
      $('#stakinglist').append(cardHtml);
    }
  }
}

function feedData(nft) {
  $.get(`/nft/metadata/${nft}.json`, function (data, status) {
    $('.n-nft-' + nft).html(data.name);
    $('.c-nft-' + nft).html(data.attributes[0].value);
    $('.p-nft-' + nft).html(pp(nft));
  });
}

function getLocalNft() {
  let a = localStorage.getItem('mynft');
  if (a) return JSON.parse(a);
  else return {};
}
function pushNft(a) {
  let b = localStorage.getItem('mynft');
  if (b) {
    b = JSON.parse(b);
  } else b = {};
  b['nft' + a] = '';
  localStorage.setItem('mynft', JSON.stringify(b));
  // console.log(a);
}
function removeNft(a) {
  let b = localStorage.getItem('mynft');
  if (b) {
    b = JSON.parse(b);
  } else b = {};
  delete b['nft' + a];
  localStorage.setItem('mynft', JSON.stringify(b));
  // console.log(a);
}
// async function getNft(){
//    let a = await  web3Helper.allmynft();
//    a=Number(a);
//    console.log(a);
// }
// getNft()
let hasbeenout = {};
async function userstaking() {
  let aa = await web3Helper.user_stakings_length();
  aa = Number(aa) - 1;
  for (let b = aa; b >= 0; b--) {
    let a = await web3Helper.nftlogs(b);
    console.log(a);
    if (hasbeenout[a[1]]) return;
    if (a[2] == false) hasbeenout[a[1]] = true;
    feedStaking(Number(a[1]));
    setInterval(function () {
      reward(Number(a[1]));
    }, 10000);
    reward(Number(a[1]));
    let nft_logs = await web3Helper.nft_logs(Number(a[1]));
    // console.log(nft_logs);
    let et = Number(nft_logs[3]);
    let lt = Number(nft_logs[6]);
    let config_timelock = [
      7890000, 15780000, 31560000, 47340000, 63120000, 94680000,
    ];
    const event = new Date(et * 1000);
    const event2 = new Date((et - config_timelock[lt]) * 1000);

    $('.ut-nft-' + Number(a[1])).html(event.toUTCString().substring(0, 17));
    $('.lt-nft-' + Number(a[1])).html(event2.toUTCString().substring(0, 17));
    apr(Number(a[1]), lt);
  }
}

async function reward(id) {
  let pr = await web3Helper.pendingreward(id);
  pr = Number(pr) / 1e18;
  let lr = $('.r-nft-' + id).html();
  if (lr * 1 == 0) {
    $('.r-nft-' + id).html(pr.toFixed(8));
    lr = $('.r-nft-' + id).html();
  }

  let sel = pr - lr * 1;
  if (sel < 0) {
    $('.r-nft-' + id).html(pr);
    return;
  }
  // console.log(pr);

  let se = setInterval(function () {
    let pr = $('.r-nft-' + id).html();
    pr = pr * 1 + sel / 20;
    $('.r-nft-' + id).html(pr.toFixed(8));
  }, 500);
  setTimeout(function () {
    clearInterval(se);
  }, 9500);
}

async function apr(id, lt) {
  let ap = 15;
  let org_price = 10;
  let nftp = pp(id).replace(',', '').replace(' USDT', '');
  let re = await web3Helper.configinfo_reward();
  console.log(re);
  let rewardperyear = (Number(re[lt]) / 1e18) * 31536000 * org_price * nftp;
  console.log(rewardperyear);

  ap = rewardperyear / (nftp * 0.01);

  $('.apr-nft-' + id).html(ap.toFixed(2));
}

async function api_apr(nft) {
  $.get(`/api/get_apr`, function (data, status) {
    let e = 0;
    $('.apr-' + e).html(data.data[e].toFixed(2));
    e++;
    $('.apr-' + e).html(data.data[e].toFixed(2));
    e++;
    $('.apr-' + e).html(data.data[e].toFixed(2));
    e++;
    $('.apr-' + e).html(data.data[e].toFixed(2));
    e++;
    $('.apr-' + e).html(data.data[e].toFixed(2));
    e++;
    $('.apr-' + e).html(data.data[e].toFixed(2));
    e++;
  });
}
setInterval(api_apr, 10000);
api_apr();

export { Staking };
