import type {StructureResolver} from 'sanity/structure'

/**
 * Studio sidebar structure.
 * Pages: page documents (home, plus future pages) under a "Pages" parent.
 * Sections: standalone section documents under a "Sections" parent.
 * Entities: content-entity documents (listing, category, county, review,
 * pulse, editorialStory) under an "Entities" parent.
 * Remaining document types (blogPost, ...) stay at top level.
 */
const SECTION_TYPES = ['hero', 'trustStrip', 'countyHubs', 'featuredBusinesses', 'editorial', 'socialFeed', 'hubHeader', 'hubDiscovery', 'aboutHeader', 'statStrip', 'origin', 'missionBand', 'visionPillars', 'offerArms', 'partnerships', 'closingCta', 'resourcesIntro', 'regulatoryUpdates', 'featuredPrograms', 'countyJump', 'resourceDirectory', 'alertSignup', 'hiwHeader', 'hiwProcess', 'hiwValue', 'hiwWhy', 'hiwPricing', 'hiwComparison', 'hiwFaq', 'hiwCta', 'homeNews', 'homePathways', 'homeCategoryIndex', 'homeMethodology', 'homeFaq']
// Listing-owned content (review, pulse, editorialStory) and blogPost are
// intentionally not listed — managed from the listing / off-Studio.
const ENTITY_TYPES = ['listing', 'category', 'subcategory', 'county', 'city']
const HIDDEN_TYPES = ['blogPost', 'review', 'pulse', 'editorialStory']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('home').title('Home'),
              S.documentTypeListItem('about').title('About'),
              S.documentTypeListItem('resources').title('Resources'),
              S.documentTypeListItem('howItWorks').title('How It Works'),
              S.documentTypeListItem('blogPage').title('Blog'),
              S.documentTypeListItem('directoryPage').title('Directory'),
            ]),
        ),
      S.listItem()
        .title('Sections')
        .child(
          S.list()
            .title('Sections')
            .items(SECTION_TYPES.map((type) => S.documentTypeListItem(type))),
        ),
      S.listItem()
        .title('Entities')
        .child(
          S.list()
            .title('Entities')
            .items(ENTITY_TYPES.map((type) => S.documentTypeListItem(type))),
        ),
      S.divider(),
      // Remaining document types, grouped ones excluded.
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'home' && item.getId() !== 'about' && item.getId() !== 'resources' && item.getId() !== 'howItWorks' && item.getId() !== 'blogPage' && item.getId() !== 'directoryPage' &&
          !SECTION_TYPES.includes(item.getId() ?? '') &&
          !ENTITY_TYPES.includes(item.getId() ?? '') &&
          !HIDDEN_TYPES.includes(item.getId() ?? ''),
      ),
    ])