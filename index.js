// /*
//  * Copyright 2016 Google Inc. All rights reserved.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *   http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */
// "use strict";

// (function () {
//   var Marzipano = window.Marzipano;
//   var bowser = window.bowser;
//   var screenfull = window.screenfull;
//   var data = window.data;

// // Add global tracking variable at the top of your code
// var currentActiveScene = null;

//   // Grab elements from DOM.
//   var panoElement = document.querySelector("#pano");
//   var sceneNameElement = document.querySelector("#titleBar .sceneName");
//   var sceneListElement = document.querySelector("#sceneList");
//   var sceneElements = document.querySelectorAll("#sceneList .scene");
//   var sceneListToggleElement = document.querySelector("#sceneListToggle");
//   var autorotateToggleElement = document.querySelector("#autorotateToggle");
//   var fullscreenToggleElement = document.querySelector("#fullscreenToggle");

//   // Detect desktop or mobile mode.
//   if (window.matchMedia) {
//     var setMode = function () {
//       if (mql.matches) {
//         document.body.classList.remove("desktop");
//         document.body.classList.add("mobile");
//       } else {
//         document.body.classList.remove("mobile");
//         document.body.classList.add("desktop");
//       }
//     };
//     var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
//     setMode();
//     mql.addListener(setMode);
//   } else {
//     document.body.classList.add("desktop");
//   }

//   // Detect whether we are on a touch device.
//   document.body.classList.add("no-touch");
//   window.addEventListener("touchstart", function () {
//     document.body.classList.remove("no-touch");
//     document.body.classList.add("touch");
//   });

//   // Use tooltip fallback mode on IE < 11.
//   if (bowser.msie && parseFloat(bowser.version) < 11) {
//     document.body.classList.add("tooltip-fallback");
//   }

//   // Viewer options.
//   var viewerOpts = {
//     controls: {
//       mouseViewMode: data.settings.mouseViewMode,
//     },
//   };

//   // Initialize viewer.
//   var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

//   // Create scenes with progressive loading
//   // var scenes = data.scenes.map(function (data) {
//   //   console.log(`Creating single progressive scene for: ${data.id}`);

//   //   var imagePaths = {
//   //     low: data.images.low,
//   //     high: data.images.high,
//   //   };
//   //   // var imagePaths = {
//   //   //   low: `/images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
//   //   //   high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
//   //   // };

//   //   // SINGLE SCENE that starts with low quality and upgrades to HD
//   //   var currentSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
//   //   var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
//   //   var limiter = Marzipano.RectilinearView.limit.traditional(
//   //     4096,
//   //     (100 * Math.PI) / 180,
//   //     (120 * Math.PI) / 180
//   //   );
//   //   var view = new Marzipano.RectilinearView(
//   //     data.initialViewParameters,
//   //     limiter
//   //   );

//   //   var scene = viewer.createScene({
//   //     source: currentSource,
//   //     geometry: geometry,
//   //     view: view,
//   //   });

//   //   var upgraded = false;
//   //   var upgradeTimeout;
//   //   var hdScene = null;

//   //   // Quality indicator
//   //   function updateQualityInfo() {
//   //     var info = document.getElementById("qualityInfo");
//   //     if (!info) {
//   //       info = document.createElement("div");
//   //       info.id = "qualityInfo";
//   //       info.style.cssText = `
//   //         position: fixed; bottom: 20px; right: 20px;
//   //         background: rgba(0,0,0,0.7); color: white;
//   //         padding: 6px 10px; border-radius: 4px; z-index: 1000;
//   //         font-family: Arial, sans-serif; font-size: 18px;
//   //       `;
//   //       document.body.appendChild(info);
//   //     }

//   //     var qualityColor = upgraded ? "#4CAF50" : "#FF9800";
//   //     info.innerHTML = `<div style="color: ${qualityColor};">● ${
//   //       upgraded ? "8K" : "SD"
//   //     } - ${data.name}</div>`;
//   //   }

//   //   // Create HD scene in background
//   //   function createHDScene() {
//   //     if (hdScene) return hdScene;

//   //     var hdSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, {
//   //       crossOrigin: "anonymous",
//   //     });
//   //     var hdGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);

//   //     hdScene = viewer.createScene({
//   //       source: hdSource,
//   //       geometry: hdGeometry,
//   //       view: view,
//   //     });
//   //     if (data.linkHotspots) {
//   //       // Copy hotspots to HD scene
//   //       data.linkHotspots.forEach(function (hotspot) {
//   //         var element = createLinkHotspotElement(hotspot);
//   //         hdScene
//   //           .hotspotContainer()
//   //           .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   //       });
//   //     }
//   //     if (data.infoHotspots) {
//   //       data.infoHotspots.forEach(function (hotspot) {
//   //         var element = createInfoHotspotElement(hotspot);
//   //         hdScene
//   //           .hotspotContainer()
//   //           .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   //       });
//   //     }

//   //     return hdScene;
//   //   }

//   //   // Smooth HD upgrade with seamless transition
//   //   function upgradeToHD() {
//   //     if (upgraded) return;

//   //     console.log(`🔄 Upgrading ${data.id} to 8K`);

//   //     var loading = document.getElementById("loadingIndicator");
//   //     if (!loading) {
//   //       loading = document.createElement("div");
//   //       loading.id = "loadingIndicator";
//   //       loading.innerHTML = "Loading 8K...";
//   //       loading.style.cssText = `
//   //         position: fixed; top: 50px; right: 20px;
//   //         background: rgba(0,0,0,0.8); color: white;
//   //         padding: 8px 12px; border-radius: 5px; z-index: 1000;
//   //         font-family: Arial, sans-serif; font-size: 18px;
//   //       `;
//   //       document.body.appendChild(loading);
//   //     }
//   //     loading.style.display = "block";

//   //     // Preload HD image first
//   //     var img = new Image();
//   //     img.crossOrigin = "anonymous";
//   //     img.onload = function () {
//   //       console.log(`✅ 8K preloaded for ${data.id}, creating 8K scene`);

//   //       // Create HD scene
//   //       var hdSceneInstance = createHDScene();

//   //       // Get current view parameters
//   //       var currentParams = scene.view().parameters();
//   //       hdSceneInstance.view().setParameters(currentParams);

//   //       // SEAMLESS SWITCH - No transition time
//   //       hdSceneInstance.switchTo({ transitionDuration: 0 });

//   //       upgraded = true;
//   //       loading.style.display = "none";
//   //       updateQualityInfo();

//   //       // Replace the main scene reference
//   //       scene = hdSceneInstance;

//   //       console.log(`🎉 ${data.id} seamlessly upgraded to 8K`);
//   //     };

