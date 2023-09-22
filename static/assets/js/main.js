const Main = {
  generate: () => {
    let delay = 100;
    for (let l = 1; l < 10; l++) {
      let nft = Math.floor(Math.random() * 100) + 1;
      let a = ` <div class="swiper-slide" id="enefti-slide-${l}" data-swiper-slide-index="1" data-aos="fade-up" data-aos-delay="${delay}">
                                        <div class="enefti-swiper-img">
                                            <a class="modeltheme_media_image" title="AvidLines #9998"
                                                href="single-nft.html">
                                                <img src="/nft/${nft}.jpg" alt="nft #${nft}" />
                                            </a>
                                        </div>
                                        <div class="mt-addons-collector-wrapper">
                                            <img class="cat-image entered lazyloaded" alt="avid-logo"
                                                src="/nft/1.jpg" />
                                        </div>
                                        <div class="mt-addons-info-wrapper info-wrapper-v2">
                                            <a class="#categoryid_306 addon-dark" href="https://opensea.io/assets/bsc/0xdb92be5d6ef6136c3e8d54e161a10e83e4f4a113/${nft}">
                                                <span class="mt-addons-title n-nft-${nft}"  > --- </span>
                                            </a>
                                            <span class="mt-addons-subtitle">
                                                <strong>100 USDT</strong>
                                            </span>
                                            <br>
                                        </div>
                                    </div>`;
      $('#slid').append(a);

      $.get(`/nft/metadata/${nft}.json`, function (data, status) {
        $('.n-nft-' + nft).html(data.name);
      });

      delay += 100;
    }
  },
  initAos: () => {
    const nav = document.querySelector('.header1');
    const scrollThreshold = 150; // Batas scroll (dalam piksel) untuk menambahkan efek "sticky"

    window.addEventListener(
      'scroll',
      function (event) {
        if (window.scrollY > scrollThreshold) {
          nav.classList.add('sticky');
        } else {
          nav.classList.remove('sticky');
        }
      },
      true
    );

    AOS.init();
  },
  delay: (second) => {
    return new Promise((resolve) => setTimeout(resolve, second * 1000));
  },
  alertSuccess: async (title, text, htmlContent) => {
    swal({
      title: title,
      text: text,
      icon: 'success',
      timer: 3000,
    });

    const footer = document.querySelector('.swal-footer');

    footer.style.textAlign = 'center';
    footer.classList.add('swal-footer-2');

    const alert = document.createElement('div');
    alert.classList.add('footer-alert');
    alert.innerHTML = htmlContent;
    footer.appendChild(alert);
  },
  alertError: async (title, text) => {
    swal({
      title: title,
      text: text,
      icon: 'error',
      dangerMode: true,
    });

    const dtext = document.querySelector('.swal-text');

    dtext.style.color = '#FFE8D9';
  },
};
