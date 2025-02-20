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
 * Helper function to safely convert a value to a number.
 * @param value - The value to convert.
 * @returns The number if the conversion is successful, otherwise null.
 */
function safeNumber(value: string | number): number | null {
  const num = typeof value === "number" ? value : Number(value);
  return isNaN(num) ? null : num;
}

/**
 * Maps an array of event objects to a record where each key is a trait type and each value is its numeric representation.
 *
 * This function performs the following steps:
 * 1. Filters out events whose value cannot be converted to a number using the safeNumber function.
 * 2. Sorts the valid events in descending order based on their numeric values.
 * 3. Reduces the sorted events into an object mapping each event's trait_type to its numeric value.
 *
 * @param events - An array of event objects, each expected to have a 'value' and 'trait_type' property.
 * @returns An object whose keys are event trait types and values are the corresponding numeric values.
 */
function mapEvents(events: Trait[]): Record<string, number> {
  const validEvents = events.filter(event => safeNumber(event.value) !== null);
  const sortedEvents = [...validEvents].sort((a, b) => safeNumber(b.value)! - safeNumber(a.value)!);
  return sortedEvents.reduce((acc, event) => {
    acc[event.trait_type] = safeNumber(event.value)!;
    return acc;
  }, {} as Record<string, number>);
}


/**
 * Maps an array of Trait objects to a record with sorted keys.
 *
 * The function sorts the input array of attributes by the "trait_type" property. It then iterates through each attribute and attempts to convert the value to a number when the "display_type"
 * indicates a numeric value (excluding dates). The resulting record uses the trait type as keys and stores objects containing the (possibly converted) value and the optional display type.
 *
 * @param attributes - An array of Trait objects, each containing a "trait_type", a "value", and optionally a "display_type".
 * @returns A record mapping each trait_type to an object with:
 *   - value: a string or number representing the attribute value, possibly converted from the original value,
 *   - display_type: an optional string indicating the type of display.
 */
function mapAttributes(attributes: Trait[]): Record<string, { value: string | number; display_type?: string }> {
  const sortedAttributes = [...attributes].sort((a, b) =>
    a.trait_type.localeCompare(b.trait_type)
  );
  return sortedAttributes.reduce((acc, attr) => {
    let val: string | number = attr.value;
    if (
      attr.display_type &&
      attr.display_type !== "date" &&
      ["number", "boost_percentage", "boost_number"].includes(attr.display_type)
    ) {
      const parsed = safeNumber(attr.value);
      val = parsed !== null ? parsed : attr.value;
    }
    acc[attr.trait_type] = { value: val, display_type: attr.display_type };
    return acc;
  }, {} as Record<string, { value: string | number; display_type?: string }>);
}


/**
 * Retrieves the event with the highest numeric value from an array of events.
 *
 * The function filters out events whose value is not a valid number (as determined by the safeNumber function),
 * then reduces the remaining events to the one with the highest numeric value. If no valid event is found,
 * the function returns null.
 *
 * @param events - An array of events of type Trait.
 * @returns An object containing the trait_type and the numeric value of the latest event, or null if no event
 *          with a valid numeric value exists.
 */
function getLatestEvent(events: Trait[]): { trait_type: string; value: number } | null {
  const validEvents = events.filter(event => safeNumber(event.value) !== null);
  if (validEvents.length === 0) return null;
  const latest = validEvents.reduce((prev, curr) =>
    safeNumber(curr.value)! > safeNumber(prev.value)! ? curr : prev, validEvents[0]);
  return {
    trait_type: latest.trait_type,
    value: safeNumber(latest.value)!
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
  attributesMap: Record<string, { value: string | number; display_type?: string }>;
  /** A map of events with timestamp values for easier data access. */
  eventsMap: Record<string, number>;
  /** The most recent event, containing its trait_type and timestamp, or null if no events exist. */
  latestEvent: { trait_type: string; value: number } | null;
  /** New documents property to store document traits. */
  documents: Array<{ title: string; url: string }>;
  /**
   * A list of offers for this product.
   */
  offers: never[];

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
    // Initialize documents with the external_url as the first trait.
    this.documents = [{ title: "External URL", url: data.external_url }];
    this.offers = [];
  }
}
