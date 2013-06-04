//!/ <reference name="MicrosoftAjaxSerialization.js" />

(function() {

function execute() {

Type._registerScript("MicrosoftAjaxNetwork.js", ["MicrosoftAjaxSerialization.js"]);
var $type, $prototype;

if (!window.XMLHttpRequest) {
    window.XMLHttpRequest = function window$XMLHttpRequest() {
        var ex, progIDs = [ 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP' ];
        for (var i = 0, l = progIDs.length; i < l; i++) {
            try {
                return new ActiveXObject(progIDs[i]);
            }
            catch (ex) {
            }
        }
        return null;
    }
}

Type.registerNamespace('Sys.Net');

$type = Sys.Net.WebRequestExecutor = function WebRequestExecutor() {
    /// <summary locid="M:J#Sys.Net.WebRequestExecutor.#ctor">Base class for WebRequestExecutors which handle the actual execution of a WebRequest</summary>
    this._webRequest = null;
    this._resultObject = null;
}

var empty = function() {};

$type.prototype = {
    get_started: empty,
    get_responseAvailable: empty,
    get_timedOut: empty,
    get_aborted: empty,
    get_responseData: empty,
    get_statusCode: empty,
    get_statusText: empty,
    get_xml: empty,
    executeRequest: empty,
    abort: empty,
    getAllResponseHeaders: empty,
    getResponseHeader: empty,
    get_webRequest: function WebRequestExecutor$get_webRequest() {
        /// <value type="Sys.Net.WebRequest" locid="P:J#Sys.Net.WebRequestExecutor.webRequest"></value>
        return this._webRequest;
    },
    _set_webRequest: function WebRequestExecutor$_set_webRequest(value) {
        this._webRequest = value;
    },
    get_object: function WebRequestExecutor$get_object() {
        /// <value locid="P:J#Sys.Net.WebRequestExecutor.object">The JSON eval'd response.</value>
        var result = this._resultObject;
        if (!result) {
            this._resultObject = result = Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());
        }
        return result;
    }
}
$type.registerClass('Sys.Net.WebRequestExecutor');
Sys.Net.XMLDOM = function XMLDOM(markup) {
    /// <summary locid="M:J#Sys.Net.XMLDOM.#ctor">Creates an XML document from an XML string.</summary>
    /// <param name="markup" type="String">The XML string to parse.</param>
    if (!window.DOMParser) {
        var ex, progIDs = ['Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument'];
        for (var i = 0, l = progIDs.length; i < l; i++) {
            try {
                var xmlDOM = new ActiveXObject(progIDs[i]);
                xmlDOM.async = false;
                xmlDOM.loadXML(markup);
                xmlDOM.setProperty('SelectionLanguage', 'XPath');
                return xmlDOM;
            }
            catch (ex) {
            }
        }
    }
    else {
        try {
            var domParser = new window.DOMParser();
            return domParser.parseFromString(markup, 'text/xml');
        }
        catch (ex) {
        }
    }
    return null;
}

$type = Sys.Net.XMLHttpExecutor = function XMLHttpExecutor() {
    /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.#ctor">XMLHttpExecutor</summary>

    Sys.Net.XMLHttpExecutor.initializeBase(this);

    var _this = this;

    this._onReadyStateChange = (function () {
        /*
        readyState values:
        0 = uninitialized
        1 = loading
        2 = loaded
        3 = interactive
        4 = complete
        */
        if (_this._xmlHttpRequest.readyState === 4 /*complete*/) {
            try {
                if (typeof (_this._xmlHttpRequest.status) === "undefined") {
                    return;
                }
            }
            catch (ex) {
                return;
            }

            _this._clearTimer();
            _this._responseAvailable = true;
            try {
                _this._webRequest.completed(Sys.EventArgs.Empty);
            }
            finally {
                if (_this._xmlHttpRequest) {
                    _this._xmlHttpRequest.onreadystatechange = Function.emptyMethod;
                    _this._xmlHttpRequest = null;
                }
            }
        }
    });

    this._clearTimer = (function () {
        if (_this._timer) {
            window.clearTimeout(_this._timer);
            _this._timer = null;
        }
    });

    this._onTimeout = (function () {
        if (!_this._responseAvailable) {
            _this._clearTimer();
            _this._timedOut = true;
            var xhr = _this._xmlHttpRequest;
            xhr.onreadystatechange = Function.emptyMethod;
            xhr.abort();
            _this._webRequest.completed(Sys.EventArgs.Empty);
            _this._xmlHttpRequest = null;
        }
    });

}

$type.prototype = {

    get_timedOut: function XMLHttpExecutor$get_timedOut() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.timedOut">True if the executor has timed out.</value>
        return !!this._timedOut;
    },

    get_started: function XMLHttpExecutor$get_started() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.started">True if the executor has started.</value>
        return !!this._started;
    },

    get_responseAvailable: function XMLHttpExecutor$get_responseAvailable() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.responseAvailable">True if a response is available.</value>
        return !!this._responseAvailable;
    },

    get_aborted: function XMLHttpExecutor$get_aborted() {
        /// <value type="Boolean" locid="P:J#Sys.Net.XMLHttpExecutor.aborted">True if the executor has been aborted.</value>
        return !!this._aborted;
    },

    executeRequest: function XMLHttpExecutor$executeRequest() {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.executeRequest">Invokes the request.</summary>
        var isFileUploadRequest = false;
        if (arguments.length === 1 && arguments[0].toString() === '[object FormData]') {
            isFileUploadRequest = true;
        }
        var request = this.get_webRequest();
        this._webRequest = request;


        var body = request.get_body();
        var headers = request.get_headers();
        var xhr = new XMLHttpRequest();
        this._xmlHttpRequest = xhr;
        xhr.onreadystatechange = this._onReadyStateChange;

        if (isFileUploadRequest && xhr.upload) {
            xhr.upload.addEventListener('load', this.bind(this.load, this), false);
            xhr.upload.addEventListener('progress', this.bind(this.progress, this), false);
            xhr.upload.addEventListener('error', this.bind(this.error, this), false);
            xhr.upload.addEventListener('abort', this.bind(this.uploadAbort, this), false);
        }

        var verb = request.get_httpVerb();
        xhr.open(verb, request.getResolvedUrl(), true /*async*/);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (headers) {
            for (var header in headers) {
                var val = headers[header];
                if (typeof (val) !== "function")
                    xhr.setRequestHeader(header, val);
            }
        }

        if (verb.toLowerCase() === "post") {
            if (!isFileUploadRequest) {
                if ((headers === null) || !headers['Content-Type']) {
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
                }
            }

            if (!body) {
                body = "";
            }
        }

        var timeout = request.get_timeout();
        if (timeout > 0) {
            this._timer = window.setTimeout(Function.createDelegate(this, this._onTimeout), timeout);
        }

        if (isFileUploadRequest) {
            xhr.send(arguments[0]);
        }
        else {
            xhr.send(body);
        }
        this._started = true;
    },

    getResponseHeader: function XMLHttpExecutor$getResponseHeader(header) {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.getResponseHeader">Returns a response header.</summary>
        /// <param name="header" type="String">The requested header.</param>
        /// <returns type="String">The value of the header.</returns>

        var er, result;
        try {
            result = this._xmlHttpRequest.getResponseHeader(header);
        } catch (er) {
        }
        if (!result) result = "";
        return result;
    },

    getAllResponseHeaders: function XMLHttpExecutor$getAllResponseHeaders() {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.getAllResponseHeaders">Returns all the responses header.</summary>
        /// <returns type="String">The text of all the headers.</returns>

        return this._xmlHttpRequest.getAllResponseHeaders();
    },

    get_responseData: function XMLHttpExecutor$get_responseData() {
        /// <value type="String" locid="P:J#Sys.Net.XMLHttpExecutor.responseData">The text of the response.</value>

        return this._xmlHttpRequest.responseText;
    },

    get_statusCode: function XMLHttpExecutor$get_statusCode() {
        /// <value type="Number" locid="P:J#Sys.Net.XMLHttpExecutor.statusCode">The status code of the response.</value>
        var ex, result = 0;
        try {
            result = this._xmlHttpRequest.status;
        }
        catch (ex) {
        }
        return result;
    },

    get_statusText: function XMLHttpExecutor$get_statusText() {
        /// <value type="String" locid="P:J#Sys.Net.XMLHttpExecutor.statusText">The status text of the repsonse.</value>

        return this._xmlHttpRequest.statusText;
    },

    get_xml: function XMLHttpExecutor$get_xml() {
        /// <value locid="P:J#Sys.Net.XMLHttpExecutor.xml">The response in xml format.</value>
        var xhr = this._xmlHttpRequest;
        var xml = xhr.responseXML;
        if (!xml || !xml.documentElement) {

            xml = Sys.Net.XMLDOM(xhr.responseText);

            if (!xml || !xml.documentElement)
                return null;
        }
        else if (navigator.userAgent.indexOf('MSIE') !== -1) {
            xml.setProperty('SelectionLanguage', 'XPath');
        }

        if (xml.documentElement.namespaceURI === "http://www.mozilla.org/newlayout/xml/parsererror.xml" &&
            xml.documentElement.tagName === "parsererror") {
            return null;
        }

        if (xml.documentElement.firstChild && xml.documentElement.firstChild.tagName === "parsererror") {
            return null;
        }

        return xml;
    },

    abort: function XMLHttpExecutor$abort() {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.abort">Aborts the request.</summary>

        if (this._aborted || this._responseAvailable || this._timedOut)
            return;

        this._aborted = true;

        this._clearTimer();
        var xhr = this._xmlHttpRequest;
        if (xhr && !this._responseAvailable) {

            xhr.onreadystatechange = Function.emptyMethod;
            xhr.abort();

            this._xmlHttpRequest = null;

            this._webRequest.completed(Sys.EventArgs.Empty);
        }
    },

    bind: function (fn, bind) {
        return function () {
            fn.apply(bind, arguments);
        };
    },

    add_load: function XMLHttpExecutor$add_load(handler) {
        /// <summary locid="E:J#Sys.Net.XMLHttpExecutor.load"></summary>
        Sys.Observer.addEventHandler(this, "load", handler);
    },

    remove_load: function XMLHttpExecutor$remove_load(handler) {
        Sys.Observer.removeEventHandler(this, "load", handler);
    },

    load: function XMLHttpExecutor$load(eventArgs) {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.load">The load method should be called when the request is completed.</summary>
        /// <param name="eventArgs" type="XMLHttpRequestProgressEvent">The event args to raise the event with.</param>                
        function raise(source, sender, eventName) {
            var handler = Sys.Observer._getContext(source, true).events.getHandler(eventName);
            if (handler) {
                handler(sender, eventArgs);
            }
        }

        raise(this, this, "load");
        Sys.Observer.clearEventHandlers(this, "load");
    },

    add_progress: function XMLHttpExecutor$add_progress(handler) {
        /// <summary locid="E:J#Sys.Net.XMLHttpExecutor.progress"></summary>
        Sys.Observer.addEventHandler(this, "progress", handler);
    },

    remove_progress: function XMLHttpExecutor$remove_progress(handler) {
        Sys.Observer.removeEventHandler(this, "progress", handler);
    },

    progress: function XMLHttpExecutor$progress(eventArgs) {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.progress">The progress method should be called to know the progess of uploading file.</summary>
        /// <param name="eventArgs" type="Sys.EventArgs">The event args to raise the event with.</param>
        function raise(source, sender, eventName) {
            var handler = Sys.Observer._getContext(source, true).events.getHandler(eventName);
            if (handler) {
                handler(sender, eventArgs);
            }
        }
        raise(this, this, "progress");        
    },

    add_error: function XMLHttpExecutor$add_error(handler) {
        /// <summary locid="E:J#Sys.Net.XMLHttpExecutor.error"></summary>
        Sys.Observer.addEventHandler(this, "error", handler);
    },

    remove_error: function XMLHttpExecutor$remove_error(handler) {
        Sys.Observer.removeEventHandler(this, "error", handler);
    },

    error: function XMLHttpExecutor$error(eventArgs) {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.error">The error method is called when an error occurs in the request.</summary>
        /// <param name="eventArgs" type="XMLHttpRequestProgressEvent">The event args to raise the event with.</param>
        function raise(source, sender, eventName) {
            var handler = Sys.Observer._getContext(source, true).events.getHandler(eventName);
            if (handler) {
                handler(sender, eventArgs);
            }
        }
        raise(this, this, "error");
        Sys.Observer.clearEventHandlers(this, "error");
    },

    add_uploadAbort: function XMLHttpExecutor$add_uploadAbort(handler) {
        /// <summary locid="E:J#Sys.Net.XMLHttpExecutor.uploadAbort"></summary>
        Sys.Observer.addEventHandler(this, "uploadAbort", handler);
    },

    remove_uploadAbort: function XMLHttpExecutor$remove_uploadAbort(handler) {
        Sys.Observer.removeEventHandler(this, "uploadAbort", handler);
    },

    uploadAbort: function XMLHttpExecutor$uploadAbort(eventArgs) {
        /// <summary locid="M:J#Sys.Net.XMLHttpExecutor.uploadAbort">The uploadAbort method is called when upload file request is aborted.</summary>
        /// <param name="eventArgs" type="XMLHttpRequestProgressEvent">The event args to raise the event with.</param>
        function raise(source, sender, eventName) {
            var handler = Sys.Observer._getContext(source, true).events.getHandler(eventName);
            if (handler) {
                handler(sender, eventArgs);
            }
        }
        raise(this, this, "uploadAbort");
        Sys.Observer.clearEventHandlers(this, "uploadAbort");
    }
}
$type.registerClass('Sys.Net.XMLHttpExecutor', Sys.Net.WebRequestExecutor);
$type = Sys.Net._WebRequestManager = function _WebRequestManager() {
    /// <summary locid="P:J#Sys.Net.WebRequestManager.#ctor"></summary>
    this._defaultExecutorType = "Sys.Net.XMLHttpExecutor";
}

