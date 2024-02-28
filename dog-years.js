function dogYears(planet, ageInDogSeconds) {
  const earthYearIseconds = 31557600;
  const ageInEarthYears = ageInDogSeconds / earthYearIseconds;

  let dogYearMultiplier;
  switch (planet) {
    case "earth":
      dogYearMultiplier = 1;
      break;
    case "mercury":
      dogYearMultiplier = 0.2408467;
      break;
    case "venus":
      dogYearMultiplier = 0.61519726;
      break;
    case "mars":
      dogYearMultiplier = 1.8808158;
      break;
    case "jupiter":
      dogYearMultiplier = 11.862615;
      break;
    case "saturn":
      dogYearMultiplier = 29.447498;
      break;
    case "uranus":
      dogYearMultiplier = 84.016846;
      break;
    case "neptune":
      dogYearMultiplier = 164.79132;
      break;
    default:
      throw new Error("Invalid Planet name");
  }
  const ageInDogYears = (ageInEarthYears * 7) / dogYearMultiplier;

  const roundedAgeInYears = Math.round(ageInDogYears * 100) / 100;
  return roundedAgeInYears;
}
