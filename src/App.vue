<template>
  <div id="app" class="container mt-5" :style="{ backgroundColor }">

  <button v-if="!loggedIn" class="btn btn-primary" @click="register">Zarejestruj</button>
  <button v-if="!loggedIn" class="btn btn-primary" @click="login">Zaloguj</button>
  <button v-if="loggedIn" class="btn btn-primary" @click="logout">Wyloguj</button>
  <!-- <component :is="showNavbar ? 'NavBar' : 'div'" :modelValue="searchQuery" @update:modelValue="updateSearchQuery" /> -->
  <!-- <NavBar v-model="searchQuery" /> -->
  <ColorSwitcher v-model="backgroundColor" />

    <h1 class="mb-4">Recenzje Książek</h1>
    <button @click="toggleForm" class="btn btn-primary mb-4">Dodaj Książkę</button>

    <BookList :books="books" @showComments="showComments" @usunKsiazke="usunKsiazke">
    </BookList>

    <BookDetails
      v-if="selectedBook"
      :book="selectedBook"
      @addComment="addComment"
      @closeDetails="closeDetails"
    />

    <form v-if="showForm" @submit.prevent="addBook" class="mb-4">
      <div class="form-group">
        <label for="title">Tytuł książki:</label>
        <input type="text" id="title" v-model="newBook.title" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="author">Autor:</label>
        <input type="text" id="author" v-model="newBook.author" class="form-control" required>
      </div>
      
      <button type="submit" class="btn btn-primary">Dodaj Książkę</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import BookList from './components/BookList.vue';
import BookDetails from './components/BookDetails.vue';
//import NavBar from './components/NavBar.vue';
import ColorSwitcher from './components/ColorSwitcher.vue';

// import firebase from 'firebase/app';
import { db } from './components/firebaseConfig.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import router from './router';
//import { ref as firebaseRef, set } from 'firebase/database';
//get
// import db from './components/firebaseConfig.js';

export default {
  name: 'App',
  components: {
    BookList,
    BookDetails,
    //NavBar,
    ColorSwitcher,
  },

  setup() {
    const books = ref([]);
    const newBook = ref({ title: '', author: '' });
    const selectedBook = ref(null);
    const newCommentText = ref('');
    const showForm = ref(false);
    const backgroundColor = ref();
    const showNavbar = true;

    const store = useStore();
    const loggedIn = computed(() => store.getters.isAuthenticated);

    const logout = async () => {
      await store.dispatch("logout");
      router.push("/");
    };

    const register = () => {
      router.push("/register");
    };

    const login = () => {
      router.push("/login");
    };

    const addBook = () => {
      const id = Date.now();
      books.value.push({ id, title: newBook.value.title, author: newBook.value.author, comments: [] });
      saveIntoDatabase();
      newBook.value.title = '';
      newBook.value.author = '';
      saveToLocalStorage();
      toggleForm();
    };

    const showComments = (book) => {
      selectedBook.value = selectedBook.value === book ? null : book;
    };

    const usunKsiazke = async (book) => {
      console.log(book);
    }

    const addComment = async () => {
      if (newCommentText.value) {
        selectedBook.value.comments.push({ id: Date.now(), text: newCommentText.value });
        newCommentText.value = '';


      }
    };

    const saveToLocalStorage = () => {
      localStorage.setItem('books', JSON.stringify(books.value));
    };

    // const loadFromLocalStorage = () => {
    //   const savedBooks = localStorage.getItem('books');
    //     if (savedBooks) {
    //       books.value = JSON.parse(savedBooks);
    //       //console.log(books);
    //     }
    // };
    const fetchDataFromFirebase = async () => {
      const booksSnapshot = await getDocs(collection(db, "books"));
      if (booksSnapshot) {
        booksSnapshot.docs.forEach((doc) => {
          books.value.push({...doc.data()});
          //console.log(doc.id);
        });
        console.log(booksSnapshot);

      }
    };

    const saveIntoDatabase = async () => {
      try {
        const add = collection(db, "books");
        console.log(add);
        console.log(books.value.id);
        await addDoc(add, {id: Date.now(), title: newBook.value.title, author: newBook.value.author, comments: []});
        window.location.reload();
      }
      catch(error){
        console.log("error: ", error);
      }

    }
      // db.ref('books/').set(books);
    //   const booksRef = firebaseRef(db, 'books/');

    //   set(booksRef, books.value)
    //     .then(() => {console.log('Udało się zapisać w firebase');})
    //     .catch((error) => {console.error('bład podczas zapisu!', error);});
    // };


    const toggleForm = () => {
      showForm.value = !showForm.value;
    };

    const closeDetails = () => {
      selectedBook.value = null;
    };

    onMounted(() => {
      fetchDataFromFirebase();
      // loadFromLocalStorage();
    });

    return {
      books,
      newBook,
      selectedBook,
      newCommentText,
      showForm,
      addBook,
      showComments,
      usunKsiazke,
      addComment,
      saveToLocalStorage,
      //loadFromLocalStorage,
      fetchDataFromFirebase,
      toggleForm,
      closeDetails,
      backgroundColor,
      showNavbar,
      login, 
      register,
      loggedIn,
      logout,
    };
  },
};
</script>
