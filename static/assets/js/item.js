const Item = {
  generate: (a) => {
    const nftList = $('#related-nft');
    nftList.html('');
    let from = 0;
    if (a === 1) from = 1;
    if (a === 2) from = 50000;
    if (a === 3) from = 60000;
    if (a === 4) from = 61000;

    for (let l = 1; l < 5; l++) {
      let nft = Math.floor(Math.random() * 100) + from;
      let price = 100;
      if (nft > 50000) price = '1,000';
      if (nft > 60000) price = '10,000';
      if (nft > 61000) price = '100,000';
      let a = `  <div
        id="enefti-tab-1-card-1"
        class="mt-addons-blog-posts-carousel-single-post col-lg-3 col-md-6 col-sm-12 col-12"
      >
        <div
          id="nft-45233"
          class="enefti-card-wrapper mt-addons-blog-posts-carousel-single-post-wrapper"
        >
          <div class="mt-addons-blog-posts-carousel-custom">
            <div
              class="mt-addons-blog-posts-carousel-thumbnail enefti-card-img"
            >
              <div class="mt-addons-blog-featured-image">
                
                  <img
                    src="/nft/${nft}.jpg"
                    alt="celebracion"
                  />
                
                <div
                  class="mt-addons-blog-posts-carousel-button mt-shop-cards-button"
                >
                  <div class="mt-addons-blog-posts-carousel-content-inside">
                    <a
                      href="/collections/${nft}"
                      class="enefti-gradient-v1 enefti-btn-xl relative"
                    >
                      View Detail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-addons-blog-posts-carousel-head-content">
            <div class="enefti-card-title d-flex justify-content-between">
              <a href="/collections/${nft}" class="n-nft-${nft}">---</a>
              <a><i class="far fa-heart"></i></a>
            </div>
            <div class="enefti-details-card">
              <p>Mint Price</p>
              <a class="d-flex align-items-center">
                ${price} USDT
              </a>
            </div>
          </div>
        </div>
      </div>`;
      nftList.append(a);

      $.get(`/nft/metadata/${nft}.json`, function (data, status) {
        $('.n-nft-' + nft).html(data.name);
      });
    }
  },

  getinfo: (nft) => {
    $.get(`/nft/metadata/${nft}.json`, function (data, status) {
      let price;
      $('.n-nft-' + nft).html(data.name);
      $('.n-collection-' + nft).html(data.description);
      if (nft > 50000 && nft <= 60000) {
        price = '1,000';
      } else if (nft > 60000 && nft <= 61000) {
        price = '10,000';
      } else if (nft > 61000) {
        price = '100,000';
      } else {
        price = '100';
      }
      data.price = price;
    }).done((data) => {
      $('.p-nft-' + nft).html(data.price);
      $('.c-nft-' + nft).html(data.attributes[0].value);
    });
  },

  initEventListener: async (
    web3Helper,
    nftContract,
    nftprice,
    myAddress,
    id
  ) => {
    // adding event listener
    $('.usdt-approved').on('click', '.btn-approve-usdt', async function () {
      const tx = await web3Helper.approveContract(
        nftContract,
        nftprice,
        myAddress,
        id
      );
      await Main.alertSuccess(
        'Success!',
        'Success approve USDT',
        `<a href="https://bscscan.com/tx/${tx}" target="_blank" class="footer-link">See Tx</a>`
      );
      await Main.delay(3);
      window.location.reload();
    });

    $('#mint-button').on('click', '.btn-mint', async function () {
      console.log(id, nftContract);
      const tx = await web3Helper.mintNFT(id);
      await Main.alertSuccess(
        'Success!',
        'Success Mint NFT',
        `<a href="https://bscscan.com/tx/${tx}" target="_blank" class="footer-link">See Tx</a>`
      );
      await Main.delay(3);
      window.location.reload();
    });
  },

  initCondition: async (conditions, diffBalance) => {
    if (conditions[0]) {
      $('.nft-available').html(`
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb).png" />
                  <div class="card-title ml-3">
                    NFT Available for Mint
                  </div>
                </div>
                <img src="/assets/images/logos/tick-circle.svg" class="card-item-icon" />
              </div>
        `);
    } else {
      $('.nft-available')
        .html(
          `
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb)-danger.png" />
                  <div class="card-title ml-3">
                    NFT already minted
                  </div>
                </div>
                <a class="btn-card-item" href="/collections">
                  Find others
                </a>
              </div>`
        )
        .addClass('danger');
    }

    if (conditions[1]) {
      $('.wallet-connect').html(`
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb).png" />
                  <div class="card-title ml-3">
                    Wallet Connected
                  </div>
                </div>

                <img src="/assets/images/logos/tick-circle.svg" class="card-item-icon" />
              </div>
        `);
    } else {
      $('.wallet-connect')
        .html(
          `
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb)-danger.png" />
                  <div class="card-title ml-3">
                    Wallet Not Connected
                  </div>
                </div>

                <button onclick="web3Helper.openModal()" class="btn-card-item">
                  Connect Wallet
                </button>
              </div>
        `
        )
        .addClass('danger');
    }

    if (conditions[2]) {
      $('.usdt-balance').html(`
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb).png" />
                  <div class="card-title ml-3">
                    USDT Available
                  </div>
                </div>
                <img src="/assets/images/logos/tick-circle.svg" class="card-item-icon" />
              </div>
        `);
    } else {
      $('.usdt-balance')
        .html(
          `
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb)-danger.png" />
                  <div class="card-title ml-3">
                    Insufficient USDT (Buy ${diffBalance} USDT)
                  </div>
                </div>

                <a href="https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955" target="_blank" class="btn-card-item">
                  Buy USDT
                </a>
              </div>
        `
        )
        .addClass('danger');
    }

    if (conditions[3]) {
      $('.usdt-approved').html(`
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb).png" />
                  <div class="card-title ml-3">
                    Done Approve USDT
                  </div>
                </div>
                <img src="/assets/images/logos/tick-circle.svg" class="card-item-icon" />
              </div>
        `);
    } else {
      $('.usdt-approved')
        .html(
          `
        <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex">
                  <img src="/assets/images/logos/binance-coin-(bnb)-danger.png" />
                  <div class="card-title ml-3">
                    Please Approve USDT
                  </div>
                </div>

                <button class="btn-card-item btn btn-approve-usdt">
                  Approve USDT
                </button>
              </div>
        `
        )
        .addClass('danger');
    }

    if (conditions.includes(false)) {
      $('.mint-button').html(`
          <button class="mt-5 btn-mint" disabled>
                  You have to complete all step
                </button>
        `);
    } else {
      $('.mint-button').html(`
          <button class="mt-5 btn-mint">
                  Mint
                </button>
        `);
    }
  },
};
