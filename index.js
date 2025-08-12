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
// 'use strict';

// (function() {
//   var Marzipano = window.Marzipano;
//   var bowser = window.bowser;
//   var screenfull = window.screenfull;
//   var data = window.data;

//   // Grab elements from DOM.
//   var panoElement = document.querySelector('#pano');
//   var sceneNameElement = document.querySelector('#titleBar .sceneName');
//   var sceneListElement = document.querySelector('#sceneList');
//   var sceneElements = document.querySelectorAll('#sceneList .scene');
//   var sceneListToggleElement = document.querySelector('#sceneListToggle');
//   var autorotateToggleElement = document.querySelector('#autorotateToggle');
//   var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

//   // Detect desktop or mobile mode.
//   if (window.matchMedia) {
//     var setMode = function() {
//       if (mql.matches) {
//         document.body.classList.remove('desktop');
//         document.body.classList.add('mobile');
//       } else {
//         document.body.classList.remove('mobile');
//         document.body.classList.add('desktop');
//       }
//     };
//     var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
//     setMode();
//     mql.addListener(setMode);
//   } else {
//     document.body.classList.add('desktop');
//   }

//   // Detect whether we are on a touch device.
//   document.body.classList.add('no-touch');
//   window.addEventListener('touchstart', function() {
//     document.body.classList.remove('no-touch');
//     document.body.classList.add('touch');
//   });

//   // Use tooltip fallback mode on IE < 11.
//   if (bowser.msie && parseFloat(bowser.version) < 11) {
//     document.body.classList.add('tooltip-fallback');
//   }

//   // Viewer options.
//   var viewerOpts = {
//     controls: {
//       mouseViewMode: data.settings.mouseViewMode
//     }
//   };

//   // Initialize viewer.
//   var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

//   // Create scenes.
//   // var scenes = data.scenes.map(function(data) {
//   //   var urlPrefix = "//www.marzipano.net/media";
//   //   var source = Marzipano.ImageUrlSource.fromString(
//   //     urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
//   //     { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
//   //   var geometry = new Marzipano.CubeGeometry(data.levels);

//   //   var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
//   //   var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

//   //   var scene = viewer.createScene({
//   //     source: source,
//   //     geometry: geometry,
//   //     view: view,
//   //     pinFirstLevel: true
//   //   });

//   //   // Create link hotspots.
//   //   data.linkHotspots.forEach(function(hotspot) {
//   //     var element = createLinkHotspotElement(hotspot);
//   //     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   //   });

//   //   // Create info hotspots.
//   //   data.infoHotspots.forEach(function(hotspot) {
//   //     var element = createInfoHotspotElement(hotspot);
//   //     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   //   });

//   //   return {
//   //     data: data,
//   //     scene: scene,
//   //     view: view
//   //   };
//   // });

// // Replace this section in your code (around line 70-80):

// // Create scenes.
// // var scenes = data.scenes.map(function(data) {
// //   console.log(data.id, "data is");
  
// //   // Method 1: For single equirectangular images (360° panoramic photos)
// //   var imageUrl = `../images/${data.id == 'oriente-station' ? "01.webp": data.id == 'electricity-museum' ?"02.webp" :"03.webp"}`;
// //   var source = Marzipano.ImageUrlSource.fromString(imageUrl);
  
// //   // Use EquirectGeometry for single panoramic images (NOT EquirectangularGeometry!)
// //   var geometry = new Marzipano.EquirectGeometry([
// //     { width: 4096 } // Adjust width to match your image width
// //   ]);
  
// //   // Method 2: If you want to use the original working cube map images instead
// //   // var urlPrefix = "https://www.marzipano.net/media";
// //   // var source = Marzipano.ImageUrlSource.fromString(
// //   //   urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
// //   //   { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" }
// //   // );
// //   // var geometry = new Marzipano.CubeGeometry(data.levels);
  
// //   // Method 3: If you have absolute URLs for each scene
// //   // var imageUrls = {
// //   //   '1': 'https://example.com/image1.webp',
// //   //   '2': 'https://example.com/image2.webp',
// //   //   '3': 'https://example.com/image3.webp'
// //   // };
// //   // var source = Marzipano.ImageUrlSource.fromString(imageUrls[data.id]);
// //   // var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);

// //   var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
// //   var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

// //   var scene = viewer.createScene({
// //     source: source,
// //     geometry: geometry,
// //     view: view,
// //     pinFirstLevel: true
// //   });

// //   // ... rest of the hotspot creation code remains the same
  
// //   return {
// //     data: data,
// //     scene: scene,
// //     view: view
// //   };
// // });
  
// // Simple and working progressive loading implementation
// // var scenes = data.scenes.map(function(data) {
// //   console.log(data.id, "creating scene with progressive loading");
  
// //   // Define your image paths
// //   var imagePaths = {
// //     low: `../images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
// //     high: `../images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
// //     // high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
// //   };

