"use server";
import { createClient } from "@/utils/server"; 

export async function emailSignUp({ firstName, lastName, email, password }) {
  const supabase =await  createClient();
 
  try {
   
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
      },
    });
      const userName = `${firstName} ${lastName}`;
    if (error) {
      throw new Error(error.message);
    }
        const userId = data.user.id;
        const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId, 
       userName,
        email,
        role:"patient",
      },
    ]);
   if(insertError)
   {
    throw new Error(insertError.message);
   }
    return { data, error: null }; 
  } catch (err) {
    console.error("Signup Error:", err.message);
    return { data: null, error: err }; 
  }
}

export async function emailLogIn({email,password})
{
  const supabase = await createClient();
    
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
   if (error) {
      throw new Error(error.message);
    }
    return {error:null};
  }catch(err)
  {
    return { data: null, error: err }; 
  }
}
export async function LogOut()
{
  const supabase=await createClient();
  try{
let { error } = await supabase.auth.signOut();
if(error)
{
  throw new Error(error.message)
}
return {error:null};
  }
  catch(err)
  {
    return {error:err};
  }

}