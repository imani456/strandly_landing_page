import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.0";

// You'll need to set these as Supabase secrets:
// SUPABASE_URL (e.g., https://your-project-ref.supabase.co)
// SUPABASE_SERVICE_ROLE_KEY

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

    // Only store data in Supabase
    const { error } = await supabaseClient
      .from('strandly_waitlist')
      .insert({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone || null,
        user_type: user_type
      });

    if (error) {
      console.error("Failed to insert into waitlist:", error.message);
      return new Response(`Error storing waitlist data: ${error.message}`, { status: 500 });
    } else {
      console.log("Waitlist data stored successfully.");
      return new Response("Waitlist data stored successfully", { status: 200 });
    }
  } catch (error) {
    console.error("Error processing waitlist data:", error.message);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});