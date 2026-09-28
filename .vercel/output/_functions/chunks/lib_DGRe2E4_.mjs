import { C as addAttribute, N as createAstro, _ as renderSlot, b as renderTemplate, f as renderComponent, i as spreadAttributes, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./compiler_DxiFqWHW.mjs";
//#region node_modules/.pnpm/@portabletext+toolkit@6.0.0/node_modules/@portabletext/toolkit/dist/index.js
/**
* Strict check to determine if node is a correctly formatted Portable Text span.
*
* @param node - Node to check
* @returns True if valid Portable Text span, otherwise false
*/
function isPortableTextSpan(node) {
	return node._type === "span" && "text" in node && typeof node.text == "string" && (node.marks === void 0 || Array.isArray(node.marks) && node.marks.every((mark) => typeof mark == "string"));
}
/**
* Strict check to determine if node is a correctly formatted Portable Text block.
*
* @param node - Node to check
* @returns True if valid Portable Text block, otherwise false
*/
function isPortableTextBlock(node) {
	return typeof node._type == "string" && node._type[0] !== "@" && (!("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && node.markDefs.every((def) => typeof def._key == "string")) && "children" in node && Array.isArray(node.children) && node.children.every((child) => typeof child == "object" && "_type" in child);
}
/**
* Strict check to determine if node is a correctly formatted portable list item block.
*
* @param block - Block to check
* @returns True if valid Portable Text list item block, otherwise false
*/
function isPortableTextListItemBlock(block) {
	return isPortableTextBlock(block) && "listItem" in block && typeof block.listItem == "string" && (block.level === void 0 || typeof block.level == "number");
}
/**
* Loose check to determine if block is a toolkit list node.
* Only checks `_type`, assumes correct structure.
*
* @param block - Block to check
* @returns True if toolkit list, otherwise false
*/
function isPortableTextToolkitList(block) {
	return block._type === "@list";
}
/**
* Loose check to determine if span is a toolkit span node.
* Only checks `_type`, assumes correct structure.
*
* @param span - Span to check
* @returns True if toolkit span, otherwise false
*/
function isPortableTextToolkitSpan(span) {
	return span._type === "@span";
}
/**
* Loose check to determine if node is a toolkit text node.
* Only checks `_type`, assumes correct structure.
*
* @param node - Node to check
* @returns True if toolkit text node, otherwise false
*/
function isPortableTextToolkitTextNode(node) {
	return node._type === "@text";
}
var knownDecorators = [
	"strong",
	"em",
	"code",
	"underline",
	"strike-through"
];
/**
* Figures out the optimal order of marks, in order to minimize the amount of
* nesting/repeated elements in environments such as HTML. For instance, a naive
* implementation might render something like:
*
* ```html
* <strong>This block contains </strong>
* <strong><a href="https://some.url/">a link</a></strong>
* <strong> and some bolded text</strong>
* ```
*
* ...whereas an optimal order would be:
*
* ```html
* <strong>
*   This block contains <a href="https://some.url/">a link</a> and some bolded text
* </strong>
* ```
*
* This is particularly necessary for cases like links, where you don't want multiple
* individual links for different segments of the link text, even if parts of it are
* bolded/italicized.
*
* This function is meant to be used like: `block.children.map(sortMarksByOccurences)`,
* and is used internally in {@link buildMarksTree | `buildMarksTree()`}.
*
* The marks are sorted in the following order:
*
*  1. Marks that are shared amongst the most adjacent siblings
*  2. Non-default marks (links, custom metadata)
*  3. Decorators (bold, emphasis, code etc), in a predefined, preferred order
*
* @param span - The current span to sort
* @param index - The index of the current span within the block
* @param blockChildren - All children of the block being sorted
* @returns Array of decorators and annotations, sorted by "most adjacent siblings"
*/
function sortMarksByOccurences(span, index, blockChildren) {
	if (!isPortableTextSpan(span) || !span.marks || !span.marks.length) return [];
	let marks = span.marks.slice(), occurences = {};
	return marks.forEach((mark) => {
		occurences[mark] = 1;
		for (let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++) {
			let sibling = blockChildren[siblingIndex];
			if (sibling && isPortableTextSpan(sibling) && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) occurences[mark]++;
			else break;
		}
	}), marks.sort((markA, markB) => sortMarks(occurences, markA, markB));
}
function sortMarks(occurences, markA, markB) {
	let aOccurences = occurences[markA], bOccurences = occurences[markB];
	if (aOccurences !== bOccurences) return bOccurences - aOccurences;
	let aKnownPos = knownDecorators.indexOf(markA), bKnownPos = knownDecorators.indexOf(markB);
	return aKnownPos === bKnownPos ? markA.localeCompare(markB) : aKnownPos - bKnownPos;
}
/**
* Takes a Portable Text block and returns a nested tree of nodes optimized for rendering
* in HTML-like environments where you want marks/annotations to be nested inside of eachother.
* For instance, a naive span-by-span rendering might yield:
*
* ```html
* <strong>This block contains </strong>
* <strong><a href="https://some.url/">a link</a></strong>
* <strong> and some bolded and </strong>
* <em><strong>italicized text</strong></em>
* ```
*
* ...whereas an optimal order would be:
*
* ```html
* <strong>
*   This block contains <a href="https://some.url/">a link</a>
*   and some bolded and <em>italicized text</em>
* </strong>
* ```
*
* Note that since "native" Portable Text spans cannot be nested,
* this function returns an array of "toolkit specific" types:
* {@link ToolkitTextNode | `@text`} and {@link ToolkitNestedPortableTextSpan | `@span` }.
*
* The toolkit-specific type can hold both types, as well as any arbitrary inline objects,
* creating an actual tree.
*
* @param block - The Portable Text block to create a tree of nodes from
* @returns Array of (potentially) nested spans, text nodes and/or arbitrary inline objects
*/
function buildMarksTree(block) {
	let { children } = block, markDefs = block.markDefs ?? [];
	if (!children || !children.length) return [];
	let sortedMarks = children.map(sortMarksByOccurences), rootNode = {
		_type: "@span",
		children: [],
		markType: "<unknown>"
	}, nodeStack = [rootNode];
	for (let i = 0; i < children.length; i++) {
		let span = children[i];
		if (!span) continue;
		let marksNeeded = sortedMarks[i] || [], pos = 1;
		if (nodeStack.length > 1) for (; pos < nodeStack.length; pos++) {
			let index = marksNeeded.indexOf(nodeStack[pos]?.markKey || "");
			if (index === -1) break;
			marksNeeded.splice(index, 1);
		}
		nodeStack = nodeStack.slice(0, pos);
		let currentNode = nodeStack[nodeStack.length - 1];
		if (currentNode) {
			for (let markKey of marksNeeded) {
				let markDef = markDefs?.find((def) => def._key === markKey), node = {
					_type: "@span",
					_key: span._key,
					children: [],
					markDef,
					markType: markDef ? markDef._type : markKey,
					markKey
				};
				currentNode.children.push(node), nodeStack.push(node), currentNode = node;
			}
			if (isPortableTextSpan(span)) {
				let lines = span.text.split("\n");
				for (let line = lines.length; line-- > 1;) lines.splice(line, 0, "\n");
				currentNode.children = currentNode.children.concat(lines.map((text) => ({
					_type: "@text",
					text
				})));
			} else currentNode.children = currentNode.children.concat(span);
		}
	}
	return rootNode.children;
}
function nestLists(blocks, mode) {
	let tree = [], currentList;
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];
		if (block) {
			if (!isPortableTextListItemBlock(block)) {
				tree.push(block), currentList = void 0;
				continue;
			}
			if (!currentList) {
				let nestedLists = createNestedLists(block, i, mode, 0);
				currentList = nestedLists.current, tree.push(nestedLists.root);
				continue;
			}
			if (blockMatchesList(block, currentList)) {
				currentList.children.push(block);
				continue;
			}
			if ((block.level || 1) > currentList.level) {
				let nestedLists = createNestedLists(block, i, mode, currentList.level);
				appendNestedList(currentList, nestedLists.root), currentList = nestedLists.current;
				continue;
			}
			if ((block.level || 1) < currentList.level) {
				let matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, block);
				if (match) {
					currentList = match, currentList.children.push(block);
					continue;
				}
				let nestedLists = createNestedLists(block, i, mode, 0);
				currentList = nestedLists.current, tree.push(nestedLists.root);
				continue;
			}
			if (block.listItem !== currentList.listItem) {
				let matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, { level: block.level || 1 });
				if (match && match.listItem === block.listItem) {
					currentList = match, currentList.children.push(block);
					continue;
				} else {
					let nestedLists = createNestedLists(block, i, mode, 0);
					currentList = nestedLists.current, tree.push(nestedLists.root);
					continue;
				}
			}
			console.warn("Unknown state encountered for block", block), tree.push(block);
		}
	}
	return tree;
}
function blockMatchesList(block, list) {
	return (block.level || 1) === list.level && block.listItem === list.listItem;
}
function listFromBlock(block, index, mode, level, children) {
	let suffix = level === (block.level || 1) ? "" : `-${level}`;
	return {
		_type: "@list",
		_key: `${block._key || `${index}`}-parent${suffix}`,
		mode,
		level,
		listItem: block.listItem,
		children
	};
}
function createNestedLists(block, index, mode, startLevel) {
	let level = block.level || 1, firstLevel = startLevel + 1, root = listFromBlock(block, index, mode, firstLevel, listChildren(block, index, mode, firstLevel, level)), current = root;
	for (let listLevel = firstLevel + 1; listLevel <= level; listLevel++) {
		let list = listFromBlock(block, index, mode, listLevel, listChildren(block, index, mode, listLevel, level));
		appendNestedList(current, list), current = list;
	}
	return {
		root,
		current
	};
}
function listChildren(block, index, mode, listLevel, targetLevel) {
	return listLevel === targetLevel ? [block] : mode === "html" ? [emptyListItemFromBlock(block, index, listLevel)] : [];
}
function emptyListItemFromBlock(block, index, level) {
	return {
		...block,
		_key: `${block._key || `${index}`}-placeholder-${level}`,
		children: [],
		level
	};
}
function appendNestedList(parentList, childList) {
	if (parentList.mode === "html" && childList.mode === "html") {
		let lastIndex = parentList.children.length - 1, lastListItem = parentList.children[lastIndex];
		if (!lastListItem) return;
		parentList.children[lastIndex] = {
			...lastListItem,
			children: [...lastListItem.children, childList]
		};
		return;
	}
	parentList.mode === "direct" && childList.mode === "direct" && parentList.children.push(childList);
}
function findListMatching(rootNode, matching) {
	let level = matching.level || 1, style = matching.listItem || "normal", filterOnType = typeof matching.listItem == "string";
	if (isPortableTextToolkitList(rootNode) && (rootNode.level || 1) === level && filterOnType && (rootNode.listItem || "normal") === style) return rootNode;
	if (!("children" in rootNode)) return;
	let node = rootNode.children[rootNode.children.length - 1];
	return node && !isPortableTextSpan(node) ? findListMatching(node, matching) : void 0;
}
/**
* List nesting mode for HTML, see the {@link nestLists | `nestLists()` function}
*/
var LIST_NEST_MODE_HTML = "html";
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/lib/internal.ts
/**
* Returns true if `it` is component
*/
function isComponent(it) {
	return typeof it === "function";
}
/**
* Merges two {@link SomePortableTextComponents} objects, giving priority to overrides.
*
* This function combines two component objects used in Portable Text rendering.
* If both objects have the same key, the value from `overrides` takes precedence.
* This is useful for customizing the rendering of specific components while keeping
* the default behavior for others.
*
* @typeParam Components - The type of the base components object.
* @typeParam Overrides - The type of the overrides components object.
* @typeParam MergedComponents - The type of the resulting merged components object.
*
* @param components - The base components object.
* @param overrides - The overrides components object.
* @returns A new object with the merged components.
*/
function mergeComponents(components, overrides) {
	const cmps = { ...components };
	for (const [key, override] of Object.entries(overrides)) {
		const current = components[key];
		cmps[key] = !current || isComponent(override) || isComponent(current) ? override : {
			...current,
			...override
		};
	}
	return cmps;
}
var nodeComponentsMap = /* @__PURE__ */ new WeakMap();
/**
* Binds the resolved components to a specific node object.
* @internal
*
* @remarks
* This uses the node's _object reference_ as the key. This enables the `Context` API via
* `usePortableText` to look up which components were assigned to this specific node during rendering.
*
* @param node - The node object to be used as the key.
* @param Default - The resolved default component for this node.
* @param Unknown - The resolved fallback (unknown) component for this node.
*/
function setNodeComponents(node, Default, Unknown) {
	nodeComponentsMap.set(node, {
		Default,
		Unknown
	});
}
/**
* Retrieves the components bound to a specific node object.
* @internal
*
* @param node - The node object to look up (by reference).
* @returns The component pair, or `undefined` if this exact node object was not registered.
*/
function getNodeComponents(node) {
	return nodeComponentsMap.get(node);
}
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/lib/warnings.ts
var getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
var unknownTypeWarning = (type) => getTemplate("type", type);
var unknownMarkWarning = (markType) => getTemplate("mark", markType);
var unknownBlockWarning = (style) => getTemplate("block", style);
var unknownListWarning = (listItem) => getTemplate("list", listItem);
var unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
var getWarningMessage = (nodeType, type) => {
	return {
		block: unknownBlockWarning,
		list: unknownListWarning,
		listItem: unknownListItemWarning,
		mark: unknownMarkWarning,
		type: unknownTypeWarning
	}[nodeType](type);
};
function printWarning(message) {
	console.warn(message);
}
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/lib/context.ts
var key = Symbol("astro-portabletext");
/**
* Returns rendering utilities for a node within a Portable Text tree.
* Must be called from a component passed to the PortableText `components` prop.
*
* @param node - The Portable Text node passed into the component.
* @returns Component resolution and render utilities.
*/
function usePortableText(node) {
	if (!(key in globalThis)) throw new Error(`PortableText "context" has not been initialised`);
	return globalThis[key](node);
}
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/Block.astro
createAstro("https://marylandbusiness.online");
var $$Block = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Block;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const styleIs = (style) => style === node.style;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownStyle = getUnknownComponent();
	return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead($$result)}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/Block.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/HardBreak.astro
