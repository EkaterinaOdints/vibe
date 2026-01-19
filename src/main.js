import "./styles/styles.scss";

const initModalOrder = () => {
  const body = document.body;
  const modal = document.querySelector("[data-js-modal-order]");
  const modalInner = modal?.querySelector("[data-js-modal-inner]");
  const modalCloseButton = modal?.querySelector("[data-js-modal-button-close]");
  const buttonCollection = document.querySelectorAll("[data-js-modal-order-button]");

  if (!modal || !modalInner || !modalCloseButton || !buttonCollection?.length) {
    return;
  }

  const closeModal = () => {
    body.classList.remove("modal-overlay");
    modal.classList.remove("is-modal-opened");

    modalCloseButton.removeEventListener("click", closeModal);
    modal.removeEventListener("click", onModalOutsideClick);
    document.removeEventListener("keydown", onEscapeClick);
  };

  const openModal = () => {
    body.classList.add("modal-overlay");
    modal.classList.add("is-modal-opened");

    modalCloseButton.addEventListener("click", closeModal);
    modal.addEventListener("click", onModalOutsideClick);
    document.addEventListener("keydown", onEscapeClick);
  };

  function onModalOutsideClick(evt) {
    if (evt.composedPath().includes(modalInner)) {
      return null;
    } else {
      closeModal();
    }
  }

  function onEscapeClick(evt) {
    if (evt.code === "Escape") {
      closeModal();
    }
  }

  buttonCollection.forEach((button) => {
    button.addEventListener("click", openModal);
  });
};

const initMobileMenu = () => {
  const body = document.body;
  const header = body.querySelector("[data-js-header]");
  const menuButton = header?.querySelector("[data-js-menu-button]");

  if (!header || !menuButton) {
    return;
  }

  let isMenuOpened = false;

  const openMenu = () => {
    header.classList.add("is-menu-opened");
    body.classList.add("overlay");

    menuButton.setAttribute("aria-label", "Закрыть меню");

    isMenuOpened = true;

    body.addEventListener("click", onMenuOutsideClick);
    document.addEventListener("keydown", onEscapeClick);
  };

  const closeMenu = () => {
    header.classList.remove("is-menu-opened");
    body.classList.remove("overlay");

    menuButton.setAttribute("aria-label", "Открыть меню");

    isMenuOpened = false;

    body.removeEventListener("click", onMenuOutsideClick);
    document.removeEventListener("keydown", onEscapeClick);
  };

  function onMenuOutsideClick(evt) {
    if (evt.composedPath().includes(header)) {
      return null;
    } else {
      closeMenu();
    }
  }

  function onEscapeClick(evt) {
    if (evt.code === "Escape") {
      closeMenu();
    }
  }

  menuButton.addEventListener("click", () => {
    if (isMenuOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (isMenuOpened) {
      closeMenu();
    }
  });
};

const initAllTabs = () => {
  const removeActiveClass = (collection) => {
    collection.forEach((item) => {
      item.classList.remove("is-active");
    });
  };

  const activateItem = (collection, id) => {
    collection.forEach((item) => {
      if (item.dataset.jsTabContent === id) {
        item.classList.add("is-active");
      }
    });
  };

  const initProductTypeChange = () => {
    const productCollection = document.body.querySelectorAll("[data-js-product-typed]");

    if (!productCollection?.length) {
      return;
    }

    productCollection?.forEach((product) => {
      if (!product) {
        return;
      }

      const typeButtonCollection = product?.querySelectorAll("[data-js-type-button]");
      const imageCollection = product?.querySelectorAll("[data-js-type-image]");
      const priceCollection = product?.querySelectorAll("[data-js-type-price]");

      typeButtonCollection?.forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.dataset.jsTypeButton;

          removeActiveClass(typeButtonCollection);
          removeActiveClass(imageCollection);
          removeActiveClass(priceCollection);

          activateItem(imageCollection, id);
          activateItem(priceCollection, id);

          button.classList.add("is-active");
        });
      });
    });
  };

  const initCatalogPreview = () => {
    const catalog = document.body.querySelector("[data-js-catalog-preview-tab-container]");

    const tabButtonCollection = catalog?.querySelectorAll("[data-js-tab-button-wrapper] > [data-js-tab-button]");
    const tabContentCollection = catalog?.querySelectorAll("[data-js-tab-content-price]");
    const tabProductCollection = catalog?.querySelectorAll("[data-js-tab-content-product]");

    if (!tabButtonCollection?.length || !tabContentCollection?.length || !tabProductCollection?.length) {
      return;
    }

    // табы, переключающие продукт (картинка и цены)
    tabButtonCollection?.forEach((button) => {
      const id = button.dataset.jsTabButton;

      button.addEventListener("click", () => {
        removeActiveClass(tabButtonCollection);
        removeActiveClass(tabContentCollection);
        removeActiveClass(tabProductCollection);

        activateItem(tabContentCollection, id);
        activateItem(tabProductCollection, id);

        button.classList.add("is-active");
      });
    });

    // переключение картинок и цен в зависимости от типа
    tabProductCollection?.forEach((product) => {
      if (product.hasAttribute("data-js-tab-product-typed")) {
        const typeButtonCollection = product.querySelectorAll("[data-js-tab-button]");
        const typeProductCollection = product.querySelectorAll("[data-js-tab-product-type]");

        const productId = product.dataset.jsTabContent;

        typeButtonCollection?.forEach((button) => {
          const id = button.dataset.jsTabButton;

          button.addEventListener("click", () => {
            removeActiveClass(typeButtonCollection);
            removeActiveClass(typeProductCollection);

            activateItem(typeProductCollection, id);

            // переключение цен в зависимости от типа
            tabContentCollection?.forEach((item) => {
              if (item.dataset.jsTabContent === productId) {
                const priceCollection = item.querySelectorAll("[data-js-tab-content]");

                removeActiveClass(priceCollection);
                activateItem(priceCollection, id);
              }
            });

            button.classList.add("is-active");
          });
        });
      }
    });
  };

  const initTabs = () => {
    const containerCollection = document.body.querySelectorAll("[data-js-tab-container]");

    containerCollection.forEach((container) => {
      const tabButtonCollection = container?.querySelectorAll("[data-js-tab-button-wrapper] > [data-js-tab-button]");
      const tabContentCollection = container?.querySelectorAll("[data-js-tab-content-wrapper] > [data-js-tab-content]");

      if (!tabButtonCollection?.length || !tabContentCollection?.length) {
        return;
      }

      tabButtonCollection?.forEach((button) => {
        const id = button.dataset.jsTabButton;

        button.addEventListener("click", () => {
          removeActiveClass(tabButtonCollection);
          removeActiveClass(tabContentCollection);

          tabContentCollection.forEach((content) => {
            if (content.dataset.jsTabContent === id) {
              activateItem(tabContentCollection, id);
            }
          });

          button.classList.add("is-active");
        });
      });
    });
  };

  initProductTypeChange();
  initCatalogPreview();
  initTabs();
};

