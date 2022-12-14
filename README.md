 # aeStaker

 aeStaker is a decentralized staking and borrowing app, where users can stake and borrow AE tokens using Superhero wallet extension.

# 🛠 Technology Stack & Tools

- Sophia (Writing Smart Contract)
- Javascript (NextJs & Unit Testing)
- aepp-sdk (Blockchain Interaction)
- aeproject (Smart Contract Development Framework)

# ⛓ Blockchain Protocol used

-  AEternity token protocol

# ⚙ Requirements For Initial Setup
- Install NodeJS, should work with any node version above 14.0.0
- Download and setup Docker
- Note: on windows WSL 2 must be used

# 🚀 Quick Start

📄 Clone or fork aeStaker:

```
https://github.com/paschal533/aeStaker.git
```
💿 Install all dependencies:
 
```
$ cd aeStaker
$ cd frontend
$ npm install 
```

# 🚴‍♂️ Run your App:

```
npm run dev
```

- Note :- This app was deploy to aeternity testnet, so you need to have superhero wallet extension installed on your browser before you can be able to Interact with the app.

# 📄 interacting with the Smart-contract

```
$ cd aeStaker
$ cd smart-contract
$ npm install
```

# 🎗 Running a local environment

```
aeproject env
```

This will run a local æternity network in dev-mode (node, compiler and nginx-proxy).

To stop an already spawned local environment use `aeproject env --stop`

Further explained in [Environment Documentation.](https://github.com/aeternity/aeproject/blob/main/docs/cli/env.md)

# 🛠 Test the Smart-contract:

```
aeproject test
```

This will run the tests located in ./test folder. Further explained in [Testing Documentation.](https://github.com/aeternity/aeproject/blob/main/docs/cli/test.md)

# 🔗 Deploy the Smart-contract:

Install aepp-cli

```
sudo npm i -g @aeternity/aepp-cli
```

Then create a wallet with aecli

```
aecli account create sample-wallet
```

Deploy the smart contract with the wallet you created

```
aecli contract deploy sample-wallet --contractSource contracts/StakeContract.aes
```
# 📄 Smart-contract address

ct_SjV3mnz56BkpJdCQZfp1giwjNaHVqEt9EiKfBFbqBcbmdJyaC

# 📜 aeternity Testnet Explorer

https://explorer.testnet.aeternity.io/contracts/transactions/ct_SjV3mnz56BkpJdCQZfp1giwjNaHVqEt9EiKfBFbqBcbmdJyaC
