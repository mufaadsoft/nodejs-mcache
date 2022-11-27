# NodeJS Tag Caching (MTagCache)

You can boot the speed of NodeJS application data fetching by using MTagCache in a organized way.



## How to use

````
const TC = require('mtagcache');
var val = TC.createCache(param-1, param-2, param-3, param-4)

//param-1 => 'Key-for-cache'
//param-2 => TTL in seconds (cache expiry time)
//param-3 => function() with return value
//param-4 => tags if required to oraganize (directory structure to store that cache file). parse it as an array

````

### Example


#### Create cache with directory structure

````
const TC = require('mtagcache');
var val = TC.createCache('john-ray', (60*10), function(){

    $fetch = {name: "John Ray", age: "12", role_id: 1, phoneNumber: "012345678910"};
    return $fetch;

}, ["user", "profile"]);

console.log({ name: val.name, age: val.age, role: val.role_id, phone_number: val.phoneNumber });
````


#### Create cache without directory structure

````
const TC = require('mtagcache');
var val = TC.createCache('john-ray', (60*10), function(){

    $fetch = {name: "John Ray", age: "12", role_id: 1, phoneNumber: "012345678910"};
    return $fetch;

});

console.log({ name: val.name, age: val.age, role: val.role_id, phone_number: val.phoneNumber });
````

### How to remove cache data 

````
const TC = require('mtagcache');
TC.remove(param-1);
````

### Example

#### Remove cache which was without directory structure

````
const TC = require('mtagcache');
TC.remove('john-ray');
````


#### Remove cache which was with directory structure

````
const TC = require('mtagcache');
TC.remove('john-ray', ['user', 'profile']);
````


#### Remove cache with tags

````
const TC = require('mtagcache');
TC.remove(null, ['user']); ///will remove all the user cache dependants
````
