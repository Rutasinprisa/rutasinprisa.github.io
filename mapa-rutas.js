const mapElement = document.querySelector('#mapa-rutas');
const routeLinks = [...document.querySelectorAll('.route-card[data-lat][data-lon]')];

if (mapElement && window.L && routeLinks.length) {
  mapElement.hidden = false;
  const map = L.map(mapElement, { scrollWheelZoom: false });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const points = routeLinks.map(route => {
    const coordinates = [Number(route.dataset.lat), Number(route.dataset.lon)];
    const popupLink = document.createElement('a');
    popupLink.href = route.href;
    popupLink.textContent = route.textContent.trim();
    L.marker(coordinates, { title: popupLink.textContent, alt: popupLink.textContent })
      .addTo(map).bindPopup(popupLink);
    return coordinates;
  });

  if (points.length === 1) {
    map.setView(points[0], 9);
  } else {
    map.fitBounds(points, { padding: [32, 32], maxZoom: 11 });
  }
  document.querySelector('#mapa-alternativa').hidden = true;
}
