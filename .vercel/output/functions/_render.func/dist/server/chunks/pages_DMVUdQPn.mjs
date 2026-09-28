import { m as Fragment, n as createVNode, r as __astro_tag_component__ } from "./jsx-runtime_CgLb4yc8.mjs";
//#region src/data/pages/index.mdx
function _createMdxContent(props) {
	return createVNode(Fragment, {});
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, Object.assign({}, props, { children: createVNode(_createMdxContent, props) })) : _createMdxContent(props);
}
var frontmatter = {};
function getHeadings() {
	return [];
}
var url = "";
var file = "/Users/dev/Projects/marylandbusiness-online/src/data/pages/index.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/dev/Projects/marylandbusiness-online/src/data/pages/index.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
