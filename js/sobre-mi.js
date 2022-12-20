
if(!publicaciones_to_show){
  var publicaciones_to_show=[];
  publicaciones_to_show.push({
      'post_id':"fail-posts-get",
      'post_img':"https://via.placeholder.com/460x272?text=Fail%20Sorry",
      'post_url':'#',
      'post_target':'',
      'post_date': new Date,
      //'post_edit':'',
      'post_title':'Fail with Posts',
      'post_in':'----',
      'zmdi':'cloud-off',
      'zmdi_color':'bg-red-dark',
      'post_excerpt':'Aparentemente no se cargo archivo de publicaciones'
    });
}

const faws = aws_url+'/?action=sobre_mi';
const freddit = 'https://www.reddit.com/user/gasparuribe/submitted.json';
const ffail = 'https://httpstat.us/500';
var publicaciones_default_tuhmbnail="https://via.placeholder.com/460x272?text=No%20IMG";
const promises = [
  fetch(faws).catch(function(error) {publicaciones_to_show.push({
      'post_id':"aws-fail",
      'post_img':"https://via.placeholder.com/460x272?text=Oh%20NO%21",
      'post_url':'#',
      'post_target':'',
      'post_date':'',
      'post_title':'Problema con AWS',
      'post_in':'---',
      'zmdi':'cloud-off',
      'zmdi_color':'bg-red-dark',
      'post_excerpt':'No se pudo establecer conexión para obtener información.',
      'post_error':error
    });}),
  fetch(freddit).catch(function(error) {publicaciones_to_show.push({
      'post_id':"reddit-fail",
      'post_img':"https://via.placeholder.com/460x272?text=Oh%20NO%21",
      'post_url':'#',
      'post_target':'',
      'post_date':'',
      'post_title':'Problema con Reddit',
      'post_in':'---',
      'zmdi':'cloud-off',
      'zmdi_color':'bg-red-dark',
      'post_excerpt':'No se pudo establecer conexión para obtener información.',
      'post_error':error
    });}),
/*
  fetch(ffail).then(function(responses) {throw Error("aaa")}).catch(function(error) {publicaciones_to_show.push({
      'post_id':"test-fail",
      'post_img':"https://via.placeholder.com/460x272?text=Oh%20NO%21",
      'post_url':'#',
      'post_target':'',
      'post_date':'',
      'post_title':'Problema Demo',
      'post_in':'---',
      'zmdi':'cloud-off',
      'zmdi_color':'bg-red-dark',
      'post_excerpt':'No se pudo establecer conexión para obtener información.',
      'post_error':error
    });})
*/
];
Promise.all(promises)
  .then(function(responses) {
    console.log(responses);
    responses.forEach(async (response)=>{
      if(response){
        if(response.ok){
          if(response.headers.get('Content-Type').includes('json')){
            const data = await response.json();
            if(response.url==faws){
              if(data.spotify){
                show_spotify(data.spotify);
              }
              if(data.youtube){
                if(data.youtube.posts){
                  var dyp=data.youtube.posts;
                  dyp.forEach((post)=>{
                    publicaciones_to_show.push(post);
                  });
                }
              }
              //get publicaciones
            }else if(response.url==freddit){
              var frd=format_reddit_data(data);
              frd.forEach((post)=>{
                publicaciones_to_show.push(post);
              });
            }else{
              console.log("Aparentemente la respuesta no coincide con url: "+ response.url);
              console.log(response);
            }
          }else{
            console.log("Aparentemente la respuesta no es JSON");
            console.log(response);
          }
        }else{
          console.log("Aparentemente ocurrio un error con: "+ response.url);
          console.log(response);
        }
      }

      show_posts();
    });
  })
  .catch(function(error) {
    // Handle any errors
    console.log("Promesas ROTAS!");
    console.log(error);
  });

