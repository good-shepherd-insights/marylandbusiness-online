// Schema tiers: components -> sections -> pages -> entities.
// - components/: smallest reusable object types (shared across sections).
// - sections/: page-section documents composed of components; pages reference them.
// - pages/: page documents that assemble sections by reference.
// - entities/: content-entity documents (business, place, review, story...);
//   listings own their content via reference arrays (user-stated model).
import {heroHeadingSegment} from './components/heroHeadingSegment'
import {heroImage} from './components/heroImage'
import {heroSelectOption} from './components/heroSelectOption'
import {trustSignal} from './components/trustSignal'
import {countyHub} from './components/countyHub'
import {featuredBusiness} from './components/featuredBusiness'
import {socialFeedItem} from './components/socialFeedItem'
import {listingAddress} from './components/listingAddress'
import {hourSpan} from './components/hourSpan'
import {amenity} from './components/amenity'
import {achievement} from './components/achievement'
import {menuItem} from './components/menuItem'
import {menuCategory} from './components/menuCategory'
import {listingEvent} from './components/listingEvent'
import {qaItem} from './components/qaItem'
import {teamMember} from './components/teamMember'
import {promotion} from './components/promotion'
import {regulatoryUpdate} from './components/regulatoryUpdate'
import {flagshipProgram} from './components/flagshipProgram'
import {resourceCard} from './components/resourceCard'
import {deadlineEntry} from './components/deadlineEntry'
import {statItem} from './components/statItem'
import {navLink} from './components/navLink'
import {pillar} from './components/pillar'
import {offerArm} from './components/offerArm'
import {partner} from './components/partner'
import {processStep} from './components/processStep'
import {valueCategory} from './components/valueCategory'
import {planFeature} from './components/planFeature'
import {pricingPlan} from './components/pricingPlan'
import {comparisonCell} from './components/comparisonCell'
import {comparisonRow} from './components/comparisonRow'
import {comparisonGroup} from './components/comparisonGroup'
import {faqItem} from './components/faqItem'
import {newsItem} from './components/newsItem'
import {pathwayCard} from './components/pathwayCard'
import {methodStep} from './components/methodStep'
import {hero} from './sections/hero'
import {trustStrip} from './sections/trustStrip'
import {countyHubs} from './sections/countyHubs'
import {featuredBusinesses} from './sections/featuredBusinesses'
import {editorial} from './sections/editorial'
import {socialFeed} from './sections/socialFeed'
import {hubHeader} from './sections/hubHeader'
import {hubDiscovery} from './sections/hubDiscovery'
import {aboutHeader} from './sections/aboutHeader'
import {statStrip} from './sections/statStrip'
import {origin} from './sections/origin'
import {missionBand} from './sections/missionBand'
import {visionPillars} from './sections/visionPillars'
import {offerArms} from './sections/offerArms'
import {partnerships} from './sections/partnerships'
import {closingCta} from './sections/closingCta'
import {resourcesIntro} from './sections/resourcesIntro'
import {regulatoryUpdates} from './sections/regulatoryUpdates'
import {featuredPrograms} from './sections/featuredPrograms'
import {countyJump} from './sections/countyJump'
import {resourceDirectory} from './sections/resourceDirectory'
import {alertSignup} from './sections/alertSignup'
import {hiwHeader} from './sections/hiwHeader'
import {hiwProcess} from './sections/hiwProcess'
import {hiwValue} from './sections/hiwValue'
import {hiwWhy} from './sections/hiwWhy'
import {hiwPricing} from './sections/hiwPricing'
import {hiwComparison} from './sections/hiwComparison'
import {hiwFaq} from './sections/hiwFaq'
import {hiwCta} from './sections/hiwCta'
import {homeNews} from './sections/homeNews'
import {homePathways} from './sections/homePathways'
import {homeCategoryIndex} from './sections/homeCategoryIndex'
import {homeMethodology} from './sections/homeMethodology'
import {homeFaq} from './sections/homeFaq'
import {home} from './pages/home'
import {blogPost} from './pages/blogPost'
import {about} from './pages/about'
import {resources} from './pages/resources'
import {howItWorks} from './pages/howItWorks'
import {blogPage} from './pages/blogPage'
import {directoryPage} from './pages/directoryPage'
import {siteSettings} from './pages/siteSettings'
import {category} from './entities/category'
import {subcategory} from './entities/subcategory'
import {county} from './entities/county'
import {city} from './entities/city'
import {listing} from './entities/listing'
import {review} from './entities/review'
import {pulse} from './entities/pulse'
import {editorialStory} from './entities/editorialStory'

export const schemaTypes = [
  // components
  heroHeadingSegment,
  heroImage,
  heroSelectOption,
  trustSignal,
  countyHub,
  featuredBusiness,
  socialFeedItem,
  listingAddress,
  hourSpan,
  amenity,
  achievement,
  menuItem,
  menuCategory,
  listingEvent,
  qaItem,
  teamMember,
  promotion,
  regulatoryUpdate,
  flagshipProgram,
  resourceCard,
  deadlineEntry,
  statItem,
  navLink,
  pillar,
  offerArm,
  partner,
  processStep,
  valueCategory,
  planFeature,
  pricingPlan,
  comparisonCell,
  comparisonRow,
  comparisonGroup,
  faqItem,
  newsItem,
  pathwayCard,
  methodStep,
  // sections
  hero,
  trustStrip,
  countyHubs,
  featuredBusinesses,
  editorial,
  socialFeed,
  hubHeader,
  hubDiscovery,
  aboutHeader,
  statStrip,
  origin,
  missionBand,
  visionPillars,
  offerArms,
  partnerships,
  closingCta,
  resourcesIntro,
  regulatoryUpdates,
  featuredPrograms,
  countyJump,
  resourceDirectory,
  alertSignup,
  hiwHeader,
  hiwProcess,
  hiwValue,
  hiwWhy,
  hiwPricing,
  hiwComparison,
  hiwFaq,
  hiwCta,
  homeNews,
  homePathways,
  homeCategoryIndex,
  homeMethodology,
  homeFaq,
  // pages
  home,
  blogPost,
  about,
  resources,
  howItWorks,
  blogPage,
  directoryPage,
  siteSettings,
  // entities
  category,
  subcategory,
  county,
  city,
  listing,
  review,
  pulse,
  editorialStory,
]