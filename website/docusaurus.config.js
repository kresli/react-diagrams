// See https://v2.docusaurus.io/docs/configuration for more information

module.exports = {
	title: "React Diagrams",
	tagline: "",
	url: "https://kresli.github.io/react-diagrams/",
	baseUrl: "https://github.com/kresli/react-diagrams",
	projectName: "react-diagrams",
	organizationName: "kresli",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	routeBasePath: '/',
	themeConfig: {
		// googleAnalytics: {
		// 	trackingID: "UA-65632006-3",
		// 	anonymizeIP: true
		// },
		navbar: {
			title: "React Diagrams",
			// logo: {
			// 	src: "/img/immer-logo.svg",
			// 	alt: "Immer Logo"
			// },
			items: [
				{
					type: "doc",
					docId: "Introduction",
					label: "Documentation",
					position: "right",
				},
				{
					href: "https://github.com/kresli/react-diagrams",
					label: "GitHub",
					position: "right"
				},
				// {
				// 	type: "doc",
				// 	docId: "support",
				// 	label: "Support Immer",
				// 	position: "right"
				// }
			]
		},
		footer: {
			copyright: `Copyright © ${new Date().getFullYear()} Eduard Jacko`
		}
	},
	scripts: [
		"https://buttons.github.io/buttons.js",
		"https://media.ethicalads.io/media/client/ethicalads.min.js"
	],
	themes: [
		[
			"@docusaurus/theme-classic",
			{
				customCss: require.resolve("./src/css/style.css")
			}
		],
		'@docusaurus/theme-live-codeblock'
	],
	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				sidebarPath: require.resolve("./sidebars.js"),
				editUrl: "https://github.com/kresli/react-diagrams/edit/master/website/",
				routeBasePath: "/"
			}
		],
		// "@docusaurus/plugin-google-analytics",
		[
			"@docusaurus/plugin-client-redirects",
			{
				createRedirects: function(existingPath) {
					return ["/docs" + existingPath]
				}
			}
		]
	]
}