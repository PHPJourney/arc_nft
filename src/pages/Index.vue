<template>
  <q-page class="row justify-evenly q-pl-sm q-pt-sm">
    <example-component
      title="Example component"
      active
      :account="account"
      @accountInfo="create"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { accountInfo } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  props: {
    account: {
      type: (Object as unknown) as PropType<accountInfo>,
      required: true
    },
  },
  methods: {
    create(info: accountInfo) {
      this.$emit('updateAccount', info);
    }
  }
});

</script>
