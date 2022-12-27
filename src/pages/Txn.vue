<template>
    <q-page class="row justify-evenly q-pl-sm q-pt-sm">

    </q-page>
</template>

<script lang="ts">
    import { accountInfo } from 'components/models';

    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'PageTxn',
        props: {
          account: {
            type: (Object as unknown) as PropType<accountInfo>,
            required: true
          },
        },
        setup() {
            return {  };
        },
        methods: {
            create(info: accountInfo) {
                this.account = info;
            }
        }
    });

</script>
