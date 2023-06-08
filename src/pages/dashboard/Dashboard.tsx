import { getDateDisplay } from 'kc_components/common/utils/dates/get-date-display';
import { getDollarString } from 'kc_components/common/utils/display/get-dollar-string';
import { useInterval } from 'kc_components/react/utils/hooks/use-interval';
import { useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import { LoadingSpinner } from '../..//components/LoadingSpinner/LoadingSpinner';
import { ImageCrossfader } from '../../components/ImageCrossfader/ImageCrossfader';
import { Table } from '../../components/Table';
import { useFirebase } from '../../firebase';
import { getLoansCollection } from '../../transactions/loans/loans-api';
import { getPaymentsCollection } from '../../transactions/payments/payments-api';

interface Transaction {
  amount: number;
  date: number;
  description: string;
}

const bgImages = [
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1670953119/What%20I%20Owe%20Dad/wiod-1.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733469/What%20I%20Owe%20Dad/IMG_9536.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733469/What%20I%20Owe%20Dad/IMG_0294.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733447/What%20I%20Owe%20Dad/IMG_9475.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733380/What%20I%20Owe%20Dad/IMG_9664.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733376/What%20I%20Owe%20Dad/IMG_9520.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733344/What%20I%20Owe%20Dad/IMG_0213.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733310/What%20I%20Owe%20Dad/IMG_0219.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733291/What%20I%20Owe%20Dad/IMG_0332.png'
  },
  {
    src: 'https://res.cloudinary.com/kcsommers/image/upload/v1671733080/What%20I%20Owe%20Dad/IMG_1912.png'
  }
];

export const DashboardPage = () => {
  const { firestore } = useFirebase();
  const [totalOwed, setTotalOwed] = useState<number>();
  const [loans, setLoans] = useState<Transaction[]>();
  const [payments, setPayments] = useState<Transaction[]>();
  const [currImgIndex, setCurrentImgIndex] = useState(0);

  const mostRecentPayment = useMemo(() => {
    return (payments || []).reduce((mostRecent, curr) => {
      if (!mostRecent || mostRecent.date < curr.date) {
        return curr;
      }
      return mostRecent;
    }, null);
  }, [payments]);

  useInterval(
    () => setCurrentImgIndex((prevIndex) => (prevIndex + 1) % bgImages.length),
    5000,
    true
  );

  useEffect(() => {
    (async () => {
      const [loansCollection, paymentsCollection] = await Promise.all([
        getLoansCollection(firestore),
        getPaymentsCollection(firestore)
      ]);
      setLoans(loansCollection.docs.map((d) => d.data() as Transaction));
      setPayments(paymentsCollection.docs.map((d) => d.data() as Transaction));
    })();
  }, []);

  useEffect(() => {
    if (!loans || !payments) {
      return;
    }
    const totalLoans =
      loans.reduce((tot, data) => {
        tot += data.amount;
        return tot;
      }, 0) || 0;
    const totalPayments =
      payments.reduce((tot, data) => {
        tot += data.amount;
        return tot;
      }, 0) || 0;
    setTotalOwed(totalLoans - totalPayments);
  }, [loans, payments]);

  return (
    <div className='bg-primary min-h-screen'>
      <div className='px-10 py-20 md:px-20 text-white h-[450px] top-0 left-0 relative'>
        <div className='z-30 relative'>
          <h1 className='text-2xl font-bold mb-2'>What I Owe Dad</h1>
          {typeof totalOwed !== 'number' ? (
            <LoadingSpinner color='secondary' size='lg' />
          ) : (
            <>
              <h2 className='text-6xl md:text-8xl'>
                $
                <CountUp
                  start={0}
                  end={totalOwed / 100}
                  separator=','
                  decimals={2}
                />
              </h2>
              {mostRecentPayment && (
                <div className='text-lg mt-4'>
                  Last payment
                  <p className='text-secondary'>
                    {getDollarString(mostRecentPayment.amount)} on{' '}
                    {getDateDisplay(mostRecentPayment.date, 'month dd, yyyy')}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className='absolute max-w-full w-full h-full top-0 right-0 z-10 overflow-hidden rounded-sm'>
          <ImageCrossfader
            images={bgImages}
            activeImage={bgImages[currImgIndex]}
          />
          <div
            className='absolute top-0 right-0 left-0 bottom-0 bg-cover'
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.3) 60%)'
            }}
          ></div>
        </div>
      </div>

      <div className='text-white px-10 md:px-20 py-20'>
        <div className='mb-12'>
          <p className='mb-2 text-2xl'>Loans</p>
          <Table<Transaction>
            data={loans}
            columns={[
              {
                display: 'Date',
                property: 'date',
                transformer: (row) => getDateDisplay(row.date, 'mm/dd/yyyy')
              },
              {
                display: 'Amount',
                property: 'amount',
                transformer: (row) => getDollarString(row.amount)
              },
              {
                display: 'Description',
                property: 'description'
              }
            ]}
          />
        </div>
        <div className='mb-8'>
          <p className='mb-2 text-2xl'>Payments</p>
          <Table<Transaction>
            data={payments}
            columns={[
              {
                display: 'Date',
                property: 'date',
                transformer: (row) => getDateDisplay(row.date, 'mm/dd/yyyy')
              },
              {
                display: 'Amount',
                property: 'amount',
                transformer: (row) => getDollarString(row.amount)
              },
              {
                display: 'Description',
                property: 'description'
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};