//   //     img.onerror = function () {
//   //       console.log(`❌ Failed to load 8K for ${data.id}`);
//   //       loading.style.display = "none";
//   //     };

//   //     img.src = imagePaths.high;
//   //   }
//   //   if (data.linkHotspots) {
//   //     // Add hotspots
//   //     data.linkHotspots.forEach(function (hotspot) {
//   //       var element = createLinkHotspotElement(hotspot);
//   //       scene
//   //         .hotspotContainer()
//   //         .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   //     });
//   //   }

//   //   if (data.infoHotspots) {
//   //     data.infoHotspots.forEach(function (hotspot) {
//   //       var element = createInfoHotspotElement(hotspot);
//   //       scene
//   //         .hotspotContainer()
//   //         .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   //     });
//   //   }

//   //   return {
//   //     data: data,
//   //     scene: scene,
//   //     view: view,
//   //     startUpgrade: function () {
//   //       if (upgradeTimeout) clearTimeout(upgradeTimeout);
//   //       upgradeTimeout = setTimeout(upgradeToHD, 2000);
//   //       updateQualityInfo();
//   //     },
//   //     stopUpgrade: function () {
//   //       if (upgradeTimeout) clearTimeout(upgradeTimeout);
//   //       upgraded = false;
//   //       updateQualityInfo();
//   //     },
//   //   };
//   // });


//   // Modified scene creation with better cancellation
// var scenes = data.scenes.map(function (data) {
//     console.log(`Creating single progressive scene for: ${data.id}`);

//     var imagePaths = {
//         low: data.images.low,
//         high: data.images.high,
//     };

//     var currentSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
//     var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
//     var limiter = Marzipano.RectilinearView.limit.traditional(
//         4096,
//         (100 * Math.PI) / 180,
//         (120 * Math.PI) / 180
//     );
//     var view = new Marzipano.RectilinearView(
//         data.initialViewParameters,
//         limiter
//     );

//     var scene = viewer.createScene({
//         source: currentSource,
//         geometry: geometry,
//         view: view,
//     });

//     var upgraded = false;
//     var upgradeTimeout;
//     var hdScene = null;
//     var isUpgrading = false;
//     var upgradeAborted = false;

//     // Quality indicator
//     function updateQualityInfo() {
//         var info = document.getElementById("qualityInfo");
//         if (!info) {
//             info = document.createElement("div");
//             info.id = "qualityInfo";
//             info.style.cssText = `
//                 position: fixed; bottom: 20px; right: 20px;
//                 background: rgba(0,0,0,0.7); color: white;
//                 padding: 6px 10px; border-radius: 4px; z-index: 1000;
//                 font-family: Arial, sans-serif; font-size: 18px;
//             `;
//             document.body.appendChild(info);
//         }

//         var qualityColor = upgraded ? "#4CAF50" : "#FF9800";
//         info.innerHTML = `<div style="color: ${qualityColor};">● ${
//             upgraded ? "8K" : "SD"
//         } - ${data.name}</div>`;
//     }

//     // Create HD scene in background
//     function createHDScene() {
//         if (hdScene) return hdScene;

//         var hdSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, {
//             crossOrigin: "anonymous",
//         });
//         var hdGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);

//         hdScene = viewer.createScene({
//             source: hdSource,
//             geometry: hdGeometry,
//             view: view,
//         });
        
//         if (data.linkHotspots) {
//             data.linkHotspots.forEach(function (hotspot) {
//                 var element = createLinkHotspotElement(hotspot);
//                 hdScene
//                     .hotspotContainer()
//                     .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//             });
//         }
//         if (data.infoHotspots) {
//             data.infoHotspots.forEach(function (hotspot) {
//                 var element = createInfoHotspotElement(hotspot);
//                 hdScene
//                     .hotspotContainer()
//                     .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//             });
//         }

//         return hdScene;
//     }

//     // Enhanced HD upgrade with proper cancellation checks
//     function upgradeToHD() {
//         if (upgraded || upgradeAborted) return;
        
//         // CRITICAL: Check if this scene is still the active one
//         if (currentActiveScene !== sceneInstance) {
//             console.log(`🚫 Cancelling ${data.id} upgrade - no longer active scene`);
//             upgradeAborted = true;
//             return;
//         }

//         console.log(`🔄 Upgrading ${data.id} to 8K`);
//         isUpgrading = true;

//         var loading = document.getElementById("loadingIndicator");
//         if (!loading) {
//             loading = document.createElement("div");
//             loading.id = "loadingIndicator";
//             loading.innerHTML = "Loading 8K...";
//             loading.style.cssText = `
//                 position: fixed; top: 50px; right: 20px;
//                 background: rgba(0,0,0,0.8); color: white;
//                 padding: 8px 12px; border-radius: 5px; z-index: 1000;
//                 font-family: Arial, sans-serif; font-size: 18px;
//             `;
//             document.body.appendChild(loading);
//         }
//         loading.style.display = "block";

//         // Preload HD image first
//         var img = new Image();
//         img.crossOrigin = "anonymous";
        
//         img.onload = function () {
//             // CRITICAL: Double-check scene is still active before switching
//             if (currentActiveScene !== sceneInstance || upgradeAborted) {
//                 console.log(`🚫 ${data.id} 8K loaded but scene changed - aborting switch`);
//                 loading.style.display = "none";
//                 isUpgrading = false;
//                 return;
//             }

//             console.log(`✅ 8K preloaded for ${data.id}, creating 8K scene`);

//             // Create HD scene
//             var hdSceneInstance = createHDScene();

//             // Get current view parameters
//             var currentParams = scene.view().parameters();
//             hdSceneInstance.view().setParameters(currentParams);

//             // SEAMLESS SWITCH - No transition time
//             hdSceneInstance.switchTo({ transitionDuration: 0 });

//             upgraded = true;
//             isUpgrading = false;
//             loading.style.display = "none";
//             updateQualityInfo();

//             // Replace the main scene reference
//             scene = hdSceneInstance;

//             console.log(`🎉 ${data.id} seamlessly upgraded to 8K`);
//         };

//         img.onerror = function () {
//             console.log(`❌ Failed to load 8K for ${data.id}`);
//             loading.style.display = "none";
//             isUpgrading = false;
//         };

//         img.src = imagePaths.high;
//     }

//     // Add hotspots to initial scene
//     if (data.linkHotspots) {
//         data.linkHotspots.forEach(function (hotspot) {
//             var element = createLinkHotspotElement(hotspot);
//             scene
//                 .hotspotContainer()
//                 .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//         });
//     }

//     if (data.infoHotspots) {
//         data.infoHotspots.forEach(function (hotspot) {
//             var element = createInfoHotspotElement(hotspot);
//             scene
//                 .hotspotContainer()
//                 .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//         });
//     }