var $$HardBreak = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<br>`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/HardBreak.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/List.astro
createAstro("https://marylandbusiness.online");
var $$List = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$List;
	const { node, index, isInline, ...attrs } = Astro.props;
	const listItemIs = (listItem) => listItem === node.listItem;
	return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead($$result)}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/List.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/ListItem.astro
createAstro("https://marylandbusiness.online");
var $$ListItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ListItem;
	const { node, index, isInline, ...attrs } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/ListItem.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/Mark.astro
createAstro("https://marylandbusiness.online");
var $$Mark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Mark;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const markTypeIs = (markType) => markType === node.markType;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownMarkType = getUnknownComponent();
	return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead($$result)}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/Mark.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/Text.astro
createAstro("https://marylandbusiness.online");
var $$Text = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Text;
	const { node } = Astro.props;
	return renderTemplate`${node.text}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/Text.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownBlock.astro
var $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownList.astro
var $$UnknownList = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownList.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownListItem.astro
var $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownMark.astro
var $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownType.astro
createAstro("https://marylandbusiness.online");
var $$UnknownType = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UnknownType;
	const { node, isInline } = Astro.props;
	const warning = getWarningMessage("type", node._type);
	return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead($$result)}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/UnknownType.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/PortableText.astro
