export interface CreateVehicleListingRequest {
  registration_number: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  color: string;
  body_type: string;
  title_status: string;
  mechanical_condition: string;
  ownership_status: string;
  number_of_keys: number;
  tire_condition: string;
  drivetrain: string;
  has_accident_history: boolean;
  is_drivable: boolean;
  description: string;
  options: string[];
  payment_method_id: string;
}

export interface VehicleListingResponse {
  id?: number;
  message?: string;
  checkout_url?: string;
  session_id?: string;
  listing?: MarketplaceListing;
}

export interface MineListing {
  id: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number | null;
  color: string | null;
  status: string;
  current_highest_bid: number | null;
  total_offers: number;
  time_remaining_seconds: number;
  thumbnail: string | null;
  seller_name: string;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface MineListingsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MineListing[];
}

/* ── Marketplace listing (full detail from /marketplace/listings/:id/) ── */

export interface TopBid {
  id: number;
  dealer_id: number;
  dealer_name: string;
  amount: string;
  placed_at: string;
  is_winning: boolean;
}

export interface MarketplaceListing {
  id: number;
  seller_name: string;
  registration_number: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  color: string;
  body_type: string;
  ownership_status: string;
  number_of_keys: number;
  tire_condition: string;
  drivetrain: string;
  has_accident_history: boolean;
  is_drivable: boolean;
  description: string;
  video_file: string | null;
  images: string[];
  status: string;
  published_at: string;
  expires_at: string;
  time_remaining_seconds: number;
  current_highest_bid: string | null;
  total_offers: number;
  winning_dealer_name: string | null;
  created_at: string;
  updated_at: string;
  top_bids: TopBid[];
}

export interface MarketplaceListingsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MarketplaceListing[];
}

export interface ListingOffer {
  id: number;
  dealer_id: number;
  dealer_name: string;
  amount: string;
  placed_at: string;
  is_winning: boolean;
}

export interface ListingOffersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListingOffer[];
}
