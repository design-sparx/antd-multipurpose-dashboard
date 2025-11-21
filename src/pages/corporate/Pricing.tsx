import { PricingTable } from '../../components';
import { useFetchData } from '../../hooks';

export const CorporatePricingPage = () => {
  const {
    data: pricingData,
    error: pricingDataError,
    loading: pricingDataLoading,
  } = useFetchData('/antd/pricings');

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
