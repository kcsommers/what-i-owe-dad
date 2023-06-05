import { animated } from '@react-spring/web';
import classNames from 'classnames';
import { getDateDisplay } from 'kc_components/common/utils/dates/get-date-display';
import { getDollarString } from 'kc_components/common/utils/display/get-dollar-string';
import { ImageCrossfader } from 'kc_components/react/ui/ImageCrossfader';
import { LoadingSpinner } from 'kc_components/react/ui/LoadingSpinner';
import { useInterval } from 'kc_components/react/utils/hooks/use-interval';
import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { TabContent, TabsContainer } from '../../components/TabsContainer';
import { useFirebase } from '../../firebase';
import { getLoansCollection } from '../../transactions/loans/loans-api';
import { getPaymentsCollection } from '../../transactions/payments/payments-api';
import styles from './Dashboard.module.scss';

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
    <>
      <div className='pos-relative h-100vh'>
        <h1 className={classNames(styles.title, 'z-9')}>What I Owe Dad</h1>
        <div className='pos-absolute pos-fill'>
          <animated.div
            className='pos-absolute pos-fill z-2'
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.05) 100%)',
              backgroundSize: 'cover'
            }}
          ></animated.div>
          <ImageCrossfader
            images={bgImages}
            activeImage={bgImages[currImgIndex]}
          />
        </div>
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <h2 className={classNames(styles.total_owed, 'pos-relative z-2')}>
            {typeof totalOwed === 'undefined' ? (
              <LoadingSpinner size='lg' />
            ) : (
              getDollarString(totalOwed)
            )}
          </h2>
        </div>
      </div>
      <section className={styles.tabs_section}>
        <TabsContainer
          tabNames={['Loans', 'Payments']}
          tabContent={[
            <TabContent>
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
            </TabContent>,
            <TabContent>
              <Table<Transaction>
                data={payments}
                emptyMessage='No payments yet!'
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
            </TabContent>
          ]}
        />
      </section>
    </>
  );
};
