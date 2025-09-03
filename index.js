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

  // Global quality indicator update function
  function updateGlobalQualityInfo(scene) {
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

    var isUpgraded = scene.isUpgraded || false;
    var qualityColor = isUpgraded ? "#4CAF50" : "#FF9800";
    info.innerHTML = `<div style="color: ${qualityColor};">● ${
      isUpgraded ? "8K" : "SD"
    } - ${scene.data.name}</div>`;
  }

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
      mql.addEventListener("change", setMode);
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

  // Scene preloading cache - only for current scene
  var preloadedScenes = {};
  var currentScenePreloaded = false;

  // Preload only current scene images to prevent blank screens
  function preloadCurrentSceneImage(imagePath) {
    if (preloadedScenes[imagePath]) return;

    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      preloadedScenes[imagePath] = true;
      console.log(`📦 Preloaded current scene: ${imagePath}`);
    };
    img.onerror = function () {
      console.log(`❌ Failed to preload current scene: ${imagePath}`);
      // Mark as failed to prevent infinite retry
      preloadedScenes[imagePath] = false;
    };
    img.src = imagePath;
  }

  // Preload only the next likely scene (not all linked scenes)
  function preloadNextSceneImage(imagePath) {
    if (preloadedScenes[imagePath]) return;

    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      preloadedScenes[imagePath] = true;
      console.log(`📦 Preloaded next scene: ${imagePath}`);
    };
    img.onerror = function () {
      console.log(`❌ Failed to preload next scene: ${imagePath}`);
      preloadedScenes[imagePath] = false;
    };
    img.src = imagePath;
  }

  // Scene validation function
  function validateScene(scene) {
    if (!scene || !scene.data || !scene.data.id) {
      console.error("❌ Invalid scene object");
      return false;
    }

    var targetScene = scene.getCurrentScene
      ? scene.getCurrentScene()
      : scene.scene;
    if (!targetScene) {
      console.error(`❌ No valid scene reference for ${scene.data.id}`);
      return false;
    }

    return true;
  }

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

    // AGGRESSIVE HD upgrade function - always creates fresh scenes
    function upgradeToHD() {
      if (upgraded || upgradeAborted) return;

      console.log(`🔄 AGGRESSIVE FRESH upgrade ${sceneData.id} to 8K - no caching`);
      isUpgrading = true;

      // Show loading indicator
      var loading = document.getElementById("loadingIndicator");
      if (!loading) {
        loading = document.createElement("div");
        loading.id = "loadingIndicator";
        loading.innerHTML = "Loading 8K...";
        loading.style.cssText = `
          position: fixed; top: 50px; right: 20px;
          background: rgba(0,0,0,0.9); color: white;
          padding: 10px 15px; border-radius: 5px; z-index: 1000;
          font-family: Arial, sans-serif; font-size: 18px;
          border: 2px solid #4CAF50;
        `;
        document.body.appendChild(loading);
      }
      loading.style.display = "block";

      // ALWAYS create fresh HD scene - no caching
      console.log(`🆕 Creating FRESH HD scene for ${sceneData.id}`);
      var hdSceneInstance = createHDScene();
      var currentParams = scene.view().parameters();
      hdSceneInstance.view().setParameters(currentParams);

      // Preload HD image - NO TIMEOUT, will load regardless of network speed
      var img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = function () {
        // Only check if scene is still active, don't abort for other reasons
        if (currentActiveScene !== sceneInstance) {
          console.log(
            `🚫 ${sceneData.id} 8K loaded but scene changed - aborting switch`
          );
          loading.style.display = "none";
          isUpgrading = false;
          return;
        }

        console.log(`✅ FRESH 8K preloaded for ${sceneData.id}, switching to 8K scene`);

        // Switch to fresh HD scene
        try {
          hdSceneInstance.switchTo({ transitionDuration: 0 });
          upgraded = true;
          isUpgrading = false;
          loading.style.display = "none";

          // Store fresh HD scene reference
          sceneInstance.hdSceneRef = hdSceneInstance;
          sceneInstance.isUpgraded = true;

          // Update quality indicator
          updateGlobalQualityInfo(sceneInstance);

          console.log(`🎉 ${sceneData.id} successfully upgraded to FRESH 8K`);
        } catch (e) {
          console.error(`❌ HD scene switch failed for ${sceneData.id}:`, e);
          loading.style.display = "none";
          isUpgrading = false;
        }
      };

      img.onerror = function () {
        console.log(`❌ Failed to load 8K for ${sceneData.id} - retrying...`);
        loading.style.display = "none";
        isUpgrading = false;
        
        // Retry after a delay
        setTimeout(() => {
          if (currentActiveScene === sceneInstance && !upgraded) {
            console.log(`🔄 Retrying FRESH 8K load for ${sceneData.id}`);
            upgradeToHD();
          }
        }, 3000);
      };

      img.src = imagePaths.high;
    }

    // Add hotspots to initial scene - no aggressive preloading
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
      isUpgraded: false,
      hdSceneRef: null, // Store HD scene reference
      getCurrentScene: function () {
        // Return HD scene if available and upgraded, otherwise return SD scene
        return this.isUpgraded && this.hdSceneRef ? this.hdSceneRef : scene;
      },
      startUpgrade: function () {
        if (this.isUpgraded) return; // Don't upgrade if already upgraded
        upgradeAborted = false;
        if (upgradeTimeout) clearTimeout(upgradeTimeout);
        upgradeTimeout = setTimeout(upgradeToHD, 1500); // Reduced delay
        updateGlobalQualityInfo(this);
      },
      stopUpgrade: function () {
        console.log(`🛑 Stopping upgrade for ${sceneData.id} - scene switched`);
        upgradeAborted = true;
        if (upgradeTimeout) clearTimeout(upgradeTimeout);
        upgraded = false;
        isUpgrading = false;
        // CRITICAL: Don't reset isUpgraded flag or hdSceneRef if scene was already upgraded
        // This preserves the HD scene reference when returning to previously upgraded scenes
        updateGlobalQualityInfo(this);

        var loading = document.getElementById("loadingIndicator");
        if (loading) {
          loading.style.display = "none";
        }
      },
      // Reset scene to SD version (for debugging)
      resetToSD: function () {
        this.isUpgraded = false;
        this.hdSceneRef = null;
        upgraded = false;
        console.log(`🔄 Reset ${sceneData.id} to SD version`);
      },
      isUpgrading: function () {
        return isUpgrading;
      },
    };

    return sceneInstance;
  });

  // Debounce scene switching to prevent rapid switches
  var switchingInProgress = false;
  var lastSwitchTime = 0;

  // Simple cleanup function for 8K loading indicators only
  function cleanupLoadingIndicators() {
    var loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  }

  // AGGRESSIVE reset preloading state - clear everything
  function resetPreloadingState() {
    currentScenePreloaded = false;
    // NUCLEAR OPTION: Clear ALL preloaded scenes cache for fresh loading
    preloadedScenes = {};
    console.log("💥 NUCLEAR RESET: Cleared ALL preloaded scenes cache for fresh loading");
  }

  // Memory cleanup function to prevent buildup
  function cleanupMemory() {
    // Clear old preloaded scenes cache periodically to prevent memory buildup
    var cacheSize = Object.keys(preloadedScenes).length;
    if (cacheSize > 10) {
      console.log(`🧹 Cleaning up preloaded scenes cache (${cacheSize} entries)`);
      preloadedScenes = {};
    }
  }

  // Emergency fallback function to prevent black screens
  function emergencySceneFallback(scene) {
    console.log(`🚨 Emergency fallback for ${scene.data.id}`);
    
    // Force create a fresh SD scene
    var freshScene = scene.scene;
    if (freshScene) {
      try {
        freshScene.view().setParameters(scene.data.initialViewParameters);
        freshScene.switchTo({ transitionDuration: 0 });
        console.log(`✅ Emergency fallback successful for ${scene.data.id}`);
        return true;
      } catch (e) {
        console.error(`❌ Emergency fallback failed for ${scene.data.id}:`, e);
        return false;
      }
    }
    return false;
  }

  // AGGRESSIVE RELOAD: Force reload all scenes every time
  function switchScene(scene) {
    var now = Date.now();

    // Validate scene first
    if (!validateScene(scene)) {
      console.error(`❌ Cannot switch to invalid scene`);
      return;
    }

    // Prevent rapid switching (debounce)
    if (switchingInProgress || now - lastSwitchTime < 100) {
      console.log(`⏸️ Scene switch blocked - too rapid or in progress`);
      return;
    }

    switchingInProgress = true;
    lastSwitchTime = now;

    console.log(`🔄 AGGRESSIVE RELOAD switch to scene: ${scene.data.id}`);

    // NUCLEAR OPTION: Reset ALL scenes to force fresh loading
    console.log(`💥 Resetting ALL scenes for fresh loading`);
    scenes.forEach((s) => {
      s.isUpgraded = false;
      s.hdSceneRef = null;
      if (s.stopUpgrade) {
        s.stopUpgrade();
      }
    });

    // Update UI first
    updateSceneName(scene);
    updateSceneList(scene);
    updateGlobalQualityInfo(scene);

    var previousScene = currentActiveScene;
    currentActiveScene = scene;
    stopAutorotate();

    // ALWAYS use SD scene first - no existing HD scenes
    var targetScene = scene.scene;
    console.log(`🎯 FORCED SD scene for ${scene.data.id} - no caching`);

    // Set view parameters
    targetScene.view().setParameters(scene.data.initialViewParameters);

    // Switch to SD scene
    try {
      targetScene.switchTo({ transitionDuration: 0 });
      console.log(`✅ Switched to fresh SD scene: ${scene.data.id}`);
    } catch (e) {
      console.error(`❌ Scene switch failed for ${scene.data.id}:`, e);
    }

    // Reset preloading state
    resetPreloadingState();
    cleanupMemory();

    // Preload current scene's HD image
    if (!currentScenePreloaded) {
      preloadCurrentSceneImage(scene.data.images.high);
      currentScenePreloaded = true;
    }

    // Preload next scene
    if (scene.data.linkHotspots && scene.data.linkHotspots.length > 0) {
      var firstLinkedScene = findSceneDataById(scene.data.linkHotspots[0].target);
      if (firstLinkedScene) {
        setTimeout(() => {
          preloadNextSceneImage(firstLinkedScene.images.low);
        }, 1000);
      }
    }

    // Reset switching flag
    setTimeout(() => {
      switchingInProgress = false;
    }, 100);

    updateGlobalQualityInfo(scene);
    startAutorotate();

    // ALWAYS start HD upgrade - no existing HD scenes
    if (currentActiveScene === scene && scene.startUpgrade) {
      console.log(`🚀 FORCED HD upgrade for ${scene.data.id} - fresh loading`);
      scene.startUpgrade();
    }
  }

  // Initialize first scene
  function initializeFirstScene() {
    if (scenes[0]) {
      currentActiveScene = scenes[0];
      // Preload first scene's HD image immediately
      preloadCurrentSceneImage(scenes[0].data.images.high);
      currentScenePreloaded = true;
      
      switchScene(scenes[0]);
      // Initialize quality indicator for first scene
      updateGlobalQualityInfo(scenes[0]);
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

    // Show button on specific scenes and their dimensions views
    if (sceneId === "oriente-station") {
      // Entry scene only
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions Off";
    } else if (sceneId === "electricity-museum") {
      // Pre-function area 1 only
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions Off";
    } else if (sceneId === "stageView") {
      // Corporate stage view only
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions Off";
    } else if (sceneId === "weddingStageView") {
      // Wedding stage view only
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions Off";
    } else if (sceneId === "dimEntryView") {
      // Entry dimensions view
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions On";
    } else if (sceneId === "dimPreView") {
      // Pre-function dimensions view
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions On";
    } else if (sceneId === "corporateDimensionsView") {
      // Corporate dimensions view
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions On";
    } else if (sceneId === "weddingDimView") {
      // Wedding dimensions view
      shouldShowButton = true;
      if (buttonText) buttonText.textContent = "Dimensions On";
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
    sceneListAutoCloseTimer = setTimeout(function () {
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
    sceneGroupHeaders.forEach(function (header) {
      header.addEventListener("click", function () {
        var groupName = header.getAttribute("data-group");
        var content = document.querySelector(
          '.scene-group-content[data-group="' + groupName + '"]'
        );

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
      dimensionsToggleElement.addEventListener("click", function () {
        var currentScene = currentActiveScene;
        if (!currentScene) return;

        var sceneId = currentScene.data.id;
        var targetScene = null;

        // Specific scene mappings
        if (sceneId === "oriente-station") {
          // Entry scene → Entry dimensions
          targetScene = findSceneById("dimEntryView");
        } else if (sceneId === "electricity-museum") {
          // Pre-function area 1 → Pre-function dimensions
          targetScene = findSceneById("dimPreView");
        } else if (sceneId === "stageView") {
          // Corporate stage view → Corporate dimensions
          targetScene = findSceneById("corporateDimensionsView");
        } else if (sceneId === "weddingStageView") {
          // Wedding stage view → Wedding dimensions
          targetScene = findSceneById("weddingDimView");
        } else if (sceneId === "dimEntryView") {
          // Entry dimensions → Back to entry scene
          targetScene = findSceneById("oriente-station");
        } else if (sceneId === "dimPreView") {
          // Pre-function dimensions → Back to pre-function area 1
          targetScene = findSceneById("electricity-museum");
        } else if (sceneId === "corporateDimensionsView") {
          // Corporate dimensions → Back to stage view
          targetScene = findSceneById("stageView");
        } else if (sceneId === "weddingDimView") {
          // Wedding dimensions → Back to wedding stage view
          targetScene = findSceneById("weddingStageView");
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
      weddingView: "corporateDimensionsView",
      weddingCenterView: "corporateDimensionsView",
      weddingStageView: "corporateDimensionsView",
      weddingBackView: "corporateDimensionsView",
      weddingBlankView: "corporateDimensionsView",
    };

    return dimensionsMap[weddingSceneId] || "corporateDimensionsView";
  }

  // Scene list interaction listeners
  function addSceneListInteractionListeners() {
    sceneListElement.addEventListener("mouseenter", function () {
      console.log("🖱️ Mouse entered scene list - pausing auto-close");
      clearAutoCloseTimer();
    });

    sceneListElement.addEventListener("mouseleave", function () {
      if (sceneListElement.classList.contains("enabled")) {
        console.log("🖱️ Mouse left scene list - restarting auto-close");
        startAutoCloseTimer();
      }
    });

    sceneListElement.addEventListener("touchstart", function () {
      console.log("👆 Touch detected on scene list - pausing auto-close");
      clearAutoCloseTimer();
    });

    sceneListElement.addEventListener("touchend", function () {
      setTimeout(function () {
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

    var transformProperties = [
      "-ms-transform",
      "-webkit-transform",
      "transform",
    ];
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

    wrapper
      .querySelector(".info-hotspot-header")
      .addEventListener("click", toggle);
    modal
      .querySelector(".info-hotspot-close-wrapper")
      .addEventListener("click", toggle);

    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  function stopTouchAndScrollEventPropagation(element) {
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
    var el = document.querySelector(
      '#sceneList .scene[data-id="' + scene.data.id + '"]'
    );
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

  // Expose reset function globally for debugging
  window.resetSceneSwitching = function () {
    switchingInProgress = false;
    console.log("🔄 Scene switching reset manually");
  };

  // Emergency function to force reload all scenes
  window.forceReloadAllScenes = function () {
    console.log("🚨 Force reloading all scenes");
    scenes.forEach(function(scene) {
      scene.isUpgraded = false;
      scene.hdSceneRef = null;
    });
    console.log("✅ All scenes reset, ready for fresh loading");
  };

  // Emergency function to force reload current scene
  window.forceReloadCurrentScene = function () {
    if (currentActiveScene) {
      console.log(`🚨 Force reloading current scene: ${currentActiveScene.data.id}`);
      currentActiveScene.isUpgraded = false;
      currentActiveScene.hdSceneRef = null;
      switchScene(currentActiveScene);
    }
  };

  // NUCLEAR EMERGENCY FUNCTION - Use this if black screens persist
  window.nuclearSceneFix = function() {
    console.log("🚨 NUCLEAR SCENE FIX ACTIVATED - BREAKING ALL CACHING");
    
    // Hide any loading indicators
    var loading = document.getElementById("sceneLoadingIndicator");
    if (loading) loading.style.display = "none";
    var hdLoading = document.getElementById("loadingIndicator");
    if (hdLoading) hdLoading.style.display = "none";
    
    // NUCLEAR RESET: Break ALL scene caching
    scenes.forEach(function(scene) {
      scene.isUpgraded = false;
      scene.hdSceneRef = null;
    });
    
    // Clear ALL preloading cache
    preloadedScenes = {};
    currentScenePreloaded = false;
    
    // Reset switching state
    switchingInProgress = false;
    
    // Force reload current scene with fresh SD
    if (currentActiveScene) {
      console.log(`🚨 NUCLEAR reloading: ${currentActiveScene.data.id} - FRESH LOADING`);
      var targetScene = currentActiveScene.scene;
      targetScene.view().setParameters(currentActiveScene.data.initialViewParameters);
      targetScene.switchTo({ transitionDuration: 0 });
      console.log("✅ NUCLEAR fix complete - scene should be visible now with FRESH loading");
    }
  };

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