//     var sceneInstance = {
//         data: data,
//         scene: scene,
//         view: view,
//         startUpgrade: function () {
//             upgradeAborted = false; // Reset abort flag
//             if (upgradeTimeout) clearTimeout(upgradeTimeout);
//             upgradeTimeout = setTimeout(upgradeToHD, 2000);
//             updateQualityInfo();
//         },
//         stopUpgrade: function () {
//             console.log(`🛑 Stopping upgrade for ${data.id}`);
//             upgradeAborted = true; // Set abort flag
//             if (upgradeTimeout) clearTimeout(upgradeTimeout);
//             upgraded = false;
//             isUpgrading = false;
//             updateQualityInfo();
            
//             // Hide loading indicator if visible
//             var loading = document.getElementById("loadingIndicator");
//             if (loading) {
//                 loading.style.display = "none";
//             }
//         },
//         isUpgrading: function() {
//             return isUpgrading;
//         }
//     };

//     return sceneInstance;
// });


//   // function switchScene(scene) {
//   //   console.log(`🔄 Switching to scene: ${scene.data.id}`);

//   //   // Stop all upgrades on other scenes
//   //   scenes.forEach((s) => {
//   //     if (s.stopUpgrade && s !== scene) {
//   //       s.stopUpgrade();
//   //     }
//   //   });

//   //   stopAutorotate();
//   //   scene.view.setParameters(scene.data.initialViewParameters);
//   //   scene.scene.switchTo({ transitionDuration: 500 });

//   //   // Start upgrade for current scene
//   //   setTimeout(() => {
//   //     if (scene.startUpgrade) {
//   //       scene.startUpgrade();
//   //     }
//   //   }, 100);

//   //   startAutorotate();
//   //   updateSceneName(scene);
//   //   updateSceneList(scene);
//   // }

//   function switchScene(scene) {
//     console.log(`🔄 Switching to scene: ${scene.data.id}`);

//     // CRITICAL: Stop all upgrades on other scenes FIRST
//     scenes.forEach((s) => {
//         if (s.stopUpgrade && s !== scene) {
//             s.stopUpgrade();
//         }
//     });

//     // Set the current active scene BEFORE any operations
//     currentActiveScene = scene;

//     stopAutorotate();
//     scene.view.setParameters(scene.data.initialViewParameters);
//     scene.scene.switchTo({ transitionDuration: 500 });

//     // Start upgrade for current scene with a longer delay to ensure scene switch completes
//     setTimeout(() => {
//         // Double-check this is still the active scene
//         if (currentActiveScene === scene && scene.startUpgrade) {
//             scene.startUpgrade();
//         }
//     }, 600); // Increased from 100ms to 600ms

//     startAutorotate();
//     updateSceneName(scene);
//     updateSceneList(scene);
// }

// // Enhanced initialization
// function initializeFirstScene() {
//     if (scenes[0]) {
//         currentActiveScene = scenes[0];
//         switchScene(scenes[0]);
//     }
// }


//   // CRITICAL FIX: Set up autorotate properly
//   var autorotate = Marzipano.autorotate({
//     yawSpeed: 0.03,
//     targetPitch: 0,
//     targetFov: Math.PI / 2,
//   });

//   // Set initial autorotate state
//   if (data.settings.autorotateEnabled) {
//     autorotateToggleElement.classList.add("enabled");
//   }

//   // DOM elements for view controls.
//   var viewUpElement = document.querySelector("#viewUp");
//   var viewDownElement = document.querySelector("#viewDown");
//   var viewLeftElement = document.querySelector("#viewLeft");
//   var viewRightElement = document.querySelector("#viewRight");
//   var viewInElement = document.querySelector("#viewIn");
//   var viewOutElement = document.querySelector("#viewOut");

//   // Dynamic parameters for controls.
//   var velocity = 0.7;
//   var friction = 3;

//   // Associate view controls with elements.
//   var controls = viewer.controls();
//   controls.registerMethod(
//     "upElement",
//     new Marzipano.ElementPressControlMethod(
//       viewUpElement,
//       "y",
//       -velocity,
//       friction
//     ),
//     true
//   );
//   controls.registerMethod(
//     "downElement",
//     new Marzipano.ElementPressControlMethod(
//       viewDownElement,
//       "y",
//       velocity,
//       friction
//     ),
//     true
//   );
//   controls.registerMethod(
//     "leftElement",
//     new Marzipano.ElementPressControlMethod(
//       viewLeftElement,
//       "x",
//       -velocity,
//       friction
//     ),
//     true
//   );
//   controls.registerMethod(
//     "rightElement",
//     new Marzipano.ElementPressControlMethod(
//       viewRightElement,
//       "x",
//       velocity,
//       friction
//     ),
//     true
//   );
//   controls.registerMethod(
//     "inElement",
//     new Marzipano.ElementPressControlMethod(
//       viewInElement,
//       "zoom",
//       -velocity,
//       friction
//     ),
//     true
//   );
//   controls.registerMethod(
//     "outElement",
//     new Marzipano.ElementPressControlMethod(
//       viewOutElement,
//       "zoom",
//       velocity,
//       friction
//     ),
//     true
//   );

//   // console.log(viewInElement, "viewInElement",viewOutElement,"viewOutElement")

//   function sanitize(s) {
//     return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
//   }



//   function updateSceneName(scene) {
//     sceneNameElement.innerHTML = sanitize(scene.data.name);
//   }

//   function updateSceneList(scene) {
//     for (var i = 0; i < sceneElements.length; i++) {
//       var el = sceneElements[i];
//       if (el.getAttribute("data-id") === scene.data.id) {
//         el.classList.add("current");
//       } else {
//         el.classList.remove("current");
//       }
//     }
//   }

//   function showSceneList() {
//     sceneListElement.classList.add("enabled");
//     sceneListToggleElement.classList.add("enabled");
//   }

//   function hideSceneList() {
//     sceneListElement.classList.remove("enabled");
//     sceneListToggleElement.classList.remove("enabled");
//   }

//   function toggleSceneList() {
//     sceneListElement.classList.toggle("enabled");
//     sceneListToggleElement.classList.toggle("enabled");
//   }

//   function startAutorotate() {
//     // if (!infoHotspotsToggleElement.classList.contains("enabled")) {
//     //   return;
//     // }
//     viewer.startMovement(autorotate);
//     viewer.setIdleMovement(3000, autorotate);
//   }

//   function stopAutorotate() {
//     viewer.stopMovement();
//     viewer.setIdleMovement(Infinity);
//   }

