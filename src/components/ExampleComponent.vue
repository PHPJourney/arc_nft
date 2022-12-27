<template>
  <div class="q-pt-xl">
    <div class="q-gutter-y-md q-pa-md" style="overflow-wrap: anywhere">
      <q-toolbar>
        <q-toolbar-title>Account Informaction</q-toolbar-title>
      </q-toolbar>

      <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-toolbar class="bg-dark">
          <div class="q-my-sm text-subtitle1">
            <div class="doc-card-title">Account Info</div>
          </div>
          <q-space />
          <div class="align-end">
            <q-toolbar-title class="text-white">
              Account Asset Info
              <a href="https://wallet.myalgo.com/dashboard" class="text-white" title="algo wallet" target="_blank"><q-icon name="link" size="sm" /></a>
            </q-toolbar-title>
          </div>
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-pt-none">
          <div class="row">
            <q-item class="col-2 justify-end">Active:</q-item>
            <q-item class="col-8"><b>{{ active ? 'yes' : false }}</b></q-item>
          </div>
          <div class="row">
            <q-item class="col-2 justify-end">Account sk:</q-item>
            <q-item class="col-8">
              {{ account.sk }}
            </q-item>
            <q-tooltip v-model="showing">Type: Uint8Array</q-tooltip>
          </div>
          <div class="row">
            <q-item class="col-2 justify-end">Account addr: </q-item>
            <q-item class="col-8">{{ account.addr }}</q-item>
          </div>
          <div class="row">
            <q-item class="col-2 justify-end">Account amt: </q-item>
            <q-item class="col-8">{{ account.Amount }}</q-item>
          </div>
          <div class="row">
            <q-item class="col-2 justify-end">Account Mnemonic: </q-item>
            <q-item class="col-8">{{ mnemonic }}</q-item>
          </div>
          <div class="row">
            <q-item class="col-2 justify-end">Account status: </q-item>
            <q-item class="col-8">{{ status }}</q-item>
          </div>
        </q-card-section>
      </q-card>
      <div class="row">
        <q-item class="col-auto">
          <q-btn rounded unelevated color="teal" label="create account" @click="create"></q-btn>
        </q-item>
        <q-item class="col-auto">
          <q-btn unelevated rounded color="orange" label="Check account info" @click="checkBalance"></q-btn>
        </q-item>
        <q-item class="col-auto">
          <q-btn unelevated rounded color="red" label="Export Mnemonic" @click="exportMnemonic"></q-btn>
        </q-item>
        <q-item class="col-auto">
          <q-btn unelevated rounded color="blue" label="Check node status" @click="checkNodeStatus"></q-btn>
        </q-item>
      </div>
      <q-card class="my-card">
        <q-toolbar class="bg-dark">
          <div class="q-my-sm text-subtitle1">
            <div class="doc-card-title">Response</div>
          </div>
          <q-space />
          <div class="align-end">
            <q-toolbar-title class="text-white">
              <q-icon name="content_copy" color="orange" size="sm" @click="copy" />
            </q-toolbar-title>
          </div>
        </q-toolbar>
        <q-separator />
        <q-card-section v-if="!skeleton.qtoolbar">
          <q-item> {{ response }}</q-item>
        </q-card-section>
        <q-card-section v-if="skeleton.rect">
          <q-skeleton type="rect" />
        </q-card-section>
        <q-card-section v-if="skeleton.qtoolbar">
          <q-skeleton type="QToolbar" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, PropType, computed, ref, toRef, Ref,
} from 'vue';
import { copyToClipboard } from 'quasar';
import { accountInfo } from './models';


export default defineComponent({
  name: 'CompositionComponent',
  props: {
    account: {
      type: (Object as unknown) as PropType<accountInfo>,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return { status: '', skeleton: {
      rect: false,
      qtoolbar: false
    }, response: '', mnemonic: '', showing: ref(false) };
  },
  methods: {
    create() {
      this.skeleton.qtoolbar = true;
      let accountInfo = this.$algod.createAccount();
      console.log(accountInfo,accountInfo.sk, accountInfo.Amount, 'info');
      this.$emit('accountInfo', accountInfo);
      this.response = JSON.stringify(accountInfo);
      setTimeout(() => {
        this.skeleton.qtoolbar = false;
        this.$forceUpdate();
      }, 500);
    },
    async exportMnemonic() {
      this.skeleton.qtoolbar = true;
      let account = this.account;
      let mnemonic = this.$algod.exportMnemonic(account);
      this.response = JSON.stringify(mnemonic);
      this.mnemonic = mnemonic;
      console.log(account, mnemonic, 'export mnemonic');
      setTimeout(() => {
        this.skeleton.qtoolbar = false;
        this.$forceUpdate();
      });
    },
    async checkBalance() {
      this.skeleton.qtoolbar = true;
      let balance = await this.$algod.balanceOf(this.account.addr);
      this.$emit('accountInfo', {
          addr: this.account.addr,
          sk: this.account.sk,
          Amount: parseFloat((balance.amount / 1e6).toString()).toFixed(6)
      });
      this.status = balance.status;
      this.response = JSON.stringify(balance);
      setTimeout(() => {
        this.skeleton.qtoolbar = false;
        this.$forceUpdate();
      }, 500);
      console.log(balance, 'account Info by balance');
    },
    async checkNodeStatus() {
      this.skeleton.qtoolbar = true;
      let status = await this.$algod.status();
      this.response = JSON.stringify(status);
      setTimeout(() => {
        this.skeleton.qtoolbar = false;
        this.$forceUpdate();
      }, 500);
      console.log(status, 'node status');
    },
    copy() {
      if (this.response == '') {
          this.$q.dialog({
              dark: true,
              title: 'NFT ARC SDK Notice',
              message: 'check this content have empty.',
              cancel: false,
              persistent: true
          });
          return false;
      }
      copyToClipboard(this.response).then(() => {
        this.$q.dialog({
          dark: true,
          title: 'NFT ARC SDK Notice',
          message: 'content copy to clipboard success!',
          cancel: false,
          persistent: true
        });
      }).catch ((err) => {
        console.log('err', err);
        this.$q.dialog({
          dark: true,
          title: 'NFT ARC SDK Notice',
          message: 'content copy to clipboard is fail',
          cancel: false,
          persistent: true
        });
      });
    }
  }
});

</script>
<style type="scss">
.doc-card-title {
  margin-left: -24px;
  padding: 2px 10px 2px 24px;
  background: orange;
  color: white;
  position: relative;
  border-radius: 3px 5px 5px 0;
}
.doc-card-title::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-top-color: transparent;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-top-color: #bebebe;
  border-width: 9px 0 0 11px;
}
</style>