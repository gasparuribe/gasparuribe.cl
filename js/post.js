const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if(params.id){
  if(params.id=='lucky'){
    document.getElementById("post_img").style.background = "url('img/galeria/lucky/a_1_by_unknow.jpg')";
    document.getElementById("post_img").style.backgroundSize  = "300px";
    document.getElementById("post_img").style.backgroundPosition = "center";
    document.getElementById("post_title").innerHTML  = 'Lucky 2012❤2019';
    document.getElementById("post_date").innerHTML  = 'Publicado el: 10-02-2013 16:57:30';
    document.getElementById("post_edit").innerHTML  = 'Editado el: 19-03-2019 20:24:33';
    document.getElementById("post_excerpt").innerHTML  = 'Lo extraño mucho, era muy buen gato. Entendía algunas cosas y muy regalón si lo pillabas de buen humor. Una personalidad muy calmada, sin contar cuando quería salir y no podía o las clásicas locuras nocturnas de los gatos.';

      /* Galeria */
    document.getElementById("galeria").style.display = "block";
    document.getElementById("galeria").innerHTML  = '<div class=\"gallery\"></div>';
    github_get_gallery('lucky').then(function(galery_items) {
      console.log(galery_items);
      galery_items.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = "https://gasparuribe.cl/img/galeria/lucky/"+image.name;
          document.getElementById("galeria").getElementsByClassName( 'gallery' )[0].appendChild(imgElement);
        });
    });

  }else if(params.id=='katara'){
    //document.getElementById("post_img").style.background = "url('img/galeria/lucky/a_1_by_unknow.jpg')";
    //document.getElementById("post_img").style.backgroundSize  = "300px";
    //document.getElementById("post_img").style.backgroundPosition = "center";
    document.getElementById("post_title").innerHTML  = 'Katara 2020❤';
    document.getElementById("post_date").innerHTML  = 'Publicado el: 15-06-2020 17:27:15';
    //document.getElementById("post_edit").innerHTML  = 'Editado el: 19-03-2019 20:24:33';
    document.getElementById("post_excerpt").innerHTML  = 'Katara Luna nació en marzo del 2020, la adopte entre abril y mayo de ese año. El primer año vivió acompañándome en la casa de mi familia. Hoy ya tiene una "hermana" adoptiva con 1 año de diferencia, la Nami.';

      /* Galeria */
    document.getElementById("galeria").style.display = "block";
    document.getElementById("galeria").innerHTML  = '<div class=\"gallery\"></div>';
    github_get_gallery('katara').then(function(galery_items) {
      console.log(galery_items);
      galery_items.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = "https://gasparuribe.cl/img/galeria/katara/"+image.name;
          document.getElementById("galeria").getElementsByClassName( 'gallery' )[0].appendChild(imgElement);
        });
    });
  }
}