$type.prototype = {
    add_invokingRequest: function _WebRequestManager$add_invokingRequest(handler) {
        /// <summary locid="E:J#Sys.Net.WebRequestManager.invokingRequest"></summary>
        Sys.Observer.addEventHandler(this, "invokingRequest", handler);
    },
    remove_invokingRequest: function _WebRequestManager$remove_invokingRequest(handler) {
        Sys.Observer.removeEventHandler(this, "invokingRequest", handler);
    },

    add_completedRequest: function _WebRequestManager$add_completedRequest(handler) {
        /// <summary locid="E:J#Sys.Net.WebRequestManager.completedRequest"></summary>
        Sys.Observer.addEventHandler(this, "completedRequest", handler);
    },
    remove_completedRequest: function _WebRequestManager$remove_completedRequest(handler) {
        Sys.Observer.removeEventHandler(this, "completedRequest", handler);
    },
    get_defaultTimeout: function _WebRequestManager$get_defaultTimeout() {
        /// <value type="Number" locid="P:J#Sys.Net.WebRequestManager.defaultTimeout">The default timeout for requests in milliseconds.</value>
        return this._defaultTimeout || 0;
    },
    set_defaultTimeout: function _WebRequestManager$set_defaultTimeout(value) {

        this._defaultTimeout = value;
    },

    get_defaultExecutorType: function _WebRequestManager$get_defaultExecutorType() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequestManager.defaultExecutorType">The default executor type name.</value>
        return this._defaultExecutorType;
    },
    set_defaultExecutorType: function _WebRequestManager$set_defaultExecutorType(value) {
        this._defaultExecutorType = value;
    },

    executeRequest: function _WebRequestManager$executeRequest(webRequest) {
        /// <summary locid="M:J#Sys.Net.WebRequestManager.executeRequest">Executes a request.</summary>
        /// <param name="webRequest" type="Sys.Net.WebRequest">The webRequest to execute.</param>
        var executor = webRequest.get_executor();
        if (!executor) {
            var er, failed;
            try {
                var executorType = window.eval(this._defaultExecutorType);
                executor = new executorType();
            }
            catch (er) {
                failed = true;
            }


            webRequest.set_executor(executor);
        }

        if (!executor.get_aborted()) {
            var evArgs = new Sys.Net.NetworkRequestEventArgs(webRequest);
            Sys.Observer.raiseEvent(this, "invokingRequest", evArgs);
            if (!evArgs.get_cancel()) {
                executor.executeRequest();
            }
        }
    }
}

