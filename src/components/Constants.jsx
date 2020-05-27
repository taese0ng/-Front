const key = "AIzaSyDOiNL-HG2QFFXaj5WzLzc0dbtJpl71EFE";

export const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`;

// 위치 데이터

const convertTolatLng = (latLng, title) => {
  return {
    latLng,
    title
  };
};

export const locationsList = {
  RailBike: convertTolatLng("34.7721228886, 127.7468441887", "RailBike"),
  AquaPlanet: convertTolatLng("34.7462619289, 127.7487335703", "AquaPlanet"),
  CableCar: convertTolatLng("34.7307968308, 127.7393264527", "CableCar"),
  MarinePark: convertTolatLng("34.7421374671,  127.7531138476", "MarinePark"),
  Sunso: convertTolatLng("34.7549900281, 127.6632741574", "Sunso")
};
