what does these code do?
```typescript
    type StripeProviderProps =
        | { apiKey: string; stripe?: never } & StripeProviderOptions
        | { apiKey?: never; stripe: stripe.Stripe | null } & StripeProviderOptions;
```