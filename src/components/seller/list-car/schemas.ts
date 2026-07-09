import { z } from "zod";

export const vehicleInfoSchema = z.object({
  vin: z.string().trim().min(5, "VIN or registration must be at least 5 characters"),
  year: z.string().trim().regex(/^\d{4}$/, "Enter a valid 4-digit year"),
  make: z.string().trim().min(1, "Make is required"),
  model: z.string().trim().min(1, "Model is required"),
  trim: z.enum(["LX", "Sport", "EX-L", "Touring"], { message: "Select a trim" }),
});

export type VehicleInfoValues = z.infer<typeof vehicleInfoSchema>;

export const TRIM_OPTIONS = ["LX", "Sport", "EX-L", "Touring"] as const;

export const conditionDetailsSchema = z.object({
  mileage: z.string().trim().min(1, "Mileage is required"),
  colorPreset: z.enum(["Black", "White", "Gray", "Silver", "Blue", "Red", "custom"]),
  customColor: z.string().optional(),
  titleStatus: z.enum(["Clean", "Rebuilt", "Salvage", "Lien"]),
  bodyType: z.enum(["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Wagon", "Minivan"]),
  drivetrain: z.enum(["All Wheel Drive", "Rear Wheel Drive", "Front Wheel Drive"]),
  features: z.array(z.string()).min(1, "Select at least one option"),
  mechanicalCondition: z.enum(["Excellent", "Good", "Needs attention", "Non-runner"]),
  ownershipStatus: z.enum(["New", "Owned", "Leased", "Financed"]),
  numberOfKeys: z.enum(["1", "2", "3", "4"]),
  tireCondition: z.enum(["New", "Good", "Fair", "Need replacement"]),
  drivable: z.boolean(),
  accidentHistory: z.boolean(),
  shortDescription: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.colorPreset === "custom" && !data.customColor?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Enter your custom color",
      path: ["customColor"],
    });
  }
});

export type ConditionDetailsValues = z.infer<typeof conditionDetailsSchema>;

export const PHOTO_SLOT_KEYS = [
  "front",
  "rear",
  "driver",
  "passenger",
  "interiorFront",
  "interiorRear",
  "dashboard",
  "engine",
] as const;

export type PhotoSlotKey = (typeof PHOTO_SLOT_KEYS)[number];

export const PHOTO_SLOT_LABELS: Record<PhotoSlotKey, string> = {
  front: "Front View*",
  rear: "Rear View*",
  driver: "Driver Side*",
  passenger: "Passenger Side*",
  interiorFront: "Interior - Front Seats*",
  interiorRear: "Interior - Rear Seats*",
  dashboard: "Dashboard*",
  engine: "Engine Bay*",
};

export type PhotosFormValues = {
  slots: Partial<Record<PhotoSlotKey, File>>;
  extras: File[];
  video: File | null;
};

export const reviewPublishSchema = z
  .object({
    owner: z.boolean(),
    accurate: z.boolean(),
    noGuarantee: z.boolean(),
    dealersContact: z.boolean(),
    terms: z.boolean(),
  })
  .refine((d) => d.owner && d.accurate && d.noGuarantee && d.dealersContact && d.terms, {
    message: "Please confirm all items before publishing",
    path: ["owner"],
  });

export type ReviewPublishValues = z.infer<typeof reviewPublishSchema>;
