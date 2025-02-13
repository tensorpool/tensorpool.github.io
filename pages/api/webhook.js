import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia', // Use the latest API version
});

// Initialize Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );
  
  export const config = {
    api: {
      bodyParser: false, // Stripe requires raw request body
    },
  };
  
  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_email;
      const amountPaid = session.amount_total / 100; // Convert cents to dollars
  
      console.log(`Received payment from ${customerEmail} of $${amountPaid}`);
      // Fetch the current balance
      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('deposited_balance, total_deposited_balance')
        .eq('email', customerEmail)
        .single();
  
      if (fetchError) {
        console.error('Error fetching user balance:', fetchError);
        return res.status(500).json({ error: 'Failed to fetch user balance' });
      }
  
      const currentDepositedBalance = userData.deposited_balance || 0;
      const currentTotalDepositedBalance = userData.total_deposited_balance || 0;
  
      // Update user's balance manually
      const { error: updateError } = await supabase
        .from('users')
        .update({
          deposited_balance: currentDepositedBalance + amountPaid,
          total_deposited_balance: currentTotalDepositedBalance + amountPaid,
        })
        .eq('email', customerEmail);
  
      if (updateError) {
        console.error('Supabase Update Error:', updateError);
        return res.status(500).send('Supabase Error');
      }
  
      console.log(`Updated balance for ${customerEmail}: +$${amountPaid}`);
    }
  
    res.json({ received: true });
  }

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// import { buffer } from 'micro';
// import Stripe from 'stripe';
// import { createClient } from '@supabase/supabase-js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2024-12-18.acacia', // Use the latest API version
// });

// // Initialize Supabase
// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_KEY
// );

// export const config = {
//   api: {
//     bodyParser: false, // Stripe requires raw request body
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).send('Method Not Allowed');
//   }

//   const buf = await buffer(req);
//   const sig = req.headers['stripe-signature'];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   res.status(200).json({ received: true });

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const customerEmail = session.customer_email;
//     const amountPaid = session.amount_total / 100; // Convert cents to dollars
//     const sessionId = session.id; // Unique session ID for the payment

//     console.log(`Received payment from ${customerEmail} of $${amountPaid}`);

//     // Check if this payment session was already processed
//     const { data: existingPayment, error: checkError } = await supabase
//       .from('payment_logs')
//       .select('id')
//       .eq('session_id', sessionId)
//       .single();

//     if (existingPayment) {
//       console.log('Payment already processed, skipping...');
//       return res.status(200).send('Already processed');
//     }

//     if (checkError && checkError.code !== 'PGRST116') { 
//       console.error('Error checking payment logs:', checkError);
//       return res.status(500).json({ error: 'Failed to check payment logs' });
//     }

//     // Fetch the current balance
//     const { data: userData, error: fetchError } = await supabase
//       .from('users')
//       .select('deposited_balance, total_deposited_balance')
//       .eq('email', customerEmail)
//       .single();

//     if (fetchError) {
//       console.error('Error fetching user balance:', fetchError);
//       return res.status(500).json({ error: 'Failed to fetch user balance' });
//     }

//     const currentDepositedBalance = userData.deposited_balance || 0;
//     const currentTotalDepositedBalance = userData.total_deposited_balance || 0;

//     // Update user's balance manually
//     const { error: updateError } = await supabase
//       .from('users')
//       .update({
//         deposited_balance: currentDepositedBalance + amountPaid,
//         total_deposited_balance: currentTotalDepositedBalance + amountPaid,
//       })
//       .eq('email', customerEmail);

//     if (updateError) {
//       console.error('Supabase Update Error:', updateError);
//       return res.status(500).send('Supabase Error');
//     }

//     // Log the processed payment to avoid future duplication
//     const { error: logError } = await supabase
//       .from('payment_logs')
//       .insert([{ session_id: sessionId, email: customerEmail, amount: amountPaid }]);

//     if (logError) {
//       console.error('Error logging payment:', logError);
//       return res.status(500).send('Payment Log Error');
//     }

//     console.log(`Updated balance for ${customerEmail}: +$${amountPaid}`);
//   }

//   res.json({ received: true });
// }

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

