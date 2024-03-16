---
title: 去中心化存储之arweave
nav:
  title: web3
  path: /web3
  order: 2
order: 0
---

# 什么是去中心化存储

与传统的由单一实体或组织运营的中心化存储服务器不同，去中心化存储系统将数据文件保存在通过点对点(C2C)网络连接的、按地理分布的节点上。使用区块链维护去中心化存储网络，可确保数据文件免受错误、交易对手风险和单点故障的影响，从而有助于提高存储安全性。

就比如 NFT，最好的方式是将 NFT 的底层元数据和图像数据保存在去`中心化存储网络`中，将对应的存储标识如 CID 记录到区块链智能合约中，同时把与智能合约交互的前端也托管到去中心化存储中。从而得到一个“完全”去中心化、不可停止的 Web3 应用。

# arweave

Arweave 是一个基于区块链技术的永久性存储网络。

# 如何接入 arweave

上传资源到 `Arweave` 时，需要使用其原生代币 `AR` 支付上传费用，并使用其原生加密技术签署交易。但是 `AR` 代币并未广泛使用，而且 Web3 开发人员并不像以太坊和 Solana 使用的加密技术那样熟悉签署交易所需的加密技术。所以`Irys`帮我们解决了这一痛点，`Irys`提供 14 种不同代币代替`AR`完成支付。

## wagmi 集成 @irys/sdk

- 安装 @irys/sdk。

```js
npm install @irys/sdk
```

- webpack 打包配置。

```js
fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      vm: require.resolve("vm-browserify"),
},
plugins:[
    new webpack.ProvidePlugin({
      process: "process",
      Buffer: ["buffer", "Buffer"],
    }),
]
```

- 创建 Irys 实例。这里使用 viem 提供的 provider

```js
const client = useWalletClient();

const getWebIrys = async () => {
  const url = 'https://devnet.irys.xyz';
  const token = 'matic';
  // Devnet RPC URLs change often, use a recent one from https://chainlist.org
  const rpcURL = '';

  // Create a wallet object
  const wallet = { rpcUrl: rpcURL, name: 'viemv2', provider: client.data };
  // Use the wallet object
  const webIrys = new WebIrys({ url, token, wallet });
  await webIrys.ready();

  return webIrys;
};
```

- 上传数据到 arweave。

```js
const webIrys = await getWebIrys();
const dataToUpload = 'GM world.';
try {
  const receipt = await webIrys.upload(dataToUpload);
  console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
} catch (e) {
  console.log('Error uploading data ', e);
}
```