$type.registerClass('Sys.Net._WebRequestManager');

Sys.Net.WebRequestManager = new Sys.Net._WebRequestManager();
$type = Sys.Net.NetworkRequestEventArgs = function NetworkRequestEventArgs(webRequest) {
    /// <summary locid="M:J#Sys.Net.NetworkRequestEventArgs.#ctor">This class is raised by the WebRequestManager when a WebRequest is about to be executed.</summary>
    /// <param name="webRequest" type="Sys.Net.WebRequest">The identifier for the event.</param>
    Sys.Net.NetworkRequestEventArgs.initializeBase(this);
    this._webRequest = webRequest;
}

$type.prototype = {
    get_webRequest: function NetworkRequestEventArgs$get_webRequest() {
        /// <value type="Sys.Net.WebRequest" locid="P:J#Sys.Net.NetworkRequestEventArgs.webRequest">The request about to be executed.</value>
        return this._webRequest;
    }
}

$type.registerClass('Sys.Net.NetworkRequestEventArgs', Sys.CancelEventArgs);
$type = Sys.Net.WebRequest = function WebRequest() {
    /// <summary locid="M:J#Sys.Net.WebRequest.#ctor">WebRequest class</summary>
    this._url = "";
    this._headers = { };
    this._body = null;
    this._userContext = null;
    this._httpVerb = null;
}

