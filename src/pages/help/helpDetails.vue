<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosType } from '@/plugins/dataType';

const route = useRoute();
const axios = inject('axios') as axiosType;
const helpId = ref(0);
const handleHelpDetails = async (id: number) => {
  const res = await axios.get(`help_release/${id}`, {}, 'backservices');
  console.log(res);
};
watch(
  () => route.path,
  () => {
    if (route.params.id && route.name === 'HelpDetails') {
      helpId.value = Number(route.params.id);
      handleHelpDetails(helpId.value);
    }
  },
  {
    immediate: true
  }
);
</script>
<template>
  <div class="bg-basic-box rounded form-box text-basic">content</div>
</template>