// //   // Method 1: Simple multi-level geometry (automatic progressive loading)
// //   // This will automatically load from low to high resolution
// //   var source = Marzipano.ImageUrlSource.fromString(imagePaths.high);
  
// //   var geometry = new Marzipano.EquirectGeometry([
// //     { width: 1024 },   // Loads first - low quality
// //     { width: 2048 },   // Loads second - medium quality  
// //     { width: 4096 },   // Loads third - high quality
// //     { width: 8192 }    // Loads last - highest quality
// //   ]);

// //   var limiter = Marzipano.RectilinearView.limit.traditional(8192, 100*Math.PI/180, 120*Math.PI/180);
// //   var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

// //   var scene = viewer.createScene({
// //     source: source,
// //     geometry: geometry,
// //     view: view,
// //     pinFirstLevel: true // This makes it start with the lowest quality level
// //   });

// //   // Create hotspots (your existing code)
// //   data.linkHotspots.forEach(function(hotspot) {
// //     var element = createLinkHotspotElement(hotspot);
// //     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
// //   });

// //   data.infoHotspots.forEach(function(hotspot) {
// //     var element = createInfoHotspotElement(hotspot);
// //     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
// //   });

// //   return {
// //     data: data,
// //     scene: scene,
// //     view: view
// //   };
// // });

// // Method 2: Manual progressive loading with scene switching (if you want more control)
// // function createProgressiveScene(data, viewer) {
// //   // var imagePaths = {
// //   //   low: `../images/low/${data.id == '1' ? "01_low.webp": data.id == '2' ?"02_low.webp" :"03_low.webp"}`,
// //   //   high: `../images/high/${data.id == '1' ? "01_high.webp": data.id == '2' ?"02_high.webp" :"03_high.webp"}`
// //   // };

// //   var imagePaths = {
// //     low: `../images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
// //     high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
// //   };

// //   // Create low quality scene first
// //   var lowSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
// //   var lowGeometry = new Marzipano.EquirectGeometry([{ width: 1024 }]);
// //   var view = new Marzipano.RectilinearView(data.initialViewParameters);
  
// //   var lowScene = viewer.createScene({
// //     source: lowSource,
// //     geometry: lowGeometry,
// //     view: view
// //   });

// //   // Create high quality scene
// //   var highSource = Marzipano.ImageUrlSource.fromString(imagePaths.high,{ crossOrigin: 'anonymous' });
// //   var highGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);
  
// //   var highScene = viewer.createScene({
// //     source: highSource,
// //     geometry: highGeometry, 
// //     view: view
// //   });

// //   // Add loading indicator
// //   var loadingDiv = document.createElement('div');
// //   loadingDiv.innerHTML = 'Loading high quality...';
// //   loadingDiv.style.cssText = `
// //     position: fixed; top: 20px; right: 20px;
// //     background: rgba(0,0,0,0.8); color: white;
// //     padding: 10px; border-radius: 5px; z-index: 1000;
// //     font-family: Arial, sans-serif;
// //   `;

// //   // Function to switch from low to high quality
// //   var upgradeToHighQuality = function() {
// //     document.body.appendChild(loadingDiv);
    
// //     // Preload high quality image
// //     var img = new Image();
// //     img.crossOrigin = 'anonymous';
// //     img.onload = function() {
// //       // Switch to high quality scene
// //       highScene.switchTo({
// //         transitionDuration: 1000
// //       });
      
// //       // Remove loading indicator
// //       setTimeout(function() {
// //         if (loadingDiv.parentNode) {
// //           document.body.removeChild(loadingDiv);
// //         }
// //       }, 1500);
// //     };
    
// //     img.onerror = function() {
// //       console.log('Failed to load high quality image for scene', data.id);
// //       if (loadingDiv.parentNode) {
// //         document.body.removeChild(loadingDiv);
// //       }
// //     };
    
// //     img.src = imagePaths.high;
// //   };

// //   // Add hotspots to both scenes
// //   [lowScene, highScene].forEach(function(scene) {
// //     data.linkHotspots.forEach(function(hotspot) {
// //       var element = createLinkHotspotElement(hotspot);
// //       scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
// //     });

// //     data.infoHotspots.forEach(function(hotspot) {
// //       var element = createInfoHotspotElement(hotspot);
// //       scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
// //     });
// //   });

// //   // Auto-upgrade after 2 seconds
// //   setTimeout(upgradeToHighQuality, 2000);

// //   return {
// //     data: data,
// //     scene: lowScene, // Return low quality scene initially
// //     highScene: highScene,
// //     view: view,
// //     upgrade: upgradeToHighQuality
// //   };
// // }



// // function createProgressiveScene(data, viewer) {
// //   var imagePaths = {
// //     low: `../images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
// //     high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
// //   };

// //   var lowSource = Marzipano.ImageUrlSource.fromString(imagePaths.low, { crossOrigin: 'anonymous' });
// //   var lowGeometry = new Marzipano.EquirectGeometry([{ width: 1024 }]);
// //   var view = new Marzipano.RectilinearView(data.initialViewParameters);

