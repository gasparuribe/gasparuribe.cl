if(!publicaciones_to_show){
    var publicaciones_to_show=[];
    document.getElementById("post_img").style.background = "url('https://via.placeholder.com/460x272?text=Fail%20Sorry')";
    document.getElementById("post_img").style.backgroundSize  = "300px";
    document.getElementById("post_img").style.backgroundPosition = "center";
    document.getElementById("post_title").innerHTML  = 'Error de recurso';
    document.getElementById("post_date").innerHTML  ="Publicado el: "+new Date().toLocaleString("es-CL", {timeZone: "America/Santiago"});
    document.getElementById("post_edit").innerHTML  = '';
    document.getElementById("post_excerpt").innerHTML  = 'Aparentemente no se cargo archivo de publicaciones';
}else{
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if(params.id){
      publicaciones_to_show.forEach((post)=>{
        if(post.post_id==params.id){
          if(post.post_title){
            document.getElementById("post_title").innerHTML  = post.post_title;
          }
          if(post.post_date){
            document.getElementById("post_date").innerHTML  ="Publicado el: "+ new Date(post.post_date).toLocaleString("es-CL", {timeZone: "America/Santiago"});
          }
          if(post.post_edit){
            document.getElementById("post_edit").innerHTML  = "Editado el: "+  new Date(post.post_edit).toLocaleString("es-CL", {timeZone: "America/Santiago"});
          }
          if(post.post_img){
            document.getElementById("post_img").style.background = "url('"+post.post_img+"')";
            document.getElementById("post_img").style.backgroundSize  = "300px";
            document.getElementById("post_img").style.backgroundPosition = "center";
          }
          if(post.post_excerpt){
            document.getElementById("post_excerpt").innerHTML  =   post.post_excerpt;
          }
          if(post.post_text){
            document.getElementById("post_text").style.display = "block";
            document.getElementById("post_text").innerHTML  =  "<div class=\"row\"><div class=\"mdl-card mdl-shadow--2dp\"><div class=\"info-wrap\">"+ post.post_text+"</div></div></div>";
          }
          if(post.post_galeria){
            /* Galeria */
            document.getElementById("galeria").style.display = "block";
            document.getElementById("galeria").innerHTML  = '<div class=\"gallery\"></div>';
            github_get_gallery(post.post_galeria).then(function(galery_items) {
              console.log(galery_items);
              galery_items.forEach(image => {
                  const imgElement = document.createElement('img');
                  imgElement.src = "https://gasparuribe.cl/img/galeria/"+post.post_galeria+"/"+image.name;
                  document.getElementById("galeria").getElementsByClassName( 'gallery' )[0].appendChild(imgElement);
                });
            });
          }
        }
      });

  }
}
