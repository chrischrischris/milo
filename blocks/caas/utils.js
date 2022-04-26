import { loadStyle } from '../../scripts/scripts.js';
import { loadScript } from '../../libs/utils.js';

export const loadCaasFiles = () => {
  loadStyle('https://www.adobe.com/special/chimera/latest/dist/dexter/app.min.css');

  return Promise.all([
    loadScript('https://www.adobe.com/special/chimera/latest/dist/dexter/react.umd.js'),
    loadScript('https://www.adobe.com/special/chimera/latest/dist/dexter/react.dom.umd.js'),
    loadScript('https://www.adobe.com/special/chimera/latest/dist/dexter/app.min.js'),
  ]);
};

export const initCaas = (state, el) => {
  const caasEl = el || document.getElementById('caas');
  if (!caasEl) return;

  const appEl = caasEl.parentElement;
  caasEl.remove();

  const newEl = document.createElement('div');
  newEl.id = 'caas';
  newEl.className = 'caas-preview';
  appEl.append(newEl);

  new ConsonantCardCollection(getConfig(state), newEl);
};

const encodedJoin = (arr) => encodeURIComponent(arr.join(','));

export const getConfig = (state) => {
  const endpoint = state.targetActivity
    ? `${state.endpoint}/${state.targetActivity}.json`
    : state.endpoint;

  const originSelection = Array.isArray(state.source) ? state.source.join(',') : state.source;
  const language = state.language ? state.language.split('/').at(-1) : 'en';
  const country = state.country ? state.country.split('/').at(-1) : 'us';

  const contentTypeTags = encodedJoin(state.contentTypeTags);
  const collectionTags = encodedJoin(state.includeTags);
  const excludeContentWithTags = encodedJoin(state.excludeTags);

  const config = {
    collection: {
      mode: state.theme,
      layout: {
        type: state.layoutType,
        gutter: state.gutter,
        container: state.container,
      },
      button: { style: state.collectionBtnStyle },
      resultsPerPage: state.resultsPerPage,
      endpoint: `${endpoint}?contentSource=&originSelection=${originSelection}&contentTypeTags=${contentTypeTags}&collectionTags=${collectionTags}&excludeContentWithTags=${excludeContentWithTags}&language=${language}&country=${country}&complexQuery=&excludeIds=&currentEntityId=55214dea-5481-3515-a4b9-dbf51c378e62&featuredCards=&environment=&draft=${state.draftDb}&size=2000`,
      fallbackEndpoint: '',
      totalCardsToShow: state.totalCardsToShow,
      cardStyle: state.cardStyle,
      showTotalResults: 'false',
      i18n: {
        prettyDateIntervalFormat: '{ddd}, {LLL} {dd} | {timeRange} {timeZone}',
        totalResultsText: '{total} results',
        title: '',
        onErrorTitle: 'Sorry there was a system error.',
        onErrorDescription:
          'Please try reloading the page or try coming back to the page another time.',
      },
      setCardBorders: state.setCardBorders,
      useOverlayLinks: state.useOverlayLinks,
      banner: {
        register: {
          description: 'Sign Up',
          url: '#registration',
        },
        upcoming: { description: 'Upcoming' },
        live: { description: 'Live' },
        onDemand: { description: 'On Demand' },
      },
      useLightText: state.useLightText,
      disableBanners: state.disableBanners,
      reservoir: {
        sample: state.sortReservoirSample,
        pool: state.sortReservoirPool,
      },
    },
    filterPanel: {
      enabled: state.showFilters,
      eventFilter: 'not-timed',
      type: 'left',
      showEmptyFilters: 'true',
      filters: [],
      filterLogic: 'or',
      i18n: {
        leftPanel: {
          header: 'Refine Your Results',
          clearAllFiltersText: 'Clear All',
          mobile: {
            filtersBtnLabel: 'Filters',
            panel: {
              header: 'Filter by',
              totalResultsText: '{total} results',
              applyBtnText: 'Apply',
              clearFilterText: 'Clear',
              doneBtnText: 'Done',
            },
            group: {
              totalResultsText: '{total} results',
              applyBtnText: 'Apply',
              clearFilterText: 'Clear',
              doneBtnText: 'Done',
            },
          },
        },
        topPanel: {
          groupLabel: 'Filters:',
          clearAllFiltersText: 'Clear All',
          moreFiltersBtnText: 'More Filters +',
          mobile: {
            group: {
              totalResultsText: '{total} results',
              applyBtnText: 'Apply',
              clearFilterText: 'Clear',
              doneBtnText: 'Done',
            },
          },
        },
      },
    },
    sort: {
      enabled: state.sortEnablePopup,
      defaultSort: state.sortDefault,
      options: [
        { label: 'AAA', sort: 'dateAsc' },
        { label: 'BBB', sort: 'dateAsc' },
      ],
    },
    pagination: {
      animationStyle: state.paginationAnimationStyle,
      enabled: state.paginationEnabled,
      resultsQuantityShown: state.paginationQuantityShown,
      loadMoreButton: {
        style: state.loadMoreBtnStyle,
        useThemeThree: state.paginationUseTheme3,
      },
      type: state.paginationType,
      i18n: {
        loadMore: {
          btnText: 'Load More',
          resultsQuantityText: '{start} of {end} displayed',
        },
        paginator: {
          resultsQuantityText: '{start} - {end} of {total} results',
          prevLabel: 'Prev',
          nextLabel: 'Next',
        },
      },
    },
    bookmarks: {
      showOnCards: 'false',
      leftFilterPanel: {
        bookmarkOnlyCollection: 'false',
        showBookmarksFilter: 'false',
        selectBookmarksIcon: '',
        unselectBookmarksIcon: '',
      },
      i18n: {
        leftFilterPanel: { filterTitle: 'My favorites' },
        card: {
          saveText: 'Save Card',
          unsaveText: 'Unsave Card',
        },
      },
    },
    search: {
      enabled: state.showSearch,
      searchFields: [],
      i18n: {
        noResultsTitle: 'No Results Found',
        noResultsDescription: 'Try checking your spelling or broadening your search.',
        leftFilterPanel: {
          searchTitle: 'Search',
          searchPlaceholderText: 'Search Here',
        },
        topFilterPanel: { searchPlaceholderText: 'Search Here' },
        filterInfo: { searchPlaceholderText: 'Search Here' },
      },
    },
    language: 'en',
    country: 'US',
    analytics: {
      trackImpressions: '',
      collectionIdentifier: '',
    },
    target: { enabled: '' },
  };
  return config;
};

export const defaultState = {
  cardStyle: 'half-height',
  collectionBtnStyle: 'primary',
  container: '1200MaxWidth',
  country: 'caas:country/us',
  contentTypeTags: [],
  disableBanners: false,
  endpoint: 'https://www.adobe.com/chimera-api/collection',
  excludeTags: [],
  draftDb: false,
  gutter: '4x',
  includeTags: [],
  language: 'caas:language/en',
  layoutType: '4up',
  loadMoreBtnStyle: 'primary',
  paginationAnimationStyle: 'paged',
  paginationEnabled: false,
  paginationQuantityShown: false,
  paginationUseTheme3: false,
  paginationType: 'none',
  resultsPerPage: 5,
  setCardBorders: false,
  showFilters: false,
  showSearch: false,
  sortDefault: 'dateDesc',
  sortEnablePopup: false,
  sortEnableRandomSampling: false,
  sortReservoirSample: 3,
  sortReservoirPool: 1000,
  source: ['hawks'],
  targetActivity: '',
  theme: 'lightest',
  totalCardsToShow: 10,
  useLightText: false,
  useOverlayLinks: false,
};
