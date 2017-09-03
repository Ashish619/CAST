app.service('dataStore', function($http,$q) {

  var _self = this;
  var per_page=9; // default per page value set 9;
  _self.lastPage = 0;
_self.getRepository = function(technology,search,sort,order,page){

var parse_link_header = function (header) {
    if (header.length === 0) {
        return {last : '&page=0'}
    }

    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}
   return $q(function(resolve, reject) 
   {
     var url = '';
     if(page == undefined){ page= 1}
    if(order == undefined){ order= 'desc'}
     if(sort == undefined){ sort= 'best match'}
     
    if(search == undefined || search == ''){
      
   
      url = 'https://api.github.com/search/repositories?q='+technology+'&sort='+sort+'&order='+order+'&per_page='+per_page+'&page='+page;
        }
    else{

      search = search.trim();
        url = 'https://api.github.com/search/repositories?q='+search+'+language:'+technology+'&sort='+sort+'&order='+order+'&per_page='+per_page+'&page='+page;
      
  }
      $http.get(url).then(function(response){
        var link =parse_link_header( response.headers().link);
        var last = link.last.split('&');
        var lastPage = last[last.length-1].split('=');
        _self.lastPage = lastPage[1];
        
        
        resolve(response);});
   });    
            
}

_self.getUserDetails = function(login){
 return $q(function(resolve, reject) 
   {

var url = 'https://api.github.com/search/users?q='+login;
   $http.get(url).then(function(response){
       var userDetails ;
      for (var i=0; i<response.data.items.length; i++){
        if(response.data.items[i].login == login){
          $http.get(response.data.items[i].url).then( function(response){ userDetails = response.data; resolve(userDetails);});
           
        }
      }
        
       });
     
   })
}





    
});