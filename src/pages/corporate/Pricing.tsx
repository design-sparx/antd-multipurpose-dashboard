import { PricingTable } from '../../components';
import { useFetchData } from '../../hooks';
import { Pricing } from '../../types';

export const CorporatePricingPage = () => {
  // Fetch pricing data with proper typing
  const {
    data: pricingDataRaw,
    error: pricingDataError,
    loading: pricingDataLoading,
  } = useFetchData<Pricing[]>('../mocks/Pricing.json');
  const pricingData = pricingDataRaw ?? [];

  return (
    <div>
      <PricingTable
        data={pricingData}
        error={pricingDataError}
        loading={pricingDataLoading}
      />
    </div>
  );
};
