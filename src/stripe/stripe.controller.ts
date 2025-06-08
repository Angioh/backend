import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async create(@Body('amount') amount: number) {
    const clientSecret = await this.stripeService.createPaymentIntent(amount);
    return { clientSecret };
  }
}
