/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "44b8790008a5d0fb2bf3"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"modules/frontEnd": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/modules/frontEnd/index.jsx","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./src/modules/frontEnd/style.css":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/postcss-loader/lib!./src/modules/frontEnd/style.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!../../../node_modules/css-loader!../../less/global.css */ "./node_modules/css-loader/index.js!./src/less/global.css"), "");

// module
exports.push([module.i, ".home {\n  color: rgba(0, 0, 0, 0.8);\n  position: relative;\n}\n\n.home .banner {\n  text-align: center;\n}\n\n.home .banner h1 {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 2em;\n}\n\n.home .banner h2 {\n  color: rgba(0, 0, 0, 0.5);\n  font-family: \"Merriweather\", serif;\n  font-size: 1.8em;\n}\n\n@media (max-width:768px) {\n  .home .banner {\n    padding: 4rem 2rem;\n  }\n  .home .banner h1 {\n    font-size: 1.5em;\n  }\n  .home .banner h2 {\n    font-size: 1.3em;\n  }\n}\n\n.list .item {\n  border: none;\n  border-bottom: 1px solid rgb(230, 230, 230);\n  border-radius: 0;\n}\n\n.list .item .title {\n  font-family: \"Open Sans\", sans-serif;\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.list .item .desc {\n  color: #3A4145;\n  font-family: \"Merriweather\", serif;\n}\n\n.list .item .author img {\n  width: 1.2rem;\n  height: 1.2rem;\n  border-radius: 50%;\n}\n\n.home .container {\n  width: 50%;\n}\n\n@media (max-width:768px) {\n  .home .container {\n    width: 100%;\n  }\n}\n\n.home .container .list .tips {\n  text-align: center;\n  padding: 10px;\n  background-color: #e9ecef;\n}\n\n.home .container .pager {\n  width: 100%;\n  height: 3rem;\n  margin-top: 1rem;\n}\n\n.home .container .pager button {\n  display: inline-block;\n  width: auto;\n  float: left;\n  color: #889093;\n  border-color: #98a0a4;\n  padding: 5px 8px;\n  border-radius: 5px;\n  border: 1px solid #889093;\n  cursor: pointer;\n}\n\n.home .container .pager .next {\n  float: right;\n  text-align: right;\n}\n\n.home .footer {\n  padding: 1rem 0;\n  width: 100%;\n  text-align: center;\n}\n\n#panel .toggle-menu {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  z-index: 2;\n}\n\n.home .menu {\n  background-color: #111;\n}\n\n.menu .nav-box .nav-title {\n  padding: 3.2rem 7% 0;\n  font-size: 1.4rem;\n  color: #fff;\n}\n\n.menu .nav-box .nav-ls {\n  padding: 0.5rem 7%;\n  counter-reset: item;\n}\n\n.menu .nav-box .nav-ls .nav-itm {\n  display: flex;\n  color: #B8B8B8;\n  font-family: \"Merriweather\", serif;\n  font-size: 1.4rem;\n  max-width: 18rem;\n  overflow: hidden;\n}\n\n.menu .nav-box .nav-ls .nav-itm::before {\n  display: inline-block;\n  content: \"................................................................................................................\";\n  order: 2;\n}\n\n.menu .nav-box .nav-ls .nav-itm::after {\n  content: counter(item, lower-roman);\n  counter-increment: item;\n  position: absolute;\n  right: 11px;\n}\n\n.details {\n  padding: 10px;\n  color: #2E2E2E;\n  display: flex;\n  flex-direction: column;\n  justify-content: stretch;\n  height: 100vh;\n}\n\n.details article {\n  flex: 1;\n}\n\n.details article .art-head {\n  margin-top: 50px;\n}\n\n.details article .art-head h1 {\n  font-family: \"Open Sans\", sans-serif;\n}\n\n.details article .art-head span {\n  color: #9EABB3;\n  font-family: \"Open Sans\", sans-serif;\n}\n\n.details article .art-content {\n  font-family: \"Merriweather\", serif;\n}\n\n.details .footer {\n  position: relative;\n  bottom: 0;\n  text-align: center;\n  width: 100%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/less/global.css":
/*!*******************************************************!*\
  !*** ./node_modules/css-loader!./src/less/global.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nbody {\n  width: 100%;\n  height: 100%;\n}\n\n.slideout-menu {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  width: 256px;\n  min-height: 100vh;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  z-index: 0;\n  display: none;\n}\n\n.slideout-menu-left {\n  left: 0;\n}\n\n.slideout-menu-right {\n  right: 0;\n}\n\n.slideout-panel {\n  position: relative;\n  z-index: 1;\n  will-change: transform;\n  background-color: #FFF; /* A background-color is required */\n  min-height: 100vh;\n}\n\n.slideout-open,\n.slideout-open body,\n.slideout-open .slideout-panel {\n  overflow: hidden;\n}\n\n.slideout-open .slideout-menu {\n  display: block;\n}\n\na,a:hover {\n  text-decoration: none;\n  color:#9EABB3;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./src/components/FetchList.jsx":
/*!**************************************!*\
  !*** ./src/components/FetchList.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchList = function FetchList(conf) {
  return function (WrappedComponent) {

    return function (_Component) {
      (0, _inherits3.default)(WrapperComponent, _Component);

      function WrapperComponent(props) {
        (0, _classCallCheck3.default)(this, WrapperComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WrapperComponent.__proto__ || (0, _getPrototypeOf2.default)(WrapperComponent)).call(this, props));

        _this.state = {
          data: null,
          isLoading: false
        };
        return _this;
      }

      (0, _createClass3.default)(WrapperComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.setState({ isLoading: true });
          var request = void 0;
          var methods = conf.methods,
              url = conf.url,
              data = conf.data;

          methods = methods || 'get';
          if (typeof data == 'function') {
            data = data(this.props);
          }
          if (methods.toLowerCase() == 'get') {
            request = _axios2.default.get(url, { params: data });
          } else {
            request = _axios2.default.post(url, data);
          }
          request.then(function (res) {
            if (res.data.code == 0) {
              _this2.setState({
                data: res.data.data
              });
            }
          }).catch(function (e) {
            throw new Error(e);
          }).finally(function () {
            _this2.setState({ isLoading: false });
          });
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.state, this.props));
        }
      }]);
      return WrapperComponent;
    }(_react.Component);
  };
};

exports.default = FetchList;

/***/ }),