// //   var lowScene = viewer.createScene({
// //     source: lowSource,
// //     geometry: lowGeometry,
// //     view: view
// //   });

// //   var highSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, { crossOrigin: 'anonymous' });
// //   var highGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);

// //   var highScene = viewer.createScene({
// //     source: highSource,
// //     geometry: highGeometry,
// //     view: view
// //   });

// //   var upgraded = false;

// //   function upgradeToHighQuality() {
// //     if (upgraded) return; // Already upgraded, skip
// //     upgraded = true;

// //     var loadingDiv = document.createElement('div');
// //     loadingDiv.innerHTML = 'Loading high quality...';
// //     loadingDiv.style.cssText = `
// //       position: fixed; top: 20px; right: 20px;
// //       background: rgba(0,0,0,0.8); color: white;
// //       padding: 10px; border-radius: 5px; z-index: 1000;
// //       font-family: Arial, sans-serif;
// //     `;
// //     document.body.appendChild(loadingDiv);

// //     var img = new Image();
// //     img.crossOrigin = 'anonymous';
// //     img.onload = function() {
// //       highScene.switchTo({ transitionDuration: 1000 });
// //       setTimeout(() => {
// //         if (loadingDiv.parentNode) {
// //           document.body.removeChild(loadingDiv);
// //         }
// //       }, 1500);
// //     };
// //     img.onerror = function() {
// //       console.log('Failed to load high quality image for', data.id);
// //       if (loadingDiv.parentNode) {
// //         document.body.removeChild(loadingDiv);
// //       }
// //     };
// //     img.src = imagePaths.high + '?v=' + Date.now(); // Avoid cached non-CORS image
// //   }

// //   return {
// //     data: data,
// //     scene: lowScene,
// //     highScene: highScene,
// //     view: view,
// //     upgrade: upgradeToHighQuality
// //   };
// // }
// // To use Method 2, replace the scenes creation with:
// // var scenes = data.scenes.map(function(data) {
// //   return createProgressiveScene(data, viewer);  
// // });

// // var scenes = data.scenes.map(s => createProgressiveScene(s, viewer));
// //   // Set up autorotate, if enabled.
// //   var autorotate = Marzipano.autorotate({
// //     yawSpeed: 0.03,
// //     targetPitch: 0,
// //     targetFov: Math.PI/2
// //   });
// //   if (data.settings.autorotateEnabled) {
// //     autorotateToggleElement.classList.add('enabled');
// //   }

// //   // Set handler for autorotate toggle.
// //   autorotateToggleElement.addEventListener('click', toggleAutorotate);

// //   // Set up fullscreen mode, if supported.
// //   if (screenfull.enabled && data.settings.fullscreenButton) {
// //     document.body.classList.add('fullscreen-enabled');
// //     fullscreenToggleElement.addEventListener('click', function() {
// //       screenfull.toggle();
// //     });
// //     screenfull.on('change', function() {
// //       if (screenfull.isFullscreen) {
// //         fullscreenToggleElement.classList.add('enabled');
// //       } else {
// //         fullscreenToggleElement.classList.remove('enabled');
// //       }
// //     });
// //   } else {
// //     document.body.classList.add('fullscreen-disabled');
// //   }

// //   // Set handler for scene list toggle.
// //   sceneListToggleElement.addEventListener('click', toggleSceneList);

// //   // Start with the scene list open on desktop.
// //   if (!document.body.classList.contains('mobile')) {
// //     showSceneList();
// //   }

// //   // Set handler for scene switch.
// //   scenes.forEach(function(scene) {
// //     var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
// //     el.addEventListener('click', function() {
// //       switchScene(scene);
// //       // On mobile, hide scene list after selecting a scene.
// //       if (document.body.classList.contains('mobile')) {
// //         hideSceneList();
// //       }
// //     });
// //   });



// // // Replace your existing createProgressiveScene function with this simplified version:

// // function createProgressiveScene(data, viewer) {
// //   console.log(`Creating scene for: ${data.id}`);
  
// //   var imagePaths = {
// //     low: `/images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
// //     high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
// //   };

// //   // Create low quality scene
// //   var lowSource = Marzipano.ImageUrlSource.fromString(imagePaths.low, { crossOrigin: 'anonymous' });
// //   var lowGeometry = new Marzipano.EquirectGeometry([{ width: 1024 }]);
// //   var view = new Marzipano.RectilinearView(data.initialViewParameters);

// //   var lowScene = viewer.createScene({
// //     source: lowSource,
// //     geometry: lowGeometry,
// //     view: view
// //   });

// //   // Create high quality scene
// //   var highSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, { crossOrigin: 'anonymous' });
// //   var highGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);

// //   var highScene = viewer.createScene({
// //     source: highSource,
// //     geometry: highGeometry,
// //     view: view
// //   });

// //   var upgraded = false;
// //   var isCurrentScene = false;

