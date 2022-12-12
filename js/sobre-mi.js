function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
var publicaciones_default_tuhmbnail="https://via.placeholder.com/460x272?text=404";
var publicaciones_to_show=[];

publicaciones_to_show.push(  {
    'post_id':"youtube-hc-1",
    'post_img':'https://i.ytimg.com/vi/Ha10rcusar8/hqdefault.jpg',
    'post_url':'https://www.youtube.com/watch?v=Ha10rcusar8',
    'post_date':new Date('2020-01-02T21:55:12Z'),
    'post_title':'Snowboard tranquilo con amigos en El Colorado',
    'post_in':'y/gasparuribe',
    'zmdi':'youtube-play',
    'zmdi_color':'bg-red-red',
    'post_text':'Amigos y nieve timelapse.',
  });

/* Get Youtube Data */
var yp_posts={
                  "kind": "youtube#hardcoded",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "Ha10rcusar8"
                  },
                  "snippet": {
                      "publishedAt": "2020-01-02T21:55:12Z",
                      "channelId": "UCROWLUGzdMcvvDYheVZBOUQ",
                      "title": "Snowboard tranquilo con amigos en El Colorado",
                      "description": "Amigos y nieve timelapse.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/Ha10rcusar8/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/Ha10rcusar8/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/Ha10rcusar8/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "Gaspar Uribe",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-01-02T21:55:12Z"
                  }
              };



/* Get Reddit Data */
async function getRedditJSON(){
  return fetch('https://www.reddit.com/user/gasparuribe/submitted.json')
  .then(handleErrors)
  .then((response) => response.json())
  .then(function(recived){
    var reddit_response=recived.data.children;
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
        console.log(postMedia);
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
        texto=post.data.selftext;
      }
      return_obj.push(  {
          'post_id':"r-"+reddit_forcount,
          'post_img':post_thumbnail,
          'post_url':post_url,
          'post_date':new Date(post.data.created_utc * 1000),
          'post_title':post.data.title,
          'post_in':post.data.subreddit_name_prefixed,
          'zmdi':'reddit',
          'zmdi_color':'bg-orange',
          'post_text':texto,
        });
    });
    return return_obj;
  });
}


async function joinPosts(){
  var reddit_arr = await getRedditJSON();
  reddit_arr.forEach((post)=>{
    publicaciones_to_show.push(post);
  });
  /* Preparar publicaciones */
  console.log(publicaciones_to_show);
  publicaciones_to_show.sort(function(a,b){
    var aa= Date.parse(new Date(a.post_date));
    var bb= Date.parse(new Date(b.post_date));
    return bb - aa;
  });
  console.log(publicaciones_to_show);

  /* Show publicaciones */
  document.getElementById("mixed_posts").innerHTML="";
  if(publicaciones_to_show<1){
    document.getElementById("mixed_posts").innerHTML="<span style=\"padding: 35px;font-size: 18px;\">El usuario aún no publica, aquí aparecerá cuando lo haga.</span>";
  }else{
    publicaciones_to_show.forEach((post)=>{
      var post_data="";
      var img_style="background: transparent url(\'"+post.post_img+"\') repeat scroll center center/cover;";
      var html_to_return=""+
      "            <div class=\"slide\" id=\"slide-"+post.post_id+"\" data-postCategory=\"\" style=\""+post_data+"\">"+
      "              <div class=\"col-sm-4 mb-30\" style=\"width: 300px;\">"+
      "              <div class=\"mdl-card mdl-shadow--2dp pa-0\">"+
      "                <div class=\"mdl-card__title pa-0\">"+
      "                  <a target=\"_blank\" href=\""+post.post_url+"\">"+
      "                    <div class=\"blog-img blog-1\" style=\""+img_style+"height: 150px;\"></div>"+
      "                  </a>"+
      "                </div>"+
      "                <div class=\"mdl-card__supporting-text relative\" style=\"padding-bottom: 10px;\">"+
      "                  <span class=\"blog-cat\"><b>Posted in:</b> "+post.post_in+"</span>"+
      "                  <a target=\"_blank\" href=\""+post.post_url+"\">"+
      "                    <h4 class=\"mt-15 mb-10\">"+post.post_title+"</h4>"+
      "                  </a>"+
      "                  <p>"+post.post_text+"</p>"+
      "                  <a target=\"_blank\" href=\""+post.post_url+"\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect "+post.zmdi_color+" mdl-shadow--8dp\">"+
      "                    <i class=\"zmdi zmdi-"+post.zmdi+"\" style=\"font-size: 35px;margin-left: -7px;\"></i>"+
      "                  </a>"+
      "                </div>"+
      "                <div class=\"mdl-card__actions mdl-card--border\">"+
      "                  <span class=\"blog-post-date inline-block\">"+post.post_date.toLocaleString("es-CL", {timeZone: "America/Santiago"})+"</span>"+
      "                  <div class=\"mdl-layout-spacer\"></div>"+
      "                </div>"+
      "              </div>"+
      "            </div>";
      document.getElementById("mixed_posts").insertAdjacentHTML('beforeend',html_to_return);
    });
  }


}
joinPosts();



/* Get and show Spotify Data */
fetch(aws_url+'?action=spotify_data',)
    .then(handleErrors)
    .then((response) => response.json())
    .then(function(data){
      //console.log(data);
      if(data.spotify.playing.is_playing){
        document.getElementById("spotify_now_playing").insertAdjacentHTML('beforeend','<span class="ref-name mb-5 mt-20">'+data.spotify.playing.last_song.song+'</span> - '+data.spotify.playing.last_song.artists);
      }else{
        if(data.spotify.playing.last_song){
          document.getElementById("spotify_now_playing").insertAdjacentHTML('beforeend','<span class="ref-name mb-5 mt-20">(pausa)  </span>'+data.spotify.playing.last_song.song+' - '+data.spotify.playing.last_song.artists);
        }else{
          document.getElementById("spotify_now_playing").insertAdjacentHTML('beforeend',"---nada---");
        }
      }
      if(data.spotify.top_songs.response=="ok"){
        var songslist=data.spotify.top_songs.songs;
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
      if(data.spotify.top_artists.response=="ok"){
        var artistslist=data.spotify.top_artists.artists;
        for (const [key, value] of Object.entries(artistslist)) {
          document.getElementById("spotify_top_artists").insertAdjacentHTML('beforeend','<li><span class="ref-name mb-5 mt-20">'
              +value+'</span></li>'
          );
        }
      }else{
        document.getElementById("spotify_top_artists").insertAdjacentHTML('beforeend',"<li>---nada---</li>");
      }
    })
.catch(function(err) {
  console.log("Catch Error: "+err);
});
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
