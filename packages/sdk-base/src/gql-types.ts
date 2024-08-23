export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** A single film. */
export type GqlFilm = GqlNode & {
  __typename?: 'Film';
  characterConnection?: Maybe<GqlFilmCharactersConnection>;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: Maybe<Scalars['String']['output']>;
  /** The name of the director of this film. */
  director?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: Maybe<Scalars['String']['output']>;
  /** The episode number of this film. */
  episodeID?: Maybe<Scalars['Int']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** The opening paragraphs at the beginning of this film. */
  openingCrawl?: Maybe<Scalars['String']['output']>;
  planetConnection?: Maybe<GqlFilmPlanetsConnection>;
  /** The name(s) of the producer(s) of this film. */
  producers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The ISO 8601 date format of film release at original creator country. */
  releaseDate?: Maybe<Scalars['String']['output']>;
  speciesConnection?: Maybe<GqlFilmSpeciesConnection>;
  starshipConnection?: Maybe<GqlFilmStarshipsConnection>;
  /** The title of this film. */
  title?: Maybe<Scalars['String']['output']>;
  vehicleConnection?: Maybe<GqlFilmVehiclesConnection>;
};


/** A single film. */
export type GqlFilmcharacterConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A single film. */
export type GqlFilmplanetConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A single film. */
export type GqlFilmspeciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A single film. */
export type GqlFilmstarshipConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A single film. */
export type GqlFilmvehicleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type GqlFilmCharactersConnection = {
  __typename?: 'FilmCharactersConnection';
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  characters?: Maybe<Array<Maybe<GqlPerson>>>;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlFilmCharactersEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlFilmCharactersEdge = {
  __typename?: 'FilmCharactersEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPerson>;
};

/** A connection to a list of items. */
export type GqlFilmPlanetsConnection = {
  __typename?: 'FilmPlanetsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlFilmPlanetsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  planets?: Maybe<Array<Maybe<GqlPlanet>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlFilmPlanetsEdge = {
  __typename?: 'FilmPlanetsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPlanet>;
};

/** A connection to a list of items. */
export type GqlFilmSpeciesConnection = {
  __typename?: 'FilmSpeciesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlFilmSpeciesEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  species?: Maybe<Array<Maybe<GqlSpecies>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlFilmSpeciesEdge = {
  __typename?: 'FilmSpeciesEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlSpecies>;
};

/** A connection to a list of items. */
export type GqlFilmStarshipsConnection = {
  __typename?: 'FilmStarshipsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlFilmStarshipsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  starships?: Maybe<Array<Maybe<GqlStarship>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlFilmStarshipsEdge = {
  __typename?: 'FilmStarshipsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlStarship>;
};

/** A connection to a list of items. */
export type GqlFilmVehiclesConnection = {
  __typename?: 'FilmVehiclesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlFilmVehiclesEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  vehicles?: Maybe<Array<Maybe<GqlVehicle>>>;
};

/** An edge in a connection. */
export type GqlFilmVehiclesEdge = {
  __typename?: 'FilmVehiclesEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlVehicle>;
};

/** A connection to a list of items. */
export type GqlFilmsConnection = {
  __typename?: 'FilmsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlFilmsEdge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  films?: Maybe<Array<Maybe<GqlFilm>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlFilmsEdge = {
  __typename?: 'FilmsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlFilm>;
};

/** An object with an ID */
export type GqlNode = {
  /** The id of the object. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type GqlPageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of items. */
export type GqlPeopleConnection = {
  __typename?: 'PeopleConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPeopleEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  people?: Maybe<Array<Maybe<GqlPerson>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlPeopleEdge = {
  __typename?: 'PeopleEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPerson>;
};

/** An individual person or character within the Star Wars universe. */
export type GqlPerson = GqlNode & {
  __typename?: 'Person';
  /**
   * The birth year of the person, using the in-universe standard of BBY or ABY -
   * Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is
   * a battle that occurs at the end of Star Wars episode IV: A New Hope.
   */
  birthYear?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: Maybe<Scalars['String']['output']>;
  /**
   * The eye color of this person. Will be "unknown" if not known or "n/a" if the
   * person does not have an eye.
   */
  eyeColor?: Maybe<Scalars['String']['output']>;
  filmConnection?: Maybe<GqlPersonFilmsConnection>;
  /**
   * The gender of this person. Either "Male", "Female" or "unknown",
   * "n/a" if the person does not have a gender.
   */
  gender?: Maybe<Scalars['String']['output']>;
  /**
   * The hair color of this person. Will be "unknown" if not known or "n/a" if the
   * person does not have hair.
   */
  hairColor?: Maybe<Scalars['String']['output']>;
  /** The height of the person in centimeters. */
  height?: Maybe<Scalars['Int']['output']>;
  /** A planet that this person was born on or inhabits. */
  homeworld?: Maybe<GqlPlanet>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** The mass of the person in kilograms. */
  mass?: Maybe<Scalars['Float']['output']>;
  /** The name of this person. */
  name?: Maybe<Scalars['String']['output']>;
  /** The skin color of this person. */
  skinColor?: Maybe<Scalars['String']['output']>;
  /** The species that this person belongs to, or null if unknown. */
  species?: Maybe<GqlSpecies>;
  starshipConnection?: Maybe<GqlPersonStarshipsConnection>;
  vehicleConnection?: Maybe<GqlPersonVehiclesConnection>;
};


/** An individual person or character within the Star Wars universe. */
export type GqlPersonfilmConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** An individual person or character within the Star Wars universe. */
export type GqlPersonstarshipConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** An individual person or character within the Star Wars universe. */
export type GqlPersonvehicleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type GqlPersonFilmsConnection = {
  __typename?: 'PersonFilmsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPersonFilmsEdge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  films?: Maybe<Array<Maybe<GqlFilm>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlPersonFilmsEdge = {
  __typename?: 'PersonFilmsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlFilm>;
};

/** A connection to a list of items. */
export type GqlPersonStarshipsConnection = {
  __typename?: 'PersonStarshipsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPersonStarshipsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  starships?: Maybe<Array<Maybe<GqlStarship>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlPersonStarshipsEdge = {
  __typename?: 'PersonStarshipsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlStarship>;
};

/** A connection to a list of items. */
export type GqlPersonVehiclesConnection = {
  __typename?: 'PersonVehiclesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPersonVehiclesEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  vehicles?: Maybe<Array<Maybe<GqlVehicle>>>;
};

/** An edge in a connection. */
export type GqlPersonVehiclesEdge = {
  __typename?: 'PersonVehiclesEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlVehicle>;
};

/**
 * A large mass, planet or planetoid in the Star Wars Universe, at the time of
 * 0 ABY.
 */
export type GqlPlanet = GqlNode & {
  __typename?: 'Planet';
  /** The climates of this planet. */
  climates?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: Maybe<Scalars['String']['output']>;
  /** The diameter of this planet in kilometers. */
  diameter?: Maybe<Scalars['Int']['output']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: Maybe<Scalars['String']['output']>;
  filmConnection?: Maybe<GqlPlanetFilmsConnection>;
  /**
   * A number denoting the gravity of this planet, where "1" is normal or 1 standard
   * G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
   */
  gravity?: Maybe<Scalars['String']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** The name of this planet. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The number of standard days it takes for this planet to complete a single orbit
   * of its local star.
   */
  orbitalPeriod?: Maybe<Scalars['Int']['output']>;
  /** The average population of sentient beings inhabiting this planet. */
  population?: Maybe<Scalars['Float']['output']>;
  residentConnection?: Maybe<GqlPlanetResidentsConnection>;
  /**
   * The number of standard hours it takes for this planet to complete a single
   * rotation on its axis.
   */
  rotationPeriod?: Maybe<Scalars['Int']['output']>;
  /**
   * The percentage of the planet surface that is naturally occurring water or bodies
   * of water.
   */
  surfaceWater?: Maybe<Scalars['Float']['output']>;
  /** The terrains of this planet. */
  terrains?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/**
 * A large mass, planet or planetoid in the Star Wars Universe, at the time of
 * 0 ABY.
 */
export type GqlPlanetfilmConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * A large mass, planet or planetoid in the Star Wars Universe, at the time of
 * 0 ABY.
 */
export type GqlPlanetresidentConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type GqlPlanetFilmsConnection = {
  __typename?: 'PlanetFilmsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPlanetFilmsEdge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  films?: Maybe<Array<Maybe<GqlFilm>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlPlanetFilmsEdge = {
  __typename?: 'PlanetFilmsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlFilm>;
};

/** A connection to a list of items. */
export type GqlPlanetResidentsConnection = {
  __typename?: 'PlanetResidentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPlanetResidentsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  residents?: Maybe<Array<Maybe<GqlPerson>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlPlanetResidentsEdge = {
  __typename?: 'PlanetResidentsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPerson>;
};

/** A connection to a list of items. */
export type GqlPlanetsConnection = {
  __typename?: 'PlanetsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlPlanetsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  planets?: Maybe<Array<Maybe<GqlPlanet>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlPlanetsEdge = {
  __typename?: 'PlanetsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPlanet>;
};

export type GqlRoot = {
  __typename?: 'Root';
  allFilms?: Maybe<GqlFilmsConnection>;
  allPeople?: Maybe<GqlPeopleConnection>;
  allPlanets?: Maybe<GqlPlanetsConnection>;
  allSpecies?: Maybe<GqlSpeciesConnection>;
  allStarships?: Maybe<GqlStarshipsConnection>;
  allVehicles?: Maybe<GqlVehiclesConnection>;
  film?: Maybe<GqlFilm>;
  /** Fetches an object given its ID */
  node?: Maybe<GqlNode>;
  person?: Maybe<GqlPerson>;
  planet?: Maybe<GqlPlanet>;
  species?: Maybe<GqlSpecies>;
  starship?: Maybe<GqlStarship>;
  vehicle?: Maybe<GqlVehicle>;
};


export type GqlRootallFilmsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GqlRootallPeopleArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GqlRootallPlanetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GqlRootallSpeciesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GqlRootallStarshipsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GqlRootallVehiclesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type GqlRootfilmArgs = {
  filmID?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GqlRootnodeArgs = {
  id: Scalars['ID']['input'];
};


export type GqlRootpersonArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  personID?: InputMaybe<Scalars['ID']['input']>;
};


export type GqlRootplanetArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  planetID?: InputMaybe<Scalars['ID']['input']>;
};


export type GqlRootspeciesArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  speciesID?: InputMaybe<Scalars['ID']['input']>;
};


export type GqlRootstarshipArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  starshipID?: InputMaybe<Scalars['ID']['input']>;
};


