export function mapEvents(
  events: Array<{ trait_type: string; value: any; display_type?: string }>
): Record<string, any> {
  const sortedEvents = [...events].sort((a, b) => Number(b.value) - Number(a.value));
  return sortedEvents.reduce((acc, event) => {
    acc[event.trait_type] = event.value;
    return acc;
  }, {} as Record<string, any>);
}