createAstro("https://marylandbusiness.online");
var $$PortableText = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$PortableText;
	const { value, components: componentOverrides = {}, listNestingMode = LIST_NEST_MODE_HTML, onMissingComponent = true } = Astro2.props;
	const components = mergeComponents({
		type: {},
		unknownType: $$UnknownType,
		block: {
			h1: $$Block,
			h2: $$Block,
			h3: $$Block,
			h4: $$Block,
			h5: $$Block,
			h6: $$Block,
			blockquote: $$Block,
			normal: $$Block
		},
		unknownBlock: $$UnknownBlock,
		list: {
			bullet: $$List,
			number: $$List,
			menu: $$List
		},
		unknownList: $$UnknownList,
		listItem: {
			bullet: $$ListItem,
			number: $$ListItem,
			menu: $$ListItem
		},
		unknownListItem: $$UnknownListItem,
		mark: {
			code: $$Mark,
			em: $$Mark,
			link: $$Mark,
			"strike-through": $$Mark,
			strong: $$Mark,
			underline: $$Mark
		},
		unknownMark: $$UnknownMark,
		text: $$Text,
		hardBreak: $$HardBreak
	}, componentOverrides);
	const noop = () => {};
	const missingComponentHandler = ((handler) => {
		if (typeof handler === "function") return handler;
		return !handler ? noop : printWarning;
	})(onMissingComponent);
	const asComponentProps = (node, index, isInline) => ({
		node,
		index,
		isInline
	});
	const provideComponent = (nodeType, type, fallbackComponent) => {
		const component = ((component2) => {
			return component2[type] || component2;
		})(components[nodeType]);
		if (isComponent(component)) return component;
		missingComponentHandler(getWarningMessage(nodeType, type), {
			nodeType,
			type
		});
		return fallbackComponent;
	};
	let fallbackRenderOptions;
	const portableTextRender = (options, isInline) => {
		if (!fallbackRenderOptions) throw new Error("[PortableText portableTextRender] fallbackRenderOptions is undefined");
		const renderChildren = (children, inline = false) => {
			return children?.map(portableTextRender(options, inline)) ?? [];
		};
		const renderOptions = {
			...fallbackRenderOptions,
			...options ?? {}
		};
		return function renderNode(node, index) {
			function run(handler, props) {
				if (!isComponent(handler)) throw new Error(`[PortableText render] No handler found for node type ${node._type}.`);
				return handler(props);
			}
			if (isPortableTextToolkitList(node)) {
				const UnknownComponent2 = components.unknownList ?? $$UnknownList;
				setNodeComponents(node, $$List, UnknownComponent2);
				return run(renderOptions.list, {
					Component: provideComponent("list", node.listItem, UnknownComponent2),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, false)
				});
			}
			if (isPortableTextListItemBlock(node)) {
				const nodeCopy = { ...node };
				const { listItem, ...blockNode } = nodeCopy;
				const isStyled = nodeCopy.style && nodeCopy.style !== "normal";
				nodeCopy.children = isStyled ? renderNode(blockNode, index) : buildMarksTree(nodeCopy);
				const UnknownComponent2 = components.unknownListItem ?? $$UnknownListItem;
				setNodeComponents(nodeCopy, $$ListItem, UnknownComponent2);
				return run(renderOptions.listItem, {
					Component: provideComponent("listItem", listItem, UnknownComponent2),
					props: asComponentProps(nodeCopy, index, false),
					children: isStyled ? nodeCopy.children : renderChildren(nodeCopy.children, true)
				});
			}
			if (isPortableTextToolkitSpan(node)) {
				const UnknownComponent2 = components.unknownMark ?? $$UnknownMark;
				setNodeComponents(node, $$Mark, UnknownComponent2);
				return run(renderOptions.mark, {
					Component: provideComponent("mark", node.markType, UnknownComponent2),
					props: asComponentProps(node, index, true),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextBlock(node)) {
				const nodeCopy = { ...node };
				nodeCopy.style ??= "normal";
				nodeCopy.children = buildMarksTree(nodeCopy);
				const UnknownComponent2 = components.unknownBlock ?? $$UnknownBlock;
				setNodeComponents(nodeCopy, $$Block, UnknownComponent2);
				return run(renderOptions.block, {
					Component: provideComponent("block", nodeCopy.style, UnknownComponent2),
					props: asComponentProps(nodeCopy, index, false),
					children: renderChildren(nodeCopy.children, true)
				});
			}
			if (isPortableTextToolkitTextNode(node)) {
				const isHardBreak = "\n" === node.text;
				const props = asComponentProps(node, index, true);
				if (isHardBreak) return run(renderOptions.hardBreak, {
					Component: isComponent(components.hardBreak) ? components.hardBreak : $$HardBreak,
					props
				});
				return run(renderOptions.text, {
					Component: isComponent(components.text) ? components.text : $$Text,
					props
				});
			}
			const UnknownComponent = components.unknownType ?? $$UnknownType;
			return run(renderOptions.type, {
				Component: provideComponent("type", node._type, UnknownComponent),
				props: asComponentProps(node, index, isInline ?? false)
			});
		};
	};
	globalThis[key] = (node) => ({
		getDefaultComponent: provideDefaultComponent.bind(null, node),
		getUnknownComponent: provideUnknownComponent.bind(null, node),
		render: (options) => node.children?.map(portableTextRender(options))
	});
	const provideDefaultComponent = (node) => {
		const DefaultComponent = getNodeComponents(node)?.Default;
		if (DefaultComponent) return DefaultComponent;
		if (isPortableTextToolkitList(node)) return $$List;
		if (isPortableTextListItemBlock(node)) return $$ListItem;
		if (isPortableTextToolkitSpan(node)) return $$Mark;
		if (isPortableTextBlock(node)) return $$Block;
		if (isPortableTextToolkitTextNode(node)) return "\n" === node.text ? $$HardBreak : $$Text;
		return $$UnknownType;
	};
	const provideUnknownComponent = (node) => {
		const UnknownComponent = getNodeComponents(node)?.Unknown;
		if (UnknownComponent) return UnknownComponent;
		if (isPortableTextToolkitList(node)) return components.unknownList ?? $$UnknownList;
		if (isPortableTextListItemBlock(node)) return components.unknownListItem ?? $$UnknownListItem;
		if (isPortableTextToolkitSpan(node)) return components.unknownMark ?? $$UnknownMark;
		if (isPortableTextBlock(node)) return components.unknownBlock ?? $$UnknownBlock;
		if (!isPortableTextToolkitTextNode(node)) return components.unknownType ?? $$UnknownType;
		throw new Error(`[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`);
	};
	const nodes = nestLists(Array.isArray(value) ? value : value ? [value] : [], listNestingMode);
	const render = (options) => {
		fallbackRenderOptions = options;
		return portableTextRender(options);
	};
	const createSlotRenderer = (slotName) => Astro2.slots.render.bind(Astro2.slots, slotName);
	const slots = [
		"type",
		"block",
		"list",
		"listItem",
		"mark",
		"text",
		"hardBreak"
	].reduce((obj, name) => {
		obj[name] = Astro2.slots.has(name) ? createSlotRenderer(name) : void 0;
		return obj;
	}, {});
	return renderTemplate`${(() => {
		const renderNode = (slotRenderer) => {
			return ({ Component, props, children }) => slotRenderer?.([{
				Component,
				props,
				children
			}]) ?? renderTemplate`${renderComponent($$result, "Component", Component, { ...props }, { "default": ($$result2) => renderTemplate`${children}` })}`;
		};
		return nodes.map(render({
			type: renderNode(slots.type),
			block: renderNode(slots.block),
			list: renderNode(slots.list),
			listItem: renderNode(slots.listItem),
			mark: renderNode(slots.mark),
			text: renderNode(slots.text),
			hardBreak: renderNode(slots.hardBreak)
		}));
	})()}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro-portabletext@1.0.1_astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1_/node_modules/astro-portabletext/components/PortableText.astro", void 0);
//#endregion
export { $$PortableText as t };
