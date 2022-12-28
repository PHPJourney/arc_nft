<template>
    <q-page class="row justify-evenly q-pl-sm q-pt-sm">
        <div class="q-pt-xl">
            <div class="q-gutter-y-md q-pa-md">
                <q-toolbar>
                    <q-toolbar-title>Current Addr: {{ account.addr }}</q-toolbar-title>
                </q-toolbar>
                <q-card class="my-card">
                    <q-toolbar class="bg-dark">
                        <div class="q-my-sm text-subtitle1">
                            <div class="doc-card-title">Account Info</div>
                        </div>
                        <q-space />
                    </q-toolbar>
                    <q-separator />
                    <q-card-section>
                        <div class="row">
                            <q-item class="col-3 justify-end">Account Addr:</q-item>
                            <q-item class="col-8"><b>{{ account.addr }}</b></q-item>
                        </div>
                        <div class="row">
                            <q-item class="col-3 justify-end">Account Balance:</q-item>
                            <q-item class="col-8"><b>{{ account.Amount }}</b></q-item>
                        </div>
                        <q-separator />
                    </q-card-section>
                    <q-card-section>
                        <div class="row">
                            <q-item class="col-3 justify-end">Receive:</q-item>
                            <q-item class="col-8">
                                <q-input outlined v-model="transfer.to" label="Receive address" placeholder="" />
                            </q-item>
                        </div>
                        <div class="row">
                            <q-item class="col-3 justify-end">Amount:</q-item>
                            <q-item class="col-8">
                                <q-input outlined v-model="transfer.amount" label="Receive amt" placeholder="" />
                            </q-item>
                        </div>
                        <div class="row">
                            <q-item class="col-3 justify-end">note:</q-item>
                            <q-item class="col-8">
                                <q-input type="textarea" outlined v-model="transfer.note" label="Message remark" placeholder="" />
                            </q-item>
                        </div>
                        <div class="row">
                            <q-item class="col-3 justify-end">rekeyTo:</q-item>
                            <q-item class="col-8">
                                <q-input outlined v-model="transfer.rekeyTo" label="rekey to address" placeholder="" />
                            </q-item>
                        </div>
                        <div class="row">
                            <q-item class="col-auto q-gutter-y-md">
                                <q-btn unelevated rounded color="orange" label="Update NFT Token info" @click="Transfer"></q-btn>
                            </q-item>
                        </div>
                    </q-card-section>
                </q-card>

                <q-card class="my-card" style="overflow-wrap: anywhere">
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
    </q-page>
</template>

<script lang="ts">
    import { accountInfo } from 'components/models';
    import { copyToClipboard } from 'quasar';

    import { defineComponent, ref, PropType } from 'vue';

    export default defineComponent({
        name: 'PageTxn',
        props: {
          account: {
            type: (Object as unknown) as PropType<accountInfo>,
            required: true
          },
        },
        setup() {
            const transfer = ref({
                amount: 0,
                note: '',
                to: '',
                rekeyTo: undefined
            });
            return { transfer, response: '', skeleton: ref({
                rect: false,
                qtoolbar: false
            }) };
        },
        mounted() {
          this.initAsset();
        },
        methods: {
            async initAsset() {
                let balance = await this.$algod.balanceOf(this.account.addr);
                this.create({
                    addr: this.account.addr,
                    sk: this.account.sk,
                    Amount: parseFloat((balance.amount / 1e6).toString()).toFixed(6)
                });
            },
            create(info: accountInfo) {
                this.$emit('updateAccount', info);
            },
            async Transfer() {
                this.skeleton.qtoolbar = true;
                try {
                    let txn = await this.$algod.transfer(this.account, this.transfer.amount, this.transfer.to, this.transfer.note, this.transfer.rekeyTo=='' ? undefined : this.transfer.rekeyTo);
                    this.response = JSON.stringify(txn);
                    this.initAsset();
                    this.showMsg('Transfer success！');
                } catch (err) {
                    console.log('err', err);
                    this.showMsg(err.message);
                    this.response = JSON.stringify(err);
                }
                setTimeout(() => {
                    this.skeleton.qtoolbar = false;
                    this.$forceUpdate();
                }, 1500);
            },
            showMsg(context:string) {
                this.$q.dialog({
                    dark: true,
                    title: 'NFT ARC SDK Notice',
                    message: context,
                    cancel: false,
                    persistent: true
                });
            },
            copy() {
                if (this.response == '') {
                    this.showMsg('check this content have empty.');
                    return false;
                }
                copyToClipboard(this.response).then(() => {
                    this.showMsg('content copy to clipboard success!');
                }).catch ((err) => {
                    console.log('err', err);
                    this.showMsg('content copy to clipboard is fail');
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
