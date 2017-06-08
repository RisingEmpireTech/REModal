# REModal
Modal for our clients.


## Use:

```Javascript
\\ Create a modal with the content "html" and no callback on close. 
Modal.create(html, {destroyOnClose: true, height: '450px', width: '800px', callback: null});
\\ You can manipulate the modal elements here (they are on the page, just hidden.
\\ Once you are ready you can show the modal
Modal.show();
