// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
    apiVersion: '2025-05-28.basil',
  });

  async createPaymentIntent(amount: number, currency = 'eur') {
    return this.stripe.paymentIntents.create({ amount, currency });
  }
}
