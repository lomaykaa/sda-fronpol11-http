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

comments.deleteComments(10).then(console.log);



