import App from './App.html';

var  pars = (() => {
	var  p = {};
	location.search.substr(1).split('&').forEach((it) => {
		var  arr = it.split('=');
		p[arr[0]] = arr[1];
	});
	return p;
})();

var app = new App({
	target: document.body,
	//target: document.getElementsByClassName('editor-sidebarContainer')[0] || document.body,
	data: {
		urlParams: pars,
		name: 'world'
	}
});

export default app;