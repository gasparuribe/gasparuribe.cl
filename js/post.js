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
    document.getElementById("post_img").style.background = "url('img/galeria/katara/IMG_0011.jpg')";
    document.getElementById("post_img").style.backgroundSize  = "300px";
    document.getElementById("post_img").style.backgroundPosition = "center";
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
  }else if(params.id=='nami'){
    document.getElementById("post_img").style.background = "url('img/galeria/nami/IMG-20210926-WA0000.jpg')";
    document.getElementById("post_img").style.backgroundSize  = "300px";
    document.getElementById("post_img").style.backgroundPosition = "center";
    document.getElementById("post_title").innerHTML  = 'Nami 2021❤';
    document.getElementById("post_date").innerHTML  = 'Publicado el: 27-09-2021 13:57:42';
    //document.getElementById("post_edit").innerHTML  = 'Editado el: 19-03-2019 20:24:33';
    document.getElementById("post_excerpt").innerHTML  = 'Nami Ñami Chuletas';

      /* Galeria */
    document.getElementById("galeria").style.display = "block";
    document.getElementById("galeria").innerHTML  = '<div class=\"gallery\"></div>';
    github_get_gallery('nami').then(function(galery_items) {
      console.log(galery_items);
      galery_items.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = "https://gasparuribe.cl/img/galeria/nami/"+image.name;
          document.getElementById("galeria").getElementsByClassName( 'gallery' )[0].appendChild(imgElement);
        });
    });
  }else if(params.id=='katara_nami'){
    document.getElementById("post_img").style.background = "url('img/galeria/katara_nami/katara-y-nami.jpg')";
    document.getElementById("post_img").style.backgroundSize  = "300px";
    document.getElementById("post_img").style.backgroundPosition = "center";
    document.getElementById("post_title").innerHTML  = 'Galeria Katara y Nami ❤';
    document.getElementById("post_date").innerHTML  = 'Publicado el: 19-12-2022 17:27:15';
    //document.getElementById("post_edit").innerHTML  = 'Editado el: 19-03-2019 20:24:33';
    document.getElementById("post_excerpt").innerHTML  = '';

      /* Galeria */
    document.getElementById("galeria").style.display = "block";
    document.getElementById("galeria").innerHTML  = '<div class=\"gallery\"></div>';
    github_get_gallery('katara_nami').then(function(galery_items) {
      console.log(galery_items);
      galery_items.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = "https://gasparuribe.cl/img/galeria/katara_nami/"+image.name;
          document.getElementById("galeria").getElementsByClassName( 'gallery' )[0].appendChild(imgElement);
        });
    });
  }else if(params.id=='arte_dani'){
    document.getElementById("post_img").style.background = "url('img/galeria/arte_dani/9bfe7fb8-ac6b-4ad0-8e6e-1cd162445059.jpg')";
    document.getElementById("post_img").style.backgroundSize  = "300px";
    document.getElementById("post_img").style.backgroundPosition = "center";
    document.getElementById("post_title").innerHTML  = 'El genial arte de Dani!';
    document.getElementById("post_date").innerHTML  = 'Publicado el: 23-05-2019 17:04:49';
    //document.getElementById("post_edit").innerHTML  = 'Editado el: 19-03-2019 20:24:33';
    document.getElementById("post_excerpt").innerHTML  = 'A continuación podrán disfrutar de el maravilloso talento de Dani, su habilidad artística, creativa y varias más nunca me dejan de sorprender. Estoy seguro que conquistara sus metas, es alguien que merece cosas buenas en exceso.';

      /* Galeria */
    document.getElementById("galeria").style.display = "block";
    document.getElementById("galeria").innerHTML  = '<div class=\"gallery\"></div>';
    github_get_gallery('arte_dani').then(function(galery_items) {
      console.log(galery_items);
      galery_items.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = "https://gasparuribe.cl/img/galeria/arte_dani/"+image.name;
          document.getElementById("galeria").getElementsByClassName( 'gallery' )[0].appendChild(imgElement);
        });
    });
  }
}
