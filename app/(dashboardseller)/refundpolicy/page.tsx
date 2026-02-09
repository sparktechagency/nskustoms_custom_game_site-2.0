import { Suspense } from 'react';
import RefundPolicyContent from './RefundPolicyContent';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <Suspense>
      <RefundPolicyContent />
    </Suspense>
  );
}

export default Page;