const initAccordions = () => {
  const accordionCollection = document.body.querySelectorAll("[data-js-accordion]");

  if (!accordionCollection?.length) {
    return;
  }

  accordionCollection?.forEach((accordion) => {
    const accordionItemCollection = accordion.querySelectorAll("[data-js-accordion-item]");

    accordionItemCollection?.forEach((item) => {
      const button = item.querySelector("[data-js-accordion-item-button]");
      const text = item.querySelector("[data-js-accordion-item-text]");

      let isActive = false;

      const openAccordion = () => {
        text.style.maxHeight = text.scrollHeight + "px";
        button?.classList.add("is-active");
        isActive = true;
      };

      const closeAccordion = () => {
        text.style.maxHeight = 0;
        button?.classList.remove("is-active");
        isActive = false;
      };

      button.addEventListener("click", () => {
        if (isActive) {
          closeAccordion();
        } else {
          openAccordion();
        }
      });
    });
  });
};

const initSalesBannerSliders = () => {
  const salesSliderCollection = document.body.querySelectorAll("[data-js-sales-banner-swiper]");

  if (!salesSliderCollection?.length) {
    return;
  }

  salesSliderCollection?.forEach((slider) => {
    if (!slider) {
      return;
    }

    const buttonPrev = slider.querySelector("[data-js-sales-banner-swiper-button-prev]");
    const buttonNext = slider.querySelector("[data-js-sales-banner-swiper-button-next]");

    new Swiper(slider, {
      loop: true,
      spaceBetween: 5,

      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev,
      },

      breakpoints: {
        769: {
          spaceBetween: 15,
        },
      },
    });
  });
};

const initShortReviewsSliders = () => {
  const reviewsSliderContainerCollection = document.body.querySelectorAll("[data-js-short-reviews-swiper-container]");

  if (!reviewsSliderContainerCollection?.length) {
    return;
  }

  reviewsSliderContainerCollection?.forEach((sliderContainer) => {
    if (!sliderContainer) {
      return;
    }

    const slider = sliderContainer.querySelector("[data-js-short-reviews-swiper]");
    const buttonPrev = sliderContainer.querySelector("[data-js-short-reviews-swiper-button-prev]");
    const buttonNext = sliderContainer.querySelector("[data-js-short-reviews-swiper-button-next]");

    new Swiper(slider, {
      spaceBetween: 30,
      slidesPerView: 1,
      slidesOffsetBefore: 10,
      slidesOffsetAfter: 10,

      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev,
      },

      breakpoints: {
        769: {
          spaceBetween: 30,
          slidesPerView: 1.5,
          slidesOffsetBefore: 40,
          slidesOffsetAfter: 40,
        },

        1241: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesOffsetBefore: 120,
          slidesOffsetAfter: 120,
        },

        1440: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesOffsetBefore: 195,
          slidesOffsetAfter: 195,
        },

        1441: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
      },
    });
  });
};

const initTextCrop = () => {
  const textContainerCollection = document.body.querySelectorAll("[data-js-text-crop-container]");

  if (!textContainerCollection?.length) {
    return;
  }

  textContainerCollection?.forEach((textContainer) => {
    const textWrapper = textContainer?.querySelector("[data-js-text-crop]");
    const button = textContainer?.querySelector("[data-js-text-crop-button]");
    const fullText = textWrapper?.textContent;

    if (!textWrapper || !button || !fullText) {
      return;
    }

    const cropText = () => {
      let symbolNumber = window.innerWidth <= 768 ? 173 : 436;
      return `${fullText.slice(0, symbolNumber)}...`;
    };

    let croppedText = cropText();
    let isShownFull = false;

    const hideFullText = () => {
      textWrapper.textContent = croppedText;
      button.textContent = "Просмотреть полностью";
      isShownFull = false;
    };

    const showFullText = () => {
      textWrapper.textContent = fullText;
      button.textContent = "Скрыть";
      isShownFull = true;
    };

    button.addEventListener("click", () => {
      if (!isShownFull) {
        showFullText();
      } else {
        hideFullText();
      }
    });

    hideFullText();

    window.addEventListener("resize", () => {
      croppedText = cropText();
      hideFullText();
    });
  });
};

initModalOrder();
initMobileMenu();
initAllTabs();
initAccordions();
initSalesBannerSliders();
initShortReviewsSliders();
initTextCrop();
