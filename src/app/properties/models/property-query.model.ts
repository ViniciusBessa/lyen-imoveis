export interface PropertyQuery {
  [key: string]: any;
  announceType?: string;
  numericFilters?: string;
  petAllowed?: boolean;
  hasGarage?: boolean;
  page?: number;
  limit?: number;
  city?: string;
  state?: string;
}
