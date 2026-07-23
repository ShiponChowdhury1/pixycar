import { baseApi } from '../../api/baseApi';
import type {
  CreateVehicleListingRequest,
  VehicleListingResponse,
  MineListingsResponse,
  MarketplaceListing,
  MarketplaceListingsResponse,
  ListingOffersResponse,
} from './listingsApi.types';

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyListings: builder.query<MineListingsResponse, void>({
      query: () => '/marketplace/listings/mine/',
      providesTags: ['Listings'],
    }),
    createVehicleListing: builder.mutation<VehicleListingResponse, CreateVehicleListingRequest>({
      query: (data) => ({
        url: '/marketplace/listings/vehicle-create/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Listings'],
    }),
    getMarketplaceListings: builder.query<MarketplaceListingsResponse, void>({
      query: () => '/marketplace/listings/',
      providesTags: ['Listings'],
    }),
    getListingById: builder.query<MarketplaceListing, number>({
      query: (id) => `/marketplace/listings/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Listings', id }],
    }),
    getListingOffers: builder.query<ListingOffersResponse, number>({
      query: (id) => `/marketplace/listings/${id}/offers/`,
      providesTags: (_result, _error, id) => [{ type: 'Listings', id: `OFFERS_${id}` }],
    }),
    selectWinningDealer: builder.mutation<{ message: string }, { listingId: number | string; dealerId: number }>({
      query: ({ listingId, dealerId }) => ({
        url: `/marketplace/listings/${listingId}/select-dealer/`,
        method: 'POST',
        body: { dealer_id: dealerId },
      }),
      invalidatesTags: (_res, _err, { listingId }) => [{ type: 'Listings', id: listingId }],
    }),
    relistListing: builder.mutation<{ message: string; listing?: MarketplaceListing }, number | string>({
      query: (id) => ({
        url: `/marketplace/listings/${id}/relist/`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => ['Listings', { type: 'Listings', id }],
    }),
    uploadListingImages: builder.mutation<{ message: string; thumbnail?: string }, { id: number | string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/marketplace/listings/${id}/upload-images/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Listings'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyListingsQuery,
  useCreateVehicleListingMutation,
  useUploadListingImagesMutation,
  useGetMarketplaceListingsQuery,
  useGetListingByIdQuery,
  useGetListingOffersQuery,
  useSelectWinningDealerMutation,
  useRelistListingMutation,
} = listingsApi;
