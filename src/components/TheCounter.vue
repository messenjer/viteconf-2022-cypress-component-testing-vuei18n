<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValue: number;
    min: number;
    max: number;
  }>(),
  {
    min: 0,
    max: 1000,
  }
);

const increment = () => {
  if (counter.value < props.max) counter.value++;
};

const decrement = () => {
  if (counter.value > props.min) counter.value--;
};

const counter = ref(props.initialValue);
</script>
<template>
  <button @click="decrement" data-test-id="decrement">-</button>
  {{ counter }}
  <button @click="increment" data-test-id="increment">+</button>
</template>