$type.prototype = {
    add_completed: function WebRequest$add_completed(handler) {
        /// <summary locid="E:J#Sys.Net.WebRequest.completed"></summary>
        Sys.Observer.addEventHandler(this, "completed", handler);
    },
    remove_completed: function WebRequest$remove_completed(handler) {
        Sys.Observer.removeEventHandler(this, "completed", handler);
    },

    completed: function WebRequest$completed(eventArgs) {
        /// <summary locid="M:J#Sys.Net.WebRequest.completed">The completed method should be called when the request is completed.</summary>
        /// <param name="eventArgs" type="Sys.EventArgs">The event args to raise the event with.</param>
        function raise(source, sender, eventName) {
            var handler = Sys.Observer._getContext(source, true).events.getHandler(eventName);
            if (handler) {
                handler(sender, eventArgs);
            }
        }
        raise(Sys.Net.WebRequestManager, this._executor, "completedRequest");
        raise(this, this._executor, "completed");
        Sys.Observer.clearEventHandlers(this, "completed");
    },

    get_url: function WebRequest$get_url() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequest.url">The url.</value>
        return this._url;
    },
    set_url: function WebRequest$set_url(value) {
        this._url = value;
    },

    get_headers: function WebRequest$get_headers() {
        /// <value locid="P:J#Sys.Net.WebRequest.headers">The headers dictionary for the request.</value>
        return this._headers;
    },

    get_httpVerb: function WebRequest$get_httpVerb() {
        /// <value type="String" locid="P:J#Sys.Net.WebRequest.httpVerb">The httpVerb for the request.</value>
        if (this._httpVerb === null) {
            if (this._body === null) {
                return "GET";
            }
            return "POST";
        }
        return this._httpVerb;
    },
    set_httpVerb: function WebRequest$set_httpVerb(value) {
        this._httpVerb = value;
    },

    get_body: function WebRequest$get_body() {
        /// <value mayBeNull="true" locid="P:J#Sys.Net.WebRequest.body">The body of the request.</value>
        return this._body;
    },
    set_body: function WebRequest$set_body(value) {
        this._body = value;
    },

    get_userContext: function WebRequest$get_userContext() {
        /// <value mayBeNull="true" locid="P:J#Sys.Net.WebRequest.userContext">The userContext of the request.</value>
        return this._userContext;
    },
    set_userContext: function WebRequest$set_userContext(value) {
        this._userContext = value;
    },

    get_executor: function WebRequest$get_executor() {
        /// <value type="Sys.Net.WebRequestExecutor" locid="P:J#Sys.Net.WebRequest.executor">The executor for the request.</value>
        return this._executor || null;
    },
    set_executor: function WebRequest$set_executor(value) {
        this._executor = value;
        value._set_webRequest(this);
    },

    get_timeout: function WebRequest$get_timeout() {
        /// <value type="Number" locid="P:J#Sys.Net.WebRequest.timeout">The timeout in milliseconds for the request.</value>
        return this._timeout || Sys.Net.WebRequestManager.get_defaultTimeout();
    },
    set_timeout: function WebRequest$set_timeout(value) {
        this._timeout = value;
    },

    getResolvedUrl: function WebRequest$getResolvedUrl() {
        /// <summary locid="M:J#raise">The getResolvedUrl method returns the url resolved against the base url of the page if set.</summary>
        /// <returns type="String">The resolved url for the request.</returns>
        return Sys.Net.WebRequest._resolveUrl(this._url);
    },

    invoke: function WebRequest$invoke() {
        /// <summary locid="M:J#raise">Invokes the request</summary>
        Sys.Net.WebRequestManager.executeRequest(this);
    }
}