export type GqlRootvehicleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  vehicleID?: InputMaybe<Scalars['ID']['input']>;
};

/** A type of person or character within the Star Wars Universe. */
export type GqlSpecies = GqlNode & {
  __typename?: 'Species';
  /** The average height of this species in centimeters. */
  averageHeight?: Maybe<Scalars['Float']['output']>;
  /** The average lifespan of this species in years, null if unknown. */
  averageLifespan?: Maybe<Scalars['Int']['output']>;
  /** The classification of this species, such as "mammal" or "reptile". */
  classification?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: Maybe<Scalars['String']['output']>;
  /** The designation of this species, such as "sentient". */
  designation?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: Maybe<Scalars['String']['output']>;
  /**
   * Common eye colors for this species, null if this species does not typically
   * have eyes.
   */
  eyeColors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  filmConnection?: Maybe<GqlSpeciesFilmsConnection>;
  /**
   * Common hair colors for this species, null if this species does not typically
   * have hair.
   */
  hairColors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** A planet that this species originates from. */
  homeworld?: Maybe<GqlPlanet>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** The language commonly spoken by this species. */
  language?: Maybe<Scalars['String']['output']>;
  /** The name of this species. */
  name?: Maybe<Scalars['String']['output']>;
  personConnection?: Maybe<GqlSpeciesPeopleConnection>;
  /**
   * Common skin colors for this species, null if this species does not typically
   * have skin.
   */
  skinColors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** A type of person or character within the Star Wars Universe. */
export type GqlSpeciesfilmConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A type of person or character within the Star Wars Universe. */
export type GqlSpeciespersonConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type GqlSpeciesConnection = {
  __typename?: 'SpeciesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlSpeciesEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  species?: Maybe<Array<Maybe<GqlSpecies>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlSpeciesEdge = {
  __typename?: 'SpeciesEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlSpecies>;
};

/** A connection to a list of items. */
export type GqlSpeciesFilmsConnection = {
  __typename?: 'SpeciesFilmsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlSpeciesFilmsEdge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  films?: Maybe<Array<Maybe<GqlFilm>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlSpeciesFilmsEdge = {
  __typename?: 'SpeciesFilmsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlFilm>;
};

/** A connection to a list of items. */
export type GqlSpeciesPeopleConnection = {
  __typename?: 'SpeciesPeopleConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlSpeciesPeopleEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  people?: Maybe<Array<Maybe<GqlPerson>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlSpeciesPeopleEdge = {
  __typename?: 'SpeciesPeopleEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPerson>;
};

/** A single transport craft that has hyperdrive capability. */
export type GqlStarship = GqlNode & {
  __typename?: 'Starship';
  /**
   * The Maximum number of Megalights this starship can travel in a standard hour.
   * A "Megalight" is a standard unit of distance and has never been defined before
   * within the Star Wars universe. This figure is only really useful for measuring
   * the difference in speed of starships. We can assume it is similar to AU, the
   * distance between our Sun (Sol) and Earth.
   */
  MGLT?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of kilograms that this starship can transport. */
  cargoCapacity?: Maybe<Scalars['Float']['output']>;
  /**
   * The maximum length of time that this starship can provide consumables for its
   * entire crew without having to resupply.
   */
  consumables?: Maybe<Scalars['String']['output']>;
  /** The cost of this starship new, in galactic credits. */
  costInCredits?: Maybe<Scalars['Float']['output']>;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: Maybe<Scalars['String']['output']>;
  /** The number of personnel needed to run or pilot this starship. */
  crew?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: Maybe<Scalars['String']['output']>;
  filmConnection?: Maybe<GqlStarshipFilmsConnection>;
  /** The class of this starships hyperdrive. */
  hyperdriveRating?: Maybe<Scalars['Float']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** The length of this starship in meters. */
  length?: Maybe<Scalars['Float']['output']>;
  /** The manufacturers of this starship. */
  manufacturers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   * The maximum speed of this starship in atmosphere. null if this starship is
   * incapable of atmosphering flight.
   */
  maxAtmospheringSpeed?: Maybe<Scalars['Int']['output']>;
  /**
   * The model or official name of this starship. Such as "T-65 X-wing" or "DS-1
   * Orbital Battle Station".
   */
  model?: Maybe<Scalars['String']['output']>;
  /** The name of this starship. The common name, such as "Death Star". */
  name?: Maybe<Scalars['String']['output']>;
  /** The number of non-essential people this starship can transport. */
  passengers?: Maybe<Scalars['String']['output']>;
  pilotConnection?: Maybe<GqlStarshipPilotsConnection>;
  /**
   * The class of this starship, such as "Starfighter" or "Deep Space Mobile
   * Battlestation"
   */
  starshipClass?: Maybe<Scalars['String']['output']>;
};


/** A single transport craft that has hyperdrive capability. */
export type GqlStarshipfilmConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A single transport craft that has hyperdrive capability. */
export type GqlStarshippilotConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type GqlStarshipFilmsConnection = {
  __typename?: 'StarshipFilmsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlStarshipFilmsEdge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  films?: Maybe<Array<Maybe<GqlFilm>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlStarshipFilmsEdge = {
  __typename?: 'StarshipFilmsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlFilm>;
};

/** A connection to a list of items. */
export type GqlStarshipPilotsConnection = {
  __typename?: 'StarshipPilotsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlStarshipPilotsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  pilots?: Maybe<Array<Maybe<GqlPerson>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlStarshipPilotsEdge = {
  __typename?: 'StarshipPilotsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPerson>;
};

/** A connection to a list of items. */
export type GqlStarshipsConnection = {
  __typename?: 'StarshipsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlStarshipsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  starships?: Maybe<Array<Maybe<GqlStarship>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlStarshipsEdge = {
  __typename?: 'StarshipsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlStarship>;
};

/** A single transport craft that does not have hyperdrive capability */
export type GqlVehicle = GqlNode & {
  __typename?: 'Vehicle';
  /** The maximum number of kilograms that this vehicle can transport. */
  cargoCapacity?: Maybe<Scalars['Float']['output']>;
  /**
   * The maximum length of time that this vehicle can provide consumables for its
   * entire crew without having to resupply.
   */
  consumables?: Maybe<Scalars['String']['output']>;
  /** The cost of this vehicle new, in Galactic Credits. */
  costInCredits?: Maybe<Scalars['Float']['output']>;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: Maybe<Scalars['String']['output']>;
  /** The number of personnel needed to run or pilot this vehicle. */
  crew?: Maybe<Scalars['String']['output']>;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: Maybe<Scalars['String']['output']>;
  filmConnection?: Maybe<GqlVehicleFilmsConnection>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** The length of this vehicle in meters. */
  length?: Maybe<Scalars['Float']['output']>;
  /** The manufacturers of this vehicle. */
  manufacturers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The maximum speed of this vehicle in atmosphere. */
  maxAtmospheringSpeed?: Maybe<Scalars['Int']['output']>;
  /**
   * The model or official name of this vehicle. Such as "All-Terrain Attack
   * Transport".
   */
  model?: Maybe<Scalars['String']['output']>;
  /**
   * The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder
   * bike".
   */
  name?: Maybe<Scalars['String']['output']>;
  /** The number of non-essential people this vehicle can transport. */
  passengers?: Maybe<Scalars['String']['output']>;
  pilotConnection?: Maybe<GqlVehiclePilotsConnection>;
  /** The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
  vehicleClass?: Maybe<Scalars['String']['output']>;
};


/** A single transport craft that does not have hyperdrive capability */
export type GqlVehiclefilmConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A single transport craft that does not have hyperdrive capability */
export type GqlVehiclepilotConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type GqlVehicleFilmsConnection = {
  __typename?: 'VehicleFilmsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlVehicleFilmsEdge>>>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  films?: Maybe<Array<Maybe<GqlFilm>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlVehicleFilmsEdge = {
  __typename?: 'VehicleFilmsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlFilm>;
};

/** A connection to a list of items. */
export type GqlVehiclePilotsConnection = {
  __typename?: 'VehiclePilotsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlVehiclePilotsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  pilots?: Maybe<Array<Maybe<GqlPerson>>>;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GqlVehiclePilotsEdge = {
  __typename?: 'VehiclePilotsEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlPerson>;
};

/** A connection to a list of items. */
export type GqlVehiclesConnection = {
  __typename?: 'VehiclesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GqlVehiclesEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /**
   * A count of the total number of objects in this connection, ignoring pagination.
   * This allows a client to fetch the first five objects by passing "5" as the
   * argument to "first", then fetch the total count so it could display "5 of 83",
   * for example.
   */
  totalCount?: Maybe<Scalars['Int']['output']>;
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  vehicles?: Maybe<Array<Maybe<GqlVehicle>>>;
};

/** An edge in a connection. */
export type GqlVehiclesEdge = {
  __typename?: 'VehiclesEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<GqlVehicle>;
};
