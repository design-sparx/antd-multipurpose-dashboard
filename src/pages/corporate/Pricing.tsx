import {PricingTable} from "../../components";
import PricingData from "../../mocks/Pricing.json"

const CorporatePricingPage = () => {
    return (
        <div>
            <PricingTable data={PricingData}/>
        </div>
    );
};

export default CorporatePricingPage;