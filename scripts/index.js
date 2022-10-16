class Posts {
  constructor() {
      this.url = 'https://jsonplaceholder.typicode.com/posts';
    }
  //zadanie1
  //pobranie listy wszystkich postow
    getAllPosts() {
    const options = {
      method: 'GET'
    };

  /*  const fetchPromise = fetch(this.url, options);
    const jsonPromise = fetchPromise.then((response) => response.json())
    .then((json) => console.log(json)); 
  */
    const fetchPromise = fetch(this.url, options);
    return fetchPromise.then((response) => response.json());
  }

  deletePost(postId) {
    const options = {
      method: 'DELETE'
    };

    const url = `${this.url}/${postId}`;

    const fetchPromise = fetch(url, options);
    return fetchPromise.then((response) => response.json());
  }

  addPost(newPost) {
    const options = {
      method: 'POST',
      body: JSON.stringify(newPost)
    }

    const fetchPromise = fetch(this.url, options);
    return fetchPromise.then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {
          error: 'Wystapil jakis blad podczas zapytania',
          status: response.status,
          statusText: response.statusText
        }
      }
    });
  }

  editPost(editedPost) {
    const options = {
      method: 'PUT',
      body: JSON.stringify(editedPost)
    }

    const url = `${this.url}/${editedPost.id}`

    const fetchPromise = fetch(url, options);

    return fetchPromise.then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {
          error: 'Wystapil jakis podczas edyckji posta',
          status: response.status,
          statusText: response.statusText
        }
      }
    })
  }

  getCommentsForPost(postId) {
    const url = `${this.url}/${postId}/comments`;

    const fetchPromise = fetch(url);

    return fetchPromise.then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return {
                error: `Wystapil blad podczas pobierania komentarzy dla postu o ID ${postId}`,
                status: response.status,
                statusText: response.statusText
            }
        }
      }) 
  }
}

class Comments {
  constructor() {
    this.url = 'https://jsonplaceholder.typicode.com/comments';
  }

  getAllComments() {
    const options = {
      method: 'GET'
    };

    const fetchPromise = fetch(this.url, options);
    return fetchPromise.then((response) => response.json());
  }

  deleteComments(commentsId) {
    const options = {
      method: 'DELETE'
    }

    const url = `${this.url}/${commentsId}`;

    const fetchPromise = fetch(url, options);

    return fetchPromise.then((response) => response.json());
  }

  addComment(newComment) {
    const options = {
      method: 'POST',
      body: JSON.stringify(newComment)
    }

    const fetchPromise = fetch(this.url, options);

    return fetchPromise.then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {
          error: 'Wystapil jakis blad podczas zapytania',
          status: response.status,
          statusText: response.statusText
        }
      }
    })
  }

  editComment(editedComment) {
    const options = {
      method: 'PUT',
      body: JSON.stringify(editedComment)
    }

    const url = `${this.url}/${editedComment.id}`

    const fetchPromise = fetch(url, options);

    return fetchPromise.then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {
          error: 'Wystapil blad podczas edycji komentarza',
          status: response.status,
          statusText: response.statusText
        }
      }
    })
  }
/* uzycie Params przy getCommentsForPost - posiedzieć nad tym później

  getCommentsForPost(postId) {
  //  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments}`;
  const queryParams = new URLSearchParams({
    postId: postId
});

const url = `${this.url}?${queryParams.toString()}`;

const fetchPromise = fetch(url);

return fetchPromise.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        return {
            error: `Wystapil blad podczas pobierania komentarzy dla postu o ID ${postId}`,
            status: response.status,
            statusText: response.statusText
        }
    }
  }) 
} */


}

//wywolanie konstruktora klasy Posts i stworzenia nowego obiektu
const posts = new Posts();
posts.getAllPosts().then((json) => {
  console.log('JSON zawierajacy dane odnosnie postow w formacie JSON', json)
});

//wywolanie konstruktora klasy Comments i stworzenia nowego obiektu
const comments = new Comments();
comments.getAllComments().then((json) => {
  console.log('JSON zawierajacy dane odnosnie komentarzy w formacie JSON', json)
});

posts.deletePost(5).then(console.log);
let newPost = { userId: 5, title: 'Moj nowy post', body: 'Moje nowe body w nowym poscie' };

posts.addPost(newPost).then((json) => {
  newPost = {
    ...newPost,
    ...json
  };
  console.log('Utworzono nowy post:', newPost);

  posts.editPost({
    ...newPost,
    title: 'Moj zedytowany tytul'
  }).then(console.log);
});

posts.editPost({
  id: 2,
  userId: 2,
  title: 'Edited title',
  body: 'Edited body'
}).then(console.log);

comments.deleteComments(10).then(console.log);

comments.addComment({ userId: 10, name: 'Moj nowy komentarz', email: 'komentarz@comments.com', body: 'Moje nowe body w nowym komentarzu'}).then(console.log);

comments.editComment({
  postId: 1,
  id: 6,
  name: 'koemntarz super',
  email: 'edited@email.com',
  body: 'Edited body'
}).then(console.log);

posts.getCommentsForPost(5).then(console.log);

