<template>
  <div class="box">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    background: grey;
    padding: 10px;
    border: 1px solid grey;
    margin-bottom: 1em;
  }
</style>
