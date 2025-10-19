export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        donate: 'donate.html',
        book_demo: 'book-demo.html',
        thankyou: 'thank-you.html',
        notfound: '404.html'
      }
    }
  },
  server: {
    open: '/index.html',
    host: true  // This allows external access
  }
}