/***/ "./src/components/MyMenu.jsx":
/*!***********************************!*\
  !*** ./src/components/MyMenu.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FetchList = __webpack_require__(/*! ./FetchList */ "./src/components/FetchList.jsx");

var _FetchList2 = _interopRequireDefault(_FetchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyMenu = function MyMenu(props) {
  // debugger;
  var menus = props.data,
      isLoading = props.isLoading,
      callback = props.callback;

  console.log(props, menus, '提示');
  var renderMenu = function renderMenu(list) {
    return list.map(function (e, id) {
      return _react2.default.createElement(
        'a',
        { className: 'nav-itm', key: id, onClick: function onClick() {
            return callback(e.name);
          } },
        e.name
      );
    });
  };

  return _react2.default.createElement(
    'div',
    { className: 'nav-ls' },
    !isLoading && menus && menus.length > 0 && renderMenu(menus),
    isLoading && _react2.default.createElement(
      'div',
      null,
      '\u6B63\u5728\u52A0\u8F7D\u83DC\u5355\u4E2D\u3002\u3002\u3002'
    )
  );
};

/* MyMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
}

MyMenu.defaultProps = {
  menus: [],
  callback: () => { }
} */

var conf = {
  methods: 'get',
  url: '/api/ajax/getTags',
  data: {}
};

exports.default = (0, _FetchList2.default)(conf)(MyMenu);

/***/ }),

