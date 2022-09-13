// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: 'borrower',
    title: 'Borrower',
    type: 'document',
    fields: [
      {
        name: 'address',
        title: 'WalletAddress',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'nft',
        title: 'Nft',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'string',
      },
    ],
  };