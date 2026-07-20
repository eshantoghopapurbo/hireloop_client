// import { stripe } from '@/lib/stripe'
// import { redirect } from 'next/navigation'


// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams

//   if (!session_id)
//     throw new Error('Please provide a valid session_id (`cs_test_...`)')

//   const {
//     status,
//     customer_details: { email: customerEmail }
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   })

//   if (status === 'open') {
//     return redirect('/')
//   }

//   if (status === 'complete') {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{' '}
//           {customerEmail}. If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }
// }



import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Card,  Button } from "@heroui/react";
import Link from 'next/link';
import { createSubscription } from '@/lib/action/subscripstion';

export default async function Success({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { session_id } = resolvedSearchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  const session  = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });
  
  const metadata = session.metadata;
  const customerEmail = session.customer_details?.email;

  if (session.payment_status === 'paid') {
    const subsInfo ={
      email:customerEmail,
      planId :metadata?.planId,
    }
    // updata user table about the new plan 
     const result = await createSubscription (subsInfo)
     console.log("subsCription", result);
  }


  return (
    // bg-black নিশ্চিত করা হয়েছে
    <div className="flex h-screen w-full items-center justify-center p-4">
      {/* কার্ডের ব্যাকগ্রাউন্ডও ডার্ক রাখা হয়েছে, কিন্তু বর্ডার দেওয়া হয়েছে যাতে কার্ডটি আলাদা বোঝা যায় */}
      <Card className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="flex flex-col items-center text-center gap-6">
          
          {/* আইকন কালার সাদা/সবুজ */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
             </svg>
          </div>

          {/* টেক্সটগুলো একদম সাদা (white) রাখা হয়েছে */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
            <p className="text-zinc-400">
              Your purchase is confirmed. A receipt has been sent to <br/>
              <span className="text-white font-semibold">{customerEmail}</span>
            </p>
          </div>

          <div className="w-full mt-4">
            <Link

              href="/dashboard" 
              className="bg-white text-black font-bold px-5"
              size="lg"
            >
              Go to Dashboard
            </Link>
          </div>
          
          <p className="text-xs text-zinc-500 mt-2">
            Having trouble? <a href="mailto:support@example.com" className="text-zinc-300 underline">Contact Support</a>
          </p>
        </div>
      </Card>
    </div>
  );
}