/***/ "./src/components/Pagination.jsx":
/*!***************************************!*\
  !*** ./src/components/Pagination.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Prev = function Prev(props) {
  var isDisabled = props.interCurrentPage <= 1 ? true : false;
  console.log(isDisabled, props, 'prev');
  var text = props.text || 'Prev';
  return _react2.default.createElement(
    'button',
    { type: 'button', className: 'previous', disabled: isDisabled, onClick: props.prev },
    '\u2190 ',
    text
  );
};

var Next = function Next(props) {
  var isDisabled = props.interCurrentPage === props.interPageCount || props.interPageCount == 0;
  console.log(isDisabled, props, 'next');
  var text = props.text || 'Next';
  return _react2.default.createElement(
    'button',
    { type: 'button', className: 'next', disabled: isDisabled, onClick: props.next },
    '\u2192 ',
    text
  );
};

var Pagination = function (_Component) {
  (0, _inherits3.default)(Pagination, _Component);

  function Pagination(props) {
    (0, _classCallCheck3.default)(this, Pagination);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Pagination.__proto__ || (0, _getPrototypeOf2.default)(Pagination)).call(this, props));

    var _this$props = _this.props,
        currentPage = _this$props.currentPage,
        pageSize = _this$props.pageSize,
        total = _this$props.total;

    _this.state = {
      interCurrentPage: currentPage,
      interPageCount: _this.getValidPageCount(),
      pageSize: pageSize,
      total: total
    };

    return _this;
  }

  (0, _createClass3.default)(Pagination, [{
    key: 'prev',
    value: function prev() {
      var _this2 = this;

      var oldVal = this.state.interCurrentPage;
      var newVal = this.state.interCurrentPage - 1;

      this.setState({
        interCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this2.state.interCurrentPage !== oldVal) {
          var currentChange = _this2.props.currentChange;
          currentChange && currentChange(_this2.state.interCurrentPage);
        }
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var _this3 = this;

      var oldVal = this.state.interCurrentPage;
      var newVal = this.state.interCurrentPage + 1;

      this.setState({
        interCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this3.state.interCurrentPage !== oldVal) {
          var currentChange = _this3.props.currentChange;
          currentChange && currentChange(_this3.state.interCurrentPage);
        }
      });
    }
  }, {
    key: 'getValidCurrentPage',
    value: function getValidCurrentPage(val) {
      var pageCount = this.getValidPageCount();
      var resetVal = void 0;
      if (pageCount) {
        if (val > pageCount) {
          resetVal = pageCount;
        } else if (val < 1) {
          resetVal = 1;
        } else {
          resetVal = val;
        }
      } else {
        resetVal = 1;
      }

      return resetVal === undefined ? val : resetVal;
    }
  }, {
    key: 'getValidPageCount',
    value: function getValidPageCount() {
      console.log(this.props, 'pageCount');
      var _props = this.props,
          total = _props.total,
          pageSize = _props.pageSize;

      return Math.ceil(total / pageSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          interCurrentPage = _state.interCurrentPage,
          interPageCount = _state.interPageCount;

      return _react2.default.createElement(
        'div',
        { className: 'pager' },
        _react2.default.createElement(Prev, { text: '\u4E0A\u4E00\u9875', interCurrentPage: interCurrentPage, prev: this.prev.bind(this) }),
        _react2.default.createElement(Next, { text: '\u4E0B\u4E00\u9875', interCurrentPage: interCurrentPage, interPageCount: interPageCount, next: this.next.bind(this) })
      );
    }
  }]);
  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  currentChange: _propTypes2.default.func,
  pageSize: _propTypes2.default.number,
  currentPage: _propTypes2.default.number,
  total: _propTypes2.default.number
};

Pagination.defaultProps = {
  currentChange: function currentChange() {},
  pageSize: 4,
  currentPage: 1
};

exports.default = Pagination;

/***/ }),

/***/ "./src/modules/frontEnd/app.jsx":
/*!**************************************!*\
  !*** ./src/modules/frontEnd/app.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);
    return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'app' },
        this.props.children
      );
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ "./src/modules/frontEnd/details.jsx":
/*!******************************************!*\
  !*** ./src/modules/frontEnd/details.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _filter = __webpack_require__(/*! ../../support/filter */ "./src/support/filter.js");

var _filter2 = _interopRequireDefault(_filter);

var _FetchList = __webpack_require__(/*! ../../components/FetchList */ "./src/components/FetchList.jsx");

var _FetchList2 = _interopRequireDefault(_FetchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Detail = function Detail(_ref) {
  var data = _ref.data,
      isLoading = _ref.isLoading;


  var enterHTML = function enterHTML() {
    return { __html: data.content };
  };

  return _react2.default.createElement(
    'div',
    { className: 'details' },
    isLoading && _react2.default.createElement(
      'div',
      null,
      '\u6B63\u5728\u52A0\u8F7D\u6570\u636E\u3002\u3002\u3002'
    ),
    data && _react2.default.createElement(
      'article',
      null,
      _react2.default.createElement(
        'div',
        { className: 'art-head' },
        _react2.default.createElement(
          'h1',
          null,
          data.title
        ),
        _react2.default.createElement(
          'span',
          null,
          _filter2.default.formatDate(data.time),
          ' \u4E8E ',
          data.tag,
          ' '
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'art-content' },
        _react2.default.createElement('p', { dangerouslySetInnerHTML: enterHTML() })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'footer' },
      'Vin Coder \xA92018'
    )
  );
};

var conf = {
  methods: 'get',
  url: '/api/ajax/details',
  data: function data(props) {
    return { id: props.params.categoryId };
  }
};

exports.default = (0, _FetchList2.default)(conf)(Detail);

/***/ }),

