import { PricingTable } from '../../components';
import { useFetchData } from '../../hooks';
import { Pricing } from '../../types';

export const CorporatePricingPage = () => {
  const {
    data: pricingData,
    error: pricingDataError,
    loading: pricingDataLoading,
  } = useFetchData<Pricing[]>('/antd/pricings');

  return (
    <div>
      <PricingTable
        data={pricingData ?? undefined}
        error={pricingDataError}
        loading={pricingDataLoading}
      />
    </div>
  );
};
