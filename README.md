# OBundle BigCommerce Test Project
## Instructions

### Setup
----------
Sign up for a BigCommerce trial store, this will be valid for 15 days and will be needed to complete the test
Install Stencil CLI for local development, you will be using the default Cornerstone Theme that comes standard with new BigCommerce stores

* Refer to the BigCommerce developer documentation for any questions you might have. It will contain all the info needed to complete the tasks below

### Task
----------
Create a product called Special Item which will be assigned to a new category called Special Items. Be sure to add at least 2 images during the product creation

The Special Item should be the only item which shows in this category - create a feature that will show the product's second image when it is hovered on.
Add a button at the top of the category page labeled Add All To Cart. When clicked, the product will be added to the cart. Notify the user that the product has been added.
If the cart has an item in it - show a button next to the Add All To Cart button which says Remove All Items. When clicked it should clear the cart and notify the user.
Both buttons should utilize the Storefront API for completion.

### Bonus
----------
If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone, etc). This should utilize the data that is rendered via Handlebars on the Customer Object.

### Submission
--------------------
Create a GitHub repo for your codebase . In the Readme file remove the current data and add your own which describes a brief overview of your test.
Be sure you include the Preview Code for the Bigcommerce Store, along with its URL, so we can view it. Then reply to this email with the Github repo link.


# Project Overview
--------------------
I created a trial BigCommerce store called *Space Store* . Next, I created a product called **Special Item** which I asigned to a category I created called **Special Items**. I added 4 images during the product creation. I deleted all other demo products in each default categories that come with the Standard Cornerstone theme. Only the **Special Item** product I created is found in the **Special Items** category. Only the Storefront APIs were used as required.

## Store Access
- Preview Code: There is no preview code set up. But it used to be: **h88rpw7te3**
- Store Url: https://space-store.mybigcommerce.com/

## Set Up
--------------------
I downloaded and installed the *Stencil CLI* for local Development and created an API Account on my Store Dashboard. Next I cloned from github the *Stencil's Cornerstone theme* for working and editing the default Cornerstone Theme that comes standard with new BigCommerce stores.

## Feature 1
--------------------
Creating a feature that will show the product's second image when it is hovered on.

1. Result
  - Go to **Special Items Category**.
  - Hover over the product to see the effect.

2. Steps
  - Generally, Cornerstone theme template files are located in `templates/pages`. Each of these files have their corresponding JavaScript `.js` files in `assets/js/theme`. These latter contains event handlers and logic for managing page specific element and actions.
  
  - Therefore, since the hover feature was to be implemented on the category page **Special Items**, I located the file `templates/pages/category.html` which led me down to `templates/components/common/responsive-img.html`. I then located the corresponding JavaScript file that is `assets/js/theme/category.js`.
  - For this, I needed to know some Handlebars helpers like `getImageSrcset` to get the product's second image from the CDN and create event handlers to make the switch of the image on hover. Therefore I added the following logics in:

  -- `templates/components/common/responsive-img.html` (Line 40)
  ```
    <img
      data-src="{{getImageSrcset image use_default_sizes=true}}"
      data-hoverimage='{{getImageSrcset images.[1] img size (cdn default) use_default_sizes=true}}'
    />
  ```

  -- `assets/js/theme/category.js`(Line 168-171)
  ```
    $(".card-figure").hover(
      this.onShowProductSecondImage.bind(this),
      this.onRemoveProductSecondImage.bind(this)
    );
  ```
  **NOTE**: In the begining, my first implementation was a hover over each thumbnail of the product images which displays the corresponding image in the original image container on the product page: https://space-store.mybigcommerce.com/special-item/. But after reading carefully the instructions again, I understood that the hover feature was meant on the category page.

## Feature 2
--------------------
Adding a button at the top of the category page labeled *Add All To Cart*. When clicked, the product will be added to the cart then notify the user that the product has been added.

1. Result
  - Go to **Special Items Category**.
  - Click the button **Add All To Cart** at the top of the category.

