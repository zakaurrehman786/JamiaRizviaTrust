export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        donate: 'donate.html',
        books: 'books.html',
        thankyou: 'thank-you.html',
        notfound: '404.html'
      }
    }
  },
  server: {
    open: '/index.html'
  }
}