//   function toggleAutorotate() {
//     if (autorotateToggleElement.classList.contains("enabled")) {
//       autorotateToggleElement.classList.remove("enabled");
//       stopAutorotate();
//     } else {
//       autorotateToggleElement.classList.add("enabled");
//       startAutorotate();
//     }
//   }

//   function createLinkHotspotElement(hotspot) {
//     // Create wrapper element to hold icon and tooltip.
//     var wrapper = document.createElement("div");
//     wrapper.classList.add("hotspot");
//     wrapper.classList.add("link-hotspot");

//     // Create image element.
//     var icon = document.createElement("img");
//     icon.src = "img/link.png";
//     icon.classList.add("link-hotspot-icon");

//     // Set rotation transform.
//     var transformProperties = [
//       "-ms-transform",
//       "-webkit-transform",
//       "transform",
//     ];
//     for (var i = 0; i < transformProperties.length; i++) {
//       var property = transformProperties[i];
//       icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
//     }

//     // Add click event handler.
//     wrapper.addEventListener("click", function () {
//       switchScene(findSceneById(hotspot.target));
//     });

//     // Prevent touch and scroll events from reaching the parent element.
//     stopTouchAndScrollEventPropagation(wrapper);

//     // Create tooltip element.
//     var tooltip = document.createElement("div");
//     tooltip.classList.add("hotspot-tooltip");
//     tooltip.classList.add("link-hotspot-tooltip");
//     tooltip.innerHTML = findSceneDataById(hotspot.target).name;

//     wrapper.appendChild(icon);
//     wrapper.appendChild(tooltip);

//     return wrapper;
//   }

//   function createInfoHotspotElement(hotspot) {
//     // Create wrapper element to hold icon and tooltip.
//     var wrapper = document.createElement("div");
//     wrapper.classList.add("hotspot");
//     wrapper.classList.add("info-hotspot");

//     // Create hotspot/tooltip header.
//     var header = document.createElement("div");
//     header.classList.add("info-hotspot-header");

//     // Create image element.
//     var iconWrapper = document.createElement("div");
//     iconWrapper.classList.add("info-hotspot-icon-wrapper");
//     var icon = document.createElement("img");
//     icon.src = "img/info.png";
//     icon.classList.add("info-hotspot-icon");
//     iconWrapper.appendChild(icon);

//     // Create title element.
//     var titleWrapper = document.createElement("div");
//     titleWrapper.classList.add("info-hotspot-title-wrapper");
//     var title = document.createElement("div");
//     title.classList.add("info-hotspot-title");
//     title.innerHTML = hotspot.title;
//     titleWrapper.appendChild(title);

//     // Create close element.
//     var closeWrapper = document.createElement("div");
//     closeWrapper.classList.add("info-hotspot-close-wrapper");
//     var closeIcon = document.createElement("img");
//     closeIcon.src = "img/close.png";
//     closeIcon.classList.add("info-hotspot-close-icon");
//     closeWrapper.appendChild(closeIcon);

//     // Construct header element.
//     header.appendChild(iconWrapper);
//     header.appendChild(titleWrapper);
//     header.appendChild(closeWrapper);

//     // Create text element.
//     var text = document.createElement("div");
//     text.classList.add("info-hotspot-text");
//     text.innerHTML = hotspot.text;

//     // Place header and text into wrapper element.
//     wrapper.appendChild(header);
//     wrapper.appendChild(text);

//     // Create a modal for the hotspot content to appear on mobile mode.
//     var modal = document.createElement("div");
//     modal.innerHTML = wrapper.innerHTML;
//     modal.classList.add("info-hotspot-modal");
//     document.body.appendChild(modal);

//     var toggle = function () {
//       wrapper.classList.toggle("visible");
//       modal.classList.toggle("visible");
//     };

//     // Show content when hotspot is clicked.
//     wrapper
//       .querySelector(".info-hotspot-header")
//       .addEventListener("click", toggle);

//     // Hide content when close icon is clicked.
//     modal
//       .querySelector(".info-hotspot-close-wrapper")
//       .addEventListener("click", toggle);

//     // Prevent touch and scroll events from reaching the parent element.
//     stopTouchAndScrollEventPropagation(wrapper);

//     return wrapper;
//   }

//   // Prevent touch and scroll events from reaching the parent element.
//   function stopTouchAndScrollEventPropagation(element, eventList) {
//     var eventList = [
//       "touchstart",
//       "touchmove",
//       "touchend",
//       "touchcancel",
//       "pointerdown",
//       "pointermove",
//       "pointerup",
//       "pointercancel",
//       "wheel",
//     ];
//     for (var i = 0; i < eventList.length; i++) {
//       element.addEventListener(eventList[i], function (event) {
//         event.stopPropagation();
//       });
//     }
//   }

//   function findSceneById(id) {
//     for (var i = 0; i < scenes.length; i++) {
//       if (scenes[i].data.id === id) {
//         return scenes[i];
//       }
//     }
//     return null;
//   }

//   function findSceneDataById(id) {
//     for (var i = 0; i < data.scenes.length; i++) {
//       if (data.scenes[i].id === id) {
//         return data.scenes[i];
//       }
//     }
//     return null;
//   }

//   // CRITICAL FIX: Add missing event handlers
//   // Set handler for autorotate toggle.
//   autorotateToggleElement.addEventListener("click", toggleAutorotate);

//   // Set up fullscreen mode, if supported.
//   if (screenfull.enabled && data.settings.fullscreenButton) {
//     document.body.classList.add("fullscreen-enabled");
//     fullscreenToggleElement.addEventListener("click", function () {
//       screenfull.toggle();
//     });
//     screenfull.on("change", function () {
//       if (screenfull.isFullscreen) {
//         fullscreenToggleElement.classList.add("enabled");
//       } else {
//         fullscreenToggleElement.classList.remove("enabled");
//       }
//     });
//   } else {
//     document.body.classList.add("fullscreen-disabled");
//   }

//   // Set handler for scene list toggle.
//   sceneListToggleElement.addEventListener("click", toggleSceneList);

//   // Start with the scene list open on desktop.
//   if (!document.body.classList.contains("mobile")) {
//     showSceneList();
//   }

//   // Set handler for scene switch.
//   scenes.forEach(function (scene) {
//     var el = document.querySelector(
//       '#sceneList .scene[data-id="' + scene.data.id + '"]'
//     );
//     el.addEventListener("click", function () {
//       switchScene(scene);
//       // On mobile, hide scene list after selecting a scene.
//       if (document.body.classList.contains("mobile")) {
//         hideSceneList();
//       }
//     });
//   });
//   // Initialize first scene upgrade
//   setTimeout(() => {
//     if (scenes[0] && scenes[0].startUpgrade) {
//       scenes[0].startUpgrade();
//     }
//   }, 1000);

