export const BidTable = ({ bids }: { bids: [string, string][] }) => {
  let currentTotal = 0;
  const filteredBids = bids.filter(([_, quantity]) => Number(quantity) > 0);
  const relevantBids = filteredBids.slice(0, 15);
  console.log('from backend: ', relevantBids);
  relevantBids.sort();
  relevantBids.reverse();
  console.log('after sort: ', relevantBids);
  const bidsWithTotal: [string, string, number][] = relevantBids.map(
    ([price, quantity]) => [price, quantity, (currentTotal += Number(quantity))]
  );
  const maxTotal = relevantBids.reduce(
    (acc, [_, quantity]) => acc + Number(quantity),
    0
  );

  const highestTotal = bidsWithTotal[bidsWithTotal.length - 1][2];

  return (
    <div>
      {bidsWithTotal?.map(([price, quantity, total]) => (
        <Bid
          maxTotal={highestTotal}
          total={total}
          key={price}
          price={price}
          quantity={quantity}
        />
      ))}
    </div>
  );
};

function Bid({
  price,
  quantity,
  total,
  maxTotal,
}: {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${(100 * total) / maxTotal}%`,
          height: '100%',
          background: 'rgba(1, 167, 129, 0.325)',
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
      <div className={`flex justify-between text-xs w-full`}>
        <div>{price}</div>
        <div>{quantity}</div>
        <div>{total.toFixed(2)}</div>
      </div>
    </div>
  );
}
