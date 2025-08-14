/*
 * Four Seasons 3D Viewer - Marzipano Implementation
 * Clean and optimized version
 */
"use strict";

(function () {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.data;

  // Global tracking variables
  var currentActiveScene = null;
  var sceneListAutoCloseTimer = null;

  // DOM elements
  var panoElement = document.querySelector("#pano");
  var sceneNameElement = document.querySelector("#titleBar .sceneName");
  var sceneListElement = document.querySelector("#sceneList");
  var sceneElements = document.querySelectorAll("#sceneList .scene");
  var sceneListToggleElement = document.querySelector("#sceneListToggle");
  var autorotateToggleElement = document.querySelector("#autorotateToggle");
  var fullscreenToggleElement = document.querySelector("#fullscreenToggle");
  var dimensionsToggleElement = document.querySelector("#dimensionsToggle");
  var sceneGroupHeaders = document.querySelectorAll(".scene-group-header");

  // Device detection
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
    if (mql.addEventListener) {
      mql.addEventListener('change', setMode);
    } else {
      // Fallback for older browsers
      mql.addListener(setMode);
    }
  } else {
    document.body.classList.add("desktop");
  }

  // Touch device detection
  document.body.classList.add("no-touch");
  window.addEventListener("touchstart", function () {
    document.body.classList.remove("no-touch");
    document.body.classList.add("touch");
  });

  // IE fallback
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add("tooltip-fallback");
  }

  // Initialize viewer
  var viewer = new Marzipano.Viewer(panoElement, {
    controls: {
      mouseViewMode: data.settings.mouseViewMode,
    },
  });

  // Create scenes with progressive loading
  var scenes = data.scenes.map(function (sceneData) {
    var imagePaths = {
      low: sceneData.images.low,
      high: sceneData.images.high,
    };

    var currentSource = Marzipano.ImageUrlSource.fromString(imagePaths.low);
    var geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
    var limiter = Marzipano.RectilinearView.limit.traditional(
      4096,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180
    );
    var view = new Marzipano.RectilinearView(
      sceneData.initialViewParameters,
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
      } - ${sceneData.name}</div>`;
    }

    // Create HD scene
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
      
      // Add hotspots to HD scene
      if (sceneData.linkHotspots) {
        sceneData.linkHotspots.forEach(function (hotspot) {
          var element = createLinkHotspotElement(hotspot);
          hdScene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }
      if (sceneData.infoHotspots) {
        sceneData.infoHotspots.forEach(function (hotspot) {
          var element = createInfoHotspotElement(hotspot);
          hdScene
            .hotspotContainer()
            .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      }

      return hdScene;
    }

    // HD upgrade function
    function upgradeToHD() {
      if (upgraded || upgradeAborted) return;
      
      // Check if this scene is still active
      if (currentActiveScene !== sceneInstance) {
        console.log(`🚫 Cancelling ${sceneData.id} upgrade - no longer active scene`);
        upgradeAborted = true;
        return;
      }

      console.log(`🔄 Upgrading ${sceneData.id} to 8K`);
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

      // Preload HD image
      var img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = function () {
        // Double-check scene is still active
        if (currentActiveScene !== sceneInstance || upgradeAborted) {
          console.log(`🚫 ${sceneData.id} 8K loaded but scene changed - aborting switch`);
          loading.style.display = "none";
          isUpgrading = false;
          return;
        }

        console.log(`✅ 8K preloaded for ${sceneData.id}, creating 8K scene`);

        var hdSceneInstance = createHDScene();
        var currentParams = scene.view().parameters();
        hdSceneInstance.view().setParameters(currentParams);
        
        // Stop current autorotate before switching
        stopAutorotate();
        
        hdSceneInstance.switchTo({ transitionDuration: 0 });

        upgraded = true;
        isUpgrading = false;
        loading.style.display = "none";
        updateQualityInfo();
        scene = hdSceneInstance;

        // Restart autorotate after a short delay to ensure scene is fully loaded
        console.log(`🔄 Restarting autorotate after 8K upgrade for ${sceneData.id}`);
        setTimeout(() => {
          startAutorotate();
        }, 300);

        // Update the scene instance reference
        sceneInstance.scene = hdSceneInstance;

        console.log(`🎉 ${sceneData.id} seamlessly upgraded to 8K`);
      };

      img.onerror = function () {
        console.log(`❌ Failed to load 8K for ${sceneData.id}`);
        loading.style.display = "none";
        isUpgrading = false;
      };

      img.src = imagePaths.high;
    }

    // Add hotspots to initial scene
    if (sceneData.linkHotspots) {
      sceneData.linkHotspots.forEach(function (hotspot) {
        var element = createLinkHotspotElement(hotspot);
        scene
          .hotspotContainer()
          .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });
    }

    if (sceneData.infoHotspots) {
      sceneData.infoHotspots.forEach(function (hotspot) {
        var element = createInfoHotspotElement(hotspot);
        scene
          .hotspotContainer()
          .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });
    }

    var sceneInstance = {
      data: sceneData,
      scene: scene,
      view: view,
      getCurrentScene: function() {
        return scene; // This will return the current scene (SD or HD)
      },
      startUpgrade: function () {
        upgradeAborted = false;
        if (upgradeTimeout) clearTimeout(upgradeTimeout);
        upgradeTimeout = setTimeout(upgradeToHD, 2000);
        updateQualityInfo();
      },
      stopUpgrade: function () {
        console.log(`🛑 Stopping upgrade for ${sceneData.id}`);
        upgradeAborted = true;
        if (upgradeTimeout) clearTimeout(upgradeTimeout);
        upgraded = false;
        isUpgrading = false;
        updateQualityInfo();
        
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

  // Scene switching function
  function switchScene(scene) {
    console.log(`🔄 Switching to scene: ${scene.data.id}`);

    // Stop all upgrades on other scenes
    scenes.forEach((s) => {
      if (s.stopUpgrade && s !== scene) {
        s.stopUpgrade();
      }
    });

    currentActiveScene = scene;
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    
    // Use getCurrentScene to get the actual current scene (SD or HD)
    var currentScene = scene.getCurrentScene ? scene.getCurrentScene() : scene.scene;
    currentScene.switchTo({ transitionDuration: 500 });

    // Start upgrade for current scene
    setTimeout(() => {
      if (currentActiveScene === scene && scene.startUpgrade) {
        scene.startUpgrade();
      }
    }, 600);

    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
  }

  // Initialize first scene
  function initializeFirstScene() {
    if (scenes[0]) {
      currentActiveScene = scenes[0];
      switchScene(scenes[0]);
    }
  }

  // Autorotate setup
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });

  // Global autorotate state tracking
  var isAutorotateEnabled = data.settings.autorotateEnabled;

  if (isAutorotateEnabled) {
    autorotateToggleElement.classList.add("enabled");
  }

  // View controls setup
  var viewUpElement = document.querySelector("#viewUp");
  var viewDownElement = document.querySelector("#viewDown");
  var viewLeftElement = document.querySelector("#viewLeft");
  var viewRightElement = document.querySelector("#viewRight");
  var viewInElement = document.querySelector("#viewIn");
  var viewOutElement = document.querySelector("#viewOut");

  var velocity = 0.7;
  var friction = 3;

  var controls = viewer.controls();
  controls.registerMethod(
    "upElement",
    new Marzipano.ElementPressControlMethod(viewUpElement, "y", -velocity, friction),
    true
  );
  controls.registerMethod(
    "downElement",
    new Marzipano.ElementPressControlMethod(viewDownElement, "y", velocity, friction),
    true
  );
  controls.registerMethod(
    "leftElement",
    new Marzipano.ElementPressControlMethod(viewLeftElement, "x", -velocity, friction),
    true
  );
  controls.registerMethod(
    "rightElement",
    new Marzipano.ElementPressControlMethod(viewRightElement, "x", velocity, friction),
    true
  );
  controls.registerMethod(
    "inElement",
    new Marzipano.ElementPressControlMethod(viewInElement, "zoom", -velocity, friction),
    true
  );
  controls.registerMethod(
    "outElement",
    new Marzipano.ElementPressControlMethod(viewOutElement, "zoom", velocity, friction),
    true
  );

  // Utility functions
  function sanitize(s) {
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
  }

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    // Update all scene elements
    var allScenes = document.querySelectorAll("#sceneList .scene");
    for (var i = 0; i < allScenes.length; i++) {
      var el = allScenes[i];
      if (el.getAttribute("data-id") === scene.data.id) {
        el.classList.add("current");
      } else {
        el.classList.remove("current");
      }
    }
    
    // Show/hide dimensions button based on scene category
    updateDimensionsButton(scene);
  }

  function updateDimensionsButton(scene) {
    if (!dimensionsToggleElement) {
      return;
    }
    
    var buttonText = dimensionsToggleElement.querySelector(".button-text");
    var sceneId = scene.data.id;
    var shouldShowButton = false;
    
    // Show button for all relevant scene types
    if (scene.data.category === "wedding") {
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Wedding Dimensions";
    } else if (scene.data.category === "corporate") {
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Corporate Dimensions";
    } else if (sceneId === "oriente-station") {
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Entry Dimensions";
    } else if (sceneId === "electricity-museum" || sceneId === "jeronimos" || sceneId.includes("preFunctionArea")) {
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Pre Function Dimensions";
    }
    
    // Show/hide button with force
    if (shouldShowButton) {
      dimensionsToggleElement.classList.remove("d-none");
      dimensionsToggleElement.classList.add("show-button", "force-show");
      dimensionsToggleElement.style.display = "flex";
      dimensionsToggleElement.style.visibility = "visible";
      dimensionsToggleElement.style.opacity = "1";
    } else {
      dimensionsToggleElement.classList.add("d-none");
      dimensionsToggleElement.classList.remove("show-button", "force-show");
      dimensionsToggleElement.style.display = "none";
    }
  }

  // Scene list functions with auto-close
  function clearAutoCloseTimer() {
    if (sceneListAutoCloseTimer) {
      clearTimeout(sceneListAutoCloseTimer);
      sceneListAutoCloseTimer = null;
    }
  }

  function startAutoCloseTimer() {
    clearAutoCloseTimer();
    sceneListAutoCloseTimer = setTimeout(function() {
      console.log("⏰ Auto-closing scene list after 5 seconds");
      hideSceneList();
    }, 5000);
  }

  function showSceneList() {
    sceneListElement.classList.add("enabled");
    sceneListToggleElement.classList.add("enabled");
    startAutoCloseTimer();
  }

  function hideSceneList() {
    sceneListElement.classList.remove("enabled");
    sceneListToggleElement.classList.remove("enabled");
    clearAutoCloseTimer();
  }

  function toggleSceneList() {
    if (sceneListElement.classList.contains("enabled")) {
      hideSceneList();
    } else {
      showSceneList();
    }
  }

  // Scene group dropdown functionality
  function initializeSceneGroups() {
    sceneGroupHeaders.forEach(function(header) {
      header.addEventListener("click", function() {
        var groupName = header.getAttribute("data-group");
        var content = document.querySelector('.scene-group-content[data-group="' + groupName + '"]');
        
        if (content) {
          var isExpanded = content.classList.contains("expanded");
          
          if (isExpanded) {
            content.classList.remove("expanded");
            header.classList.remove("expanded");
          } else {
            content.classList.add("expanded");
            header.classList.add("expanded");
          }
        }
      });
    });
  }

  // Dimensions button functionality
  function initializeDimensionsButton() {
    if (dimensionsToggleElement) {
      dimensionsToggleElement.addEventListener("click", function() {
        var currentScene = currentActiveScene;
        if (!currentScene) return;
        
        var sceneId = currentScene.data.id;
        var targetScene = null;
        
        // Simple mapping: each scene type goes to its dimensions view
        if (currentScene.data.category === "wedding") {
          targetScene = findSceneById("weddingDimView");
        } else if (currentScene.data.category === "corporate") {
          targetScene = findSceneById("corporateDimensionsView");
        } else if (sceneId === "oriente-station") {
          targetScene = findSceneById("dimEntryView");
        } else if (sceneId === "electricity-museum" || sceneId === "jeronimos" || sceneId.includes("preFunctionArea")) {
          targetScene = findSceneById("dimPreView");
        }
        
        // Switch to target scene
        if (targetScene) {
          switchScene(targetScene);
        }
      });
    }
  }

  function getDimensionsSceneId(weddingSceneId) {
    // Map wedding scenes to their corresponding dimensions scenes
    var dimensionsMap = {
      "weddingView": "corporateDimensionsView",
      "weddingCenterView": "corporateDimensionsView", 
      "weddingStageView": "corporateDimensionsView",
      "weddingBackView": "corporateDimensionsView",
      "weddingBlankView": "corporateDimensionsView"
    };
    
    return dimensionsMap[weddingSceneId] || "corporateDimensionsView";
  }

  // Scene list interaction listeners
  function addSceneListInteractionListeners() {
    sceneListElement.addEventListener("mouseenter", function() {
      console.log("🖱️ Mouse entered scene list - pausing auto-close");
      clearAutoCloseTimer();
    });

    sceneListElement.addEventListener("mouseleave", function() {
      if (sceneListElement.classList.contains("enabled")) {
        console.log("🖱️ Mouse left scene list - restarting auto-close");
        startAutoCloseTimer();
      }
    });

    sceneListElement.addEventListener("touchstart", function() {
      console.log("👆 Touch detected on scene list - pausing auto-close");
      clearAutoCloseTimer();
    });

    sceneListElement.addEventListener("touchend", function() {
      setTimeout(function() {
        if (sceneListElement.classList.contains("enabled")) {
          console.log("👆 Touch ended - restarting auto-close");
          startAutoCloseTimer();
        }
      }, 100);
    });
  }

  // Autorotate functions
  function startAutorotate() {
    if (isAutorotateEnabled) {
      console.log("🔄 Starting autorotate");
      viewer.startMovement(autorotate);
      viewer.setIdleMovement(3000, autorotate);
    }
  }

  function stopAutorotate() {
    console.log("⏸️ Stopping autorotate");
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains("enabled")) {
      autorotateToggleElement.classList.remove("enabled");
      isAutorotateEnabled = false;
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add("enabled");
      isAutorotateEnabled = true;
      startAutorotate();
    }
  }

  // Hotspot creation functions
  function createLinkHotspotElement(hotspot) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("hotspot");
    wrapper.classList.add("link-hotspot");

    var icon = document.createElement("img");
    icon.src = "img/link.png";
    icon.classList.add("link-hotspot-icon");

    var transformProperties = ["-ms-transform", "-webkit-transform", "transform"];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
    }

    wrapper.addEventListener("click", function () {
      switchScene(findSceneById(hotspot.target));
    });

    stopTouchAndScrollEventPropagation(wrapper);

    var tooltip = document.createElement("div");
    tooltip.classList.add("hotspot-tooltip");
    tooltip.classList.add("link-hotspot-tooltip");
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("hotspot");
    wrapper.classList.add("info-hotspot");

    var header = document.createElement("div");
    header.classList.add("info-hotspot-header");

    var iconWrapper = document.createElement("div");
    iconWrapper.classList.add("info-hotspot-icon-wrapper");
    var icon = document.createElement("img");
    icon.src = "img/info.png";
    icon.classList.add("info-hotspot-icon");
    iconWrapper.appendChild(icon);

    var titleWrapper = document.createElement("div");
    titleWrapper.classList.add("info-hotspot-title-wrapper");
    var title = document.createElement("div");
    title.classList.add("info-hotspot-title");
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    var closeWrapper = document.createElement("div");
    closeWrapper.classList.add("info-hotspot-close-wrapper");
    var closeIcon = document.createElement("img");
    closeIcon.src = "img/close.png";
    closeIcon.classList.add("info-hotspot-close-icon");
    closeWrapper.appendChild(closeIcon);

    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    var text = document.createElement("div");
    text.classList.add("info-hotspot-text");
    text.innerHTML = hotspot.text;

    wrapper.appendChild(header);
    wrapper.appendChild(text);

    var modal = document.createElement("div");
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add("info-hotspot-modal");
    document.body.appendChild(modal);

    var toggle = function () {
      wrapper.classList.toggle("visible");
      modal.classList.toggle("visible");
    };

    wrapper.querySelector(".info-hotspot-header").addEventListener("click", toggle);
    modal.querySelector(".info-hotspot-close-wrapper").addEventListener("click", toggle);

    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  function stopTouchAndScrollEventPropagation(element) {
    var eventList = [
      "touchstart", "touchmove", "touchend", "touchcancel",
      "pointerdown", "pointermove", "pointerup", "pointercancel", "wheel"
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

  // Event handlers
  autorotateToggleElement.addEventListener("click", toggleAutorotate);

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

  sceneListToggleElement.addEventListener("click", toggleSceneList);

  if (!document.body.classList.contains("mobile")) {
    showSceneList();
  }

  // Scene switch handlers
  scenes.forEach(function (scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    if (el) {
      el.addEventListener("click", function () {
        switchScene(scene);
        if (document.body.classList.contains("mobile")) {
          hideSceneList();
        } else {
          startAutoCloseTimer();
        }
      });
    }
  });

  // Initialize
  addSceneListInteractionListeners();
  initializeSceneGroups();
  initializeDimensionsButton();
  
  setTimeout(() => {
    if (scenes[0] && scenes[0].startUpgrade) {
      scenes[0].startUpgrade();
    }
  }, 1000);

  initializeFirstScene();

})();