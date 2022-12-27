<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Nft algoland SDK sample
        </q-toolbar-title>

        <div>Nft arc SDK v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Operation Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view @updateAccount="updateAccount" :account="account" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { accountInfo } from 'components/models';
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Account',
    caption: 'AEC Account create',
    icon: 'build',
    link: '/'
  },
  {
    title: 'NFT Token',
    caption: 'ARC token create/update',
    icon: 'code',
    link: '/token'
  },
  {
    title: 'Transction',
    caption: 'ARC assets txn',
    icon: 'construction',
    link: '/txn'
  }
];

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);
    const account = ref<accountInfo>({
        sk: new Uint8Array([206,20,151,100,162,143,20,201,172,182,43,86,156,64,103,118,190,166,98,216,164,221,229,166,241,98,195,24,239,209,21,61,89,113,120,6,210,185,76,247,247,44,238,147,97,195,124,197,244,95,201,138,98,237,45,185,8,144,244,65,179,180,15,176]),
        addr: 'LFYXQBWSXFGPP5ZM52JWDQ34YX2F7SMKMLWS3OIISD2EDM5UB6YP54RH2Y',
        Amount: 0
    });
    return {leftDrawerOpen, essentialLinks, account }
  },
  methods: {
    updateAccount(info: accountInfo) {
      this.account = info;
    }
  }
});

</script>
