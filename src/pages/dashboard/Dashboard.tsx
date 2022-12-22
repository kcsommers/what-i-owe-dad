import { animated } from '@react-spring/web';
import { getDateDisplay } from 'kc_components/common/utils/dates/date-utils';
import { getDollarString } from 'kc_components/common/utils/display/get-dollar-string';
import { ImageCrossfader } from 'kc_components/react/ui/ImageCrossfader';
import { Layout } from 'kc_components/react/ui/Layout';
import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { TabContent, TabsContainer } from '../../components/TabsContainer';
import { useFirebase } from '../../firebase';
import { getLoansCollection } from '../../transactions/loans/loans-api';
import { getPaymentsCollection } from '../../transactions/payments/payments-api';

interface ITransaction {
  amount: number;
  date: number;
  description: string;
}

export const DashboardPage = () => {
  const { firestore } = useFirebase();
  const [totalOwed, setTotalOwed] = useState<number>();
  const [loans, setLoans] = useState<ITransaction[]>();
  const [payments, setPayments] = useState<ITransaction[]>();

  useEffect(() => {
    (async () => {
      const [loansCollection, paymentsCollection] = await Promise.all([
        getLoansCollection(firestore),
        getPaymentsCollection(firestore)
      ]);
      setLoans(loansCollection.docs.map((d) => d.data() as ITransaction));
      setPayments(paymentsCollection.docs.map((d) => d.data() as ITransaction));
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
      <section className='p-4'>
        <TabsContainer
          tabNames={['Payments', 'Loans']}
          tabContent={[
            <TabContent>
              <Table<ITransaction>
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
            </TabContent>,
            <Table<ITransaction>
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
          ]}
        />
      </section>
    </Layout>
  );
};
