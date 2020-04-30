<template>
  <button @click="goBack" class="back">
    <i class="fas fa-chevron-left"></i> Back
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>
