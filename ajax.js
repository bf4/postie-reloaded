function formData2QueryString(docForm) {

	var strSubmitContent = '';
	var formElem;
	var strLastElemName = '';
	
	for (i = 0; i < docForm.elements.length; i++) {
		
		formElem = docForm.elements[i];
		switch (formElem.type) {
			// Text fields, hidden form elements
			case 'hidden':
				strSubmitContent += formElem.name + '=' + escape(formElem.value) + '&'
				break;
			case 'text':
				strSubmitContent += formElem.name + '=' + escape(formElem.value) + '&'
				break;
			case 'password':
			case 'textarea':
			case 'select-one':
				strSubmitContent += formElem.name + '=' + escape(formElem.value) + '&'
				break;
				
			// Radio buttons
			case 'radio':
				if (formElem.checked) {
					strSubmitContent += formElem.name + '=' + escape(formElem.value) + '&'
				}
				break;
				
			// Checkboxes
			case 'checkbox':
				if (formElem.checked) {
					// Continuing multiple, same-name checkboxes
					if (formElem.name == strLastElemName) {
						// Strip of end ampersand if there is one
						if (strSubmitContent.lastIndexOf('&') == strSubmitContent.length-1) {
							strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
						}
						// Append value as comma-delimited string
						strSubmitContent += ',' + escape(formElem.value);
					}
					else {
						strSubmitContent += formElem.name + '=' + escape(formElem.value);
					}
					strSubmitContent += '&';
				}
				break;
				
		}
		//strLastElemName = formElem.name
	}
	// Remove trailing separator
	strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
	return strSubmitContent;
}

function xmlhttpPost(strSubmitURL, strSubmitContent, rowid) {

	var xmlHttpReq = false;
	var strResponse = '';
	
	// Create new XMLHTTPRequest object
	// ----------------
	// Mozilla
	if (window.XMLHttpRequest) {
		xmlHttpReq = new XMLHttpRequest();
		if(xmlHttpReq.overrideMimeType) {xmlHttpReq.overrideMimeType('text/html');}
	}
	// IE
	else if (window.ActiveXObject) {
		xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}


	xmlHttpReq.onreadystatechange = function() {
			if (xmlHttpReq.readyState == 4) {
			switch (xmlHttpReq.status) {
			    // goes through
				case 200:
                var postrow = document.getElementById(rowid);
				postrow.className="hidden";
				break;
				// Page-not-found error
				case 404:
					alert('Error: Not Found. The requested URL ' + strSubmitURL + ' could not be found.');
					document.getElementById(rowid).className="none";
					break;
				// Display results in a full window for server-side errors
				case 500:
					document.getElementById(rowid).className="none";
					handleErrFullPage(xmlHttpReq.responseText);
					break;
				default:
					document.getElementById(rowid).className="none";
					// Call JS alert for generated error or debug messages
                                        var strResponse = xmlHttpReq.responseText;
					if (strResponse.indexOf('Error:') > -1 || strResponse.indexOf('Debug:') > -1) {
						alert(strResponse);
					}
					// Call the desired result function
					else {
						eval(strResultFunc + '(xmlHttpReq.responseText);');
					}
					break;
			}
		}
	}
	xmlHttpReq.open('POST', strSubmitURL, true);
	//xmlHttpReq.overrideMimeType('text/html');
	xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpReq.setRequestHeader("If-Modified-Since", "Wed, 15 Jan 1995 01:00:00 GMT");
	xmlHttpReq.setRequestHeader("Cache-Control","no-cache");
	xmlHttpReq.setRequestHeader("Cache-Control","must-revalidate");
	xmlHttpReq.setRequestHeader("Cache-Control","no-store");
	xmlHttpReq.setRequestHeader("Pragma","no-cache");
	xmlHttpReq.setRequestHeader("Expires","0");
	xmlHttpReq.setRequestHeader("Content-length", strSubmitContent.length);
	xmlHttpReq.setRequestHeader("Connection", "close");
xmlHttpReq.send(strSubmitContent);
//xmlHttpReq.send();
}


function handleErrFullPage(strIn) {

	var errorWin;
alert('errorfullpage');
	// Try creating new window and displaying error
	try {
		// Open window
		errorWin = window.open('', 'errorWin');
		errorWin.document.body.innerHTML = '<pre>' + strIn + '</pre>';
	}
	// If pop-up gets blocked, inform user
	catch(e) {
		alert('An error occurred, but the error message cannot be' +
			' displayed because of your browser\'s pop-up blocker.\n' +
			'Please allow pop-ups from this Web site.');
	}
}

function AjaxPost(rowid) {
var url = 'postie-functions.php';	

var strSubmitContent = '';
//var postform = document.getElementById(rowid+"form");
document.getElementById(rowid).className="submit";


strSubmitContent = formData2QueryString(document.forms[rowid+'form']);
				
xmlhttpPost(url, "publish=true&"+strSubmitContent,rowid);



}

