import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.0";

// You'll need to set these as Supabase secrets:
// SUPABASE_SERVICE_ROLE_KEY
// SENDGRID_API_KEY (or similar for your email provider)
// ADMIN_EMAIL_RECIPIENTS (e.g., "admin1@example.com,admin2@example.com")
// SENDER_EMAIL (e.g., "info@yourdomain.com" - must be a verified sender in SendGrid)

serve(async (req) => {
  try {
    const { record } = await req.json();

    if (!record) {
      return new Response("No record found in payload", { status: 400 });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false,
        },
      },
    );

    const { first_name, last_name, email, phone, user_type } = record;

    const sendGridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendGridApiKey) {
      console.error("SENDGRID_API_KEY secret is not set.");
      return new Response("Email API key not configured", { status: 500 });
    }

    const senderEmail = Deno.env.get("SENDER_EMAIL");
    if (!senderEmail) {
      console.error("SENDER_EMAIL secret is not set.");
      return new Response("Sender email not configured", { status: 500 });
    }

    // --- Send email to Admin --- 
    const adminEmailRecipients = Deno.env.get("ADMIN_EMAIL_RECIPIENTS");
    if (!adminEmailRecipients) {
      console.error("ADMIN_EMAIL_RECIPIENTS secret is not set.");
      return new Response("Admin email recipients not configured", { status: 500 });
    }

    const adminRecipientList = adminEmailRecipients.split(",").map((s) => s.trim());

    const adminSubject = `New Waitlist Signup: ${first_name} ${last_name} (${user_type})`;
    const adminBody = `
      A new user has joined the waitlist!

      Name: ${first_name} ${last_name}
      Email: ${email}
      Phone: ${phone || "N/A"}
      User Type: ${user_type}

      Please log in to your Supabase dashboard to view more details.
    `;

    const sendAdminEmailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendGridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: adminRecipientList.map((email) => ({ email })),
            subject: adminSubject,
          },
        ],
        from: { email: senderEmail, name: "Strandly Waitlist Admin" },
        content: [{ type: "text/plain", value: adminBody }],
      }),
    });

    if (!sendAdminEmailResponse.ok) {
      const errorText = await sendAdminEmailResponse.text();
      console.error("Failed to send admin email:", errorText);
      // Do not return here, try to send user email even if admin email fails
    } else {
      console.log("Admin waitlist notification email sent successfully.");
    }

    // --- Send confirmation email to User --- 
    const userSubject = `Welcome to the Strandly Waitlist, ${first_name}!`;
    const userBody = `
      Hi ${first_name},

      Thank you for joining the Strandly waitlist! We're excited to have you.

      We'll keep you updated on our progress and let you know as soon as Strandly is ready.

      In the meantime, you can learn more about Strandly here: [Link to your Learn More page]

      Best regards,
      The Strandly Team

      If you wish to unsubscribe, please click here: [Link to unsubscribe - you'll need to implement this]
    `;

    const sendUserEmailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendGridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            subject: userSubject,
          },
        ],
        from: { email: senderEmail, name: "Strandly" },
        content: [{ type: "text/plain", value: userBody }],
      }),
    });

    if (!sendUserEmailResponse.ok) {
      const errorText = await sendUserEmailResponse.text();
      console.error("Failed to send user confirmation email:", errorText);
      return new Response(`Failed to send user email: ${errorText}`, { status: 500 });
    } else {
      console.log("User confirmation email sent successfully.");
    }

    return new Response("Emails sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing waitlist notification:", error.message);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});