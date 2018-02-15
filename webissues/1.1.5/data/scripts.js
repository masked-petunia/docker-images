
var folderFilter = [];

function callNew(id) {
	console.log("NEW ISSUE " + id);
}

// ----------------------------------------------------------------

function getPageRouteFromUrl(url) { return url.replace(window.location.origin, ''); }
var current = getPageRouteFromUrl(window.location.href);
var previous = getPageRouteFromUrl(document.referrer);

var newIssueRegex = /^\/client\/issues\/addissue.php\?folder=([0-9]+).*$/g;
function isPreviousNew() {
	var result = newIssueRegex.exec(previous);
	if(folderFilter.length === 0) return result !== null;
	if(result.length >= 2 && folderFilter.indexOf(result[1]) !== -1) return true;
	return false;
}

var issueIdRegex = /^\/client\/index\.php\?issue=([0-9]+).*$/g;
function getNewIssueId() {
	var result = issueIdRegex.exec(current);
	return result.length >= 2 && result[1];
}

if(isPreviousNew()) {
	var id = getNewIssueId();
	if(id) callNew(id);
}
