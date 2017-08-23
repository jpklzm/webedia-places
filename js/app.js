(function(){

  function panoramaForPin(ev) {
    let {coords} = this.dataset;
    let el = this.querySelector(".panorama")
    initPanorama(el, coords.split(","));
  }

  const initPanorama = ($el, coords) => {

    const panorama = new google.maps.StreetViewPanorama(
          $el, {
          position: new google.maps.LatLng(...coords),
          pov: {
            heading: 270,
            pitch: 0
          },
          visible: true
    });
    // 360 degrees of streetview panorama
    let degree = panorama.getPov().heading;
    setTimeout(() => {

      setInterval(() => {
        degree += 1;
        if (degree >= 360) degree = 0;

        panorama.setPov({
          heading: degree,
          pitch: 0
        })
      }, 50);

    }, 2000)
  }

  Array.from(document.querySelectorAll(".pin"))
       .forEach(pin => pin.addEventListener("mouseover", panoramaForPin, false))
  
  Array.from(document.querySelectorAll(".pin")).forEach(pin => {
    pin.addEventListener(
      "click",
      () => {
        document.getElementById("p1").className += " hidden";
        document.getElementById("p2").className += " visible";
        console.log(pin.getAttribute("data-hq"))
      })
  });

  document.getElementById("back").addEventListener("click", () => {
    document.getElementById("p1").className = "pin-wrapper";
    document.getElementById("p2").className = "data-wrapper";
  });


})();