2. Steps
  - I located the corresponding category file in `templates/pages` and added the logic in:

  -- `templates/pages/category.html` (Line 49)
  ```
    {{#if category.name "===" "Special Items"}}
  ```
  **NOTE**: Each button **Add All To Cart** is to add products from its related category to the cart. However, here in our case there is only one product in the category **Special Items** and no products in other default categories. So, here I checked to make sure that the button only displays if the user is on **Special Items Catagery Page**. This is handy for this case only. Alternatively, should we have products in each of the other categories, the right way to inplement this is to use the Sotrefront's API to check if the current category page has products in this category. If there is at least one product we display or enable the button to add items to the cart. 

  -- `templates/pages/category.html` (Line 50-55)
  ```
    <div class="add-all-to-cart">
      <div class="d-flex">
        <input type="button" class="button button--primary" id="addAllToCart" value="Add All To Cart"/>
      </div>
    </div>
  ```

  --  `templates/pages/category.html` (Line 22-32)`
  ```
    <div class="cart-notification">
      <div class="add-notification">
        <i class="fas fa-check-circle"></i>
        Items were successfully added to the cart!
      </div>
    </div>
    <div class="clear-both"></div>
  ```

  -- `assets/js/theme/category.js` (Line 166)
  ```
    $("#addAllToCart").on("click", this.onAddAllToCart.bind(this));
  ```


## Feature 3
--------------------
If the cart has an item in it - show a button next to the **Add All To Cart** button which says **Remove All Items**. When clicked it should clear the cart and notify the user.

1. Result
  - Go to **Special Items Category**.
  - Click the button **Remove All Items** after clicking on **Add All To Cart** at the top of the category.

2. Steps
  - Still in the file `templates/pages`, I added:

  -- `templates/pages/category.html` (Line 50-53)
  ```
    <input type="button" class="button button--danger" id="removeAllItems" value="Remove All Items"/>
  ```

  --- `templates/pages/category.html` (Line 27-30)
  ```
  <div class="remove-notification">
      <i class="fas fa-check-circle"></i>
      Items were successfully removed from the cart!
    </div>
  ```

  -- `assets/js/theme/category.js` (Line 165 & 167)
  ```
  this.onCheckCart();
  $("#removeAllItems").on("click", this.onRemoveAllItems.bind(this));
  ```
  **NOTE**: The function on line 165 checks on page reload if there are products in the cart through the Storefront API. If there is at least a product, the **Remove All Items** button is displayed. By default this button doesn't display but is hidden with CSS and the display logic controlled in the `.js` file.

## Feature 4 (The Bonus)
--------------------
If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone etc). This should utilize the data that is rendered via Handlebars on the Customer Object.

1. Result
  - At the top of the page, click on *SIGN IN*. *REGISTER* first if you don't have an account.
  - Once registered or signed in, a barner or the user's basic details appears at the top the category page.

  **NOTE**: Since this is bar that shows the user's details, I've put it at the very top of the page so that it appears everywhere you browse. If we don't want this to happen we can tehn inplement it on the Category page in `templates/pages/category.html`.

2. Steps
  - I first located the file `templates/pages/home.html` which led me to the partial file `templates/layout/base.html` then to the file `templates/components/common/header.html`. Having the logging user's details which were made avaiable through the Handlebars Customer Object, I added:

  -- `templates/components/common/header.html` (Line 14-39)
  ```
    {{#if customer}}
      <header class="customer-details w-100">
          <div class="customer-about">
              <p class="customer-name">
                  <i class="fas fa-user"></i>
                  {{customer.name}}
              </p>
              <p class="customer-email">
                  <i class="fas fa-envelope-square"></i>
                  {{customer.email}}
              </p>
              <p class="customer-phone">
                  <i class="fas fa-phone"></i>
                  {{customer.phone}}
              </p>
              <p class="customer-messages">
                  <i class="fas fa-envelope"></i>
                  {{#if customer.num_new_messages}}
                      {{customer.num_new_messages}}
                  {{else}}
                      <span>0</span>
                  {{/if}}
              </p>
          </div>
      </header>
    {{/if}}
  ```
  **NOTE**: All event handlers and logic created for these features are found in the file `assets/js/theme/category.js` from line 38-137 and from line 165-171

## CSS Styles
I created a sass file named **custom.scss** in **assets/scss** then added all the css rules needed for these tasks. This file was then imported in **assets/scss/theme.scss** to make it availabe for the entire wesbsite.

## Other Handy BigCommerce Functionalities
There were several other BigCommerce Features and *Handlebars Helpers* that I found to be very useful. One that was handy for the implementation of the features was how I could access variables rendered by Handlebars in their corresponding JavaScript file: The keyword **inject**.
Other ones were Helpers like **getImage** and **getImageSrcset** to get the product images with default image pointing to the CDN.

# Deployment
Once completed, to make sure my local changes are live I pushed my changes with the command: `*stencil push*`

# Issues Encountered
- The first issue was that I could not create my trial store on time on "Monday 16th". Everytime I tried creating the store, I was constantly hit with the error message: *"We’re sorry, we are unable to create your trial store. Error account_support"*. I tried looking for solution going to the BigCommerce support page, and seems that others also have encountred the same error in the past. I reached out to the customer support team for more help. I kept trying to open it untill it worked out creating my store on Tuesday 17th in the Night. I started working on the store on Wednesday 18th.

- I also got some issues when installing Stencil on my Linux system but the folwoing two links were handy:
  - https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil
  - https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

# Documentation References
- https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil
- https://developer.bigcommerce.com/stencil-docs/storefront-customization/directory-structure#templates
- https://developer.bigcommerce.com/api-docs/storefront/tutorials/carts
- https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing
