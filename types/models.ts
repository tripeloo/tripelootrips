import type { ObjectId } from "mongodb";

export type CarouselImage = { url: string; title?: string };

export type TourPackageDoc = {
  _id?: ObjectId | string;
  name: string;
  destinationSlug: string;
  coverImage: string;
  carouselImages: CarouselImage[];
  summary: string;
  packagePrice: number;
  currency: string;
  numberOfDays: number;
  numberOfNights: number;
  durationOptions: string[];
  inclusions: string[];
  exclusions: string[];
  tripHighlights: string[];
  detailedItinerary: string;
  countrySpecificGuidelines: string;
  formType: "booking" | "lead" | "enquiry";
  isHidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DestinationDoc = {
  _id?: ObjectId | string;
  name: string;
  slug: string;
  location: string;
  coverImage: string;
  startingPrice: number;
  currency: string;
  summary: string;
  tags: string[];
  carouselImages?: string[];
  overviewHeading?: string;
  overviewDescription?: string;
  isHidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type HomeFeaturedConfigDoc = {
  _id?: ObjectId | string;
  section1Slugs: string[];
  section2Slugs: string[];
  section1Title: string;
  section2Title: string;
  updatedAt?: Date;
};

export type TripelooLeadDoc = {
  _id?: ObjectId | string;
  name: string;
  phone: string;
  moreInfo?: string;
  budget?: string;
  packageId?: string;
  packageName?: string;
  destinationSlug?: string;
  /** Display name for the destination (e.g. "Sri Lanka"), not only the URL slug */
  destinationName?: string;
  source: string;
  createdAt: Date;
};
