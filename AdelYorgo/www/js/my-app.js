Template7.registerHelper('placeholder', function (plchldrContent) {
    var ret = 'placeholder="' + plchldrContent + '"';
    return ret;
});

// Initialize app
var myApp = new Framework7({
    swipeBackPage: false,
    swipePanelOnlyClose: true,
    template7Pages: true,
    pushState: true,
    smartSelectBackText: 'Tamam',

    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


function onOffline() {
    myApp.alert('İnternet bağlantısı yok.', function () {
        navigator.app.exitApp();
    });
}


function loadPage(pageName) {
    var pgUrl = pageName + '.html';
    mainView.router.load({
        url: pgUrl,
    });

}

setTimeout(function() {

    checkLoginStatus();

}, 1000);


function checkLoginStatus() {

    var userLoggedIn = window.localStorage.getItem("isLogin");

    try {
        if (userLoggedIn == "1") {
            loadPage('main');

        } else {
            loadPage('login');
        }
    } catch (e) {
        myApp.alert(e);
    }

}

$$(document).on('offline', function() {
    onOffline();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'login') {
        $$('.btnLogin').on('click', function() {
            var pass = $$('#txtPassword').val();
            var response = login(pass);

            if (response != 'NOK') {
                window.localStorage.setItem("garson", response);
                window.localStorage.setItem("isLogin", "1");
                checkLoginStatus();
            } else {
                window.localStorage.setItem("isLogin", "0");

            }

        });

    }

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})