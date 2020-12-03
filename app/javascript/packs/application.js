// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require('jquery')

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

$(document).on("turbolinks:load", function() {
  const form = document.querySelector("#payment-form")
  if (form) {
    const publicKey = process.env.STRIPE_PUBLIC_KEY;
    const stripe = Stripe(publicKey);
    const elements = stripe.elements();
  
    const card = elements.create('cardNumber');
    card.mount('#card-element');
  
    const cardExpiry = elements.create('cardExpiry');
    cardExpiry.mount('#card-expiry-element');
  
    const cardCvc = elements.create('cardCvc');
    cardCvc.mount('#card-cvc-element');
  
    card.addEventListener('change', (event) => {
      const displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    })
  
    form.addEventListener('submit', (event) => {
      $('.js-order-submit-btn').prop('disabled', true);
      event.preventDefault();
      let data = {
        payment_method: {
          card: card
        }
      };
  
      stripe.confirmCardPayment(form.dataset.paymentIntentId, data).then((result) => {
        if (result.error) {
          $('.js-order-submit-btn').prop('disabled', false);
          const errorElement = document.getElementById("card-errors");
          errorElement.textContent = result.error.message;
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            form.submit();
          }
        }
      })
    })
    
  }  
});
