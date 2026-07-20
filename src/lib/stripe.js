import 'server-only'
import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID ={
  "seeker_pro" : "price_1TuVr5CgkcqmYQX3xbPLGI3d",
   "seeker_premium":"price_1TuaQkCgkcqmYQX3hFICrAW2",
   'recruiter_growth':"price_1TuaS2CgkcqmYQX3yLLIqVUu",
   'recruiter_enterprise':"price_1TuaTMCgkcqmYQX3NHNNjRSV",
}