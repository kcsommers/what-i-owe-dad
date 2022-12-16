import { animated } from '@react-spring/web';
import { getDollarString } from 'kc_components/common/utils/display/get-dollar-string';
import { ImageCrossfader } from 'kc_components/react/ui/ImageCrossfader';
import { Layout } from 'kc_components/react/ui/Layout';
import { useEffect, useState } from 'react';
import { useFirebase } from '../../firebase';
import { getLoansCollection } from '../../transactions/loans/loans-api';
import { getPaymentsCollection } from '../../transactions/payments/payments-api';

export const DashboardPage = () => {
  const { firestore } = useFirebase();
  const [totalOwed, setTotalOwed] = useState(0);

  useEffect(() => {
    (async () => {
      const [loansCollection, paymentsCollection] = await Promise.all([
        getLoansCollection(firestore),
        getPaymentsCollection(firestore)
      ]);
      const totalLoans =
        loansCollection.docs.reduce((tot, doc) => {
          const data = doc.data();
          tot += data.amount;
          return tot;
        }, 0) || 0;
      const totalPayments =
        paymentsCollection.docs.reduce((tot, doc) => {
          const data = doc.data();
          tot += data.amount;
          return tot;
        }, 0) || 0;

      setTotalOwed(totalLoans - totalPayments);
    })();
  }, []);

  return (
    <Layout>
      <div className='pos-relative h-100vh'>
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
            images={[
              {
                src: 'https://res.cloudinary.com/kcsommers/image/upload/v1670953119/What%20I%20Owe%20Dad/wiod-1.png'
              }
            ]}
          />
        </div>
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <h1
            className='pos-relative z-2 color-white'
            style={{ fontSize: '100px' }}
          >
            {getDollarString(totalOwed)}
          </h1>
        </div>
      </div>
    </Layout>
  );
};
