export type ActiveBidStatus = "leading" | "ranked";

export type DealerActiveBid = {
  id: string;
  car: string;
  offer: string;
  status: ActiveBidStatus;
  rank?: number;
  timeLeft: string;
  image: string;
};

const IMG1 =
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=200&fit=crop";
const IMG2 =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&h=200&fit=crop";

export const DEALER_ACTIVE_BIDS: DealerActiveBid[] = [
  {
    id: "1",
    car: "2020 Honda Accord EX",
    offer: "$25,000",
    status: "leading",
    timeLeft: "8min",
    image: IMG1,
  },
  {
    id: "2",
    car: "2020 Honda Accord EX",
    offer: "$25,000",
    status: "ranked",
    rank: 4,
    timeLeft: "8min",
    image: IMG2,
  },
];

export type LiveMarketStatus = "active" | "timeOver";

export type DealerLiveMarketCar = {
  id: string;
  name: string;
  km: string;
  location: string;
  timer: string;
  status: LiveMarketStatus;
  image: string;
};

const CAR =
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop";

export const DEALER_LIVE_MARKET: DealerLiveMarketCar[] = [
  { id: "1", name: "2021 Honda CR-V EX", km: "32,000 km", location: "Queens, NY", timer: "1h 45 m left", status: "active", image: CAR },
  { id: "2", name: "2021 Honda CR-V EX", km: "32,000 km", location: "Queens, NY", timer: "13h ago", status: "timeOver", image: CAR },
  { id: "3", name: "2021 Honda CR-V EX", km: "32,000 km", location: "Queens, NY", timer: "2h 10 m left", status: "active", image: CAR },
  { id: "4", name: "2021 Honda CR-V EX", km: "32,000 km", location: "Queens, NY", timer: "45 m left", status: "active", image: CAR },
  { id: "5", name: "2021 Honda CR-V EX", km: "32,000 km", location: "Queens, NY", timer: "3h left", status: "active", image: CAR },
  { id: "6", name: "2021 Honda CR-V EX", km: "32,000 km", location: "Queens, NY", timer: "50 m left", status: "active", image: CAR },
];

export type BiddingPhase = "active" | "timeOver";

export type DealerBiddingListing = {
  id: string;
  phase: BiddingPhase;
  title: string;
  miles: string;
  location: string;
  year: string;
  vin: string;
  description: string;
  images: string[];
  specs: { label: string; value: string }[];
};

const MERC_IMGS = Array.from({ length: 6 }, (_, i) =>
  `https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&sig=${i}`
);

const SPECS: { label: string; value: string }[] = [
  { label: "Drivability", value: "Yes" },
  { label: "Title status", value: "Like New" },
  { label: "Number of Keys", value: "03" },
  { label: "Accident History", value: "No" },
  { label: "DRIVETRAIN", value: "All Wheel Drive" },
  { label: "Tire Condition", value: "New" },
  { label: "Trim", value: "LX" },
  { label: "Mechanical Condition", value: "Good" },
  { label: "Ownership Status", value: "Owned" },
  { label: "Body Type", value: "SUV" },
  { label: "Any Options", value: "Leather" },
];

const BASE_LISTING: Omit<DealerBiddingListing, "id" | "phase"> = {
  title: "2023 Mercedes-Benz C300",
  miles: "11,000 miles",
  location: "New York, NY",
  year: "2023",
  vin: "VIN: WDDKK4HB3GF123456",
  description:
    "Well-maintained C300 with AMG Line package, MBUX infotainment, panoramic roof, and premium sound. Single owner, full service history.",
  images: MERC_IMGS,
  specs: SPECS,
};

export const DEALER_BIDDING_BY_ID: Record<string, DealerBiddingListing> = {
  "1": { id: "1", phase: "active", ...BASE_LISTING },
  "2": { id: "2", phase: "timeOver", ...BASE_LISTING },
  "3": { id: "3", phase: "active", ...BASE_LISTING },
  "4": { id: "4", phase: "active", ...BASE_LISTING },
  "5": { id: "5", phase: "active", ...BASE_LISTING },
  "6": { id: "6", phase: "active", ...BASE_LISTING },
};

export function getDealerBiddingListing(id: string): DealerBiddingListing | undefined {
  return DEALER_BIDDING_BY_ID[id];
}
