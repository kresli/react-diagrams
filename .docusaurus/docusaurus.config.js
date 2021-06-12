export default {
  "title": "React Diagrams",
  "tagline": "",
  "url": "https://kresli.github.io/react-diagrams/",
  "baseUrl": "/docs/",
  "projectName": "react-diagrams",
  "organizationName": "kresli",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.ico",
  "themeConfig": {
    "navbar": {
      "title": "React Diagrams",
      "items": [
        {
          "type": "doc",
          "docId": "introduction",
          "label": "Documentation",
          "position": "right",
          "activeSidebarClassName": "navbar__link--active"
        },
        {
          "href": "https://github.com/kresli/react-diagrams",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "copyright": "Copyright © 2021 Eduard Jacko",
      "style": "light",
      "links": []
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false
  },
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://media.ethicalads.io/media/client/ethicalads.min.js"
  ],
  "themes": [
    [
      "@docusaurus/theme-classic",
      {
        "customCss": "/Users/eduardjacko/developer/skica-react-diagrams/docs/css/style.css"
      }
    ]
  ],
  "plugins": [
    [
      "@docusaurus/plugin-content-docs",
      {
        "sidebarPath": "/Users/eduardjacko/developer/skica-react-diagrams/docs/sidebars.js",
        "editUrl": "https://github.com/kresli/react-diagrams/edit/master/website/",
        "routeBasePath": "/"
      }
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {}
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "presets": [],
  "titleDelimiter": "|",
  "noIndex": false
};