// //   // Simple loading indicator
// //   function showLoading() {
// //     var loading = document.getElementById('loadingIndicator');
// //     if (!loading) {
// //       loading = document.createElement('div');
// //       loading.id = 'loadingIndicator';
// //       loading.innerHTML = 'Loading HD...';
// //       loading.style.cssText = `
// //         position: fixed; top: 20px; right: 20px;
// //         background: rgba(0,0,0,0.8); color: white;
// //         padding: 10px 15px; border-radius: 5px; z-index: 1000;
// //         font-family: Arial, sans-serif; font-size: 12px;
// //       `;
// //       document.body.appendChild(loading);
// //     }
// //     loading.style.display = 'block';
// //   }

// //   function hideLoading() {
// //     var loading = document.getElementById('loadingIndicator');
// //     if (loading) {
// //       loading.style.display = 'none';
// //     }
// //   }

// //   // Simple quality indicator
// //   function updateQualityInfo() {
// //     var info = document.getElementById('qualityInfo');
// //     if (!info) {
// //       info = document.createElement('div');
// //       info.id = 'qualityInfo';
// //       info.style.cssText = `
// //         position: fixed; bottom: 20px; right: 20px;
// //         background: rgba(0,0,0,0.8); color: white;
// //         padding: 8px 12px; border-radius: 5px; z-index: 1000;
// //         font-family: Arial, sans-serif; font-size: 11px;
// //       `;
// //       document.body.appendChild(info);
// //     }
    
// //     info.innerHTML = `
// //       Scene: ${data.id}<br>
// //       Quality: ${upgraded ? 'HIGH' : 'LOW'}<br>
// //       Status: ${isCurrentScene ? 'Current' : 'Inactive'}
// //     `;
// //   }

// //   function upgradeToHighQuality() {
// //     if (upgraded || !isCurrentScene) return;
    
// //     console.log(`Upgrading ${data.id} to HD`);
// //     upgraded = true;
    
// //     showLoading();
    
// //     // Get current view to maintain position
// //     var currentParams = lowScene.view().parameters();
// //     highScene.view().setParameters(currentParams);
    
// //     // Switch to HD scene
// //     highScene.switchTo({ transitionDuration: 500 });
    
// //     setTimeout(() => {
// //       hideLoading();
// //       updateQualityInfo();
// //       console.log(`✅ ${data.id} upgraded to HD`);
// //     }, 600);
// //   }

// //   // Add hotspots to both scenes
// //   [lowScene, highScene].forEach(function(scene) {
// //     data.linkHotspots.forEach(function(hotspot) {
// //       var element = createLinkHotspotElement(hotspot);
// //       scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
// //     });

// //     data.infoHotspots.forEach(function(hotspot) {
// //       var element = createInfoHotspotElement(hotspot);
// //       scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
// //     });
// //   });

// //   return {
// //     data: data,
// //     scene: lowScene,
// //     highScene: highScene,
// //     view: view,
    
// //     setAsCurrent: function() {
// //       console.log(`Setting ${data.id} as current`);
// //       isCurrentScene = true;
// //       updateQualityInfo();
      
// //       // Auto upgrade after 2 seconds
// //       setTimeout(() => {
// //         if (isCurrentScene && !upgraded) {
// //           upgradeToHighQuality();
// //         }
// //       }, 2000);
// //     },
    
// //     setAsInactive: function() {
// //       console.log(`Setting ${data.id} as inactive`);
// //       isCurrentScene = false;
// //       upgraded = false; // Reset for next time
// //       updateQualityInfo();
// //     }
// //   };
// // }

// // // Updated switchScene function - THIS IS THE KEY FIX
// // function switchScene(scene) {
// //   console.log(`🔄 Switching to scene: ${scene.data.id}`);
  
// //   // Mark all scenes as inactive first
// //   scenes.forEach(s => {
// //     if (s.setAsInactive) {
// //       s.setAsInactive();
// //     }
// //   });
  
// //   // Stop autorotate and switch scene
// //   stopAutorotate();
// //   scene.view.setParameters(scene.data.initialViewParameters);
// //   scene.scene.switchTo();
  
// //   // Mark this scene as current - THIS TRIGGERS THE UPGRADE
// //   if (scene.setAsCurrent) {
// //     scene.setAsCurrent();
// //   }
  
// //   startAutorotate();
// //   updateSceneName(scene);
// //   updateSceneList(scene);
// // // }

// // setTimeout(() => {
// //   console.log("Ensuring first scene is marked as current");
// //   if (scenes[0] && scenes[0].setAsCurrent) {
// //     scenes[0].setAsCurrent();
// //   }
// // }, 1000);  


// // REPLACE your entire scenes creation section with this:

// // REPLACE your entire scenes creation section with this:

// // Remove the line: var scenes = data.scenes.map(s => createProgressiveScene(s, viewer));
// // And replace with:

// var scenes = data.scenes.map(function(data) {
//   console.log(`Creating single progressive scene for: ${data.id}`);
  
