import * as z from "zod";

export const ApiResponseHeaderSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type TApiResponseHeaderSchema = z.infer<typeof ApiResponseHeaderSchema>;

export const ApiResponseSchema = z.object({
  header: ApiResponseHeaderSchema,
  data: z.any(),
});

export type TApiResponseSchema = z.infer<typeof ApiResponseSchema>;

// Error Schema
export const ErrorResponse = z.object({
  error: z.object({
    message: z.string(),
  }),
});

export type TErrorResponse = z.infer<typeof ErrorResponse>;

export const HeaderMessage = z.object({
  header: z.object({
    status: z.number(),
    message: z.string(),
  }),
});

export type THeaderMessage = z.infer<typeof HeaderMessage>;

export const ZAny = z.any();

export type TAny = z.infer<typeof ZAny>;
