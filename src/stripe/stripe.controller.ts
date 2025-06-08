// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async create(@Body() { amount }: { amount: number }) {
    const intent = await this.stripeService.createPaymentIntent(amount);
    return { clientSecret: intent.client_secret };
  }
}