$type._resolveUrl = function WebRequest$_resolveUrl(url, baseUrl) {
    if (url && url.indexOf('://') > 0) {
        return url;
    }

    if (!baseUrl || !baseUrl.length) {
        var baseElement = Sys.get('base');
        if (baseElement && baseElement.href && baseElement.href.length) {
            baseUrl = baseElement.href;
        }
        else {
            baseUrl = document.URL;
        }
    }

    var qsStart = baseUrl.indexOf('?');
    if (qsStart > 0) {
        baseUrl = baseUrl.substr(0, qsStart);
    }
    qsStart = baseUrl.indexOf('#');
    if (qsStart > 0) {
        baseUrl = baseUrl.substr(0, qsStart);
    }
    baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1);

    if (!url || !url.length) {
        return baseUrl;
    }

    if (url.charAt(0) === '/') {
        var slashslash = baseUrl.indexOf('://');

        var nextSlash = baseUrl.indexOf('/', slashslash + 3);

        return baseUrl.substr(0, nextSlash) + url;
    }
    else {
        var lastSlash = baseUrl.lastIndexOf('/');

        return baseUrl.substr(0, lastSlash+1) + url;
    }
}

$type._createQueryString = function WebRequest$_createQueryString(queryString, encodeMethod, addParams) {
    encodeMethod = encodeMethod || encodeURIComponent;
    var i = 0, obj, val, arg, sb = new Sys.StringBuilder();
    if (queryString) {
        for (arg in queryString) {
            obj = queryString[arg];
            if (typeof(obj) === "function") continue;
            val = Sys.Serialization.JavaScriptSerializer.serialize(obj);
            if (i++) {
                sb.append('&');
            }
            sb.append(arg);
            sb.append('=');
            sb.append(encodeMethod(val));
        }
    }
    if (addParams) {
        if (i) {
            sb.append('&');
        }
        sb.append(addParams);
    }
    return sb.toString();
}

$type._createUrl = function WebRequest$_createUrl(url, queryString, addParams) {
    if (!queryString && !addParams) {
        return url;
    }
    var qs = Sys.Net.WebRequest._createQueryString(queryString, null, addParams);
    return qs.length
        ? url + ((url && url.indexOf('?') >= 0) ? "&" : "?") + qs
        : url;
}

$type.registerClass('Sys.Net.WebRequest');

}

if (window.Sys && Sys.loader) {
	Sys.loader.registerScript("Network", null, execute);
}
else {
	execute();
}

})();
