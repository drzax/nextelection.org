/*globals document */

/*!
 * nextelection.org
 *
 * @version 0.0.1
 * @author Simon Elvery <simon@elvery.net>
 */

var d3, list;

// Requirements
d3 = require('d3');
domready = require('domready');

function sortElections(a, b) {
	a = a.fixed ? a.fixed : a.latest;
	b = b.fixed ? b.fixed : b.latest;
	return a > b;
}

function dataLoaded(err, data) {
	if (err) {
		// TODO: deal!
		console.error(err);
		return;
	}

	data.sort(sortElections);

	list = d3.select('body').insert('ol').selectAll('li').data(data);

	list.enter().call(enter);
	function enter(s) {
		var li = s.append('li');

		li.append('p').classed('name', true).text(function(d){
			return d.name;
		});
		li.append('p').classed('date', true).text(function(d) {
			return (d.fixed) ? new Date(d.fixed) : new Date(d.latest);
		});
	}

}

function init() {
	d3.json('data/au.json', dataLoaded);
}

domready(init);