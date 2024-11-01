import type { Subscription, SubscriptionResponse } from "~/types/subscription";

export const useFindMySubscription = async ({
  endpoint,
}: {
  endpoint?: string
}): Promise<Subscription | undefined> => {
  try {
    const { $pb } = useNuxtApp();

    const response = await $pb.collection<SubscriptionResponse>('subscriptions').getFirstListItem(`/subscriptions`,
      {
        filter: `token.endpoint="${encodeURI(endpoint ?? '')}"`,
      }
    );

    return subscriptionMapper(response);
  } catch (error) {
    console.log('error', error);
    return undefined;
  }
}

export const useSaveSubscription = async (token: string): Promise<Subscription | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const userStore = useUserStore()

    const response = await $pb.collection<SubscriptionResponse>('subscriptions').create({
      token: token,
      user: userStore.user?.id,
    });

    return subscriptionMapper(response);
  } catch (error) {
    return undefined;
  }
}