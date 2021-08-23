(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/js/theme/compare.js":
/*!************************************!*\
  !*** ./assets/js/theme/compare.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Compare; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Compare = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Compare, _PageManager);

  function Compare() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Compare.prototype;

  _proto.onReady = function onReady() {
    var _this = this;

    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    var message = this.context.compareRemoveMessage;
    $('body').on('click', '[data-comparison-remove]', function (event) {
      if (_this.context.comparisons.length <= 2) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_1__["showAlertModal"])(message);
        event.preventDefault();
      }
    });
  };

  return Compare;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");


function decrementCounter(counter, item) {
  var index = counter.indexOf(item);

  if (index > -1) {
    counter.splice(index, 1);
  }
}

function incrementCounter(counter, item) {
  counter.push(item);
}

function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }

    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var noCompareMessage = _ref.noCompareMessage,
      urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');

    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }

    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('submit', '[data-product-compare]', function (event) {
    var $this = $(event.currentTarget);
    var productsToCompare = $this.find('input[name="products\[\]"]:checked');

    if (productsToCompare.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      event.preventDefault();
    }
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tcGFyZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMuanMiXSwibmFtZXMiOlsiQ29tcGFyZSIsIm9uUmVhZHkiLCJjb21wYXJlUHJvZHVjdHMiLCJjb250ZXh0IiwibWVzc2FnZSIsImNvbXBhcmVSZW1vdmVNZXNzYWdlIiwiJCIsIm9uIiwiZXZlbnQiLCJjb21wYXJpc29ucyIsImxlbmd0aCIsInNob3dBbGVydE1vZGFsIiwicHJldmVudERlZmF1bHQiLCJQYWdlTWFuYWdlciIsImRlY3JlbWVudENvdW50ZXIiLCJjb3VudGVyIiwiaXRlbSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImluY3JlbWVudENvdW50ZXIiLCJwdXNoIiwidXBkYXRlQ291bnRlck5hdiIsIiRsaW5rIiwidXJscyIsImlzIiwiYWRkQ2xhc3MiLCJhdHRyIiwiY29tcGFyZSIsImpvaW4iLCJmaW5kIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwibm9Db21wYXJlTWVzc2FnZSIsImNvbXBhcmVDb3VudGVyIiwiJGNvbXBhcmVMaW5rIiwiJGNoZWNrZWQiLCJtYXAiLCJlbGVtZW50IiwidmFsdWUiLCJnZXQiLCJ0cmlnZ2VySGFuZGxlciIsInByb2R1Y3QiLCJjdXJyZW50VGFyZ2V0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkdGhpcyIsInByb2R1Y3RzVG9Db21wYXJlIiwiJGNsaWNrZWRDaGVja2VkSW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0lBRXFCQSxPOzs7Ozs7Ozs7U0FDakJDLE8sR0FBQSxtQkFBVTtBQUFBOztBQUNOQyw0RUFBZSxDQUFDLEtBQUtDLE9BQU4sQ0FBZjtBQUVBLFFBQU1DLE9BQU8sR0FBRyxLQUFLRCxPQUFMLENBQWFFLG9CQUE3QjtBQUVBQyxLQUFDLENBQUMsTUFB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S0FGRCxNQUVPO0FBQ0g1QixzQkFBZ0IsQ0FBQ29CLGNBQUQsRUFBaUJRLE9BQWpCLENBQWhCO0FBQ0g7O0FBRURwQixvQkFBZ0IsQ0FBQ1ksY0FBRCxFQUFpQlUsbUJBQWpCLEVBQXNDcEIsSUFBdEMsQ0FBaEI7QUFDSCxHQVhEO0FBYUFsQixHQUFDLENBQUMsTUFBRCxDQUFELENBQVVDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLHdCQUF2QixFQUFpRCxVQUFBQyxLQUFLLEVBQUk7QUFDdEQsUUFBTXNDLEtBQUssR0FBR3hDLENBQUMsQ0FBQ0UsS0FBSyxDQUFDbUMsYUFBUCxDQUFmO0FBQ0EsUUFBTUksaUJBQWlCLEdBQUdELEtBQUssQ0FBQ2hCLElBQU4sQ0FBVyxvQ0FBWCxDQUExQjs7QUFFQSxRQUFJaUIsaUJBQWlCLENBQUNyQyxNQUFsQixJQUE0QixDQUFoQyxFQUFtQztBQUMvQkMsbUVBQWMsQ0FBQ3NCLGdCQUFELENBQWQ7QUFDQXpCLFdBQUssQ0FBQ0ksY0FBTjtBQUNIO0FBQ0osR0FSRDtBQVVBTixHQUFDLENBQUMsTUFBRCxDQUFELENBQVVDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHFCQUF0QixFQUE2QyxZQUFNO0FBQy9DLFFBQU15QyxvQkFBb0IsR0FBRzFDLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVXdCLElBQVYsQ0FBZSxvQ0FBZixDQUE3Qjs7QUFFQSxRQUFJa0Isb0JBQW9CLENBQUN0QyxNQUFyQixJQUErQixDQUFuQyxFQUFzQztBQUNsQ0MsbUVBQWMsQ0FBQ3NCLGdCQUFELENBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBUEQ7QUFRSCxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBhcmUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuY29udGV4dC5jb21wYXJlUmVtb3ZlTWVzc2FnZTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBhcmlzb24tcmVtb3ZlXScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQuY29tcGFyaXNvbnMubGVuZ3RoIDw9IDIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJscykge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKGNvdW50ZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgbm9Db21wYXJlTWVzc2FnZSwgdXJscyB9KSB7XG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XG5cbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJscyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdzdWJtaXQnLCAnW2RhdGEtcHJvZHVjdC1jb21wYXJlXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1RvQ29tcGFyZSA9ICR0aGlzLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RzVG9Db21wYXJlLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbChub0NvbXBhcmVNZXNzYWdlKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtkYXRhLWNvbXBhcmUtbmF2XScsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDaGVja2VkSW5wdXQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBpZiAoJGNsaWNrZWRDaGVja2VkSW5wdXQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKG5vQ29tcGFyZU1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9