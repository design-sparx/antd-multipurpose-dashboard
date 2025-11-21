import { PricingTable } from '../../components';
import { useFetchData } from '../../hooks';
import { API_ENDPOINTS } from '../../constants';

export const CorporatePricingPage = () => {
  const {
    data: pricingData,
    error: pricingDataError,
    loading: pricingDataLoading,
  } = useFetchData(API_ENDPOINTS.pricings);

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
