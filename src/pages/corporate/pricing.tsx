import { PricingTable } from '../../components';
import { usePricings } from '../../lib/queries';

export const CorporatePricingPage = () => {
  const {
    data: pricingData,
    error: pricingDataError,
    isLoading: pricingDataLoading,
  } = usePricings();

  return (
    <div>
      <PricingTable
        data={pricingData ?? undefined}
        error={pricingDataError?.toString()}
        loading={pricingDataLoading}
      />
    </div>
  );
};
