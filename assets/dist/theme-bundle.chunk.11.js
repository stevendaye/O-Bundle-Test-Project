(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var CART_API = "/api/storefront/carts";

var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;

    if (!$("[data-shop-by-price]").length) return;

    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }

    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };

  _proto.onShowProductSecondImage = function onShowProductSecondImage(e) {
    var card = $(e.currentTarget).find(".card-image");
    var image = card.attr("data-hoverimage");
    card.attr("srcset", image);
  };

  _proto.onRemoveProductSecondImage = function onRemoveProductSecondImage(e) {
    var card = $(e.currentTarget).find(".card-image");
    var image = card.attr("data-src");
    card.attr("srcset", image);
  };

  _proto.createCart = function createCart(url, items) {
    var cartItems = {
      lineItems: items
    };
    var body = JSON.stringify(cartItems);
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    }).then(function (response) {
      return response.json();
    });
  };

  _proto.getCart = function getCart(url) {
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    });
  };

  _proto.deleteCartItems = function deleteCartItems(url, cartId) {
    return fetch(url + "/" + cartId, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response;
    });
  };

  _proto.onAddAllToCart = function onAddAllToCart() {
    var products = [];

    for (var i = 0; i < this.context.categoryProducts.length; i++) {
      products = [].concat(products, [{
        quantity: this.context.categoryProducts[i].qty_in_cart + 1,
        productId: this.context.categoryProducts[i].id
      }]);
    }

    this.createCart(CART_API, products).then(function (data) {
      if (data) {
        $("#removeAllItems").css("display", "block");
        $(".add-notification").css("display", "block");
        $(".remove-notification").css("display", "none");
        setTimeout(function () {
          $(".add-notification").css("display", "none");
        }, 5000);
      }
    }).catch(function (err) {
      return console.error(err);
    });
  };

  _proto.onRemoveAllItems = function onRemoveAllItems() {
    var _this3 = this;

    this.getCart(CART_API + "?include=lineItems.digitalItems.options,lineItems.physicalItems.options").then(function (data) {
      return _this3.deleteCartItems(CART_API, data[0].id);
    }).then(function (data) {
      if (data) {
        $("#removeAllItems").css("display", "none");
        $(".add-notification").css("display", "none");
        $(".remove-notification").css("display", "block");
        setTimeout(function () {
          $(".remove-notification").css("display", "none");
        }, 5000);
      }
    }).catch(function (err) {
      return console.error(err);
    });
  };

  _proto.onCheckCart = function onCheckCart() {
    this.getCart(CART_API + "?include=lineItems.digitalItems.options,lineItems.physicalItems.options").then(function (data) {
      if (data.length > 0) {
        $("#removeAllItems").css("display", "block");
      } else {
        $("#removeAllItems").css("display", "none");
      }
    }).catch(function (err) {
      return console.error(err);
    });
  };

  _proto.onReady = function onReady() {
    var _this4 = this;

    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this4.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }

    $("a.reset-btn").on("click", function () {
      return _this4.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.onCheckCart();
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
    $("#removeAllItems").on("click", this.onRemoveAllItems.bind(this));
    $(".card-figure").hover(this.onShowProductSecondImage.bind(this), this.onRemoveProductSecondImage.bind(this));
    this.ariaNotifyNoProducts();
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
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
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ0FSVF9BUEkiLCJDYXRlZ29yeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uU2hvd1Byb2R1Y3RTZWNvbmRJbWFnZSIsImUiLCJjYXJkIiwiY3VycmVudFRhcmdldCIsImZpbmQiLCJpbWFnZSIsIm9uUmVtb3ZlUHJvZHVjdFNlY29uZEltYWdlIiwiY3JlYXRlQ2FydCIsInVybCIsIml0ZW1zIiwiY2FydEl0ZW1zIiwibGluZUl0ZW1zIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJnZXRDYXJ0IiwiZGVsZXRlQ2FydEl0ZW1zIiwiY2FydElkIiwib25BZGRBbGxUb0NhcnQiLCJwcm9kdWN0cyIsImkiLCJjYXRlZ29yeVByb2R1Y3RzIiwicXVhbnRpdHkiLCJxdHlfaW5fY2FydCIsInByb2R1Y3RJZCIsImlkIiwiZGF0YSIsImNzcyIsInNldFRpbWVvdXQiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm9uUmVtb3ZlQWxsSXRlbXMiLCJvbkNoZWNrQ2FydCIsIm9uUmVhZHkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiaG92ZXIiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxRQUFRLEdBQUcsdUJBQWpCOztJQUVxQkMsUTs7O0FBQ25CLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLG9DQUFNQSxPQUFOO0FBQ0EsVUFBS0Msb0JBQUwsR0FBNEJDLDBHQUEyQixDQUFDRixPQUFELENBQXZEO0FBRm1CO0FBR3BCOzs7O1NBRURHLHVCLEdBQUEsaUNBQXdCQyxRQUF4QixFQUFrQ0MsUUFBbEMsRUFBNENDLGNBQTVDLEVBQTREO0FBQzFERixZQUFRLENBQUNHLElBQVQsQ0FBYztBQUNaQyxVQUFJLEVBQUVILFFBRE07QUFFWixtQkFBYUM7QUFGRCxLQUFkO0FBSUQsRzs7U0FFREcsK0IsR0FBQSwyQ0FBa0M7QUFBQTs7QUFDaEMsUUFBSSxDQUFDQyxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQkMsTUFBL0IsRUFBdUM7O0FBRXZDLFFBQUlELENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCRSxRQUFyQixDQUE4QixXQUE5QixDQUFKLEVBQWdEO0FBQzlDRixPQUFDLENBQUMsNEJBQUQsQ0FBRCxDQUFnQ0csS0FBaEM7QUFDRDs7QUFFREgsS0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JJLEVBQXRCLENBQXlCLE9BQXpCLEVBQWtDO0FBQUEsYUFDaEMsTUFBSSxDQUFDWCx1QkFBTCxDQUNFTyxDQUFDLENBQUMsMkJBQUQsQ0FESCxFQUVFLFFBRkYsRUFHRSxXQUhGLENBRGdDO0FBQUEsS0FBbEM7QUFPRCxHOztTQUVESyx3QixHQUFBLGtDQUF5QkMsQ0FBekIsRUFBNEI7QUFDMUIsUUFBTUMsSUFBSSxHQUFHUCxDQUFDLENBQUNNLENBQUMsQ0FBQ0UsYUFBSCxDQUFELENBQW1CQyxJQUFuQixDQUF3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NUIsRUFBNENjLEdBQTVDLENBQWdELFVBQUFDLEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWVDLEdBQWYsRUFBSjtBQUFBLEdBQW5ELENBQXhCO0FBRUEsU0FBT0osZUFBZSxDQUFDSyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBVzFFLENBQVgsRUFBaUI7QUFDM0M4RSxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSixhQUFhLENBQUN0RSxDQUFELENBQXhCO0FBQ0EsV0FBTzhFLEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSBcIi4vY2F0YWxvZ1wiO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tIFwiLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0c1wiO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSBcIi4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoXCI7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tIFwiLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlsc1wiO1xuXG5jb25zdCBDQVJUX0FQSSA9IFwiL2FwaS9zdG9yZWZyb250L2NhcnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgfVxuXG4gIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcbiAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgXCJhcmlhLWxpdmVcIjogYXJpYUxpdmVTdGF0dXNcbiAgICB9KTtcbiAgfVxuXG4gIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgaWYgKCEkKFwiW2RhdGEtc2hvcC1ieS1wcmljZV1cIikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBpZiAoJChcIi5uYXZMaXN0LWFjdGlvblwiKS5oYXNDbGFzcyhcImlzLWFjdGl2ZVwiKSkge1xuICAgICAgJChcImEubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlXCIpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgJChcImEubmF2TGlzdC1hY3Rpb25cIikub24oXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcbiAgICAgICAgJChcInNwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2VcIiksXG4gICAgICAgIFwic3RhdHVzXCIsXG4gICAgICAgIFwiYXNzZXJ0aXZlXCJcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgb25TaG93UHJvZHVjdFNlY29uZEltYWdlKGUpIHtcbiAgICBjb25zdCBjYXJkID0gJChlLmN1cnJlbnRUYXJnZXQpLmZpbmQoXCIuY2FyZC1pbWFnZVwiKTtcbiAgICBjb25zdCBpbWFnZSA9IGNhcmQuYXR0cihcImRhdGEtaG92ZXJpbWFnZVwiKTtcbiAgICBjYXJkLmF0dHIoXCJzcmNzZXRcIiwgaW1hZ2UpO1xuICB9XG5cbiAgb25SZW1vdmVQcm9kdWN0U2Vjb25kSW1hZ2UoZSkge1xuICAgIGNvbnN0IGNhcmQgPSAkKGUuY3VycmVudFRhcmdldCkuZmluZChcIi5jYXJkLWltYWdlXCIpO1xuICAgIGNvbnN0IGltYWdlID0gY2FyZC5hdHRyKFwiZGF0YS1zcmNcIik7XG4gICAgY2FyZC5hdHRyKFwic3Jjc2V0XCIsIGltYWdlKTtcbiAgfVxuXG4gIGNyZWF0ZUNhcnQodXJsLCBpdGVtcykge1xuICAgIGNvbnN0IGNhcnRJdGVtcyA9IHtcbiAgICAgIGxpbmVJdGVtczogaXRlbXNcbiAgICB9O1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShjYXJ0SXRlbXMpO1xuXG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keVxuICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgfVxuXG4gIGdldENhcnQodXJsKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgeyBtZXRob2Q6IFwiR0VUXCIsIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIgfSkudGhlbihcbiAgICAgIHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKVxuICAgICk7XG4gIH1cblxuICBkZWxldGVDYXJ0SXRlbXModXJsLCBjYXJ0SWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dXJsfS8ke2NhcnRJZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UpO1xuICB9XG5cbiAgb25BZGRBbGxUb0NhcnQoKSB7XG4gICAgbGV0IHByb2R1Y3RzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgcHJvZHVjdHMgPSBbXG4gICAgICAgIC4uLnByb2R1Y3RzLFxuICAgICAgICB7XG4gICAgICAgICAgcXVhbnRpdHk6IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzW2ldLnF0eV9pbl9jYXJ0ICsgMSxcbiAgICAgICAgICBwcm9kdWN0SWQ6IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzW2ldLmlkXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlQ2FydChDQVJUX0FQSSwgcHJvZHVjdHMpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAkKFwiLmFkZC1ub3RpZmljYXRpb25cIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICQoXCIucmVtb3ZlLW5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoXCIuYWRkLW5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgfVxuXG4gIG9uUmVtb3ZlQWxsSXRlbXMoKSB7XG4gICAgdGhpcy5nZXRDYXJ0KFxuICAgICAgYCR7Q0FSVF9BUEl9P2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnNgXG4gICAgKVxuICAgICAgLnRoZW4oZGF0YSA9PiB0aGlzLmRlbGV0ZUNhcnRJdGVtcyhDQVJUX0FQSSwgZGF0YVswXS5pZCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICQoXCIuYWRkLW5vdGlmaWNhdGlvblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAkKFwiLnJlbW92ZS1ub3RpZmljYXRpb25cIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJChcIi5yZW1vdmUtbm90aWZpY2F0aW9uXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICB9XG5cbiAgb25DaGVja0NhcnQoKSB7XG4gICAgdGhpcy5nZXRDYXJ0KFxuICAgICAgYCR7Q0FSVF9BUEl9P2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnNgXG4gICAgKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG5cbiAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oXCJjbGlja1wiLCBlID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLFxuICAgICAgICBcInN0YXR1c1wiLFxuICAgICAgICBcInBvbGl0ZVwiXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICBpZiAoJChcIiNmYWNldGVkU2VhcmNoXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgIGhvb2tzLm9uKFwic29ydEJ5LXN1Ym1pdHRlZFwiLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICAkKFwiYS5yZXNldC1idG5cIikub24oXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJChcInNwYW4ucmVzZXQtbWVzc2FnZVwiKSwgXCJzdGF0dXNcIiwgXCJwb2xpdGVcIilcbiAgICApO1xuXG4gICAgdGhpcy5vbkNoZWNrQ2FydCgpO1xuICAgICQoXCIjYWRkQWxsVG9DYXJ0XCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkFkZEFsbFRvQ2FydC5iaW5kKHRoaXMpKTtcbiAgICAkKFwiI3JlbW92ZUFsbEl0ZW1zXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5vblJlbW92ZUFsbEl0ZW1zLmJpbmQodGhpcykpO1xuICAgICQoXCIuY2FyZC1maWd1cmVcIikuaG92ZXIoXG4gICAgICB0aGlzLm9uU2hvd1Byb2R1Y3RTZWNvbmRJbWFnZS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy5vblJlbW92ZVByb2R1Y3RTZWNvbmRJbWFnZS5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgfVxuXG4gIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoXCJbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dXCIpO1xuICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZVxuICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoXCIjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoXCIjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBwcm9kdWN0TGlzdGluZzogXCJjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmdcIixcbiAgICAgICAgc2lkZWJhcjogXCJjYXRlZ29yeS9zaWRlYmFyXCJcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogXCJjYXRlZ29yeS9zaG93LW1vcmVcIlxuICAgIH07XG5cbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcbiAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgY29udGVudCA9PiB7XG4gICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgJChcImJvZHlcIikudHJpZ2dlckhhbmRsZXIoXCJjb21wYXJlUmVzZXRcIik7XG5cbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgb25JbnZhbGlkUHJpY2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=