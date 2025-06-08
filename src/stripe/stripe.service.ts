import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private stripeClient: Stripe) {}

  async createPaymentIntent(amount: number): Promise<string> {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    return paymentIntent.client_secret;
  }
}
