import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccvkdunhouafzzsctmib.supabase.co';

const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdmtkdW5ob3VhZnp6c2N0bWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwNDIzMzEsImV4cCI6MjAzMzYxODMzMX0.ak1dRaQHVN3MiquqdnWtn-vdresfD1dnn7Z9vXX7SNA';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
