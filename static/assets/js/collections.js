const Collection = {
  generate: (category) => {
    const nftList = $('#nftlist');
    nftList.html('');

    // Define the range based on the category

    for (let l = 1; l < 9; l++) {
      let from;
      if (category == 1) from = 1;
      else if (category == 2) from = 50001;
      else if (category == 3) from = 60001;
      else if (category == 4) from = 61001;
      else from = [1, 50000, 60000, 61000][Math.floor(Math.random() * 3.5)];
      const nft = Math.floor(Math.random() * 100) + from;
      let price = 100;
      if (nft > 50000) price = '1,000';
      if (nft > 60000) price = '10,000';
      if (nft > 61000) price = '100,000';

      const nftCardHtml = generateNftCard(nft, price);
      nftList.append(nftCardHtml);

      // Fetch metadata and update the name asynchronously
      fetchNftMetadata(nft);
    }
  },
};

// Function to generate HTML for an NFT card
function generateNftCard(nft, price) {
  return `<div id="enefti-tab-1-card-1" class="mt-addons-blog-posts-carousel-single-post col-lg-3 col-md-6 col-sm-12 col-12">
            <div id="nft-${nft}" class="enefti-card-wrapper mt-addons-blog-posts-carousel-single-post-wrapper">
              <div class="mt-addons-blog-posts-carousel-custom">
                <div class="mt-addons-blog-posts-carousel-thumbnail enefti-card-img">
                  <div class="mt-addons-blog-featured-image">
                    <img src="/nft/${nft}.jpg" alt="celebracion">
                    <div class="mt-addons-blog-posts-carousel-button mt-shop-cards-button">
                      <div class="mt-addons-blog-posts-carousel-content-inside">
                        <a href="/collections/${nft}" class="enefti-gradient-v1 enefti-btn-xl relative">View Item</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-addons-blog-posts-carousel-head-content">
                <div class="enefti-card-title d-flex justify-content-between">
                  <a href="/collections/${nft}" class="n-nft-${nft}">---</a>
                </div>
                <div class="enefti-details-card">
                  <p>Mint Price</p>
                  <a class="d-flex align-items-center">
                    <img class="enefty-crypto-img" src="/assets/images/icons_svgs/weth.svg" alt="weth">
                    ${price} USDT
                  </a>
                </div>
              </div>
            </div>
          </div>`;
}

// Function to fetch NFT metadata and update the name asynchronously
function fetchNftMetadata(nft) {
  $.get(`/nft/metadata/${nft}.json`, function (data, status) {
    $('.n-nft-' + nft).html(data.name);
  });
}
