---
title: wagmi连接钱包
nav:
  title: web3
  path: /web3
  order: 2
order: 1
---

当我们在做 DApp 开发时，我们常常面临连接数十个不同的钱包、多链支持的复杂性、拼写错误意外发送多出一个数量级的 ETH 或调用拼写错误的合约函数，或者意外向 RPC 提供商发送垃圾邮件，从而导致数千计算单元的损失的困境。

而`Wagmi`依赖`viem`开箱即用地提供了最常用的以太坊功能，具有 40 多个用于帐户、钱包、合约、交易、签名、ENS 等的 React Hook。`Wagmi`还通过其官方 Connector、EIP-6963 支持和可扩展 API 支持几乎所有钱包。而且`Wagmi`借助`TanStack Query`支持缓存、重复数据删除、持久性等。

- 安装

```
pnpm add wagmi viem@2.x @tanstack/react-query
```

- 配置网络

```javascript
import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { mainnet, sepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [inject()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

- 在浏览器中，wagmi 提供两种协议来连接钱包，分别是`EIP-1193`和`EIP-6963`

```javascript
import * as React from 'react';
import { Connector, useConnect } from 'wagmi';

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  // 获取所有可连接钱包的方式
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}
```

**注意: EIP-1193 需要在 config 中配置 inject，而 EIP-6963 会自动获取浏览器已经存在的钱包连接方式。**