//   var imagePaths = {
//     low: `/images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
//     high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
//   };

//   // SINGLE SCENE that starts with low quality and upgrades to HD
//   var currentSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
//   var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
//   var limiter = Marzipano.RectilinearView.limit.traditional(4096, 100*Math.PI/180, 120*Math.PI/180);
//   var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

//   var scene = viewer.createScene({
//     source: currentSource,
//     geometry: geometry,
//     view: view
//   });

//   var upgraded = false;
//   var upgradeTimeout;
//   var hdScene = null; // Will hold the HD scene

//   // Quality indicator
//   function updateQualityInfo() {
//     var info = document.getElementById('qualityInfo');
//     if (!info) {
//       info = document.createElement('div');
//       info.id = 'qualityInfo';
//       info.style.cssText = `
//         position: fixed; bottom: 20px; right: 20px;
//         background: rgba(0,0,0,0.7); color: white;
//         padding: 6px 10px; border-radius: 4px; z-index: 1000;
//         font-family: Arial, sans-serif; font-size: 10px;
//       `;
//       document.body.appendChild(info);
//     }
    
//     var qualityColor = upgraded ? '#4CAF50' : '#FF9800';
//     info.innerHTML = `<div style="color: ${qualityColor};">● ${upgraded ? 'HD' : 'SD'} - ${data.id}</div>`;
//   }

//   // Create HD scene in background
//   function createHDScene() {
//     if (hdScene) return hdScene;
    
//     var hdSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, { crossOrigin: 'anonymous' });
//     var hdGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);
    
//     hdScene = viewer.createScene({
//       source: hdSource,
//       geometry: hdGeometry,
//       view: view
//     });
    
//     // Copy hotspots to HD scene
//     data.linkHotspots.forEach(function(hotspot) {
//       var element = createLinkHotspotElement(hotspot);
//       hdScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//     });

//     data.infoHotspots.forEach(function(hotspot) {
//       var element = createInfoHotspotElement(hotspot);
//       hdScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//     });
    
//     return hdScene;
//   }

//   // Smooth HD upgrade with seamless transition
//   function upgradeToHD() {
//     if (upgraded) return;
    
//     console.log(`🔄 Upgrading ${data.id} to HD`);
    
//     var loading = document.getElementById('loadingIndicator');
//     if (!loading) {
//       loading = document.createElement('div');
//       loading.id = 'loadingIndicator';
//       loading.innerHTML = 'Loading HD...';
//       loading.style.cssText = `
//         position: fixed; top: 20px; right: 20px;
//         background: rgba(0,0,0,0.8); color: white;
//         padding: 8px 12px; border-radius: 5px; z-index: 1000;
//         font-family: Arial, sans-serif; font-size: 11px;
//       `;
//       document.body.appendChild(loading);
//     }
//     loading.style.display = 'block';
    
//     // Preload HD image first
//     var img = new Image();
//     img.crossOrigin = 'anonymous';
//     img.onload = function() {
//       console.log(`✅ HD preloaded for ${data.id}, creating HD scene`);
      
//       // Create HD scene
//       var hdSceneInstance = createHDScene();
      
//       // Get current view parameters
//       var currentParams = scene.view().parameters();
//       hdSceneInstance.view().setParameters(currentParams);
      
//       // SEAMLESS SWITCH - No transition time
//       hdSceneInstance.switchTo({ transitionDuration: 0 });
      
//       upgraded = true;
//       loading.style.display = 'none';
//       updateQualityInfo();
      
//       // Replace the main scene reference
//       scene = hdSceneInstance;
      
//       console.log(`🎉 ${data.id} seamlessly upgraded to HD`);
//     };
    
//     img.onerror = function() {
//       console.log(`❌ Failed to load HD for ${data.id}`);
//       loading.style.display = 'none';
//     };
    
//     img.src = imagePaths.high;
//   }

//   // Add hotspots
//   data.linkHotspots.forEach(function(hotspot) {
//     var element = createLinkHotspotElement(hotspot);
//     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   });

//   data.infoHotspots.forEach(function(hotspot) {
//     var element = createInfoHotspotElement(hotspot);
//     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
//   });

//   return {
//     data: data,
//     scene: scene,
//     view: view,
//     startUpgrade: function() {
//       if (upgradeTimeout) clearTimeout(upgradeTimeout);
//       upgradeTimeout = setTimeout(upgradeToHD, 2000);
//       updateQualityInfo();
//     },
//     stopUpgrade: function() {
//       if (upgradeTimeout) clearTimeout(upgradeTimeout);
//       upgraded = false;
//       updateQualityInfo();
//     }
//   };
// });

// // SIMPLIFIED switchScene - no scene switching bullshit
// function switchScene(scene) {
//   console.log(`🔄 Switching to scene: ${scene.data.id}`);
  
