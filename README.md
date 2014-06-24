![JigMagga](media/img/jigMagga.jpg)

JigMagga
========

_JigMagga_ is a widget based configuration file driven frontend JavaScript MVC framework.

It uses all technologies of [bitovi JavaScript MVC](https://github.com/bitovi/javascriptmvc) ([CanJS], [steal], [funcunit], [documentJS])
  but replaces the core JavaScript MVC parts such as the generator and the deployment by [Grunt] tasks and serverside workers.

Widgets in JigMagga are called jigs. They can be rendered in the frontend application or because of SEO requirements, get 
  (additionally) prerendered on serverside. This can be decided in the configuration. This means that _JigMagga_ is designed to *not* be 
  a single page application framework. It produces a lot of prerendered pages with an optimal frontend application on each page.

For styling there is an on the fly SASS compiler bundled.

JigMagga has its own build in [Grunt] webserver, but can also be used with Apache.

For deploying, a [Grunt] task is used. It generates one merged and minified JS file and one CSS file.
 
The HTML is generated by workers that can be either called directly or be triggered by a [RabbitMQ].

All static files (HTML, JS, CSS and other assets) are stored to a CDN.

_JigMagga_ is built for SEO compatible multi language multi domain sites with a huge load.

[Grunt]: http://gruntjs.com/
[CanJS]: https://github.com/bitovi/canjs "CanJS in GitHub"
[steal]: https://github.com/bitovi/steal "steal in GitHub"
[funcunit]: https://github.com/bitovi/funcunit "funcunit in GitHub"
[documentJS]: https://github.com/bitovi/documentjs "documentJS in GitHub"
[RabbitMQ]: http://www.rabbitmq.com/
[nodeJS]: http://nodejs.org/

Who uses JigMagga?
------------------

![lieferando](http://www.lieferando.de/yd/media/img/yd-jig-header/logo-big-dach.png)
![pyszne.pl](http://pyszne.pl/yd/media/img/yd-jig-header/logo-big-pl.png)
![lieferservice.de](http://www.lieferando.de/yd/media/img/yd-jig-header/logo-big-lieferservice.de.png)

Example configuration for generating pages
------------------------------------------

This is currently the workflow at all takeaway plattforms that use _JigMagga_.

![JigMagga](media/img/jigMaggaWorkflow.jpg)

It uses several queues and workers generating the different domains and pushing the pages to the CDN
 
![JigMagga](media/img/jigMaggaWorkflow.jpg)

Getting started
===============

_JigMagga_ is easy to install and works without any special environment but [nodeJS] and [git](http://git-scm.com/) 
  if you want to update your local version. You can also download _JigMagga_ as a [ZIP file](https://github.com/yourdelivery/JigMagga/archive/master.zip).  
  We didn't yet test in on windows, but this should also work.  
  To run the [Grunt] processes easier, you can install grunt-cli globally (use sudo in debian and MacOS based system).

    npm install -g grunt-cli

Installation
------------

To install JigMagga clone the repository and run `npm install`

    git clone git@github.com:yourdelivery/JigMagga.git JigMagga
    cd JigMagga
    npm install
        
Start JigMagga
--------------

To start JigMagga webserver just type

        grunt connect
        
It should automatically open your browser. If it doesn't go to `http://0.0.0.0:8000`.

If you run it the first time it shows this file. After you created a project, it shows the first index page.
 
Generate projects, pages and jigs
=================================

To generate your project just call

        grunt generate
        
The generator will guide you through the generation of parts of your project.

Generating a new project
------------------------

To generate a project only a namespace is needed. Choose a short namespace, because this namespace Is not only used in the 
  JavaScript code, but also in CSS and HTML. It will make your code longer. A two letter namespace is a good choice.

The generator will make a new project folder in the main _JigMagga_ folder. Inside the folder it will generate a new pages 
  folder with a default domain folder and an index page folder and an index page.

As _JigMagga_ is config based, it creates config files in page folder and index folder. The project wide page configuration 
  will contain the namespace. The page config contains an empty object for jigs.

The index HTML page will contain the call to the JS and over that to the config and some sections that use the _JigMagga_ grid.

After the project is generated, grunt connect will call the new index page instead of this readme.md file.


Generating a domain
-------------------

When generating a domain you have to give the namespace and a domain name. The domain name can contain a slash if you want 
  to group domains in folders. 

The generator will now generate the domain folder with the corresponding config file in the pages folder. 

Generating a page
-----------------

Generating a page also requests for the namespace and a name of the page. It also asks in which domain the page should get 
  rendered.

If you want to group pages, you can use slashes to create folders.

The generated config file is empty. The generated JavaScript file just contains a steal of the config file. The HTML page 
  contains sample HTML.

Generating a jig
----------------
To generate a Jig, the namespace, a jig name and a page to render the jig in is needed.
 
The generator will add the initial jig configuration in the selected page.
  
The generator generates a the initial jig and two pages to run the testcases. Also the initial testcase JavaScript file 
  is generated.

Generating a model
------------------

Generating of a model only needs a namespace and a name for the model. It will generate a folder in the models folder, named 
  as the model. In the folder there is an empty model JavasScript, a testcase JavaScript and a testcase HTML page.

Generating a locale
-------------------

Locales are generated by domain. The `.po` files resist in the locales folder. Locales should be named in the form en_EN 
  (lowercase language, uppercase country).

When generating a locale for a domain, the locale gets inserted in the domain config.

Generating a repository
-----------------------

When creating a project, the namespace folder is put into the `.gitignore` file. With the generate repository option, the 
  project folder can be put into github as a repository.

Stealing files
==============

_JigMagga_ uses bitovi's [Steal] for the dependency management in the frontend application. [Steal] is built upon [SystemJS](https://github.com/systemjs/systemjs) 
  and can map files to plugins.

Steal comes bundled with plugins for CSS, [LESS](http://lesscss.org), [EJS](http://embeddedjs.com/), [Mustache](http://mustache.github.io/) 
  and [CoffeeScript](http://coffeescript.org/). 

_JigMagga_ adds plugins for [gettext](http://de.wikipedia.org/wiki/GNU_gettext) `.po` files, [SASS](http://sass-lang.com/) 
  and _JigMagga_ configuration files.

    steal(
        "can/control",
        "./css/init.scss",
        "./views/init.mustache",
        function (can) {
            $("body").html(can.view("./views/init.mustache");
        }
    );
This will convert the SASS file "init.scss" and puts it in the HTML file head. Then it will convert the Mustache 
  template "./views/init.mustache" to HTML and puts it into the body.

The file stealconfig.js in the root directory contains the following mapping.

    ext: {
            scss: "steal-types/sass/sass.js",
            less: "steal-types/less/less.js",
            ejs: "can/view/ejs/ejs.js",
            mustache: "can/view/mustache/mustache.js",
            coffee: "steal/coffee/coffee.js",
            conf: "steal-types/conf/conf.js",
            po: "steal-types/po/po.js"
    }

Stealing a conf file mostly makes sense when doing it as the first steal in a page. See next chapter for config files.

Normally the po file for a page gets stealed by the conf file plugin and not by itself. See the locales chapter for more 
  information.

When stealing a SASS or LESS file after stealing a config file, it is possible to define SASS or LESS variables in the config.  
  Therefore the steal LESS plugin is not called directly. It then also renders the current domain and locale to SASS.

    sass: {
        "color1": "#FFFFFF",
        "color0": "#000000"
    }
When namespace is "jm" the above results in the following code placed at the beginning of every SASS import.

    $color1: #FFFFFF;
    $color0: #000000;
    $jm-domain: domain.com
    $jm-locale: en_EN


Pages and config files
======================

The configuration files are the heart of _JigMagga_. They define and start jigs. Normally one configuration file is stealed 
  at the beginning of the application. The application itself stays empty.

        steal('./index.conf');

A configuration file is a simple JSON file with the extension `conf`. It holds the configuration for pages and jigs and 
  can store everything else you need in your namespace.

The configuration is built in a hierarchical system. A normal setup with a namespace called `jm` and one domain called `domain1.com`
  looks like this:

    jm/
        page/
            default/
                index/
                    index.conf
                    index.html
                    index.js
            domain1.com/
                index/
                    index.conf
                domain1.com.conf
            page.conf
        
This describes a namespace with a single domain and a single index page. The root configuration is the `page.conf`. 
  It normally only holds the namespace definition.

    {
        "namespace": "jm"
    }
    
The domain configuration file `domain1.com.conf` contains the pages configuration. If we would have two locales `en_EN` 
  and `fr_FR` it will look like this:

    {
        "pages": {
            "index": {"en_EN": "/", "fr_FR": "/fr/}
        }
    }

That means after the deploy process this singe index page will get deployed for English under `http://domain1.com/` and 
  for French under `http://domain1.com/fr/`.
  The domain.conf is also a good place to define domain wide includes and SASS variables:

    {
        "pages": {...}
        "includes": ["/jm/lib/lib1.js", "/jm/lib/lib2.js"]
        "sass": {
            "mobilepage": true,
            "header-color": "#FF0000"
        }
    }
    
Includes can also be set to ignore when they shouldn't be included in the built frontend application. 
Please see the chapter fixtures for an example. 

The hierarchical system
-----------------------

The page configuration mainly holds the jigs configuration for one page. 
  That doesn't mean that the jig config can only reside in a page configuration. 
  It can reside on every config file in the hierarchy. 
  If one jig like the header should get rendered on every page in the namespace, 
  you can define it in the `page.conf`. If all pages in the domain `domain1.com` should have the same footer,
  you can define them in the `domain1.com.conf`.

The configuration plugin always bubbles through the whole tree to one page in default mode and in domain mode. 
  It starts with the `page.conf` of a name space and merges first all configs together up to the given page in 
  the default folder and then merges all configs up to the given page in the domain folder of the given domain.
  Merging is done with a deep extend functionality.  
  Levels in the tree without a config file just don't get merged.

If you call `grunt connect` it opens the first index page in the first domain, if it exists.

If the HTML page in the page folder under the domain folder doesn't exist, it uses the one on the default folder.

Jigs
====

Jigs are widgets. Why don't we call them "widget"? Because we wanted a very short name, 
  as we use the path to a widget as the CSS class name. Too long names pollute the HTML files.

Jigs are [CanJS] controllers. Controllers are needed to glue the view to the models. Controllers are responsible for user 
  inputs and events in general. They shouldn't contain the business logic.

Normally every jig has its own initial mustache (or EJS) template and a SASS file (or CSS or LESS). A jig gets stored in 
  the `jig` folder. 
  On generation the system generates locally an own page, a config and a [funcunit] testcase. So jigs can be designed and 
  tested independently from pages.
  A jig called `header` with the JavaScript namespace `Jm.Jig.Header` and the CSS namespace `jm-jig-header` will contain 
  the following files:
 
    jm/
        jig/
            header/
                css/
                    header.scss
                views/
                    init.mustache
                header.conf
                header.html
                header.js
                header_test.js
                funcunit.html
                
The main file in this jig is `header.js`. It could look like the following. All the other files in the root directory of 
the jig are there for testing the jig.

    steal('core/control', function (can) {
        "use strict";
    
        /**
         * @class Jm.Jig.Header
         */
        can.Control.extend('Jm.Jig.Header',
            /** @Static */
            {
                defaults : {
                    template: "//jm/jig/header/views/init.mustache"
                }
            },
            /** @Prototype */
            {
                init : function () {
                    this.element.html(can.view(this.options.template));
                }
            });
    });
    
This header jig is an extended [CanJS] controller stored under `Jm.Jig.Header`.
  It can be instantiated and rendered into the DOM element defined by the CSS class "jm-jig-header" by calling the following. 

    new Jm.Jig.Header(".jm-jig-header");
    
There are two blocks in the jig. One is for static variables and methods, the other one is used in the instantiated jigs.
  Mainly important in the static part is the `defaults` object. Here are the options stored that come from the instantiation. 
  It is also the place where the options from the config and the template is stored. It can also easily store _JigMagga_ models
  to trigger model events (see events and models).  
  The following will do the same as above, but it defines a different template, that overwrites the default template.

    new Jm.Jig.Header(".jm-jig-header", {
        template: "//jm/jig/header/views/loggedIn.mustache"
    });

The `init` method in the second block is called after instantiation. Normally it renders the view. The DOM element where 
  the jig is rendered into is always reachable by `this.element`. It is a jQuery element. Normally it is used to render 
  a [CanJS] view into the page (see views).
  
[CanJS] controllers are very powerful. You can use the whole functionality in _JigMagga_ jigs. Please take a look at the API documentation
at [canjs.com/docs/](http://canjs.com/docs/can.Control.html)

Jigs in the config files
------------------------

When using _JigMagga_ you don't instantiate jigs manually unless jigs should not get instantiated on page load (see below).
  Jigs and their views are either rendered on page load within the frontend application and/or on server side. 
  On server side the controller is not needed, as on server side we don't have any events and user inputs. 
  On server side only the connections to the model and some view helpers are needed in the view.
  
When a config is loaded by the _JigMagga_ frontend application or by the _JigMagga_ workers, the jigs get either instantiated 
  by the frontend app or the template of the jig is rendered by the worker after calling the needed API calls. A normal configuration
  for a jig looks like the following.
  
    {
        "jigs" : {
            ".jm-jig-header" : {
                "controller" : "Jm.Jig.Header",
                "template": "jm/jig/header/views/init.mustache",
                "css" : "jm/jig/header/css/header.scss",
                "render": true,
                "prerender": true
            }
        }
    }

It is easily visible that the jig uses the controller `Jm.Jig.Header` with the template `jm/jig/header/views/init.mustache`
  and the SASS styles from `jm/jig/header/css/header.scss`. Most interesting are the flags `render` and `prerender`.  
  `prerender` tells the worker what to do with the jig. If it is set to true, the worker renders the view
  (after calling the API calls, if given).  
  `render` tells the frontend application to include the jig code in the frontend application and instantiate the jig on page load.  
  The default values for `render` and `prerender` are `true`. This is only useful if the jigs contain SEO relevant information
  and have to additionally handle events in the frontend. **Handle this with care!** Jigs without user inputs or events
  should be set to `"render": false` to not grow up the frontend application JavaScript file and on the other hand Jigs 
  that are not SEO relevant don't have to grow up the HTML source.
  
Options
-------

To set jig options in the config file simply do the following.

    {
        "jigs" : {
            ".jm-jig-header" : {
                "controller" : "Jm.Jig.Header",
                "template": "jm/jig/header/views/init.mustache",
                "css" : "jm/jig/header/css/header.scss",
                "options": {
                    "headline": "This is a special headline only used in this page configuration"
                },
                "render": false,
                "prerender": false,
                "includeController": true
            }
        }
    }

The option `headline` in a instantiated jig is available as `this.options.headline`. As `render` and `prerender` in this example
  are set to `false` it looks like this jig is never rendered or instantiated, and that is true. Normally it won't get included
  in the frontend application. There's another flag for letting it be included in the frontend application without being instantiated:
  `includeController` tells the builder, to include it in the application. The jig can now be instantiated by an event or user input.
  To get the jig instantiated from inside another jig and still getting the options from the config file you can call the
  controller method `renderJig`.
   
        this.renderJig(".jm-jig-header");

It is also possible to choose a different selector than given in the configuration and send extra options.

        this.renderJig(".jm-jig-header", ".jig-jig-header-second-run", {
            "headline": "This is a special headline only used for a later instantiation",
            "extra": "Extra information only used for a later instantiation"
        });

Views
-----

To render the standard jig template in a jig all you have to do is the following.

    this.element.html(can.view(this.options.template));
    
Templates can be built with [can.stache (better mustache for CanJS)](http://canjs.com/docs/can.stache.html) or [can.ejs](http://canjs.com/docs/can.ejs.html).

If you want to send data to the view you can give an object of data.

    this.element.html(can.view(this.options.template, {
        headline: this.options.headline,
        customer: customerModel
    }));

In the view the data is now reachable by `{{headline}}` (mustache) or rather `<%= headline %>` (EJS).
If you send an observable object like a model to the view, the view gets automatically updated when the model gets updated
(`{{customer.name}}` for mustache or `<%= customer.name %>` in EJS).

Links to other pages listed in the domain config can be rendered by the following and are then working in develop mode
and in the published page.

    <%= pageLink("index") %>

Please check the [can.view](http://canjs.com/docs/can.view.html) documentation for the full functionality.
 
Events
------

Jigs are controllers that handle user inputs and other events. To bind any jQuery event in jig's DOM element to a method,
all you have to do is add the event to the prototype block of the jig.

    /** @Prototype */
    {
        init : function () {
            this.element.html(can.view(this.options.template));
        },
        ".jm-jig-header-customer-name click": function(el, ev) {
            el.html("you clicked this DOM element");
        }
    }
    
It is also possible to listen to changes in an observable object like a model. The most elegant form is to set the model
in the jig options and call `this.on()`.

        {
            init : function () {
                ...
                this.options.customer = customerInstance;
                this.on();
            },
            "{customer} name change": function(el, ev, attr, how, newVal, oldVal) {
                this.element.find(".jm-jig-header-customer-name").html(newVal);
            },
            "{customer} name remove": function() {
                this.element.find(".jm-jig-header-customer-name").html("Username deleted");
            }
        });
        
Please check the [CanJS events documentation](http://canjs.com/docs/can.event.html) to get more information.

Routing
-------

Routes are a special form of jig events. They are used to transport information through changing the browser's `location.hash` property. 
CanJS uses the route behind a hash bang `#!`. 

Managing the routing through the browser's `location.hash` property has the advantage to be able to switch through configurations of the current page
  by using the browser back and forward button. To initialize routes you can put a routing object in the jig configuration.

        ".jm-jig-header": {
            "controller": "Yd.Jig.Header",
            "options": {
                "routes": {
                    "register": {
                        "view": "register"
                    },
                    "login": {
                        "view": "login"
                    },
                    "login/forgotpassword": {
                        "view": "login"
                    },
                    "logout": {
                        "view": "logout"
                    }
                }
            }
        }

The given routes are now available in the jig events (they can be used in all active jigs).

    steal(
        'can/control/route',
        function (can) {
            "use strict";
    
            /**
              * @class Yd.Jig.Header
              */
            can.Control.extend('Yd.Jig.Header',
                /** @Static */
                {
                    defaults: {}
                },
                /** @Prototype */
                {
                    init: function () {
                        this.element.html(can.view(this.options.template));
                    },
                    "{can.route} view change": function (el, ev, attr, how, newVal, oldVal) {
                        // check newVal for the wanted view and show the expected dialogs
                    },
                    "{can.route} forgotpassword add": function () {
                        // show additionally a forgotpassowrd input dialog
                    },
                    "{can.route} forgotpassword remove": function () {
                        // remove a forgotpassowrd input dialog
                    }
                }
            });
        });
        
Please check the [CanJS routing documentation](http://canjs.com/docs/can.route.html) to get more information.


Models
======

_JigMagga_ models are observable objects that can easily connect to APIs.

Please check the [CanJS model documentation](http://canjs.com/docs/can.Model.html) and the [CanJS map documentation](http://canjs.com/docs/can.Map.html)
for more information on the base functionality.

_JigMagga_ extends the CanJS functionality by few methods that are able to handle locally stored data.
For this it uses the library jStorage.
 
The CanJS models are only useful in one controller. If the application needs the data in more than one controller, it has to
fetch the data again from the API.

As jigs shouldn't connect to the API too often, the data is stored locally and shared. The CanJS calls [can.Model.findOne()](http://canjs.com/docs/can.Model.findOne.html) 
and [can.Model.findAll()](http://canjs.com/docs/can.Model.findAll.html) can be replaced by `can.Model.findOneCached()` and
`can.Model.findAllCached()`. They use the same parameters, but when you call one of the methods again with the same `params` parameter,
it doesn't connect to the API but uses the local stored data. You can also use `can.Model.getCurrent()` to get the last stored data
of a model with the recently used parameters. If you define a model called `Jm.Model.Customer` as done below,

    steal('core/model', function () {
        "use strict";

        can.Model.extend('Jm.Model.Customer',
            {
                findAll: "api/customers",
                findOne: function (params) {
                    return can.ajax({
                        url: "api/customers/" + params.id,
                    });
                }
            }
        }
    }

you could use the following methods.

    Jm.Model.Customer.findOneCached({
            id: 1000
        },
        function (customer) {
            // success method
        },
        function (error) {
            // error method
        });
    Jm.Model.Customer.getCurrent(function (customer) {
            // success method with the same data as in the findOneCached method if it was called before
        });

    Jm.Model.Customer.findAllCached({
        },
        function (customers) {
            // success method
        },
        function (error) {
            // error method
        });
    Jm.Model.Customer.getCurrent(function (customers) {
            // success method with the same data as in the findAllCached method if it was called before
        });

You can easily store the model data to the local storage to use it even after page reload by using the following.

    Jm.Model.Customer.findAllCached({
        },
        function (customers) {
            customers.store()
        });
        
In the next `Jm.Model.Customer.getCurrent()` call the model data is fetched from the jStorage. This works down to Internet Explorer 6.

If you want to clear the model data, you can use `flush()` on the model data. It then gets removed from the global scope and from the local storage.

    Jm.Model.Customer.findAllCached({
        },
        function (customers) {
            customers.flush()
        });


Live binding
------------

All CanJS models and maps implement observable objects that can be used in the view for live binding.

If you send a model to a view you can change the data using [attr()](http://canjs.com/docs/can.Map.prototype.attr.html)
and it will instantly update the view.

    Jm.Model.Customer.getCurrent(function (customer) {
        customer.attr("loggedin", true);
        self.element.html(can.view(self.options.template, {
            customer: customer
        })
    );

    //self.options.template
    //<div>Name: {{customer.name}}</div>
    //<div>Logged in: {{#customer.loggedin}}Yes{{/customer.loggedin}}{{^customer.loggedin}}No{{/customer.loggedin}}
    
    logout = function () {
        customer.attr("name", "secret"}
        customer.removeAttr("loggedin");
    };

Late live binding
-----------------

When a big jig, for example a huge list of customers, gets rendered on worker side, it might make sense to not render it again
in the frontend application, because that takes too long.

The trick is now how to bind the existing view to a live binding. _JigMagga_ does it by setting some data attributes into the DOM.

    <ul>
      {{#each customers}}
        <li class="jm-latebinding" data-bindingtype="tag" data-bindingattr="{{@index}}.name">{{.name}}</li>
      {{/each}}
    </ul>
    
Now you can call `triggerlateLiveBinding()` in the jig and the livebinding is connected to the DOM.

    customers.findLivebindingsInDom(self.element.find(".jm-latebinding"));
    customers.bindLateLiveBinding();
    
Binding types can be:
- "tag"
- "class"

Predefined worker data
----------------------

The config files can contain API calls that are used when rendering a jig on serverside.

    ".jm-jig-customers": {
        "controller": "Jm.Jig.Customers",
        "template": "yd/jig/customers/views/init.mustache",
        "apicalls": {
            "customer": {
                "method": "get",
                "path": "api/customers",
                "predefined": true,
                "resultSchema": "//jm/fixture/schema/customers.json"
            }
        }
    }
    
The HTML worker is now calling `GET api/customers` before rendering the template. The result of the API call is stored in
the HTML page in `Jm.predefined.customer` and is globally accessible. You now may want to prefer the predefined data instead
 of calling the API in the model.
 
     findAll: function (params, success, error) {
         if (Jm.predefined.customer !== undefined) {
             success(new Jm.Models.Customer.List(Yd.predefined.customer));
         } else {
             can.ajax({
                 url: "api/customers",
                 success: function (data) {
                     success(new Jm.Models.Customer.List(data));
                 },
                 error: error
             });
         }
     }
     
The resultSchema can be used to check the validity of the API result.  
If you want to pass params from the worker to the API call you can add a request schema to the API call definition.

    "requestSchema": "//jm/fixture/schema/request/customers.json"

All params that are defined here are sent to the API with the call. It is also checked if required parameters are initialized.
The worker will throw an error on undefined required parameters. 

Using fixtures
--------------

In the development environment it is normally not wanted, that the system is calling the API. Also not in testcases.  
For this it is possible to use mock data, in CanJS they are called [fixtures](http://canjs.com/docs/can.fixture.html).

You can add a fixture file to the `page.conf` includes. They will automatically get stripped out in deploy process.
 
     "includes": [
         {
             "id": "//jm/fixture/fixtures.js",
             "ignore": true
         }
     ]
     
A simple fixture definition looks like this.
 
     steal("can/util/fixture", function () {
         can.fixture("GET /api/customers", "//jm/fixture/data/customers.json");
     )}
     
The fixture file `jm/fixture/data/customers.json` should have the same JSON format as a real API call woud have. In the model
nothing more has to be done. Every call to `GET /api/customers` will now automatically result in the content of the given file.
The API isn't called any more.

In bigger teams with an own API team it is a good choice to define the interface by defining fixture files and the corresponding
 result schema and request schema files. Schema files can easily be generated with the [JSON schema genarator](http://www.jsonschema.net/).

Using locales
=============

_JigMagga_ uses sprintf.js by Ash Searle and gettext.js by Joshua I. Miller.

The gettext functionality is only used in development mode and in build and deployment process. All `_()` functions are replaced
by the equivalent `sprintf()` function with the replaced msgid. This is done while loading all JavaScript files.
For this the systemJS JavaScript plugin is extended.

The po file is loaded by the configuration file plugin. As the po file has to be loaded before any files with translations
 it doesn't make sense to steal it later in the process.

Jig interaction
===============

Mediator (TBD)

Styling with SASS
=================

For styling we use [SASS](http://sass-lang.com/) (Syntactically Awesome Style Sheets). It is a CSS extension library which adds features like color functions, variables and other useful stuff.
In addition to the .scss file of each jig there are two main files for global styling:

- `jm-scss.scss` => Here are all the functions, mixins and variables you need. It's a sort of a configuration file and is included (@include) in every jig and in our `jm-core.scss`.
- `jm-core.scss` => The `jm-core.scss` holds the global used styles like link colors, headlines, predefined boxes and our [grid](#grid).

We've already put some predefined mixins into `jm-scss.scss` to make it easier for you to start.

It's recommended to always use the `jm-` prefix for classed and ids. So you can avoid problems with stylesheets of external plugins or something like that.

As already mentioned every jig got it's own .scss file. This should be only used for jig related styling. Every class from `jm-core.scss` or every function from `jm-scss.scss` could be used for extending the jig styles.
For jig styling you should use a namespace convention like `.jm-jig-yourjigname-elementname`. So it will be easier for you to find your styles or to debug your code. It's also helpful to avoid conflicts with other jig styles.

At last here is a short example of what you can do with SASS in _JigMagga_:

###### jm-scss.scss

    $font-family-primary: 'Roboto', sans-serif;
    $font-weight-bold: 700;
    
    @mixin jm-headline-big {
        font-family: $font-family-primary;
        font-weight: $font-weight-bold;
        font-size: 32px;
    }

###### jm-core.scss

    .headline {
        @include jm-headline-big();
        color: #f00;
    }

###### compiled output

    .headline {
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 32px;
        color: #f00;
    }
    
For detailed information about SASS please have a look at the [SASS documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)


Grid
====

We created a 24-column grid to make positioning easier.

![JigMagga](media/img/jm-grid.png)

Just create the following HTML-structure to use the grid:

    <div class="jm-grid">
        <div class="jm-grid-06"></div>
        <div class="jm-grid-03"></div>
        <div class="jm-grid-07"></div>
        <div class="jm-grid-08"></div>
    </div>
    
If you want to use gaps or a offset between the boxes you have to add one of the following classes:

- jm-grid-gap-l => gap on the left side
- jm-grid-gap-r => gap on the right side
- jm-grid-gap-b => gap on both sides
- jm-off-xx => xx colums offset (replace xx with a number from 01 to 23)

Here's an example for that:

    <div class="jm-grid">
        <div class="jm-grid-06 jm-grid-gap-l"></div>
        <div class="jm-grid-03 jm-grid-gap-b"></div>
        <div class="jm-grid-07"></div>
        <div class="jm-grid-05 jm-off-03"></div>
    </div>

The slot system
===============

We also got a slot system for dynamically setting the position where a jig should be rendered.
The following example will show you how to add the "header jig" to your desired element in your HTML page.
In this case we want to append the "header jig" to the header area of our index page.

###### index.html

    <div class="jm-header">
        <div class="jm-grid"></div>
    </div>
    <div class="jm-content">
        <div class="jm-grid"></div>
    </div>
    <div class="jm-footer">
        <div class="jm-grid"></div>
    </div>
    
###### index.conf
 
    ".jm-jig-header": {
        "controller": "Jm.Jig.Header",
        "template": "jm/jig/header/views/init.ejs",
        "slot" : {
            "parent" : ".jm-header .jm-grid",
            "insertAsChild": "append",
            "classes" : [
                "put",
                "some",
                "additional",
                "classes",
                "in",
                "here"
            ]
        },
        "options": {
            "some": "options"
        }
    }

###### output HTML

    <div class="jm-header">
        <div class="jm-grid">
            <section class="jm-jig-header your-additional-classes">
                <!-- Your content of "jm/jig/header/views/init.ejs" -->
            </section>
        </div>
    </div>
    <div class="jm-content">
        <div class="jm-grid"></div>
    </div>
    <div class="jm-footer">
        <div class="jm-grid"></div>
    </div>
    
###### Explanation:
The configuration key `".jm-jig-header"` is used as the main class for the rendered object. The controller and template configuration are already described in [here](#jigs-in-the-config-files).
Inside the slot config of a jig you can set a parent. That's the element where the jig gets appended or prepended. Depends on your "insertAsChild" settings. Default setting for that is "append".
In "classes" you can add additional CSS classes just as you want. You can also add [grid](#grid) classes to set the wanted position of your jig. If you want to add some options please have a look at the [howto](#options).

Images
======

Images are stored in:

    /jm/media/img
    
It's recommended to put global used images in that main folder. For every image that will be only used by a jig you should create a folder like that:

    /jm/media/img/jm-jig-yourjigname
    
That should give you a better overview of your files and will match the namespace conventions. Keep in mind that this is just a suggestion. Feel free to organize your images in another way.

Testing
=======

For testing _JigMagga_ use [funcunit] which is an extension for [Qunit](http://qunitjs.com/).
Every jig has a `funcunit.html` page that represents the Qunit test suite.
This page will load a `*_test.js` JavaScript file from the jig which includes the test implementation.
Make sure that your browser doesn't block popups. The `*_test.js` will open a new window with the jig environment.
You can run the testcases manually by opening the `funcunit.html` page of the jig in your favourite browser.
It is also possible to run the testcases from the command line with [testem](https://github.com/airportyh/testem) 
or use the grunt task `grunt test`.
The configuration for testem is located in testem.json in the _JigMagger_ root directory.

Naming conventions for testcases
--------------------------------

- Module names have to have a dot notation eg. `Jm.Jig.Header`


Building the project
====================

Building the project is done by Grunt

        grunt build
        
The build process builds one JavaScript file and one CSS file per page and uploads it to the CDN. The generation of HTML pages is done by the HTML worker.  

HTML-Workers
------------

TBD
- static pages
- queue
- dynamic pages (using "{url}")
- caching of JSON files to the CDN
- childpages

You want to join the JigMagga team?
===================================

Please take a look at our Jobs page at [lieferando](http://www.lieferando.de/jobs).
If you want to use JigMagga and want to make bug fixes and improvements, we are welcome for [pull requests](https://help.github.com/articles/using-pull-requests).

Coding conventions
------------------
* Use 4 spaces instead of tabs.
* Commas last.
* Use double quotes instead of single quotes where possible.

License
=======
_JigMagga_ is released under the MIT licence. 
