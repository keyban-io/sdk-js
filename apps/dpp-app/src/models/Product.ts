// Definition of interfaces for clearer typing
interface Trait {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

interface RawProduct {
  name: string;
  description: string;
  image: string;
  attributes: Trait[];
  events: Trait[];
  external_url: string;
  creator: string;
  blockchain: string;
  id: string;
  // ...other potential properties...
}

// Format a timestamp (in seconds) into a human-readable date
const formatDate = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
};

// Function to map events while converting timestamps to human-readable dates when applicable
function mapEvents(events: Trait[]): Record<string, string | number> {
  // Sort in descending order if 'value' can be converted to a number
  const sortedEvents = [...events].sort((a, b) => {
    const numA = Number(a.value);
    const numB = Number(b.value);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numB - numA;
    }
    return 0;
  });
  // Reduce to a map: in case of duplicate trait_types, the last encountered overwrites the previous one
  return sortedEvents.reduce((acc, event) => {
    // Check if the event should be displayed as a date
    if (event.display_type === "date" && typeof event.value === "number") {
      acc[event.trait_type] = formatDate(event.value);
    } else {
      acc[event.trait_type] = event.value;
    }
    return acc;
  }, {} as Record<string, string | number>);
}

// Function to map attributes into a key/value map
function mapAttributes(attributes: Trait[]): Record<string, string | number> {
  return attributes.reduce((acc, attr) => {
    if (attr.display_type === "date" && typeof attr.value === "number") {
      acc[attr.trait_type] = formatDate(attr.value);
    } else {
      acc[attr.trait_type] = attr.value;
    }
    return acc;
  }, {} as Record<string, string | number>);
}

// Helper function to get the most recent event from an array of events
function getLatestEvent(events: Trait[]): { trait_type: string; value: string } | null {
  // Filter events with a date display type and a numeric value
  const dateEvents = events.filter(e => e.display_type === "date");
  if (dateEvents.length === 0) return null;
  // Find the event with the maximum timestamp value
  const latest = dateEvents.reduce((prev, curr) => Number(curr.value) > Number(prev.value) ? curr : prev, dateEvents[0]);
  return {
    trait_type: latest.trait_type,
    value: formatDate(Number(latest.value))
  };
}

export default class Product {
  // Direct properties from the JSON
  name: string;
  description: string;
  image: string;
  attributes: Trait[];
  events: Trait[];
  external_url: string;
  creator: string;
  blockchain: string;
  id: string;
  // Mapped properties for easier data access
  attributesMap: Record<string, string | number>;
  eventsMap: Record<string, string | number>;
  // New property for the most recent event
  latestEvent: { trait_type: string; value: string } | null;

  constructor(data: RawProduct) {
    // Minimal verification of required fields
    if (!data.name || !data.description || !data.image) {
      throw new Error("The fields 'name', 'description', and 'image' are required.");
    }

    // Explicit assignment of properties to control data transformation
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.attributes = data.attributes;
    this.events = data.events;
    this.external_url = data.external_url;
    this.creator = data.creator;
    this.blockchain = data.blockchain;
    this.id = data.id;

    // Mapping attributes and events with formatted dates for events
    this.attributesMap = mapAttributes(data.attributes);
    this.eventsMap = mapEvents(data.events);

    // Compute the most recent event from the events array
    this.latestEvent = getLatestEvent(data.events);
  }
}
