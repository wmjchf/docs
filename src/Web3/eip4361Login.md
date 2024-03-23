---
title: 以太坊登录
nav:
  title: web3
  path: /web3
  order: 3
order: 0
---

# 什么是以太坊登录 EIP-4361

EIP-4361 的目的是希望通过使用 web3 服务 ( 如钱包和 dapps) 常用的方法来改变我们登录 web2 服务的方式，为中心化身份提供者提供一种自我托管的替代方案，提高基于以太坊身份验证的链下服务的互操作性，并为钱包供应商提供一致的机器可读消息格式，以实现更好的用户体验和同意管理。

## 前端实现

首先需要调用 `connectWallet` 链接钱包，然后调用 `signInWithEthereum` 进行签名，最后调用 `sendForVerification`，服务器就会对签名进行验证最终生成 `session`。

- connectWallet 实现

```javascript
import { BrowserProvider } from 'ethers';
const provider = new BrowserProvider(window.ethereum);
function connectWallet() {
  provider
    .send('eth_requestAccounts', [])
    .catch(() => console.log('user rejected request'));
}
```

- signInWithEthereum 签名

```javascript
async function signInWithEthereum() {
  const signer = await provider.getSigner();

  address = await signer.getAddress();
  const message = await createSiweMessage(
    address,
    'Sign in with Ethereum to the app.',
  );
  const signature = await signer.signMessage(message);
}
```

- sendForVerification 验证签名

```javascript
function sendForVerification(){
    const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
    });
}
```

## 后台实现

对 `message` 和 `signature` 进行验证。

```javascript
app.post('/verify', asyncfunction (req, res) {
  let SIWEObject = new SiweMessage(req.body.message);
  const { data: message } = await SIWEObject.verify({ signature: req.body.signature, nonce: req.session.nonce });

  req.session.siwe = message;
  req.session.cookie.expires = newDate(message.expirationTime);
  req.session.save(() => res.status(200).send(true));
})

```

这样，会话 ( req.session) 就会存储用于消息初始验证的任何信息，而对于客户端来说，就不必每次都发送消息和签名。
