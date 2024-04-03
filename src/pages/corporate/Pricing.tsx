import { PricingTable } from '../../components';
import { useFetchData } from '../../hooks';

export const CorporatePricingPage = () => {
  const {
    data: pricingData,
    error: pricingDataError,
    loading: pricingDataLoading,
  } = useFetchData('../mocks/Pricing.json');

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
