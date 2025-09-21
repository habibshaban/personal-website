import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),

  phone: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[\+]?[1-9][\d]{0,15}$/.test(value),
      "Please enter a valid phone number"
    ),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const validateContactForm = (data: unknown) => {
  return contactFormSchema.safeParse(data);
};

export const sanitizeContactData = (data: ContactFormData): ContactFormData => {
  return {
    fullName: data.fullName.trim().replace(/\s+/g, " "),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim().replace(/\s+/g, ""),
    subject: data.subject.trim().replace(/\s+/g, " "),
    message: data.message.trim(),
  };
};
