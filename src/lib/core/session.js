// import { headers } from "next/headers"
// import { auth } from "../auth"
// import { redirect } from "next/navigation";

// export const  getUserSession = async () => {
//     const session = await auth.api.getSession({
//         headers:await headers()
//     })
//     return session?.user || null;
// }

// export const requireRole = async () =>{
//    const user = await getUserSession ();
//    if(! user ){
//     redirect("/auth/signin")
//    }
//    if( !user || user.role !== "seeker"){
//      return redirect('/unauthorized')
//    }
//    return user;
// }


import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user || null;
}

export const requireRole = async (requiredRole = "seeker") => {
   const user = await getUserSession();
   
   if (!user) {
     redirect("/auth/signin");
   }

   // সেশনে রোল না থাকলে ডিফল্ট seeker ধরবে, তবে ফিউচারের জন্য সেফ রাখবে
   const userRole = user.role || "seeker";

   console.log("Current User Role:", userRole, "| Required Role:", requiredRole);

   if (userRole !== requiredRole) {
     return redirect('/unauthorized');
   }

   return user;
}
