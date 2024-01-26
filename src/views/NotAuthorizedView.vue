<template>
    <div class="container mt-5 d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h1>nie zalogowany</h1>
            <button v-if="!loggedIn" class="btn btn-primary" @click="register">Zarejestruj</button>
            <button v-if="!loggedIn" class="btn btn-primary" @click="login">Zaloguj</button>
        </div>
    </div>
</template>

<script>
import router from '../router';

export default {
    name: "NotAuthorizedView",

    setup () {
        const register = () => {
            router.push("/register");
        };

        const login = () => {
            router.push("/login");
        };

        return {
            login,
            register,
        };
    },

};
</script>