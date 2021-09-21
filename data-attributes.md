# Using data attributes

Data attributes are an excellent want to store some extra information in a html element in an easily accessible way.

For instance, let's say we have a like button on a pug file. We're assuming that we're passing in a `story` object and a `bookshelf` object, each of which has an id

```pug
button(class='like-button' data-story-id=story.id data-bookshelf-randomword-id=bookshelf.id)
```

Now, in an event listener, we can do something like this:

```js
const button = document.querySelector('.like-button')
const storyId = button.dataset.storyId
const bookshelfId = button.dataset.bookshelfRandomwordId
console.log(button.dataset)
```