//   // Display the initial scene.
//   // switchScene(scenes[0]);
//   initializeFirstScene();

// })();
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

(function () {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.data;

// Add global tracking variable at the top of your code
var currentActiveScene = null;

// Add auto-close timer variable
var sceneListAutoCloseTimer = null;

  // Grab elements from DOM.
  var panoElement = document.querySelector("#pano");
  var sceneNameElement = document.querySelector("#titleBar .sceneName");
  var sceneListElement = document.querySelector("#sceneList");
  var sceneElements = document.querySelectorAll("#sceneList .scene");
  var sceneListToggleElement = document.querySelector("#sceneListToggle");
  var autorotateToggleElement = document.querySelector("#autorotateToggle");
  var fullscreenToggleElement = document.querySelector("#fullscreenToggle");

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function () {
      if (mql.matches) {
        document.body.classList.remove("desktop");
        document.body.classList.add("mobile");
      } else {
        document.body.classList.remove("mobile");
        document.body.classList.add("desktop");
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add("desktop");
  }

  // Detect whether we are on a touch device.
  document.body.classList.add("no-touch");
  window.addEventListener("touchstart", function () {
    document.body.classList.remove("no-touch");
    document.body.classList.add("touch");
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add("tooltip-fallback");
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode,
    },
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Modified scene creation with better cancellation
var scenes = data.scenes.map(function (data) {
    console.log(`Creating single progressive scene for: ${data.id}`);

    var imagePaths = {
        low: data.images.low,
        high: data.images.high,
    };

    var currentSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
    var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
    var limiter = Marzipano.RectilinearView.limit.traditional(
        4096,
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180
    );
    var view = new Marzipano.RectilinearView(
        data.initialViewParameters,
        limiter
    );

    var scene = viewer.createScene({
        source: currentSource,
        geometry: geometry,
        view: view,
    });

    var upgraded = false;
    var upgradeTimeout;
    var hdScene = null;
    var isUpgrading = false;
    var upgradeAborted = false;

    // Quality indicator
    function updateQualityInfo() {
        var info = document.getElementById("qualityInfo");
        if (!info) {
            info = document.createElement("div");
            info.id = "qualityInfo";
            info.style.cssText = `
                position: fixed; bottom: 20px; right: 20px;
                background: rgba(0,0,0,0.7); color: white;
                padding: 6px 10px; border-radius: 4px; z-index: 1000;
                font-family: Arial, sans-serif; font-size: 18px;
            `;
            document.body.appendChild(info);
        }

        var qualityColor = upgraded ? "#4CAF50" : "#FF9800";
        info.innerHTML = `<div style="color: ${qualityColor};">● ${
            upgraded ? "8K" : "SD"
        } - ${data.name}</div>`;
    }

    // Create HD scene in background
    function createHDScene() {
        if (hdScene) return hdScene;

        var hdSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, {
            crossOrigin: "anonymous",
        });
        var hdGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);

        hdScene = viewer.createScene({
            source: hdSource,
            geometry: hdGeometry,
            view: view,
        });
        
        if (data.linkHotspots) {
            data.linkHotspots.forEach(function (hotspot) {
                var element = createLinkHotspotElement(hotspot);
                hdScene
                    .hotspotContainer()
                    .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
            });
        }
        if (data.infoHotspots) {
            data.infoHotspots.forEach(function (hotspot) {
                var element = createInfoHotspotElement(hotspot);
                hdScene
                    .hotspotContainer()
                    .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
            });
        }

        return hdScene;
    }

    // Enhanced HD upgrade with proper cancellation checks
    // function upgradeToHD() {
    //     if (upgraded || upgradeAborted) return;
        
    //     // CRITICAL: Check if this scene is still the active one
    //     if (currentActiveScene !== sceneInstance) {
    //         console.log(`🚫 Cancelling ${data.id} upgrade - no longer active scene`);
    //         upgradeAborted = true;
    //         return;
    //     }

    //     console.log(`🔄 Upgrading ${data.id} to 8K`);
    //     isUpgrading = true;

    //     var loading = document.getElementById("loadingIndicator");
    //     if (!loading) {
    //         loading = document.createElement("div");
    //         loading.id = "loadingIndicator";
    //         loading.innerHTML = "Loading 8K...";
    //         loading.style.cssText = `
    //             position: fixed; top: 50px; right: 20px;
    //             background: rgba(0,0,0,0.8); color: white;
    //             padding: 8px 12px; border-radius: 5px; z-index: 1000;
    //             font-family: Arial, sans-serif; font-size: 18px;
    //         `;
    //         document.body.appendChild(loading);
    //     }
    //     loading.style.display = "block";

    //     // Preload HD image first
    //     var img = new Image();
    //     img.crossOrigin = "anonymous";
        
    //     img.onload = function () {
    //         // CRITICAL: Double-check scene is still active before switching
    //         if (currentActiveScene !== sceneInstance || upgradeAborted) {
    //             console.log(`🚫 ${data.id} 8K loaded but scene changed - aborting switch`);
    //             loading.style.display = "none";
    //             isUpgrading = false;
    //             return;
    //         }

    //         console.log(`✅ 8K preloaded for ${data.id}, creating 8K scene`);

    //         // Create HD scene
    //         var hdSceneInstance = createHDScene();

    //         // Get current view parameters
    //         var currentParams = scene.view().parameters();
    //         hdSceneInstance.view().setParameters(currentParams);

    //         // SEAMLESS SWITCH - No transition time
    //         hdSceneInstance.switchTo({ transitionDuration: 0 });

    //         upgraded = true;
    //         isUpgrading = false;
    //         loading.style.display = "none";
    //         updateQualityInfo();

    //         // Replace the main scene reference
    //         scene = hdSceneInstance;

    //         console.log(`🎉 ${data.id} seamlessly upgraded to 8K`);
    //     };

    //     img.onerror = function () {
    //         console.log(`❌ Failed to load 8K for ${data.id}`);
    //         loading.style.display = "none";
    //         isUpgrading = false;
    //     };

    //     img.src = imagePaths.high;
    // }


    function upgradeToHD() {
    if (upgraded || upgradeAborted) return;
    
    // CRITICAL: Check if this scene is still the active one
    if (currentActiveScene !== sceneInstance) {
        console.log(`🚫 Cancelling ${data.id} upgrade - no longer active scene`);
        upgradeAborted = true;
        return;
    }

    console.log(`🔄 Upgrading ${data.id} to 8K`);
    isUpgrading = true;

    var loading = document.getElementById("loadingIndicator");
    if (!loading) {
        loading = document.createElement("div");
        loading.id = "loadingIndicator";
        loading.innerHTML = "Loading 8K...";
        loading.style.cssText = `
            position: fixed; top: 50px; right: 20px;
            background: rgba(0,0,0,0.8); color: white;
            padding: 8px 12px; border-radius: 5px; z-index: 1000;
            font-family: Arial, sans-serif; font-size: 18px;
        `;
        document.body.appendChild(loading);
    }
    loading.style.display = "block";

    // CRITICAL: Store current autorotate state before upgrade
    var wasAutorotateEnabled = autorotateToggleElement.classList.contains("enabled");
    var wasAutorotateRunning = false;
    
    // Check if autorotate is currently running
    if (wasAutorotateEnabled) {
        wasAutorotateRunning = true;
        console.log("💾 Storing autorotate state: enabled and running");
    }

    // Preload HD image first
    var img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = function () {
        // CRITICAL: Double-check scene is still active before switching
        if (currentActiveScene !== sceneInstance || upgradeAborted) {
            console.log(`🚫 ${data.id} 8K loaded but scene changed - aborting switch`);
            loading.style.display = "none";
            isUpgrading = false;
            return;
        }

        console.log(`✅ 8K preloaded for ${data.id}, creating 8K scene`);

        // CRITICAL: Stop autorotate before scene switch
        if (wasAutorotateRunning) {
            console.log("⏹️ Temporarily stopping autorotate for HD upgrade");
            viewer.stopMovement();
            viewer.setIdleMovement(Infinity);
        }

        // Create HD scene
        var hdSceneInstance = createHDScene();

        // Get current view parameters
        var currentParams = scene.view().parameters();
        hdSceneInstance.view().setParameters(currentParams);

        // SEAMLESS SWITCH - No transition time
        hdSceneInstance.switchTo({ transitionDuration: 0 });

        upgraded = true;
        isUpgrading = false;
        loading.style.display = "none";
        updateQualityInfo();

        // Replace the main scene reference
        scene = hdSceneInstance;

        // CRITICAL: Update the scene instance reference for autorotate
        sceneInstance.scene = hdSceneInstance;

        // CRITICAL: Restart autorotate on the NEW HD scene if it was running
        if (wasAutorotateRunning) {
            console.log("🔄 Restarting autorotate on HD scene");
            setTimeout(() => {
                // Double-check we're still the active scene
                if (currentActiveScene === sceneInstance) {
                    viewer.startMovement(autorotate);
                    viewer.setIdleMovement(3000, autorotate);
                    console.log("✅ Autorotate restored on HD scene");
                }
            }, 100); // Small delay to ensure scene switch is complete
        }

        console.log(`🎉 ${data.id} seamlessly upgraded to 8K with autorotate preserved`);
    };

    img.onerror = function () {
        console.log(`❌ Failed to load 8K for ${data.id}`);
        loading.style.display = "none";
        isUpgrading = false;
        
        // Restore autorotate if upgrade failed
        if (wasAutorotateRunning && currentActiveScene === sceneInstance) {
            console.log("🔄 Restoring autorotate after failed upgrade");
            viewer.startMovement(autorotate);
            viewer.setIdleMovement(3000, autorotate);
        }
    };

    img.src = imagePaths.high;
}

    // Add hotspots to initial scene
    if (data.linkHotspots) {
        data.linkHotspots.forEach(function (hotspot) {
            var element = createLinkHotspotElement(hotspot);
            scene
                .hotspotContainer()
                .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
    }

    if (data.infoHotspots) {
        data.infoHotspots.forEach(function (hotspot) {
            var element = createInfoHotspotElement(hotspot);
            scene
                .hotspotContainer()
                .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
    }

    var sceneInstance = {
        data: data,
        scene: scene,
        view: view,
        startUpgrade: function () {
            upgradeAborted = false; // Reset abort flag
            if (upgradeTimeout) clearTimeout(upgradeTimeout);
            upgradeTimeout = setTimeout(upgradeToHD, 2000);
            updateQualityInfo();
        },
        stopUpgrade: function () {
            console.log(`🛑 Stopping upgrade for ${data.id}`);
            upgradeAborted = true; // Set abort flag
            if (upgradeTimeout) clearTimeout(upgradeTimeout);
            upgraded = false;
            isUpgrading = false;
            updateQualityInfo();
            
            // Hide loading indicator if visible
            var loading = document.getElementById("loadingIndicator");
            if (loading) {
                loading.style.display = "none";
            }
        },
        isUpgrading: function() {
            return isUpgrading;
        }
    };

    return sceneInstance;
});

//   function switchScene(scene) {
//     console.log(`🔄 Switching to scene: ${scene.data.id}`);

//     // CRITICAL: Stop all upgrades on other scenes FIRST
//     scenes.forEach((s) => {
//         if (s.stopUpgrade && s !== scene) {
//             s.stopUpgrade();
//         }
//     });

//     // Set the current active scene BEFORE any operations
//     currentActiveScene = scene;

//     stopAutorotate();
//     scene.view.setParameters(scene.data.initialViewParameters);
//     scene.scene.switchTo({ transitionDuration: 500 });

//     // Start upgrade for current scene with a longer delay to ensure scene switch completes
//     setTimeout(() => {
//         // Double-check this is still the active scene
//         if (currentActiveScene === scene && scene.startUpgrade) {
//             scene.startUpgrade();
//         }
//     }, 600); // Increased from 100ms to 600ms

//     startAutorotate();
//     updateSceneName(scene);
//     updateSceneList(scene);
// }

// Enhanced initialization

// 5. FIXED: Modified switchScene function - handle autorotate properly
// function switchScene(scene) {
//   console.log(`🔄 Switching to scene: ${scene.data.id}`);

//   // CRITICAL: Stop all upgrades on other scenes FIRST
//   scenes.forEach((s) => {
//       if (s.stopUpgrade && s !== scene) {
//           s.stopUpgrade();
//       }
//   });

//   // Set the current active scene BEFORE any operations
//   currentActiveScene = scene;

//   // Store current autorotate state
//   var wasAutorotateEnabled = autorotateToggleElement.classList.contains("enabled");
  
//   // Always stop autorotate during scene transition
//   stopAutorotate();
  
//   scene.view.setParameters(scene.data.initialViewParameters);
//   scene.scene.switchTo({ transitionDuration: 500 });

//   // Start upgrade for current scene with a longer delay
//   setTimeout(() => {
//       // Double-check this is still the active scene
//       if (currentActiveScene === scene && scene.startUpgrade) {
//           scene.startUpgrade();
//       }
//   }, 600);

//   // Restore autorotate state after scene switch if it was enabled
//   setTimeout(() => {
//     if (wasAutorotateEnabled) {
//       startAutorotate();
//     }
//   }, 600); // Same delay as scene switch completion

//   updateSceneName(scene);
//   updateSceneList(scene);
// }

function switchScene(scene) {
    console.log(`🔄 Switching to scene: ${scene.data.id}`);

    // CRITICAL: Stop all upgrades on other scenes FIRST
    scenes.forEach((s) => {
        if (s.stopUpgrade && s !== scene) {
            s.stopUpgrade();
        }
    });

    // Set the current active scene BEFORE any operations
    currentActiveScene = scene;

    // Store current autorotate state
    var wasAutorotateEnabled = autorotateToggleElement.classList.contains("enabled");
    console.log(`💾 Autorotate state during scene switch: ${wasAutorotateEnabled ? 'enabled' : 'disabled'}`);
    
    // Always stop autorotate during scene transition
    stopAutorotate();
    
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo({ transitionDuration: 500 });

    // Start upgrade for current scene with a longer delay
    setTimeout(() => {
        // Double-check this is still the active scene
        if (currentActiveScene === scene && scene.startUpgrade) {
            scene.startUpgrade();
        }
    }, 600);

    // Restore autorotate state after scene switch if it was enabled
    setTimeout(() => {
        if (wasAutorotateEnabled && currentActiveScene === scene) {
            console.log("🔄 Restoring autorotate after scene switch");
            startAutorotate();
        }
    }, 700); // Slightly longer delay to ensure everything is ready

    updateSceneName(scene);
    updateSceneList(scene);
}

// function initializeFirstScene() {
//     if (scenes[0]) {
//         currentActiveScene = scenes[0];
//         switchScene(scenes[0]);
//     }
// }

function initializeFirstScene() {
  if (scenes[0]) {
    currentActiveScene = scenes[0];
    
    // Set initial view without calling switchScene to avoid autorotate conflicts
    scenes[0].view.setParameters(scenes[0].data.initialViewParameters);
    scenes[0].scene.switchTo({ transitionDuration: 0 });
    
    updateSceneName(scenes[0]);
    updateSceneList(scenes[0]);
    
    // Start autorotate if enabled in settings
    if (data.settings.autorotateEnabled) {
      setTimeout(() => {
        startAutorotate();
      }, 1000); // Give scene time to fully load
    }
    
    // Start upgrade
    setTimeout(() => {
      if (scenes[0].startUpgrade) {
        scenes[0].startUpgrade();
      }
    }, 1000);
  }
}

  // CRITICAL FIX: Set up autorotate properly
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });

  // // Set initial autorotate state
  // if (data.settings.autorotateEnabled) {
  //   autorotateToggleElement.classList.add("enabled");
  // }

// 1. FIXED: Set initial autorotate state properly
if (data.settings.autorotateEnabled) {
  autorotateToggleElement.classList.add("enabled");
  // Actually start autorotate if enabled in settings
  startAutorotate();
}

  // DOM elements for view controls.
  var viewUpElement = document.querySelector("#viewUp");
  var viewDownElement = document.querySelector("#viewDown");
  var viewLeftElement = document.querySelector("#viewLeft");
  var viewRightElement = document.querySelector("#viewRight");
  var viewInElement = document.querySelector("#viewIn");
  var viewOutElement = document.querySelector("#viewOut");

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  // Associate view controls with elements.
  var controls = viewer.controls();
  controls.registerMethod(
    "upElement",
    new Marzipano.ElementPressControlMethod(
      viewUpElement,
      "y",
      -velocity,
      friction
    ),
    true
  );
  controls.registerMethod(
    "downElement",
    new Marzipano.ElementPressControlMethod(
      viewDownElement,
      "y",
      velocity,
      friction
    ),
    true
  );
  controls.registerMethod(
    "leftElement",
    new Marzipano.ElementPressControlMethod(
      viewLeftElement,
      "x",
      -velocity,
      friction
    ),
    true
  );
  controls.registerMethod(
    "rightElement",
    new Marzipano.ElementPressControlMethod(
      viewRightElement,
      "x",
      velocity,
      friction
    ),
    true
  );
  controls.registerMethod(
    "inElement",
    new Marzipano.ElementPressControlMethod(
      viewInElement,
      "zoom",
      -velocity,
      friction
    ),
    true
  );
  controls.registerMethod(
    "outElement",
    new Marzipano.ElementPressControlMethod(
      viewOutElement,
      "zoom",
      velocity,
      friction
    ),
    true
  );

  function sanitize(s) {
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
  }

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute("data-id") === scene.data.id) {
        el.classList.add("current");
      } else {
        el.classList.remove("current");
      }
    }
  }

  // Enhanced scene list functions with auto-close functionality
  function clearAutoCloseTimer() {
    if (sceneListAutoCloseTimer) {
      clearTimeout(sceneListAutoCloseTimer);
      sceneListAutoCloseTimer = null;
      console.log("🔄 Scene list auto-close timer cleared");
    }
  }

  function startAutoCloseTimer() {
    clearAutoCloseTimer(); // Clear any existing timer
    sceneListAutoCloseTimer = setTimeout(function() {
      console.log("⏰ Auto-closing scene list after 5 seconds");
      hideSceneList();
      sceneListAutoCloseTimer = null;
    }, 5000); // 5 seconds
    console.log("⏱️ Scene list auto-close timer started (5 seconds)");
  }

  function showSceneList() {
    sceneListElement.classList.add("enabled");
    sceneListToggleElement.classList.add("enabled");
    startAutoCloseTimer(); // Start the auto-close timer when showing
  }

  function hideSceneList() {
    sceneListElement.classList.remove("enabled");
    sceneListToggleElement.classList.remove("enabled");
    clearAutoCloseTimer(); // Clear timer when hiding
  }

  function toggleSceneList() {
    if (sceneListElement.classList.contains("enabled")) {
      hideSceneList();
    } else {
      showSceneList();
    }
  }

  // Add event listeners to prevent auto-close when user is interacting with the scene list
  function addSceneListInteractionListeners() {
    // Prevent auto-close when hovering over scene list
    sceneListElement.addEventListener("mouseenter", function() {
      console.log("🖱️ Mouse entered scene list - pausing auto-close");
      clearAutoCloseTimer();
    });

    sceneListElement.addEventListener("mouseleave", function() {
      // Only restart timer if scene list is still open
      if (sceneListElement.classList.contains("enabled")) {
        console.log("🖱️ Mouse left scene list - restarting auto-close");
        startAutoCloseTimer();
      }
    });

    // Prevent auto-close on touch/click interactions
    sceneListElement.addEventListener("touchstart", function() {
      console.log("👆 Touch detected on scene list - pausing auto-close");
      clearAutoCloseTimer();
    });

    sceneListElement.addEventListener("touchend", function() {
      // Restart timer after touch ends, if list is still open
      setTimeout(function() {
        if (sceneListElement.classList.contains("enabled")) {
          console.log("👆 Touch ended - restarting auto-close");
          startAutoCloseTimer();
        }
      }, 100);
    });
  }

  // function startAutorotate() {
  //   viewer.startMovement(autorotate);
  //   viewer.setIdleMovement(3000, autorotate);
  // }

// 2. FIXED: Enhanced startAutorotate function
// ENHANCED: Better autorotate functions that work with scene upgrades
function startAutorotate() {
    console.log("🔄 Starting autorotate");
    if (viewer && autorotate) {
        viewer.startMovement(autorotate);
        viewer.setIdleMovement(3000, autorotate);
        console.log("✅ Autorotate started successfully");
    } else {
        console.log("❌ Cannot start autorotate - viewer or autorotate not available");
    }
}

function stopAutorotate() {
    console.log("⏹️ Stopping autorotate");
    if (viewer) {
        viewer.stopMovement();
        viewer.setIdleMovement(Infinity);
        console.log("✅ Autorotate stopped successfully");
    } else {
        console.log("❌ Cannot stop autorotate - viewer not available");
    }
}


  // function stopAutorotate() {
  //   viewer.stopMovement();
  //   viewer.setIdleMovement(Infinity);
  // }

  // function toggleAutorotate() {
  //   if (autorotateToggleElement.classList.contains("enabled")) {
  //     autorotateToggleElement.classList.remove("enabled");
  //     stopAutorotate();
  //   } else {
  //     autorotateToggleElement.classList.add("enabled");
  //     startAutorotate();
  //   }
  // }

// 3. FIXED: Enhanced stopAutorotate function  
// function stopAutorotate() {
//   console.log("⏹️ Stopping autorotate");
//   viewer.stopMovement();
//   viewer.setIdleMovement(Infinity);
// }

// 4. FIXED: Enhanced toggleAutorotate function
// function toggleAutorotate() {
//   console.log("🔄 Toggling autorotate");
//   if (autorotateToggleElement.classList.contains("enabled")) {
//     console.log("Disabling autorotate");
//     autorotateToggleElement.classList.remove("enabled");
//     stopAutorotate();
//   } else {
//     console.log("Enabling autorotate");
//     autorotateToggleElement.classList.add("enabled");
//     startAutorotate();
//   }
// }

function toggleAutorotate() {
    console.log("🔄 Toggling autorotate");
    if (autorotateToggleElement.classList.contains("enabled")) {
        console.log("Disabling autorotate");
        autorotateToggleElement.classList.remove("enabled");
        stopAutorotate();
    } else {
        console.log("Enabling autorotate");
        autorotateToggleElement.classList.add("enabled");
        startAutorotate();
    }
}


  function createLinkHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement("div");
    wrapper.classList.add("hotspot");
    wrapper.classList.add("link-hotspot");

    // Create image element.
    var icon = document.createElement("img");
    icon.src = "img/link.png";
    icon.classList.add("link-hotspot-icon");

    // Set rotation transform.
    var transformProperties = [
      "-ms-transform",
      "-webkit-transform",
      "transform",
    ];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
    }

    // Add click event handler.
    wrapper.addEventListener("click", function () {
      switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement("div");
    tooltip.classList.add("hotspot-tooltip");
    tooltip.classList.add("link-hotspot-tooltip");
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement("div");
    wrapper.classList.add("hotspot");
    wrapper.classList.add("info-hotspot");

    // Create hotspot/tooltip header.
    var header = document.createElement("div");
    header.classList.add("info-hotspot-header");

    // Create image element.
    var iconWrapper = document.createElement("div");
    iconWrapper.classList.add("info-hotspot-icon-wrapper");
    var icon = document.createElement("img");
    icon.src = "img/info.png";
    icon.classList.add("info-hotspot-icon");
    iconWrapper.appendChild(icon);

    // Create title element.
    var titleWrapper = document.createElement("div");
    titleWrapper.classList.add("info-hotspot-title-wrapper");
    var title = document.createElement("div");
    title.classList.add("info-hotspot-title");
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    // Create close element.
    var closeWrapper = document.createElement("div");
    closeWrapper.classList.add("info-hotspot-close-wrapper");
    var closeIcon = document.createElement("img");
    closeIcon.src = "img/close.png";
    closeIcon.classList.add("info-hotspot-close-icon");
    closeWrapper.appendChild(closeIcon);

    // Construct header element.
    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    // Create text element.
    var text = document.createElement("div");
    text.classList.add("info-hotspot-text");
    text.innerHTML = hotspot.text;

    // Place header and text into wrapper element.
    wrapper.appendChild(header);
    wrapper.appendChild(text);

    // Create a modal for the hotspot content to appear on mobile mode.
    var modal = document.createElement("div");
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add("info-hotspot-modal");
    document.body.appendChild(modal);

    var toggle = function () {
      wrapper.classList.toggle("visible");
      modal.classList.toggle("visible");
    };

    // Show content when hotspot is clicked.
    wrapper
      .querySelector(".info-hotspot-header")
      .addEventListener("click", toggle);

    // Hide content when close icon is clicked.
    modal
      .querySelector(".info-hotspot-close-wrapper")
      .addEventListener("click", toggle);

    // Prevent touch and scroll events from reaching the parent element.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointercancel",
      "wheel",
    ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function (event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  // CRITICAL FIX: Add missing event handlers
  // Set handler for autorotate toggle.
  autorotateToggleElement.addEventListener("click", toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add("fullscreen-enabled");
    fullscreenToggleElement.addEventListener("click", function () {
      screenfull.toggle();
    });
    screenfull.on("change", function () {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add("enabled");
      } else {
        fullscreenToggleElement.classList.remove("enabled");
      }
    });
  } else {
    document.body.classList.add("fullscreen-disabled");
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener("click", toggleSceneList);

  // Initialize scene list interaction listeners
  addSceneListInteractionListeners();

  // Start with the scene list open on desktop.
  if (!document.body.classList.contains("mobile")) {
    showSceneList();
  }

  // Set handler for scene switch.
  scenes.forEach(function (scene) {
    var el = document.querySelector(
      '#sceneList .scene[data-id="' + scene.data.id + '"]'
    );
    el.addEventListener("click", function () {
      switchScene(scene);
      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains("mobile")) {
        hideSceneList();
      } else {
        // On desktop, restart the auto-close timer after scene selection
        startAutoCloseTimer();
      }
    });
  });

  // Initialize first scene upgrade
  setTimeout(() => {
    if (scenes[0] && scenes[0].startUpgrade) {
      scenes[0].startUpgrade();
    }
  }, 1000);

  // Display the initial scene.
  initializeFirstScene();

})();