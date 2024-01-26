<template>
  <div class="mt-4">
    <h2 class="mb-3">{{ book.title }} - Komentarze</h2>
    <h2 class="mb-3">{{ book.id }} - Komentarze</h2>
    <ul class="list-group">
      <li v-for="comment in book.comments" :key="comment.id" class="list-group-item">
        {{ comment.text }}
      </li>
    </ul>
    <textarea v-model="newCommentText" class="form-control mt-3" placeholder="Dodaj komentarz"></textarea>
    <button @click="addComment" class="btn btn-primary mt-3">Dodaj komentarz</button>
    <button @click="closeDetails" class="btn btn-secondary mt-3">Zamknij</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';

export default {
  name: 'BookDetails',
  props: {
    book: Object,
  },
  setup(props, { emit }) {
    const newCommentText = ref('');

    const addComment = async () => {
      if (newCommentText.value) {
        console.log(props.book.id, "NOWEWEWE");
        const q = query(collection(db, "books"), where("id", "==", props.book.id));
        console.log(q);

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empy) {
          const docRef = querySnapshot.docs[0].ref;

          const currentComments = querySnapshot.docs[0].data().comments || [];

          const updatedComments = [...currentComments, {id: Date.now(), text: newCommentText.value}];

          await updateDoc(docRef, {comments: updatedComments});
          window.location.reload();
        }

        const booksSnapshot = await getDocs(collection(db, "books"));
        if (booksSnapshot) {

          // booksSnapshot.docs.forEach((doc) => {
          //   console.log(doc.id);
            
          //   if (props.book.id == doc.id.id) {
          //     console.log(props.book.id);

          //     const bookRef = doc(db, "books", doc.id);
          //     updateDoc(bookRef, {comments: newCommentText.value});

          //     console.log(doc.id);

          //     // const updatedBook = { ...props.book }; // Użyj spread operatora, aby utworzyć kopię obiektu
          //     // updatedBook.comments.push({ id: Date.now(), text: newCommentText.value });
          //     // const add = collection(db, "books");
          //     // await addDoc(add, {id: Date.now(), title: newBook.value.title, author: newBook.value.author, comments: []});
          //     newCommentText.value = '';
          //     emit('addComment', updatedBook); // Przekazanie zaktualizowanej kopii
          //     //console.log(doc.id, "TUTAJ");
          //   }
          // });
          console.log(props.book.id, "TUTU");

        }

        const updatedBook = { ...props.book }; // Użyj spread operatora, aby utworzyć kopię obiektu
        updatedBook.comments.push({ id: Date.now(), text: newCommentText.value });
        newCommentText.value = '';
        emit('addComment', updatedBook); // Przekazanie zaktualizowanej kopii
      }
    };

    const closeDetails = () => {
      emit('closeDetails');
    };

    return {
      newCommentText,
      addComment,
      closeDetails,
    };
  },
};
</script>
