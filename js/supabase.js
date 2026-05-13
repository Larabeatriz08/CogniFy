const supabaseUrl =
"https://axrskrykyuphhklbncpv.supabase.co";

const supabaseKey =
"sb_publishable_hw-flKn005hcs_zyamp5yQ_yeEeAq3f";



const supabaseClient =
supabase.createClient(

  supabaseUrl,

  supabaseKey,

  {

    auth:{

      persistSession:true

    }

  }

);


window.supabaseClient =
supabaseClient;