<template>
  <ul class="list-group">
    <li v-for="book in sortedBooks" :key="book.id" class="list-group-item">
      <h2>{{ book.title }}</h2>
      <p>Autor: {{ book.author }}</p>
      <button @click="showComments(book)" class="btn btn-secondary">Pokaż komentarze</button>
      <button @click="usunKsiazke(book)" class="btn btn-danger">Usuń książkę</button>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';
import { collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';

export default {
  name: 'BookList',
  props: {
    books: Array,
  },
  setup(props, { emit }) {
    const sortedBooks = computed(() => props.books);

    const usunKsiazke = async (book) => {
      const q = query(collection(db, "books"), where("id", "==", book.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empy) {
          const docRef = querySnapshot.docs[0].ref;

          await deleteDoc(docRef);
        }

      window.location.reload();

      emit('usunKsiazke', { ...book});
    };

    const showComments = (book) => {
      emit('showComments', { ...book }); // Użyj spread operatora, aby utworzyć kopię obiektu
    };

    return {
      sortedBooks,
      showComments,
      usunKsiazke,
    };
  },
};
</script>
