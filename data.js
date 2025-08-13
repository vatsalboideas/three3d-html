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
var data = {
  scenes: [
    {
      id: "oriente-station",
      name: "Entry Scene",
      images: {
        low: "/images/1.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/1.png",
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
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.12678386676067,
          pitch: 0.3,
          rotation: 0,
          target: "electricity-museum",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: -0.00038049728702915786,
      //     pitch: 0.014985751462495145,
      //     title: "Oriente Station",
      //     text: "The Oriente Station is one of the most important bus and train stations in the city. Designed by the Spanish architect and engineer Santiago Calatrava, it has an enormous metal skeleton that covers the eight train lines and its platforms. Finished in 1998 to serve the Expo’98 and, later, the Parque das Nações area, in its surroundings are companies, services, hotels, bars, animation, as well as the well known Vasco da Gama shopping centre.",
      //   },
      // ],
    },
    {
      id: "electricity-museum",
      name: "Pre Function Area 1",
      images: {
        low: "/images/2.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/2.png",
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
        yaw: 3.14,
        fov: 0,
      },
      linkHotspots: [
        {
          yaw: 3.14,
          pitch: 0.2,
          rotation: 0,
          target: "jeronimos",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: -0.1606464893205768,
      //     pitch: -0.17433292221669205,
      //     title: "Boilers Room",
      //     text: "In the impressive Boilers Room at the Electricity Museum we find four large boilers of about 100 feet tall, with their respective control panels, air and fuel circuits, ventilators, etc. Boiler number 15 has been musealised and visitors may go in and discover its structure and internal component: conveyor belt, Bailey walls, naphtha burners, water heating tubes, and so on.",
      //   },
      // ],
    },
    {
      id: "jeronimos",
      name: "Pre Function Area 2",
      images: {
        low: "/images/3.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/3.png",
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
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 4.6,
          pitch: 0.3,
          rotation: 0,
          target: "preFunctionArea3",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "preFunctionArea3",
      name: "Pre Function Area 3",
      images: {
        low: "/images/4.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/4.png",
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
        yaw: 1.2,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 1.4,
          pitch: 0,
          rotation: 0,
          target: "preFunctionArea4",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "preFunctionArea4",
      name: "Pre Function Area 4",
      images: {
        low: "/images/5.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/5.png",
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
          pitch: 0,
          rotation: 0,
          target: "centerView",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "centerView",
      name: "Center View",
      images: {
        low: "/images/center.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/center.png",
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
          pitch: 0,
          rotation: 0,
          target: "stageView",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "stageView",
      name: "Stage View",
      images: {
        low: "/images/stage.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/stage.png",
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
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "backView",
      name: "Back View",
      images: {
        low: "/images/back.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/back.png",
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
          yaw: 0.1,
          pitch: 0,
          rotation: 0,
          target: "stageView",
        },
      ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "blankView",
      name: "Blank View",
      images: {
        low: "/images/blank.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/blank.png",
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
      // linkHotspots: [
      //   {
      //     yaw: -0.775981148319735,
      //     pitch: 0.2661802812323746,
      //     rotation: 0,
      //     target: "oriente-station",
      //   },
      // ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "weddingView",
      name: "Wedding View",
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
      // linkHotspots: [
      //   {
      //     yaw: -0.775981148319735,
      //     pitch: 0.2661802812323746,
      //     rotation: 0,
      //     target: "oriente-station",
      //   },
      // ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "corporateDimensionsView",
      name: "Corporate Dimensions View",
      images: {
        low: "/images/dimensions/dim-corporate.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/dim-corporate.jpg",
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
      // linkHotspots: [
      //   {
      //     yaw: -0.775981148319735,
      //     pitch: 0.2661802812323746,
      //     rotation: 0,
      //     target: "oriente-station",
      //   },
      // ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "dimEntryView",
      name: "Entry Dimensions View",
      images: {
        low: "/images/dimensions/dim-entry.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/dim-entry.png",
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
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
      // linkHotspots: [
      //   {
      //     yaw: -0.775981148319735,
      //     pitch: 0.2661802812323746,
      //     rotation: 0,
      //     target: "oriente-station",
      //   },
      // ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
    {
      id: "dimPreView",
      name: "Pre Entry Dimensions View",
      images: {
        low: "/images/dimensions/dim-pre.webp",
        high: "https://fourseasons-tril.s3.ap-south-1.amazonaws.com/dim-pre.png",
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
        yaw: 3.14,
        fov: 1.5707963267948966,
      },
      // linkHotspots: [
      //   {
      //     yaw: -0.775981148319735,
      //     pitch: 0.2661802812323746,
      //     rotation: 0,
      //     target: "oriente-station",
      //   },
      // ],
      // infoHotspots: [
      //   {
      //     yaw: 0.5350080558065997,
      //     pitch: 0.24525106321929435,
      //     title: "Jerónimos Monastery",
      //     text: "The Jerónimos Monastery cloister is a pleasant and serene place intended to foster monks’ prayers and meditation. Its manuelin decoration features decorative religious, nautical and royal elements, as well as vegetal motifs. Since 1985, the tomb of the poet Fernando Pessoa rests in the north wing of the cloister’s ground floor.",
      //   },
      // ],
    },
  ],
  name: "Four Seasons 3D Viewer",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: false,
    fullscreenButton: true,
    viewControlButtons: true,
  },
};