/***/ "./src/modules/frontEnd/ducks/home.js":
/*!********************************************!*\
  !*** ./src/modules/frontEnd/ducks/home.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FETCHED = 'FETCHED';
// Action Creater
var actions = {
  getAllMenu: function getAllMenu() {
    return function (dispatch) {
      axios.get('/api/ajax/getTags').then(function (_ref) {
        var data = _ref.data;

        dispatch({ type: FETCHED, payload: data.data });
      });
    };
  }
};

// Reducer
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { menus: [] };
  var action = arguments[1];

  switch (action.type) {
    case FETCHED:
      return (0, _extends3.default)({}, state, {
        menus: [].concat((0, _toConsumableArray3.default)(action.payload))
      });
    default:
      return state;
  }
};

exports.default = reducer;
exports.actions = actions;

/***/ }),

/***/ "./src/modules/frontEnd/ducks/index.js":
/*!*********************************************!*\
  !*** ./src/modules/frontEnd/ducks/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _home = __webpack_require__(/*! ./home */ "./src/modules/frontEnd/ducks/home.js");

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({
  home: _home2.default
});

exports.default = reducer;

/***/ }),

/***/ "./src/modules/frontEnd/home.jsx":
/*!***************************************!*\
  !*** ./src/modules/frontEnd/home.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _MyMenu = __webpack_require__(/*! ../../components/MyMenu */ "./src/components/MyMenu.jsx");

var _MyMenu2 = _interopRequireDefault(_MyMenu);

var _Pagination = __webpack_require__(/*! ../../components/Pagination */ "./src/components/Pagination.jsx");

var _Pagination2 = _interopRequireDefault(_Pagination);

var _filter = __webpack_require__(/*! ../../support/filter */ "./src/support/filter.js");

var _filter2 = _interopRequireDefault(_filter);

var _slideout = __webpack_require__(/*! slideout */ "./node_modules/slideout/index.js");

var _slideout2 = _interopRequireDefault(_slideout);

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactLoadable = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loading() {
  return _react2.default.createElement(
    'div',
    null,
    'Loading...'
  );
}