//   // Stop all upgrades on other scenes
//   scenes.forEach(s => {
//     if (s.stopUpgrade && s !== scene) {
//       s.stopUpgrade();
//     }
//   });
  
//   stopAutorotate();
//   scene.view.setParameters(scene.data.initialViewParameters);
//   scene.scene.switchTo({ transitionDuration: 500 });
  
//   // Start upgrade for current scene
//   setTimeout(() => {
//     if (scene.startUpgrade) {
//       scene.startUpgrade();
//     }
//   }, 100);
  
//   startAutorotate();
//   updateSceneName(scene);
//   updateSceneList(scene);
// }

// // Initialize first scene
// setTimeout(() => {
//   if (scenes[0] && scenes[0].startUpgrade) {
//     scenes[0].startUpgrade();
//   }
// }, 1000);



//   // DOM elements for view controls.
//   var viewUpElement = document.querySelector('#viewUp');
//   var viewDownElement = document.querySelector('#viewDown');
//   var viewLeftElement = document.querySelector('#viewLeft');
//   var viewRightElement = document.querySelector('#viewRight');
//   var viewInElement = document.querySelector('#viewIn');
//   var viewOutElement = document.querySelector('#viewOut');

//   // Dynamic parameters for controls.
//   var velocity = 0.7;
//   var friction = 3;

//   // Associate view controls with elements.
//   var controls = viewer.controls();
//   controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
//   controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
//   controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
//   controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
//   controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
//   controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

//   function sanitize(s) {
//     return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
//   }

//   // function switchScene(scene) {
//   //   stopAutorotate();
//   //   scene.view.setParameters(scene.data.initialViewParameters);
//   //   scene.scene.switchTo();
//   //   startAutorotate();
//   //   updateSceneName(scene);
//   //   updateSceneList(scene);
//   // }

//   function updateSceneName(scene) {
//     sceneNameElement.innerHTML = sanitize(scene.data.name);
//   }

//   function updateSceneList(scene) {
//     for (var i = 0; i < sceneElements.length; i++) {
//       var el = sceneElements[i];
//       if (el.getAttribute('data-id') === scene.data.id) {
//         el.classList.add('current');
//       } else {
//         el.classList.remove('current');
//       }
//     }
//   }

//   function showSceneList() {
//     sceneListElement.classList.add('enabled');
//     sceneListToggleElement.classList.add('enabled');
//   }

//   function hideSceneList() {
//     sceneListElement.classList.remove('enabled');
//     sceneListToggleElement.classList.remove('enabled');
//   }

//   function toggleSceneList() {
//     sceneListElement.classList.toggle('enabled');
//     sceneListToggleElement.classList.toggle('enabled');
//   }

//   function startAutorotate() {
//     if (!autorotateToggleElement.classList.contains('enabled')) {
//       return;
//     }
//     viewer.startMovement(autorotate);
//     viewer.setIdleMovement(3000, autorotate);
//   }

//   function stopAutorotate() {
//     viewer.stopMovement();
//     viewer.setIdleMovement(Infinity);
//   }

//   function toggleAutorotate() {
//     if (autorotateToggleElement.classList.contains('enabled')) {
//       autorotateToggleElement.classList.remove('enabled');
//       stopAutorotate();
//     } else {
//       autorotateToggleElement.classList.add('enabled');
//       startAutorotate();
//     }
//   }

//   function createLinkHotspotElement(hotspot) {

//     // Create wrapper element to hold icon and tooltip.
//     var wrapper = document.createElement('div');
//     wrapper.classList.add('hotspot');
//     wrapper.classList.add('link-hotspot');

//     // Create image element.
//     var icon = document.createElement('img');
//     icon.src = 'img/link.png';
//     icon.classList.add('link-hotspot-icon');

//     // Set rotation transform.
//     var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
//     for (var i = 0; i < transformProperties.length; i++) {
//       var property = transformProperties[i];
//       icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
//     }

//     // Add click event handler.
//     wrapper.addEventListener('click', function() {
//       switchScene(findSceneById(hotspot.target));
//     });

//     // Prevent touch and scroll events from reaching the parent element.
//     // This prevents the view control logic from interfering with the hotspot.
//     stopTouchAndScrollEventPropagation(wrapper);

//     // Create tooltip element.
//     var tooltip = document.createElement('div');
//     tooltip.classList.add('hotspot-tooltip');
//     tooltip.classList.add('link-hotspot-tooltip');
//     tooltip.innerHTML = findSceneDataById(hotspot.target).name;

//     wrapper.appendChild(icon);
//     wrapper.appendChild(tooltip);

//     return wrapper;
//   }

//   function createInfoHotspotElement(hotspot) {

//     // Create wrapper element to hold icon and tooltip.
//     var wrapper = document.createElement('div');
//     wrapper.classList.add('hotspot');
//     wrapper.classList.add('info-hotspot');

//     // Create hotspot/tooltip header.
//     var header = document.createElement('div');
//     header.classList.add('info-hotspot-header');

