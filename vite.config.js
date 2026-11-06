export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        donate: 'donate.html',
        book_demo: 'book-demo.html',
        thankyou: 'thank-you.html',
        notfound: '404.html',
        about: 'about.html',
        privacy_policy: 'privacy-policy.html',
        terms: 'terms.html',
        refund_policy: 'refund-policy.html',
        cookie_policy: 'cookie-policy.html'
      }
    }
  },
  server: {
    open: '/index.html',
    host: true  // This allows external access
  }
}
