export type PagedResponse<T> = {
  _embedded: T
}

export type OrganizationsResponse = {
  organizations: Organization[]
}

export type Organization = {
  id: string
  identifier: number[]
  crbotNumber: string[]
  association: string[]
  additionalType: string
  name: string
  legalName: string
  alternateName: string
  description: string
  email: string
  telephone: string
  faxNumber: string
  address: Address
  logo: string
  image: string
  sponsor: string
  clubColors: string[]
  location: Location
  vatId: string
  status: string
  parents: Organization[]
  createDate: string
  updateDate: string
  config: OrganizationConfig
  emails: OrganizationEmails
}

export type Address = {
  postOfficeBoxNumber: string
  streetAddress: string
  streetAddress2: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export type Location = {
  latitude: number
  longitude: number
}

export type Config = {
  membership: Membership
  crbot: Crbot
  pif: Pif
}

export type Membership = {
  g4mnoOnly: boolean
}

export type Crbot = {
  isPropertyHeldInTrust: boolean
}

export type Pif = {
  optOut: boolean
}

export type Emails = {
  clubChildrensOfficer: ClubChildrensOfficer
  secretary: Secretary
}

export type ClubChildrensOfficer = {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}

export type Secretary = {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}

export type OrganizationConfig = {
  membership: MembershipConfig
  crbot: CrbotConfig
  pif: PifConfig
}

export type MembershipConfig = {
  g4mnoOnly: boolean
}

export type CrbotConfig = {
  isPropertyHeldInTrust: boolean
}

export type PifConfig = {
  optOut: boolean
}

export type OrganizationEmails = {
  clubChildrensOfficer: ClubChildrensOfficerEmails
  secretary: SecretaryEmails
}

export type ClubChildrensOfficerEmails = {
  GAA: string
  LGFA: string
  Camogie: string
}

export type SecretaryEmails = {
  GAA: string
  LGFA: string
  Camogie: string
}

export type PlacesResponse = {
  places: Place[]
}

export interface Place {
  id: string
  identifier: number[]
  primaryOrganization: Organization
  additionalType: string
  name: string
  legalName: string
  alternateName: string
  abbreviatedName: string
  description: string
  grade: string
  isInternalOnly: boolean
  streetAddress: string
  streetAddress2: string
  addressLocality: string
  addressRegion: string
  addressCountry: string
  postalCode: string
  location: Location
  createDate: string
  updateDate: string
}
