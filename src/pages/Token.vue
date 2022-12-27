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
                    <q-splitter
                            v-model="splitterModel"
                            style="min-height: 450px"
                    >

                        <template v-slot:before>
                            <q-tabs
                                    v-model="tab"
                                    vertical
                                    class="text-teal"
                            >
                                <q-tab name="Create" icon="add" label="Create" />
                                <q-tab name="Update" icon="star" label="Update" />
                                <q-tab name="Freeze" icon="cached" label="Freeze" />
                                <q-tab name="Destory" icon="delete" label="Destory" />
                                <q-tab name="Transfer" icon="send" label="Transfer" />
                            </q-tabs>
                        </template>

                        <template v-slot:after>
                            <q-tab-panels
                                    v-model="tab"
                                    animated
                                    swipeable
                                    vertical
                                    transition-prev="jump-up"
                                    transition-next="jump-up"
                            >
                                <q-tab-panel name="Create">
                                    <q-card-section>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token Symbol:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined v-model="tokenInfo.unit" label="Symbol" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token name:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Name" v-model="tokenInfo.name" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token URL:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="URL" v-model="tokenInfo.url" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Metadata HASH:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="metadata HASH 32bit" v-model="tokenInfo.metadata" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token Supply:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Supply" v-model="tokenInfo.supply" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token Decimals:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Decimal" v-model="tokenInfo.decimal" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token Manager:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Manager" v-model="tokenInfo.manager" :disable="selfAddr.manager" placeholder="" />
                                                <q-checkbox v-model="selfAddr.manager" label="use Creator" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token reserve:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Reserve" v-model="tokenInfo.reserve" :disable="selfAddr.reserve" placeholder="" />
                                                <q-checkbox v-model="selfAddr.reserve" label="use Creator" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token clawback:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Clawback" v-model="tokenInfo.clawback" :disable="selfAddr.clawback" placeholder="" />
                                                <q-checkbox v-model="selfAddr.clawback" label="use Creator" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">NFT Token freeze:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined label="Freeze" v-model="tokenInfo.freeze" :disable="selfAddr.freeze" placeholder="" />
                                                <q-checkbox v-model="selfAddr.freeze" label="use Creator" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-auto q-gutter-x-md">
                                                <q-btn rounded unelevated color="teal" label="create Token" @click="mint"></q-btn>
                                            </q-item>
                                            <!--<q-item class="col-auto">-->
                                            <!--<q-btn unelevated rounded color="orange" label="Check Token info" @click="checkToken"></q-btn>-->
                                            <!--</q-item>-->
                                            <!--<q-item class="col-auto">-->
                                            <!--<q-btn unelevated rounded color="red" label="Export Mnemonic" @click="exportMnemonic"></q-btn>-->
                                            <!--</q-item>-->
                                            <!--<q-item class="col-auto">-->
                                            <!--<q-btn unelevated rounded color="blue" label="Check node status" @click="checkNodeStatus"></q-btn>-->
                                            <!--</q-item>-->
                                        </div>
                                    </q-card-section>
                                </q-tab-panel>

                                <q-tab-panel name="Update">
                                    <q-splitter
                                            v-model="splitterUpdateModel"
                                            style="min-height: 450px"
                                    >

                                        <template v-slot:before>
                                            <q-card-section v-if="assetId != null">
                                                <q-toolbar>
                                                    <q-toolbar-title>Asset Details</q-toolbar-title>
                                                </q-toolbar>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">ID:</q-item>
                                                    <q-item class="col-8">{{ assetId.id }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Unit-Name:</q-item>
                                                    <q-item class="col-8">{{ assetId.unitName }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Name:</q-item>
                                                    <q-item class="col-8">{{ assetId.name }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">ID:</q-item>
                                                    <q-item class="col-8">{{ assetId.id }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Amount:</q-item>
                                                    <q-item class="col-8">{{ assetId.amount }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Supply:</q-item>
                                                    <q-item class="col-8">{{ assetId.total }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">is-Frozen:</q-item>
                                                    <q-item class="col-8">{{ assetId.frozen }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Decimals:</q-item>
                                                    <q-item class="col-8">{{ assetId.decimal }}</q-item>
                                                </div>

                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Creator:</q-item>
                                                    <q-item class="col-8">{{ assetId.creator }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Reserve:</q-item>
                                                    <q-item class="col-8">{{ assetId.reserve }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Manager:</q-item>
                                                    <q-item class="col-8">{{ assetId.manager }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Freeze:</q-item>
                                                    <q-item class="col-8">{{ assetId.freeze }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">url:</q-item>
                                                    <q-item class="col-8">{{ assetId.metaurl }}</q-item>
                                                </div>
                                            </q-card-section>
                                        </template>
                                        <template v-slot:after>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Asset:</q-item>
                                                    <q-item class="col-8">
                                                        <q-select outlined v-if="asset.length > 0" v-model="assetId" :options="asset" label="Asset Name" placeholder="">
                                                        </q-select>
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Clawback:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input v-model="assetId.clawback" label="Is frozen" color="yellow" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Manager:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input v-model="assetId.manager" label="Is frozen" color="yellow" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Reserve:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input v-model="assetId.reserve" label="Is frozen" color="yellow" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Freeze:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input v-model="assetId.freeze" label="Is frozen" color="yellow" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Note:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input type="textarea" outlined v-model="note" label="Note: like metadata" placeholder="" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">rekeyTo:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input outlined v-model="rekeyTo" label="rekeyTo" placeholder="" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-auto q-gutter-y-md">
                                                        <q-btn unelevated rounded color="orange" label="Update NFT Token info" @click="updateToken"></q-btn>
                                                    </q-item>
                                                </div>
                                            </q-card-section>
                                        </template>
                                    </q-splitter>
                                </q-tab-panel>
                                <q-tab-panel name="Freeze">
                                    <q-splitter
                                            v-model="splitterUpdateModel"
                                            style="min-height: 450px"
                                    >

                                        <template v-slot:before>
                                            <q-card-section v-if="assetId != null">
                                                <q-toolbar>
                                                    <q-toolbar-title>Asset Details</q-toolbar-title>
                                                </q-toolbar>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">ID:</q-item>
                                                    <q-item class="col-8">{{ assetId.id }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Unit-Name:</q-item>
                                                    <q-item class="col-8">{{ assetId.unitName }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Name:</q-item>
                                                    <q-item class="col-8">{{ assetId.name }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">ID:</q-item>
                                                    <q-item class="col-8">{{ assetId.id }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Amount:</q-item>
                                                    <q-item class="col-8">{{ assetId.amount }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Supply:</q-item>
                                                    <q-item class="col-8">{{ assetId.total }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">is-Frozen:</q-item>
                                                    <q-item class="col-8">{{ assetId.frozen }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Decimals:</q-item>
                                                    <q-item class="col-8">{{ assetId.decimal }}</q-item>
                                                </div>

                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Creator:</q-item>
                                                    <q-item class="col-8">{{ assetId.creator }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Reserve:</q-item>
                                                    <q-item class="col-8">{{ assetId.reserve }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Manager:</q-item>
                                                    <q-item class="col-8">{{ assetId.manager }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Freeze:</q-item>
                                                    <q-item class="col-8">{{ assetId.freeze }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">url:</q-item>
                                                    <q-item class="col-8">{{ assetId.metaurl }}</q-item>
                                                </div>
                                            </q-card-section>
                                        </template>
                                        <template v-slot:after>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Asset:</q-item>
                                                    <q-item class="col-8">
                                                        <q-select outlined v-if="asset.length > 0" v-model="assetId" :options="asset" label="Asset Name" placeholder="">
                                                        </q-select>
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">State:</q-item>
                                                    <q-item class="col-8">
                                                        <q-toggle v-model="freeze.state" label="Is frozen" color="yellow" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Target:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input v-model="freeze.target" label="Is frozen" color="yellow" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Note:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input type="textarea" outlined v-model="note" label="Note: like metadata" placeholder="" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">rekeyTo:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input outlined v-model="rekeyTo" label="rekeyTo" placeholder="" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-auto q-gutter-y-md">
                                                        <q-btn unelevated rounded color="orange" label="Freeze NFT Token by Account" @click="freezeToken"></q-btn>
                                                    </q-item>
                                                </div>
                                            </q-card-section>
                                        </template>
                                    </q-splitter>
                                </q-tab-panel>
                                <q-tab-panel name="Destory">
                                    <q-splitter
                                            v-model="splitterUpdateModel"
                                            style="min-height: 450px"
                                    >

                                        <template v-slot:before>
                                            <q-card-section v-if="assetId != null">
                                                <q-toolbar>
                                                    <q-toolbar-title>Asset Details</q-toolbar-title>
                                                </q-toolbar>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">ID:</q-item>
                                                    <q-item class="col-8">{{ assetId.id }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Unit-Name:</q-item>
                                                    <q-item class="col-8">{{ assetId.unitName }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Name:</q-item>
                                                    <q-item class="col-8">{{ assetId.name }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">ID:</q-item>
                                                    <q-item class="col-8">{{ assetId.id }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Amount:</q-item>
                                                    <q-item class="col-8">{{ assetId.amount }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Supply:</q-item>
                                                    <q-item class="col-8">{{ assetId.total }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">is-Frozen:</q-item>
                                                    <q-item class="col-8">{{ assetId.frozen }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Decimals:</q-item>
                                                    <q-item class="col-8">{{ assetId.decimal }}</q-item>
                                                </div>

                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Creator:</q-item>
                                                    <q-item class="col-8">{{ assetId.creator }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Reserve:</q-item>
                                                    <q-item class="col-8">{{ assetId.reserve }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Manager:</q-item>
                                                    <q-item class="col-8">{{ assetId.manager }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">Freeze:</q-item>
                                                    <q-item class="col-8">{{ assetId.freeze }}</q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-4 justify-end">url:</q-item>
                                                    <q-item class="col-8">{{ assetId.metaurl }}</q-item>
                                                </div>
                                            </q-card-section>
                                        </template>
                                        <template v-slot:after>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Asset:</q-item>
                                                    <q-item class="col-8">
                                                        <q-select outlined v-if="asset.length > 0" v-model="assetId" :options="asset" label="Asset Name" placeholder="">
                                                        </q-select>
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">Note:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input type="textarea" outlined v-model="note" label="Note: like metadata" placeholder="" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-3 justify-end">rekeyTo:</q-item>
                                                    <q-item class="col-8">
                                                        <q-input outlined v-model="rekeyTo" label="rekeyTo" placeholder="" />
                                                    </q-item>
                                                </div>
                                                <div class="row">
                                                    <q-item class="col-auto q-gutter-y-md">
                                                        <q-btn unelevated rounded color="orange" label="Destory NFT Asset" @click="destoryToken"></q-btn>
                                                    </q-item>
                                                </div>
                                            </q-card-section>
                                        </template>
                                    </q-splitter>
                                </q-tab-panel>
                                <q-tab-panel name="Transfer">
                                    <q-card-section>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">Asset:</q-item>
                                            <q-item class="col-8">
                                                <q-select outlined v-if="asset.length > 0" v-model="assetId" :options="asset" label="Asset Name" placeholder="">
                                                </q-select>
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">Target addr:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined v-model="transfer.to" label="Note: Receive address" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">tranfer amount:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined v-model="transfer.amount" label="Note: Receive amt" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">closeRemainderTo:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined v-model="transfer.remainder" label="Note: close assets or account" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">revocationTarget:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined v-model="transfer.target" label="Note: Revoke target TxID" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">Note:</q-item>
                                            <q-item class="col-8">
                                                <q-input type="textarea" outlined v-model="note" label="Note: like metadata" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-3 justify-end">rekeyTo:</q-item>
                                            <q-item class="col-8">
                                                <q-input outlined v-model="rekeyTo" label="rekeyTo" placeholder="" />
                                            </q-item>
                                        </div>
                                        <div class="row">
                                            <q-item class="col-auto q-gutter-y-md">
                                                <q-btn unelevated rounded color="orange" label="Transfer NFT to Account" @click="transferToken"></q-btn>
                                            </q-item>
                                        </div>
                                    </q-card-section>
                                </q-tab-panel>
                            </q-tab-panels>
                        </template>

                    </q-splitter>
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
import { accountInfo, Asset } from 'components/models';
import { copyToClipboard } from 'quasar';

import { defineComponent, ref,PropType } from 'vue';

export default defineComponent({
  name: 'PageToken',
  props: {
    account: {
      type: (Object as unknown) as PropType<accountInfo>,
      required: true
    },
  },
  setup() {
    const skeleton = ref({
      rect: ref(false),
      qtoolbar: ref(false)
    });
    const selfAddr = ref({
      manager: ref(false),
      reserve: ref(false),
      clawback: ref(false),
      freeze: ref(false)
    });
    const tokenInfo = ref({
        unit: 'BSA',
        name: 'Business system',
        metadata: undefined,
        url: 'https://4020.io/my/nft/metadata.json',
        supply: 1,
        decimal: 0,
        manager: undefined,
        reserve: undefined,
        clawback: undefined,
        freeze: undefined
    });
    const asset: Asset[] = [];
    const assetId = ref(asset[0]);
    return {
        skeleton,
        tab: ref('Create'),
        splitterUpdateModel: ref(40),
        note:ref(''),
        splitterModel: ref(20),
        assetId,
        asset,
        rekeyTo: ref(undefined),
        response: '',
        freeze: ref({
            state: false,
            target: ''
        }),
        transfer: ref({
           to: '',
           amount: 0,
           remainder: '',
           target: ''
        }),
        tokenInfo,
        selfAddr
    };
  },
  mounted() {
    this.initAsset();
  },
  watch: {
      assetId:{
          handler(newval, oldval) {
              console.log(newval, oldval);
          }
      }
  },
  methods: {
    create(info: accountInfo) {
      this.$emit('updateAccount', info);
    },
    async initAsset() {
      let balance = await this.$algod.balanceOf(this.account.addr);
      balance.assets.map((d:any)=> {
          let params = balance['created-assets'][balance['created-assets'].findIndex((v:any)=> v.index == d['asset-id'])];
          console.log(params);
          if(params) {
              this.asset.push({
                  id: params.index,
                  amount: d.amount,
                  unitName: params.params['unit-name'],
                  frozen: d['is-frozen'],
                  name: params.params.name,
                  creator: params.params.creator,
                  decimal: params.params.decimals,
                  total: params.params.total,
                  reserve: params.params.reserve,
                  manager: params.params.manager,
                  clawback: params.params.clawback,
                  freeze: params.params.freeze,
                  metaurl: params.params.url,
                  label: params.params.name + (params.params['unit-name'] ? '['+ params.params['unit-name'] +']' : '')+ '('+ d['asset-id'] +')',
                  value: params.index
              });
          }
      });
      this.assetId = this.asset[0];
      console.log(this.asset, 'asset list');
        this.create({
         addr: this.account.addr,
         sk: this.account.sk,
         Amount: parseFloat((balance.amount / 1e6).toString()).toFixed(6)
      });
    },
    async mint() {
      this.skeleton.qtoolbar = true;
      if(this.tokenInfo.unit == '') {
        this.showMsg('Token unit is required.');
        this.skeleton.qtoolbar = false;
        return false;
      }
      if(this.tokenInfo.name == '') {
        this.showMsg('Token name is required');
        this.skeleton.qtoolbar = false;
        return false;
      }
      if(this.tokenInfo.url == '') {
        this.showMsg('Token URL is required');
        this.skeleton.qtoolbar = false;
        return false;
      }
      if(this.tokenInfo.supply <= 0) {
        this.showMsg('Token supply must be > 0');
        this.skeleton.qtoolbar = false;
        return false;
      }
      if(this.tokenInfo.decimal < 0) {
        this.showMsg('Token decimal must be integer');
        this.skeleton.qtoolbar = false;
        return false;
      }
      try {
          const token = await this.$algod.createNft(
              this.account,
              this.tokenInfo.unit,
              this.tokenInfo.name,
              this.tokenInfo.url,
              this.tokenInfo.metadata == '' ? undefined : this.tokenInfo.metadata,
              this.tokenInfo.supply,
              this.tokenInfo.decimal,
              this.selfAddr.manager ? this.account.addr : this.tokenInfo.manager,
              this.selfAddr.reserve ? this.account.addr : this.tokenInfo.reserve,
              this.selfAddr.clawback ? this.account.addr : this.tokenInfo.clawback,
              this.selfAddr.freeze ? this.account.addr : this.tokenInfo.freeze,
          );
          this.response = JSON.stringify(token);
          const account = token[0];
          this.create({
              addr: account.address,
              sk: this.account.sk,
              Amount: parseFloat((account.amount / 1e6).toString()).toFixed(6)
          });
          console.log(token, 'mint callback');
          this.showMsg('NFT Token create Success!');
      } catch(err) {
          console.log('err', err);
          this.showMsg(err.message);
          this.response = JSON.stringify(err);
      }
      setTimeout(() => {
        this.skeleton.qtoolbar = false;
        this.$forceUpdate();
      }, 1500);
    },
    async freezeToken() {
        this.skeleton.qtoolbar = true;
        if(this.assetId.id <= 0) {
            this.showMsg('id is required.');
            this.skeleton.qtoolbar = false;
            return false;
        }
        try {
            console.log('update nft', this.assetId);
            const txn = await this.$algod.freezeNft(
                this.account,
                this.assetId.id,
                this.freeze.state,
                this.freeze.target,
                this.note,
                this.rekeyTo == '' ? undefined : this.rekeyTo
            );
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
    async destoryToken() {
        this.skeleton.qtoolbar = true;
        if(this.assetId.id <= 0) {
            this.showMsg('id is required.');
            this.skeleton.qtoolbar = false;
            return false;
        }
        try {
            console.log('update nft', this.assetId);
            const txn = await this.$algod.destoryNft(
                this.account,
                this.assetId.id,
                this.note,
                this.rekeyTo == '' ? undefined : this.rekeyTo
            );
            this.response = JSON.stringify(txn);
            this.showMsg('Asset '+ this.assetId.id +' destory finish');
            this.initAsset();
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
    async transferToken() {
        this.skeleton.qtoolbar = true;
        if(this.assetId.id <= 0) {
            this.showMsg('id is required.');
            this.skeleton.qtoolbar = false;
            return false;
        }
        try {
            console.log('update nft', this.assetId);
            const txn = await this.$algod.transferNft(
                this.account,
                this.assetId.id,
                this.transfer.to,
                this.transfer.amount * Math.pow(10, this.assetId.decimal),
                this.transfer.remainder ? this.transfer.remainder : undefined,
                this.transfer.target ? this.transfer.target : undefined,
                this.note,
                this.rekeyTo == '' ? undefined : this.rekeyTo
            );
            this.response = JSON.stringify(txn);
            this.showMsg('Transfer to '+ this.transfer.to +' Success!')
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
    async updateToken() {
        this.skeleton.qtoolbar = true;
        if(this.assetId.id <= 0) {
            this.showMsg('id is required.');
            this.skeleton.qtoolbar = false;
            return false;
        }
        try {
            console.log('update nft', this.assetId);
            const txn = await this.$algod.updateNft(
                this.account,
                this.assetId.id,
                this.assetId.clawback == '' ? undefined : this.assetId.clawback,
                this.assetId.manager == '' ? undefined : this.assetId.manager,
                this.note,
                this.rekeyTo == '' ? undefined : this.rekeyTo,
                this.assetId.reserve == '' ? undefined : this.assetId.reserve,
                this.assetId.freeze == '' ? undefined : this.assetId.freeze
            );
            this.response = JSON.stringify(txn);
            this.showMsg('Asset update success！');
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
