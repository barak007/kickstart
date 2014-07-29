function jDom(context, exports) {

	function jDomItem(element) {
		this.element = element;
	}

	jDomItem.prototype.addClass = function (className) {
		this.element.classList.add(className);
		return this;
	}

	//////////////////////////////////////////////////////////////////////
	
	function jDOMCollection(jDomItems) {
		this.nodes = jDomItems;
	}

	jDOMCollection.prototype.each = function () {};
	jDOMCollection.prototype.map = function () {};
	jDOMCollection.prototype.filter = function () {};

	//////////////////////////////////////////////////////////////////////
	
	function $(selectorOrNode, root) {
		root = root || document;
		if (typeof selectorOrNode === 'string') {
			var nlist = root.querySelectorAll(selectorOrNode);
			return new jDOMCollection($.nodeListToArrayOfjDomItems(nlist));
		} else {
			throw new Error('TODO: implement more modes');
		}
	}
	
	$.is_jDomEntity = function(thing){
		return thing instanceof jDomItem || thing instanceof jDOMCollection;
	}
	
	$.nodeListToArrayOfjDomItems = function(nodeList){
		return Array.prototype.map.call(nodeList, function (element) {
			return new jDomItem(element);
		});
	}
	
	return context[exports] = $;
	
}

jDom(window, '$');