//     // Create image element.
//     var iconWrapper = document.createElement('div');
//     iconWrapper.classList.add('info-hotspot-icon-wrapper');
//     var icon = document.createElement('img');
//     icon.src = 'img/info.png';
//     icon.classList.add('info-hotspot-icon');
//     iconWrapper.appendChild(icon);

//     // Create title element.
//     var titleWrapper = document.createElement('div');
//     titleWrapper.classList.add('info-hotspot-title-wrapper');
//     var title = document.createElement('div');
//     title.classList.add('info-hotspot-title');
//     title.innerHTML = hotspot.title;
//     titleWrapper.appendChild(title);

//     // Create close element.
//     var closeWrapper = document.createElement('div');
//     closeWrapper.classList.add('info-hotspot-close-wrapper');
//     var closeIcon = document.createElement('img');
//     closeIcon.src = 'img/close.png';
//     closeIcon.classList.add('info-hotspot-close-icon');
//     closeWrapper.appendChild(closeIcon);

//     // Construct header element.
//     header.appendChild(iconWrapper);
//     header.appendChild(titleWrapper);
//     header.appendChild(closeWrapper);

//     // Create text element.
//     var text = document.createElement('div');
//     text.classList.add('info-hotspot-text');
//     text.innerHTML = hotspot.text;

//     // Place header and text into wrapper element.
//     wrapper.appendChild(header);
//     wrapper.appendChild(text);

//     // Create a modal for the hotspot content to appear on mobile mode.
//     var modal = document.createElement('div');
//     modal.innerHTML = wrapper.innerHTML;
//     modal.classList.add('info-hotspot-modal');
//     document.body.appendChild(modal);

//     var toggle = function() {
//       wrapper.classList.toggle('visible');
//       modal.classList.toggle('visible');
//     };

//     // Show content when hotspot is clicked.
//     wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

//     // Hide content when close icon is clicked.
//     modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

//     // Prevent touch and scroll events from reaching the parent element.
//     // This prevents the view control logic from interfering with the hotspot.
//     stopTouchAndScrollEventPropagation(wrapper);

//     return wrapper;
//   }

//   // Prevent touch and scroll events from reaching the parent element.
//   function stopTouchAndScrollEventPropagation(element, eventList) {
//     var eventList = [
//       'touchstart', 'touchmove', 'touchend', 'touchcancel',
//       'pointerdown', 'pointermove', 'pointerup', 'pointercancel',
//       'wheel'
//     ];
//     for (var i = 0; i < eventList.length; i++) {
//       element.addEventListener(eventList[i], function(event) {
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

//   // Display the initial scene.
//   switchScene(scenes[0]);

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
'use strict';

