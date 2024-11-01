import type { Subscription, SubscriptionResponse } from "~/types/subscription"

export const subscriptionMapper = (response: SubscriptionResponse): Subscription => {
  return {
    created: new Date(response.created),
    updated: new Date(response.updated),
    token: response.token,
    user: response.user
  }
}