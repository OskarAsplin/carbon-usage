
export interface CarbonResultResponse {
  data: {
    id: number;
    type: string;
    attributes: {
      country: string;
      state: string;
      electricity_unit: string;
      electricity_value: number;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    }
  }
}