function format_reddit_data(recived){
    var reddit_response=recived.data.children;
    console.log(reddit_response);
    var return_obj=[];
    reddit_forcount=0;
    reddit_response.forEach((post)=>{
      reddit_forcount=reddit_forcount+1;
      var post_url="https://www.reddit.com"+post.data.permalink;
      var post_thumbnail="default";
      if(post.data.thumbnail){
        post_thumbnail=post.data.thumbnail;
      }
      if(post_thumbnail=="default"||post_thumbnail=="self"){
        post_thumbnail=publicaciones_default_tuhmbnail;
      }
      if(post.data.media_metadata){
        var postMedia=post.data.media_metadata;
        var forCount=0;
        Object.keys(postMedia).forEach(key => {
          if(forCount==0){
            if(postMedia[key].m=="image/jpg"){
              post_thumbnail=postMedia[key].p[2].u;
              forCount++;
            }
          }
        });
      }
      var texto="";
      if(post.data.selftext){
        texto=post.data.selftext;//
      }
      var post_edited=false;
      if(post.data.edited){
        post_edited=new Date(post.data.edited * 1000);
      }
      return_obj.push(  {
          'post_id':"r-"+reddit_forcount,
          'post_img':post_thumbnail,
          'post_url':post_url,
          'post_target':'_blank',
          'post_date':new Date(post.data.created_utc * 1000),
          'post_edit':post_edited,
          'post_title':post.data.title,
          'post_in':post.data.subreddit_name_prefixed,
          'zmdi':'reddit',
          'zmdi_color':'bg-orange',
          'post_excerpt':texto,
        });
    });
    return return_obj;
}
function filter_posts_by_id(array,id_to_filter){
  id_to_filter.forEach((id)=>{
    const objWithIdIndex = array.findIndex((obj) => obj.post_id === id);
    if (objWithIdIndex > -1) {
      array.splice(objWithIdIndex, 1);
    }
  });
  return array;
}

function show_posts(){
  /* Ordenar publicaciones */
  const id_to_filter=['arte_dani','katara_nami'];
  publicaciones_to_show=filter_posts_by_id(publicaciones_to_show,id_to_filter);
  publicaciones_to_show.sort(function(a,b){
    if(a.post_edit&&b.post_edit&&a.post_date&&b.post_date){
      var aa= Date.parse(new Date(a.post_edit));
      var bb= Date.parse(new Date(b.post_edit));
      return bb - aa;
    }else if(a.post_edit&&!b.post_edit&&a.post_date&&b.post_date){
      var aa= Date.parse(new Date(a.post_edit));
      var bb= Date.parse(new Date(b.post_date));
      return bb - aa;
    }else if(!a.post_edit&&b.post_edit&&a.post_date&&b.post_date){
      var aa= Date.parse(new Date(a.post_date));
      var bb= Date.parse(new Date(b.post_edit));
      return bb - aa;
    }else{//if(!a.post_edit&&!b.post_edit)
      if(a.post_date&&b.post_date){
        var aa= Date.parse(new Date(a.post_date));
        var bb= Date.parse(new Date(b.post_date));
        return bb - aa;
      }else if(a.post_date&&!b.post_date){
        return true;
      }else{
        return false;
      }
    }
  });
  /* Show publicaciones */
  document.getElementById("mixed_posts").innerHTML="";
  if(publicaciones_to_show<1){
    document.getElementById("mixed_posts").innerHTML="<span style=\"padding: 35px;font-size: 18px;\">El usuario aún no publica, aquí aparecerá cuando lo haga.</span>";
  }else{
    publicaciones_to_show.forEach((post)=>{
      if(post.post_date){
        var post_date_raw=new Date(post.post_date);
        var post_date_to_show=post_date_raw.toLocaleString("es-CL", {timeZone: "America/Santiago"});
      }
      if(post.post_edit){
        var post_edit_raw=new Date(post.post_edit);
        var post_edit_to_show=post_edit_raw.toLocaleString("es-CL", {timeZone: "America/Santiago"});
        var post_date_to_show="Editado:<b style=\"font-weight: bold;\">"+post_edit_to_show+"</b><br>Creado: "+post_date_to_show;
      }
      if(post.post_error){
        var post_date_to_show=post.post_error;
      }
      var post_data="";
      var img_style="background: transparent url(\'"+post.post_img+"\') repeat scroll center center/cover;";
      var html_to_return=""+
      "            <div class=\"slide\" id=\"slide-"+post.post_id+"\" data-postCategory=\"\" style=\""+post_data+"\">"+
      "              <div class=\"col-sm-4 mb-30\" style=\"width: 300px;\">"+
      "              <div class=\"mdl-card mdl-shadow--2dp pa-0\">"+
      "                <div class=\"mdl-card__title pa-0\">"+
      "                  <a target=\""+post.post_target+"\" href=\""+post.post_url+"\">"+
      "                    <div class=\"blog-img blog-1\" style=\""+img_style+"height: 150px;\"></div>"+
      "                  </a>"+
      "                </div>"+
      "                <div class=\"mdl-card__supporting-text relative\" style=\"padding-bottom: 10px;\">"+
      "                  <span class=\"blog-cat\"><b>Posted in:</b> "+post.post_in+"</span>"+
      "                  <a target=\""+post.post_target+"\" href=\""+post.post_url+"\">"+
      "                    <h4 class=\"mt-15 mb-10\">"+post.post_title+"</h4>"+
      "                  </a>"+
      "                  <p>"+post.post_excerpt.slice(0, 130)+"</p>"+
      "                  <a target=\""+post.post_target+"\" href=\""+post.post_url+"\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect "+post.zmdi_color+" mdl-shadow--8dp\">"+
      "                    <i class=\"zmdi zmdi-"+post.zmdi+"\" style=\"font-size: 35px;margin-left: -7px;\"></i>"+
      "                  </a>"+
      "                </div>"+
      "                <div class=\"mdl-card__actions mdl-card--border\">"+
      "                  <span class=\"blog-post-date inline-block\">"+post_date_to_show+"</span>"+
      "                  <div class=\"mdl-layout-spacer\"></div>"+
      "                </div>"+
      "              </div>"+
      "            </div>";
      document.getElementById("mixed_posts").insertAdjacentHTML('beforeend',html_to_return);
    });
  }
}

