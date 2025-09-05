/*
 * Four Seasons 3D Viewer - Scene Data Configuration
 * Contains all scene definitions, hotspots, and viewer settings
 */
var data = {
  scenes: [
    {
      id: "oriente-station",
      name: "Entry",
      images: {
        low: "/images/newprefunction/entry.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/entry.png",
      },
      // images: {
      //   low: "/images/1-entry.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1-entry.png",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.2,
          pitch: 0.41,
          rotation: 0,
          target: "electricity-museum",
        },
      ],
    },
    {
      id: "electricity-museum",
      name: "Pre Function Area 1",
       images: {
        low: "/images/newprefunction/2.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/2.png",
      },
      // images: {
      //   low: "/images/002.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/002.png",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.3,
          pitch: 0.25,
          rotation: 0,
          target: "jeronimos",
        },
      ],
    },
    {
      id: "jeronimos",
      name: "Pre Function Area 2",
      images: {
        low: "/images/newprefunction/3.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/3.png",
      },
      // images: {
      //   low: "/images/3.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/3.png",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        // yaw: 4.7,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0.3,
          pitch: 0.35,
          rotation: 0,
          target: "preFunctionArea3",
        },
      ],
    },
    {
      id: "preFunctionArea3",
      name: "Pre Function Area 3",
     images: {
        low: "/images/newprefunction/4.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/4.png",
      },
      // images: {
      //   low: "/images/004.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/004.jpg",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0,
          pitch: 0.3,
          rotation: 0,
          target: "preFunctionArea4",
        },
        {
          yaw: 1.3,
          pitch: 0.4,
          rotation: 0,
          target: "jeronimos",
        },
      ],
    },
    {
      id: "preFunctionArea4",
      name: "Pre Function Area 4",
      images: {
        low: "/images/newprefunction/5.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/5.jpg",
      },
      // images: {
      //   low: "/images/005.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/005.jpg",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0,
          pitch: 0,
          rotation: 0,
          target: "centerView",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: -0.2,
      //     pitch: -0.45,
      //     title: "Way to Ball Room",
      //     text: "This pathway leads to the main ballroom area where events and celebrations take place.",
      //   },
      // ],
    },
    {
      id: "centerView",
      name: "Center View",
      category: "corporate",
      images: {
        low: "/images/center01.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/center01.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.14,
          pitch: 0,
          rotation: 0,
          target: "backView",
        },
        {
          yaw: 0,
          pitch: 0.15,
          rotation: 0,
          target: "stageView",
        },
      ],
    },
    {
      id: "stageView",
      name: "Stage View",
      category: "corporate",
      images: {
        low: "/images/stage01.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/stage01.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0,
          pitch: 0.2,
          rotation: 0,
          target: "centerView",
        },
        {
          yaw: 0,
          pitch: 0,
          rotation: 0,
          target: "backView",
        },
      ],
    },
    {
      id: "backView",
      name: "Back View",
      category: "corporate",
      images: {
        low: "/images/back01.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/back01.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0,
          pitch: 0.3,
          rotation: 0,
          target: "centerView",
        },
        {
          yaw: 0,
          pitch: 0.1,
          rotation: 0,
          target: "stageView",
        },
      ],
    },
    {
      id: "blankView",
      name: "Blank View",
      category: "corporate",
      images: {
        low: "/images/blank01.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/blank01.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
    },
    {
      id: "weddingView",
      name: "Main View",
      category: "wedding",
      images: {
        low: "/images/wedding.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/wedding.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.14,
          pitch: 0,
          rotation: 0,
          target: "weddingBackView",
        },
        {
          yaw: 0,
          pitch: 0.15,
          rotation: 0,
          target: "weddingStageView",
        },
      ],
    },
    {
      id: "weddingCenterView",
      name: "Center View",
      category: "wedding",
      images: {
        low: "/images/wedding/center-2.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/wedding/center-2.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.14,
          pitch: 0,
          rotation: 0,
          target: "weddingBackView",
        },
        {
          yaw: 0,
          pitch: 0.15,
          rotation: 0,
          target: "weddingStageView",
        },
      ],
    },
    {
      id: "weddingStageView",
      name: "Stage View",
      category: "wedding",
      images: {
        low: "/images/wedding/stage-1.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/wedding/stage-1.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0,
          pitch: 0.2,
          rotation: 0,
          target: "weddingCenterView",
        },
        {
          yaw: 0,
          pitch: 0,
          rotation: 0,
          target: "weddingBackView",
        },
      ],
    },
    {
      id: "weddingBackView",
      name: "Back View",
      category: "wedding",
      images: {
        low: "/images/wedding/back-2.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/wedding/back-2.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0,
          pitch: 0.3,
          rotation: 0,
          target: "weddingCenterView",
        },
        {
          yaw: 0,
          pitch: 0.1,
          rotation: 0,
          target: "weddingStageView",
        },
      ],
    },
    {
      id: "weddingBlankView",
      name: "Blank View",
      category: "wedding",
      images: {
        low: "/images/wedding/blank-2.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/wedding/blank-2.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
    },
    {
      id: "corporateDimensionsView",
      name: "Dimensions View",
      category: "corporate",
      images: {
        low: "/images/dimensions/dimensions-corporate01.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/dimensions-corporate01.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
    },
    {
      id: "dimEntryView",
      name: "Dimensions View",
        images: {
        low: "/images/newprefunction/Entry dimension.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/Entry+dimension.png",
      },
      // images: {
      //   low: "/images/dimensions/dim-entry-1.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/dim-entry-1.png",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
    },
    {
      id: "dimPreView",
      name: "Dimensions View",
      images: {
        low: "/images/newprefunction/2 dimension.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/new-prefunction/2+dimension.png",
      },
      // images: {
      //   low: "/images/dimensions/dim-pre-1.webp",
      //   high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/dim-pre-1.png",
      // },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
    },
    {
      id: "weddingDimView",
      name: "Dimensions View",
      category: "wedding",
      images: {
        low: "/images/wedding/dim-2.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/wedding/dim-2.png",
      },
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
        {
          tileSize: 512,
          size: 4096,
        },
      ],
      faceSize: 4096,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
    },
  ],
  name: "Four Seasons 3D Viewer",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: true,
    fullscreenButton: true,
    viewControlButtons: true,
  },
};
