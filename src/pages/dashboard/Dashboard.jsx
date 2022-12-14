import { ImageCrossfader } from 'kc_components/react/ui/ImageCrossfader';
import { getDollarString } from 'kc_components/common/utils/display/get-dollar-string';
import { Layout } from 'kc_components/react/ui/Layout';
import { useEffect, useMemo, useState } from 'react';
import { useFirebase } from '../../firebase';
import { getLoansCollection } from '../../transactions/loans/loans-api';

export const DashboardPage = () => {
  const { firestore } = useFirebase();
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);

  useEffect(() => {
    (async () => {
      const loansCollection = await getLoansCollection(firestore);
      const total = loansCollection.docs.reduce((tot, doc) => {
        const data = doc.data();
        tot += data.amount;
        return tot;
      }, 0);
      setTotalLoanAmount(total);
    })();
  }, []);

  return (
    <Layout>
      <div className='pos-relative h-100vh'>
        <div className='pos-absolute pos-fill'>
          <div
            className='pos-absolute pos-fill z-2'
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.05) 100%)',
              backgroundSize: 'cover'
            }}
          ></div>
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
            {getDollarString(totalLoanAmount)}
          </h1>
        </div>
      </div>
    </Layout>
  );
};