function show_spotify(spotify_data){
  if(spotify_data.playing.is_playing){
    document.getElementById("spotify_now_playing").insertAdjacentHTML('beforeend','<span class="ref-name mb-5 mt-20">'+spotify_data.playing.last_song.song+'</span> - '+spotify_data.playing.last_song.artists);
  }else{
    if(spotify_data.playing.last_song){
      document.getElementById("spotify_now_playing").insertAdjacentHTML('beforeend','<span class="ref-name mb-5 mt-20">(pausa)  </span>'+spotify_data.playing.last_song.song+' - '+spotify_data.playing.last_song.artists);
    }else{
      document.getElementById("spotify_now_playing").insertAdjacentHTML('beforeend',"---nada---");
    }
  }
  if(spotify_data.top_songs.response=="ok"){
    var songslist=spotify_data.top_songs.songs;
    for (const [key, value] of Object.entries(songslist)) {
      if (value.song){
        document.getElementById("spotify_top_song").insertAdjacentHTML('beforeend','<li><span class="ref-name mb-5 mt-20">'
          +value.song+'</span> - '+value.artists+'</li>'
        );
      }
    }
  }else{
    document.getElementById("spotify_top_song").insertAdjacentHTML('beforeend',"<li>---nada---</li>");
  }
  if(spotify_data.top_artists.response=="ok"){
    var artistslist=spotify_data.top_artists.artists;
    for (const [key, value] of Object.entries(artistslist)) {
      document.getElementById("spotify_top_artists").insertAdjacentHTML('beforeend','<li><span class="ref-name mb-5 mt-20">'
          +value+'</span></li>'
      );
    }
  }else{
    document.getElementById("spotify_top_artists").insertAdjacentHTML('beforeend',"<li>---nada---</li>");
  }
}
/* Muestra mi edad de forma dinamica */
var element_edad=document.getElementById("edad");
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
var mescumple=2;
var meshoy=currentMonth;
var anocumple=1994;
var anohoy=currentYear;
if(meshoy>=mescumple){
  element_edad.innerHTML=anohoy-anocumple;
}else{
  element_edad.innerHTML=anohoy-anocumple-1;
}
