const { expect, assert } = require('chai');
const { utils } = require('@aeternity/aeproject');

const Stake_CONTRACT_SOURCE = './contracts/StakeContract.aes';

describe('StakeContract', () => {
  let aeSdk;
  let contract;

  before(async () => {
    aeSdk = await utils.getSdk();

    // a filesystem object must be passed to the compiler if the contract uses custom includes
    const fileSystem = utils.getFilesystem(Stake_CONTRACT_SOURCE);

    // get content of contract
    const source = utils.getContractContent(Stake_CONTRACT_SOURCE);

    // initialize the contract instance
    contract = await aeSdk.getContractInstance({ source, fileSystem });
    await contract.deploy([], { amount : 10000 });

    // create a snapshot of the blockchain state
    await utils.createSnapshot(aeSdk);
  });

  // after each test roll back to initial state
  afterEach(async () => {
    await utils.rollbackSnapshot(aeSdk);
  });

  describe('deploy', function () {
    it('should set owner', async function() {
        const { result } = await contract.methods.owner()
        expect(result.callerId).to.equal(await utils.getDefaultAccounts()[0].address())
    })

    it('sets up tiers 1', async function () {
        const { decodedResult } = await contract.methods.contract_tiers(30, { onAccount: utils.getDefaultAccounts()[1] })
        expect(decodedResult).to.equal(700n)
    })

    it('sets up tiers 2', async function () {
        const { decodedResult } = await contract.methods.contract_tiers(90, { onAccount: utils.getDefaultAccounts()[1] })
        expect(decodedResult).to.equal(1000n)
    })
    it('sets up tiers 3', async function () {
        const { decodedResult } = await contract.methods.contract_tiers(180, { onAccount: utils.getDefaultAccounts()[1] })
        expect(decodedResult).to.equal(1200n)
    })

    it('sets up lock period 1', async function () {
        const { decodedResult } = await contract.methods.contract_lockPeriods(0, { onAccount: utils.getDefaultAccounts()[1] })
        expect(decodedResult).to.equal(30n)
    })
    it('sets up lock period 2', async function () {
        const { decodedResult } = await contract.methods.contract_lockPeriods(1, { onAccount: utils.getDefaultAccounts()[1] })
        expect(decodedResult).to.equal(90n)
    })
    it('sets up lock period 3', async function () {
        const { decodedResult } = await contract.methods.contract_lockPeriods(2, { onAccount: utils.getDefaultAccounts()[1] })
        expect(decodedResult).to.equal(180n)
    })

    it('sets up current Position Id', async function () {
        const { decodedResult } = await contract.methods.contract_currentPositionId()
        expect(decodedResult).to.equal(0n)
    })
  })

  describe('stakeAE', function () {
    it('transfers AE token', async function () {
        const { decodedEvents } = await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[1], amount: 3 })
        const args = await decodedEvents[0].args
        expect(args[0]).to.equal(1n)
        expect(args[1]).to.equal(await utils.getDefaultAccounts()[1].address())
        expect(args[2]).to.equal(2100n)
    })

    it('adds a positon to positions', async function() {
        await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[1], amount: 3 })
        const { decodedResult } = await contract.methods.contract_currentPositionId()
        expect(decodedResult).to.equal(1n)
    })
  })

  describe('modifyLockPeriods', function() {
    describe('owner', function () {
        it('should create a new lock period', async function () {
            await contract.methods.modifyLockPeriods(100, 1000, { onAccount: utils.getDefaultAccounts()[0] })
            const { decodedResult } = await contract.methods.contract_tiers(100, { onAccount: utils.getDefaultAccounts()[1] })
            expect(decodedResult).to.equal(1000n)
        })

        it('should increment lock period index', async function () {
            await contract.methods.modifyLockPeriods(100, 1000, { onAccount: utils.getDefaultAccounts()[0] })
            const { decodedResult } = await contract.methods.contract_lockPeriods(3, { onAccount: utils.getDefaultAccounts()[1] })
            expect(decodedResult).to.equal(100n)
        })
    })

    describe('non-owner', function() {
      it('reverts', async function () {
          const result = await contract.methods.modifyLockPeriods(100, 1000, { onAccount: utils.getDefaultAccounts()[1] }).catch((e) => e)
          assert.include(result.message, "The caller is different than the owner");
      })
    })
  })

  describe('getIterestRate', function() {
    it('returns the interest rate for a specific lockPeriod', async () => {
        const { decodedResult } = await contract.methods.getInterestRate(30)
        expect(decodedResult).to.equal(700n)
    })
  })

  describe('get position by Id', function() {
    it('returns data about a specific position, given a positionId', async () => {
        await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[1], amount: 3 })
        const { decodedResult } = await contract.methods.getPositionById(0, { onAccount: utils.getDefaultAccounts()[1] })
        
        expect(decodedResult.positionId).to.equal(0n)
        expect(decodedResult.walletAddress).to.equal(await utils.getDefaultAccounts()[1].address())
        expect(decodedResult.percentInterest).to.equal(700n)
        expect(decodedResult.aeStaked).to.equal(3n)
        expect(decodedResult.aeInterest).to.equal(2100n)
        expect(decodedResult.open).to.equal(true)
    })
  })

  describe('get position Ids for address', function() {
    it('returns a list of positionIds created by a specific address', async () => {
        await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[1], amount: 3 })

        await contract.methods.stakeAE(90, { onAccount: utils.getDefaultAccounts()[1], amount: 5 })

        await contract.methods.stakeAE(180, { onAccount: utils.getDefaultAccounts()[1], amount: 6 })

        const { decodedResult } = await contract.methods.getPositionIdForAddress(await utils.getDefaultAccounts()[1].address())

        expect(
          decodedResult.map(p => Number(p))
      ).to.eql(
          [1, 2, 3]
      )
    })
  })

  describe('change unlockDate', function() {
    describe('owner', function() {
     it('changes the unlockDate', async () => {
         await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[0], amount: 3 })
         const positionOld = await contract.methods.getPositionById(0)
         const newUnlockDate = positionOld.decodedResult.unlockDate - BigInt(86400 * 500)
         await contract.methods.changeUnlockDate(0, newUnlockDate, { onAccount: utils.getDefaultAccounts()[0] })
         const positionNew = await contract.methods.getPositionById(0)

         expect(
             positionNew.decodedResult.unlockDate
         ).to.be.equal(
             positionOld.decodedResult.unlockDate - BigInt(86400 * 500)
         )
     })
    }) 

    describe('non-owner', function() {
       it('reverts', async () => {
        await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[0], amount: 3 })
        const positionOld = await contract.methods.getPositionById(0)

        const newUnlockDate = positionOld.decodedResult.unlockDate -  BigInt(86400 * 500)

        const result = await contract.methods.changeUnlockDate(0, newUnlockDate, { onAccount: utils.getDefaultAccounts()[1]}).catch((e) => e)
        assert.include(result.message, "Only owner may modify staking period");
       })
    })
  })

  describe('closePosition', function() {
    describe('after unlock date', function() {
        it('transfers principal and interest', async () => {
            await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[0], amount: 300 })
            const res = await contract.methods.getContactBalance()
            const positionOld = await contract.methods.getPositionById(0)
            const newUnlockDate = positionOld.decodedResult.unlockDate - BigInt(86400 * 500)
            await contract.methods.changeUnlockDate(0, newUnlockDate, { onAccount: utils.getDefaultAccounts()[0] })

            const { decodedEvents } = await contract.methods.closePosition(0, { onAccount: utils.getDefaultAccounts()[0] })
            const { decodedResult } = await contract.methods.getContactBalance()

            expect(decodedResult).to.equal(9979n)
            expect(decodedEvents[0].args[0]).to.equal(0n)
            expect(decodedEvents[0].args[1]).to.equal(await utils.getDefaultAccounts()[0].address())
            expect(decodedEvents[0].args[2]).to.equal(321n)

        })
    })

    describe('before unlock date', function() {
      it('transfers only principal', async () => {
          await contract.methods.stakeAE(30, { onAccount: utils.getDefaultAccounts()[0], amount: 3n })

          const { decodedEvents } = await contract.methods.closePosition(0, { onAccount: utils.getDefaultAccounts()[0] })
          const { decodedResult } = await contract.methods.getContactBalance()

          expect(decodedResult).to.equal(10000n)
          expect(decodedEvents[0].args[0]).to.equal(0n)
          expect(decodedEvents[0].args[1]).to.equal(await utils.getDefaultAccounts()[0].address())
          expect(decodedEvents[0].args[2]).to.equal(3n)
      })
    })
  })

  describe('Borrow funds', function() {
    describe('Owner', function() {
     it('borrows and increments the count', async () => {
         let borrower = await utils.getDefaultAccounts()[1].address();
         const { decodedEvents } = await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })
         expect(decodedEvents[0].args[0]).to.equal(borrower)
         expect(decodedEvents[0].args[1]).to.equal(30n)
         expect(decodedEvents[0].args[2]).to.equal(1n) 
     })

     it('Pays the borrower', async () => {
      const oldBalance = await contract.methods.getContactBalance()
      const getOldAcountbalance = await contract.methods.caller_balance({ onAccount: utils.getDefaultAccounts()[1] })
      let borrower = await utils.getDefaultAccounts()[1].address();

      await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })
      const newBalance = await contract.methods.getContactBalance()
      const getNewAcountbalance = await contract.methods.caller_balance({ onAccount: utils.getDefaultAccounts()[1] })
      expect(oldBalance.decodedResult).to.equal(newBalance.decodedResult + 30n)
      expect(getOldAcountbalance.decodedResult + 30n).to.equal(getNewAcountbalance.decodedResult)  
     })
    }) 

    describe('non-owner', function() {
       it('reverts', async () => {
        let borrower = await utils.getDefaultAccounts()[1].address();

        const result = await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[1] }).catch((e) => e)

        assert.include(result.message, "Only owner can create a borrower");
       })
    })
  })

  describe('Pay borrowed fund', function() {
    it('transfers fund to contract', async () => {
        let borrower = await utils.getDefaultAccounts()[1].address();
        await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })
        const oldBalance = await contract.methods.getContactBalance()

        await contract.methods.payBorrowedFund(borrower, { onAccount: utils.getDefaultAccounts()[0], amount : 40 })
        const newBalance = await contract.methods.getContactBalance()
        expect(oldBalance.decodedResult + 40n).to.equal(newBalance.decodedResult)
    })

    it('sets paid to true', async () => {
      let borrower = await utils.getDefaultAccounts()[1].address();
      await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })

      const { decodedEvents } = await contract.methods.payBorrowedFund(borrower, { onAccount: utils.getDefaultAccounts()[0], amount : 40 })
      
      expect(decodedEvents[0].args[2]).to.equal(true)
    })

    it('reverts because of insufficient funds', async () => {
      let borrower = await utils.getDefaultAccounts()[1].address();
      await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })

      const result = await contract.methods.payBorrowedFund(borrower, { onAccount: utils.getDefaultAccounts()[0], amount : 20 }).catch((e) => e)
      assert.include(result.message, "amount is not complete");
    })

    it('reverts because address owner is not a borrower', async () => {
      let borrower = await utils.getDefaultAccounts()[1].address();
      let unBorrower = await utils.getDefaultAccounts()[2].address();
      await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })

      const result = await contract.methods.payBorrowedFund(unBorrower, { onAccount: utils.getDefaultAccounts()[0], amount : 30 }).catch((e) => e)
      assert.include(result.message, "Key does not exist");
    })

    it('reverts because debts has been paid', async () => {
      let borrower = await utils.getDefaultAccounts()[1].address();
      await contract.methods.borrowFunds(30, borrower, 10, { onAccount: utils.getDefaultAccounts()[0] })

      await contract.methods.payBorrowedFund(borrower, { onAccount: utils.getDefaultAccounts()[0], amount : 40 })

      const result = await contract.methods.payBorrowedFund(borrower, { onAccount: utils.getDefaultAccounts()[0], amount : 40 }).catch((e) => e)
      
      assert.include(result.message, "debts has been paid");
    })
  })
})