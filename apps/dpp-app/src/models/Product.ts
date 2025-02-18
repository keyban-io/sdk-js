/**
 * Represents a trait for a product, such as an attribute or event.
 *
 * - `trait_type` is the name of the trait.
 * - `value` is the value of the trait.
 * - `display_type` is an optional field indicating how you would like it to be displayed.
 *
 * For string traits, you don't need to worry about `display_type`.
 *
 * Numeric traits:
 * - Three display types for numeric traits are supported:
 *   - "number": appears in the Rankings section.
 *   - "boost_percentage": appears in the lower left.
 *   - "boost_number": similar to boost_percentage but doesn't show a percent sign.
 * - If you pass a number and don't set a `display_type`, the trait will appear in the Rankings section.
 * - Optionally, you can add a `max_value` property (not modeled here) to set an upper limit for the trait's possible values.
 *
 * Date traits:
 * - Set `display_type` to "date" and pass in a Unix timestamp (in seconds) as the value.
 */
interface Trait {
  /** The type of trait (e.g., "Acquisition date"). */
  trait_type: string;
  /** The value of the trait, which can be a string or a number. */
  value: string | number;
  /** Optional display type (e.g., "date", "number", "boost_percentage", "boost_number"). */
  display_type?: string;
}

/**
 * Represents the raw product data received in JSON format.
 */
interface RawProduct {
  /** The product name. */
  name: string;
  /** The product description, which may include markdown. */
  description: string;
  /** URL to the product image. */
  image: string;
  /** Array of product attributes. */
  attributes: Trait[];
  /** Array of product events. */
  events: Trait[];
  /** External URL for the product. */
  external_url: string;
  /** The creator of the product data. */
  creator: string;
  /** The blockchain associated with the product. */
  blockchain: string;
  /** The product identifier. */
  id: string;
  // ...other potential properties...
}

/**
 * Maps an array of events (assumed to be date traits) into a record with timestamp values.
 *
 * The events are sorted in descending order based on their timestamp values.
 *
 * @param events - An array of event traits.
 * @returns A record where each key is a trait_type and the value is the timestamp as a number.
 */
function mapEvents(events: Trait[]): Record<string, number> {
  const sortedEvents = [...events].sort((a, b) => Number(b.value) - Number(a.value));
  return sortedEvents.reduce((acc, event) => {
    acc[event.trait_type] = Number(event.value);
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Maps an array of attributes into a record with key/value pairs.
 *
 * If an attribute has a display type of "date", its value is left as the raw timestamp.
 *
 * @param attributes - An array of attribute traits.
 * @returns A record where each key is a trait_type and the value is either the original value or the timestamp as a number.
 */
function mapAttributes(attributes: Trait[]): Record<string, string | number> {
  return attributes.reduce((acc, attr) => {
    if (attr.display_type === "date" && typeof attr.value === "number") {
      acc[attr.trait_type] = attr.value;
    } else {
      acc[attr.trait_type] = attr.value;
    }
    return acc;
  }, {} as Record<string, string | number>);
}

/**
 * Retrieves the most recent event from an array of events (assumed to be date traits).
 *
 * @param events - An array of event traits.
 * @returns An object containing the trait_type and the timestamp of the most recent event,
 *          or null if no events exist.
 */
function getLatestEvent(events: Trait[]): { trait_type: string; value: number } | null {
  if (events.length === 0) return null;
  const latest = events.reduce((prev, curr) =>
    Number(curr.value) > Number(prev.value) ? curr : prev, events[0]);
  return {
    trait_type: latest.trait_type,
    value: Number(latest.value)
  };
}

/**
 * Represents a product with attributes and events, providing mapped properties for easy data access.
 */
export default class Product {
  /** The product name. */
  name: string;
  /** The product description. */
  description: string;
  /** The URL to the product image. */
  image: string;
  /** Array of raw attribute traits. */
  attributes: Trait[];
  /** Array of raw event traits. */
  events: Trait[];
  /** External URL for the product. */
  external_url: string;
  /** The creator of the product data. */
  creator: string;
  /** The blockchain associated with the product. */
  blockchain: string;
  /** The product identifier. */
  id: string;
  /** A map of attributes for easier data access, where each key is the trait_type. */
  attributesMap: Record<string, string | number>;
  /** A map of events with timestamp values for easier data access. */
  eventsMap: Record<string, number>;
  /** The most recent event, containing its trait_type and timestamp, or null if no events exist. */
  latestEvent: { trait_type: string; value: number } | null;

  /**
   * Constructs a new Product instance.
   *
   * @param data - The raw product data.
   * @throws Will throw an error if the required fields (name, description, image) are missing.
   */
  constructor(data: RawProduct) {
    if (!data.name || !data.description || !data.image) {
      throw new Error("The fields 'name', 'description', and 'image' are required.");
    }
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.attributes = data.attributes;
    this.events = data.events;
    this.external_url = data.external_url;
    this.creator = data.creator;
    this.blockchain = data.blockchain;
    this.id = data.id;
    this.attributesMap = mapAttributes(data.attributes);
    this.eventsMap = mapEvents(data.events);
    this.latestEvent = getLatestEvent(data.events);
  }
}
