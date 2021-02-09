import { CarbonElectricityResult } from '../types/domainTypes';
import { CarbonResultResponse } from '../types/responseTypes';

export const mapToCarbonElectricityResult = (response: CarbonResultResponse, date: Date) => {
  const options = { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' };
  return {
    date_string: date.toLocaleDateString('en-UK', options),
    electricity_unit: response.data.attributes.electricity_unit,
    electricity_value: response.data.attributes.electricity_value,
    carbon_g: response.data.attributes.carbon_g,
    carbon_lb: response.data.attributes.carbon_lb,
    carbon_kg: response.data.attributes.carbon_kg,
    carbon_mt: response.data.attributes.carbon_mt,
  } as CarbonElectricityResult;
}