(function() {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.data;

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes with progressive loading
  var scenes = data.scenes.map(function(data) {
    console.log(`Creating single progressive scene for: ${data.id}`);
    
    var imagePaths = {
      low: `/images/${data.id == 'oriente-station' ? "1.webp": data.id == 'electricity-museum' ? "2.webp" :"4.webp"}`,
      high: `${data.id == 'oriente-station' ? "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png": data.id == 'electricity-museum' ?"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png" :"https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png"}`
    };

    // SINGLE SCENE that starts with low quality and upgrades to HD
    var currentSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
    var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
    var limiter = Marzipano.RectilinearView.limit.traditional(4096, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: currentSource,
      geometry: geometry,
      view: view
    });

    var upgraded = false;
    var upgradeTimeout;
    var hdScene = null;

    // Quality indicator
    function updateQualityInfo() {
      var info = document.getElementById('qualityInfo');
      if (!info) {
        info = document.createElement('div');
        info.id = 'qualityInfo';
        info.style.cssText = `
          position: fixed; bottom: 20px; right: 20px;
          background: rgba(0,0,0,0.7); color: white;
          padding: 6px 10px; border-radius: 4px; z-index: 1000;
          font-family: Arial, sans-serif; font-size: 10px;
        `;
        document.body.appendChild(info);
      }
      
      var qualityColor = upgraded ? '#4CAF50' : '#FF9800';
      info.innerHTML = `<div style="color: ${qualityColor};">● ${upgraded ? '8K' : 'SD'} - ${data.id}</div>`;
    }

    // Create HD scene in background
    function createHDScene() {
      if (hdScene) return hdScene;
      
      var hdSource = Marzipano.ImageUrlSource.fromString(imagePaths.high, { crossOrigin: 'anonymous' });
      var hdGeometry = new Marzipano.EquirectGeometry([{ width: 8192 }]);
      
      hdScene = viewer.createScene({
        source: hdSource,
        geometry: hdGeometry,
        view: view
      });
      
      // Copy hotspots to HD scene
      data.linkHotspots.forEach(function(hotspot) {
        var element = createLinkHotspotElement(hotspot);
        hdScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      data.infoHotspots.forEach(function(hotspot) {
        var element = createInfoHotspotElement(hotspot);
        hdScene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });
      
      return hdScene;
    }

    // Smooth HD upgrade with seamless transition
    function upgradeToHD() {
      if (upgraded) return;
      
      console.log(`🔄 Upgrading ${data.id} to 8K`);
      
      var loading = document.getElementById('loadingIndicator');
      if (!loading) {
        loading = document.createElement('div');
        loading.id = 'loadingIndicator';
        loading.innerHTML = 'Loading 8K...';
        loading.style.cssText = `
          position: fixed; top: 20px; right: 20px;
          background: rgba(0,0,0,0.8); color: white;
          padding: 8px 12px; border-radius: 5px; z-index: 1000;
          font-family: Arial, sans-serif; font-size: 11px;
        `;
        document.body.appendChild(loading);
      }
      loading.style.display = 'block';
      
      // Preload HD image first
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        console.log(`✅ 8K preloaded for ${data.id}, creating 8K scene`);
        
        // Create HD scene
        var hdSceneInstance = createHDScene();
        
        // Get current view parameters
        var currentParams = scene.view().parameters();
        hdSceneInstance.view().setParameters(currentParams);
        
        // SEAMLESS SWITCH - No transition time
        hdSceneInstance.switchTo({ transitionDuration: 0 });
        
        upgraded = true;
        loading.style.display = 'none';
        updateQualityInfo();
        
        // Replace the main scene reference
        scene = hdSceneInstance;
        
        console.log(`🎉 ${data.id} seamlessly upgraded to 8K`);
      };
      
      img.onerror = function() {
        console.log(`❌ Failed to load 8K for ${data.id}`);
        loading.style.display = 'none';
      };
      
      img.src = imagePaths.high;
    }

    // Add hotspots
    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    data.infoHotspots.forEach(function(hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view,
      startUpgrade: function() {
        if (upgradeTimeout) clearTimeout(upgradeTimeout);
        upgradeTimeout = setTimeout(upgradeToHD, 2000);
        updateQualityInfo();
      },
      stopUpgrade: function() {
        if (upgradeTimeout) clearTimeout(upgradeTimeout);
        upgraded = false;
        updateQualityInfo();
      }
    };
  });

  // CRITICAL FIX: Set up autorotate properly
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });

  // Set initial autorotate state
  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  // DOM elements for view controls.
  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  // Associate view controls with elements.
  var controls = viewer.controls();
  controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
  controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
  controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    console.log(`🔄 Switching to scene: ${scene.data.id}`);
    
    // Stop all upgrades on other scenes
    scenes.forEach(s => {
      if (s.stopUpgrade && s !== scene) {
        s.stopUpgrade();
      }
    });
    
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo({ transitionDuration: 500 });
    
    // Start upgrade for current scene
    setTimeout(() => {
      if (scene.startUpgrade) {
        scene.startUpgrade();
      }
    }, 100);
    
    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
  }

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function createLinkHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    // Create image element.
    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function() {
      switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    // Create hotspot/tooltip header.
    var header = document.createElement('div');
    header.classList.add('info-hotspot-header');

    // Create image element.
    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');
    var icon = document.createElement('img');
    icon.src = 'img/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);

    // Create title element.
    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('info-hotspot-title-wrapper');
    var title = document.createElement('div');
    title.classList.add('info-hotspot-title');
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    // Create close element.
    var closeWrapper = document.createElement('div');
    closeWrapper.classList.add('info-hotspot-close-wrapper');
    var closeIcon = document.createElement('img');
    closeIcon.src = 'img/close.png';
    closeIcon.classList.add('info-hotspot-close-icon');
    closeWrapper.appendChild(closeIcon);

    // Construct header element.
    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    // Create text element.
    var text = document.createElement('div');
    text.classList.add('info-hotspot-text');
    text.innerHTML = hotspot.text;

    // Place header and text into wrapper element.
    wrapper.appendChild(header);
    wrapper.appendChild(text);

    // Create a modal for the hotspot content to appear on mobile mode.
    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function() {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    };

    // Show content when hotspot is clicked.
    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

    // Hide content when close icon is clicked.
    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

    // Prevent touch and scroll events from reaching the parent element.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [
      'touchstart', 'touchmove', 'touchend', 'touchcancel',
      'pointerdown', 'pointermove', 'pointerup', 'pointercancel',
      'wheel'
    ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
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
  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function() {
      screenfull.toggle();
    });
    screenfull.on('change', function() {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add('enabled');
      } else {
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener('click', toggleSceneList);

  // Start with the scene list open on desktop.
  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }

  // Set handler for scene switch.
  scenes.forEach(function(scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    el.addEventListener('click', function() {
      switchScene(scene);
      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains('mobile')) {
        hideSceneList();
      }
    });
  });

  // Display the initial scene.
  switchScene(scenes[0]);

  // Initialize first scene upgrade
  setTimeout(() => {
    if (scenes[0] && scenes[0].startUpgrade) {
      scenes[0].startUpgrade();
    }
  }, 1000);

})();