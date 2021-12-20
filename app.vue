<template>
  <div class="back">
    <h1 class="title">{{ data }} Users</h1>
    <div v-if="err" class="err">{{ err }}</div>
    <form @submit.prevent="addUser">
      <label>username</label>
      <input v-model="username" />
      <button type="submit" :disabled="disabled">Add User</button>
    </form>
    <div class="pt-20">
      <a href="https://github.com/kav3/nuxt3-mongoose" target="_blank">github</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const err = ref(null)
const username = ref("")
const disabled = ref(true)

watch(username, async (newValue, oldValue) => {
  disabled.value = true;
  if (newValue)
    disabled.value = (await $fetch<string>('/api/user/?username=' + newValue) === "true");

})

const { data } = await useAsyncData('count', () => $fetch<number>('/api/user/count'))

let addUser = () => {
  err.value = null;
  $fetch('/api/user', {
    method: 'POST',
    body: {
      username: username.value, //unique
      name: 'b',
      password: '111111'
    }
  }).then(user => {
    data.value++
    username.value = "";
  }).catch(e => {
    console.log(e)
    err.value = e;
  })
}

</script>

<style>
body,
h1 {
  margin: 0;
  padding: 0;
}
.back {
  background: blueviolet;
  padding: 40px;
}
.back,
a {
  color: white;
}
.pt-20 {
  padding-top: 20px;
}
.err {
  background: red;
  padding: 10px;
}
.title {
  font-weight: 600;
  padding-bottom: 10px;
}
</style>