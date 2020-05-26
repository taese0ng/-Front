import { locationsList } from "./Constants";
import { createLocationObject } from "./Helper";

const directions = [
  {
    from: locationsList.RailBike,
    to: locationsList.AquaPlanet,
    strokeColor: "#f68f54"
  },
  {
    from: locationsList.AquaPlanet,
    to: locationsList.MarinePark,
    strokeColor: "#f68f54"
  },
  {
    from: locationsList.MarinePark,
    to: locationsList.CableCar,
    strokeColor: "#f68f54"
  },
  {
    from: locationsList.CableCar,
    to: locationsList.Sunso,
    strokeColor: "#f68f54"
  }
];
const DummyLocations = directions.map(elem => {
  return createLocationObject(
    elem.from.latLng,
    elem.from.title,
    elem.to.latLng,
    elem.to.title,
    elem.strokeColor
  );
});

export default DummyLocations;
