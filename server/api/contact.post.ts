import { Resend } from "resend";
import {
  validateContactForm,
  sanitizeContactData,
  type ContactFormData,
} from "~/utils/contact-validation";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (ip: string, maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  const now = Date.now();
  const key = ip;

  for (const [storageKey, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(storageKey);
    }
  }

  const existing = rateLimitStore.get(key);

  if (!existing) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (now > existing.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: existing.resetTime };
  }

  existing.count++;
  return { allowed: true, remaining: maxRequests - existing.count };
};

const createEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; padding: 10px; background: #f9f9f9; border-radius: 3px; }
    .message { background: #e8f4fd; padding: 15px; border-radius: 5px; border-left: 4px solid #2196F3; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
      <p>You have received a new message from your website contact form.</p>
    </div>
    
    <div class="field">
      <div class="label">Full Name:</div>
      <div class="value">${data.fullName}</div>
    </div>
    
    <div class="field">
      <div class="label">Email:</div>
      <div class="value">${data.email}</div>
    </div>
    
    ${
      data.phone
        ? `
    <div class="field">
      <div class="label">Phone:</div>
      <div class="value">${data.phone}</div>
    </div>
    `
        : ""
    }
    
    <div class="field">
      <div class="label">Subject:</div>
      <div class="value">${data.subject}</div>
    </div>
    
    <div class="field">
      <div class="label">Message:</div>
      <div class="message">${data.message.replace(/\n/g, "<br>")}</div>
    </div>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
    <p style="color: #666; font-size: 12px;">
      This email was sent from your website contact form at ${new Date().toLocaleString()}.
    </p>
  </div>
</body>
</html>
`;

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed",
    });
  }

  try {
    const clientIP =
      getHeader(event, "x-forwarded-for")?.toString().split(",")[0]?.trim() ||
      getHeader(event, "x-real-ip")?.toString() ||
      event.node.req.socket?.remoteAddress ||
      "unknown";

    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too many requests, please try again later",
      });
    }

    const body = await readBody(event);

    const validation = validateContactForm(body);

    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: validation.error.issues,
      });
    }

    const sanitizedData = sanitizeContactData(validation.data);

    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /data:text\/html/i,
      /vbscript:/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    const allFields = Object.values(sanitizedData).join(" ");
    if (suspiciousPatterns.some((pattern) => pattern.test(allFields))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid content detected",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      throw createError({
        statusCode: 500,
        statusMessage: "Email service not configured",
      });
    }

    const destinationEmail = process.env.CONTACT_EMAIL || "habibshaban98@gmail.com";

    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
      to: [destinationEmail],
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: createEmailTemplate(sanitizedData),
      replyTo: sanitizedData.email,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email",
      });
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error: any) {
    if (error.status === 429) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too many requests, please try again later",
      });
    }

    if (error.statusCode) {
      throw error;
    }

    console.error("Contact form error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "An unexpected error occurred",
    });
  }
});
