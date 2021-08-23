import { hooks } from "@bigcommerce/stencil-utils";
import CatalogPage from "./catalog";
import compareProducts from "./global/compare-products";
import FacetedSearch from "./common/faceted-search";
import { createTranslationDictionary } from "../theme/common/utils/translations-utils";

const CART_API = "/api/storefront/carts";

export default class Category extends CatalogPage {
  constructor(context) {
    super(context);
    this.validationDictionary = createTranslationDictionary(context);
  }

  setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  }

  makeShopByPriceFilterAccessible() {
    if (!$("[data-shop-by-price]").length) return;

    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }

    $("a.navList-action").on("click", () =>
      this.setLiveRegionAttributes(
        $("span.price-filter-message"),
        "status",
        "assertive"
      )
    );
  }

  onShowProductSecondImage(e) {
    const card = $(e.currentTarget).find(".card-image");
    const image = card.attr("data-hoverimage");
    card.attr("srcset", image);
  }

  onRemoveProductSecondImage(e) {
    const card = $(e.currentTarget).find(".card-image");
    const image = card.attr("data-src");
    card.attr("srcset", image);
  }

  createCart(url, items) {
    const cartItems = {
      lineItems: items
    };
    const body = JSON.stringify(cartItems);

    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body
    }).then(response => response.json());
  }

  getCart(url) {
    return fetch(url, { method: "GET", credentials: "same-origin" }).then(
      response => response.json()
    );
  }

  deleteCartItems(url, cartId) {
    return fetch(`${url}/${cartId}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response);
  }

  onAddAllToCart() {
    let products = [];
    for (let i = 0; i < this.context.categoryProducts.length; i++) {
      products = [
        ...products,
        {
          quantity: this.context.categoryProducts[i].qty_in_cart + 1,
          productId: this.context.categoryProducts[i].id
        }
      ];
    }
    this.createCart(CART_API, products)
      .then(data => {
        if (data) {
          $("#removeAllItems").css("display", "block");
          $(".add-notification").css("display", "block");
          $(".remove-notification").css("display", "none");
          setTimeout(() => {
            $(".add-notification").css("display", "none");
          }, 5000);
        }
      })
      .catch(err => console.error(err));
  }

  onRemoveAllItems() {
    this.getCart(
      `${CART_API}?include=lineItems.digitalItems.options,lineItems.physicalItems.options`
    )
      .then(data => this.deleteCartItems(CART_API, data[0].id))
      .then(data => {
        if (data) {
          $("#removeAllItems").css("display", "none");
          $(".add-notification").css("display", "none");
          $(".remove-notification").css("display", "block");
          setTimeout(() => {
            $(".remove-notification").css("display", "none");
          }, 5000);
        }
      })
      .catch(err => console.error(err));
  }

  onCheckCart() {
    this.getCart(
      `${CART_API}?include=lineItems.digitalItems.options,lineItems.physicalItems.options`
    )
      .then(data => {
        if (data.length > 0) {
          $("#removeAllItems").css("display", "block");
        } else {
          $("#removeAllItems").css("display", "none");
        }
      })
      .catch(err => console.error(err));
  }

  onReady() {
    this.arrangeFocusOnSortBy();

    $('[data-button-type="add-cart"]').on("click", e =>
      this.setLiveRegionAttributes(
        $(e.currentTarget).next(),
        "status",
        "polite"
      )
    );

    this.makeShopByPriceFilterAccessible();

    compareProducts(this.context);

    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      hooks.on("sortBy-submitted", this.onSortBySubmit);
    }

    $("a.reset-btn").on("click", () =>
      this.setLiveRegionsAttributes($("span.reset-message"), "status", "polite")
    );

    this.onCheckCart();
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
    $("#removeAllItems").on("click", this.onRemoveAllItems.bind(this));
    $(".card-figure").hover(
      this.onShowProductSecondImage.bind(this),
      this.onRemoveProductSecondImage.bind(this)
    );

    this.ariaNotifyNoProducts();
  }

  ariaNotifyNoProducts() {
    const $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  }

  initFacetedSearch() {
    const {
      price_min_evaluation: onMinPriceError,
      price_max_evaluation: onMaxPriceError,
      price_min_not_entered: minPriceNotEntered,
      price_max_not_entered: maxPriceNotEntered,
      price_invalid_value: onInvalidPrice
    } = this.validationDictionary;
    const $productListingContainer = $("#product-listing-container");
    const $facetedSearchContainer = $("#faceted-search-container");
    const productsPerPage = this.context.categoryProductsPerPage;
    const requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: "category/product-listing",
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };

    this.facetedSearch = new FacetedSearch(
      requestOptions,
      content => {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);

        $("body").triggerHandler("compareReset");

        $("html, body").animate(
          {
            scrollTop: 0
          },
          100
        );
      },
      {
        validationErrorMessages: {
          onMinPriceError,
          onMaxPriceError,
          minPriceNotEntered,
          maxPriceNotEntered,
          onInvalidPrice
        }
      }
    );
  }
}
