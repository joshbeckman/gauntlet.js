// Gauntlet: A wrapper and configuration tool to 
// handle multiple Google Analytics accounts
// Version 1.0.0
// Author: Joshua Beckman | @jbckmn
// Author URI: http://www.andjosh.com

(function(window,document){
  'use strict';
  var Gauntlet = function(options){
    var defaults = {
      linkId: false,
      displayFeatures: false,
      accounts: [],
      version: 'universal',
      dry: true
    };
    if (!options) {
      throw new Error('A options object is required for Gauntlet to initialize. It should look something like: ' + JSON.stringify(defaults));
    }
    this.opt = extend(options, defaults);
    this.throw();
  };
  Gauntlet.prototype = {
    throw: function() {
      if (!this[this.opt.version]) {
        throw new Error('A valid Google Analytics script name (universal or classic) is required for Gauntlet to initialize.');
      }
      if (this.opt.accounts.length < 1 || !this.opt.accounts[0].profile) {
        throw new Error('At least one analytics account is required for Gauntlet to initialize.');
      }
      if (this.opt.dry) {
        this[this.opt.version].call(this);
      }
      this[this.opt.version + 'Assets'].call(this);
      this[this.opt.version + 'View'].call(this);
    },
    universal: function(){
      function isogram(i,s,o,g,r,a,m){
        i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
      }
      isogram(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    },
    classic: function(){
      var ga = document.createElement('script'); 
      ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; 
      s.parentNode.insertBefore(ga, s);
    },
    universalAssets: function(){
      if(this.opt.displayFeatures){
        window.ga('require', 'displayfeatures');
      }
      if(this.opt.linkId){
        window.ga('require', 'linkid', 'linkid.js');
      }
    },
    universalView: function(){
      window.ga('create', this.accounts[0].profile, this.accounts[0].domain);
      window.ga('send', 'pageview');
      for (var i = 1; i < this.accounts.length; i++) {
        window.ga('create', this.accounts[i].profile, this.accounts[i].domain, {'name': (this.accounts[i].name || i.toString())});
        window.ga(this.accounts[i].name + '.send', 'pageview');
      }
    },
    classicAssets: function(){
      return false;
    },
    classicView: function(){
      window._gaq.push(['_setAccount', this.accounts[0].profile]);
      window._gaq.push(['_trackPageview']);
      for (var i = 1; i < this.accounts.length; i++) {
        window._gaq.push([(this.accounts[i].name || i.toString()) + '._setAccount', this.accounts[i].profile]);
        window._gaq.push([(this.accounts[i].name || i.toString()) + '._trackPageview']);
      }
    }
  };
  // Fills in empty values in the first argument with values
  // found in subsequent arguments
  function extend (obj) {
    var i, def, n;
    for (i = 1; i < arguments.length; i++) {
      def = arguments[i];
      for (n in def) {
        if (obj[n] === undefined) { obj[n] = def[n]; }
      }
    }
    return obj;
  }
  window.Gauntlet = Gauntlet;
})(this, this.document);