// react-loadable 懒加载
// const LoadMenu = Loadable({
//   loader: () => import('../../components/MyMenu'),
//   loading: Loading,
//   render(loaded, props) {
//     let Menu = loaded.default;
//     console.log({ ...props }, '懒加载');
//     return <Menu {...props} />
//   }
// })

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    _this.getArticleListByTagName = function (tag) {
      _axios2.default.get('/api/ajax/list?isPublish=true&tag=' + tag).then(function (response) {
        var list = response.data.data.list;
        _this.setState({
          list: list
        });
      });
    };

    _this.state = {
      menus: [],
      list: [],
      page: 1,
      size: 2,
      total: 0
    };
    _this.timer = 0;
    _this.request = null;
    _this.slideout = null;
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _state = this.state,
          page = _state.page,
          size = _state.size;

      this.getArticleList(page, size);
      this.slideout = new _slideout2.default({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70,
        'side': 'right'
      });
    }
  }, {
    key: 'getArticleList',
    value: function getArticleList(page, size) {
      var _this2 = this;

      _axios2.default.get('/api/ajax/list?isPublish=true&page=' + page + '&size=' + size).then(function (response) {
        var _response$data$data = response.data.data,
            list = _response$data$data.list,
            total = _response$data$data.total;
        // console.log(list, 'dsd');

        _this2.setState({ list: list, total: total }, function () {
          console.log(_this2.state, 'wtf');
        });
      }).catch(function (err) {
        throw new Error(err);
      });
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      this.slideout.toggle();
    }
  }, {
    key: 'renderItem',
    value: function renderItem() {
      var list = this.state.list;

      return list.map(function (item) {
        return _react2.default.createElement(
          _reactRouter.Link,
          { to: 'details/' + item._id, key: item._id },
          _react2.default.createElement(
            'div',
            { className: 'list-group-item item' },
            _react2.default.createElement(
              'h3',
              { className: 'title' },
              item.title
            ),
            _react2.default.createElement(
              'p',
              { className: 'desc' },
              item.description
            ),
            _react2.default.createElement(
              'div',
              { className: 'author row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-1' },
                _react2.default.createElement('img', { src: 'http://www.gravatar.com/avatar/4a35d104523ef520dd5d9f60c7e1eeb1?s=250&d=mm&r=x', alt: '' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'at-name col-xs-11 col-md-5' },
                item.author,
                ' \u4E8E ',
                item.tag
              ),
              _react2.default.createElement(
                'div',
                { className: 'time col-xs-12 col-md-6' },
                _filter2.default.formatDate(item.time),
                ' '
              )
            )
          )
        );
      });
    }
  }, {
    key: 'handleChangePage',
    value: function handleChangePage(page) {
      var size = this.state.size;
      this.getArticleList(page, size);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          list = _state2.list,
          total = _state2.total,
          size = _state2.size;

      return _react2.default.createElement(
        'div',
        { className: 'home' },
        _react2.default.createElement(
          'div',
          { id: 'menu', className: 'menu slideout-menu slideout-menu-right' },
          _react2.default.createElement(
            'div',
            { className: 'nav-box' },
            _react2.default.createElement(
              'div',
              { className: 'nav-title' },
              'MENU'
            ),
            _react2.default.createElement(_MyMenu2.default, { callback: this.getArticleListByTagName })
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'panel' },
          _react2.default.createElement(
            'div',
            { className: 'toggle-menu', onClick: this.toggleMenu.bind(this) },
            _react2.default.createElement(
              'span',
              { className: 'icon' },
              '\u2630'
            ),
            _react2.default.createElement(
              'span',
              { className: 'text' },
              'MENU'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'jumbotron banner' },
            _react2.default.createElement(
              'h1',
              null,
              'Vin_Coder`s Life'
            ),
            _react2.default.createElement(
              'h2',
              null,
              'Learn,thought and stories'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'div',
              { className: 'list-group list' },
              list && list.length > 0 && this.renderItem(),
              (!list || list.length == 0) && _react2.default.createElement(
                'div',
                { className: 'tips' },
                '\u6682\u65E0\u6570\u636E'
              )
            ),
            total > 0 && list.length > 0 && _react2.default.createElement(_Pagination2.default, { total: total, pageSize: size, currentChange: this.handleChangePage.bind(this) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'footer center-block' },
            'Vin Coder \xA92018'
          )
        )
      );
    }
  }]);
  return Home;
}(_react.Component);

// const mapStateToProps = state => ({
//   menus: state.menus
// })

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);


exports.default = Home;

/***/ }),

/***/ "./src/modules/frontEnd/index.jsx":
/*!****************************************!*\
  !*** ./src/modules/frontEnd/index.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");

__webpack_require__(/*! ./style.css */ "./src/modules/frontEnd/style.css");

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");

var _reactLoadable = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _ducks = __webpack_require__(/*! ./ducks */ "./src/modules/frontEnd/ducks/index.js");

var _ducks2 = _interopRequireDefault(_ducks);

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _app = __webpack_require__(/*! ./app */ "./src/modules/frontEnd/app.jsx");

var _app2 = _interopRequireDefault(_app);

var _home = __webpack_require__(/*! ./home */ "./src/modules/frontEnd/home.jsx");

var _home2 = _interopRequireDefault(_home);

var _details = __webpack_require__(/*! ./details */ "./src/modules/frontEnd/details.jsx");

var _details2 = _interopRequireDefault(_details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

var store = (0, _redux.createStore)(_ducks2.default);

// const Loading = () => <div>Loading ,Please wait a while...</div>;

// const App = Loadable({
//   loader: () => import('./app'),
//   loading: Loading
// })

// const Home = Loadable({
//   loader: () => import('./home'),
//   loading: Loading
// })

// const Details = Loadable({
//   loader: () => import('./details'),
//   loading: Loading
// })


_reactDom2.default.render(
// <Provider store={store}>
_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _app2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'frontEnd', component: _home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'details/:categoryId', component: _details2.default })
  )
),
// </Provider>,
document.querySelector('#root'));

/***/ }),

/***/ "./src/modules/frontEnd/style.css":
/*!****************************************!*\
  !*** ./src/modules/frontEnd/style.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!./style.css */ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./src/modules/frontEnd/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!./style.css */ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./src/modules/frontEnd/style.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!./style.css */ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./src/modules/frontEnd/style.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });