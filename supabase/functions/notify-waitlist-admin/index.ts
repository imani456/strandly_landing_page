import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.0";

// You'll need to set these as Supabase secrets:
// SUPABASE_SERVICE_ROLE_KEY
// SENDGRID_API_KEY (or similar for your email provider)
// ADMIN_EMAIL_RECIPIENTS (e.g., "admin1@example.com,admin2@example.com")
// SENDER_EMAIL (e.g., "info@yourdomain.com" - must be a verified sender in SendGrid)
// MAILCHIMP_API_KEY (e.g., "YOUR_KEY-us1")
// MAILCHIMP_AUDIENCE_ID (the ID of your Mailchimp audience/list)

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
    const senderEmail = Deno.env.get("SENDER_EMAIL");
    const adminEmailRecipients = Deno.env.get("ADMIN_EMAIL_RECIPIENTS");

    // --- Mailchimp Integration ---
    const mailchimpApiKey = Deno.env.get("MAILCHIMP_API_KEY");
    const mailchimpAudienceId = Deno.env.get("MAILCHIMP_AUDIENCE_ID");

    if (mailchimpApiKey && mailchimpAudienceId) {
      const [apiKey, serverPrefix] = mailchimpApiKey.split('-');
      const mailchimpUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`;

      try {
        const mailchimpResponse = await fetch(mailchimpUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`anystring:${apiKey}`)}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed', // or 'pending' if you want double opt-in
            merge_fields: {
              FNAME: first_name,
              LNAME: last_name,
              USERTYPE: user_type, // Assuming you have a merge field named USERTYPE in Mailchimp
            },
          }),
        });

        if (!mailchimpResponse.ok) {
          const errorText = await mailchimpResponse.text();
          console.error("Failed to add member to Mailchimp:", errorText);
        } else {
          console.log("Member added to Mailchimp successfully.");
        }
      } catch (mailchimpError) {
        console.error("Error adding member to Mailchimp:", mailchimpError.message);
      }
    } else {
      console.warn("Mailchimp API key or Audience ID not set. Skipping Mailchimp integration.");
    }

    // --- Send email to Admin --- 
    if (sendGridApiKey && senderEmail && adminEmailRecipients) {
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
      } else {
        console.log("Admin waitlist notification email sent successfully.");
      }
    } else {
      console.warn("SendGrid API key, sender email, or admin recipients not set. Skipping admin email.");
    }

    // --- Send confirmation email to User --- 
    if (sendGridApiKey && senderEmail) {
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
    } else {
      console.warn("SendGrid API key or sender email not set. Skipping user confirmation email.");
    }

    return new Response("Waitlist processing complete", { status: 200 });
  } catch (error) {
    console.error("Error processing waitlist notification:", error.message);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});