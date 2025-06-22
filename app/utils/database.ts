import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://oamrizfncinlaznpbgtq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hbXJpemZuY2lubGF6bnBiZ3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1OTEzMDYsImV4cCI6MjA2NjE2NzMwNn0._G-pSmrn9lwKBrq0ScBFVzEBPON4f676mU1PzULnNUo"
);

export default supabase;
