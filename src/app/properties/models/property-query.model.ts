export interface PropertyQuery {
  [key: string]: any;
  announceType?: 'sale' | 'rent';
  numericFilters?: string;
  petAllowed?: boolean;
  hasGarage?: boolean;
  page?: number;
  limit?: number;
  city?: string;
  state?: string;
}
