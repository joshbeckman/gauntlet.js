Gauntlet.js
-----------------------------------------------

A wrapper and configuration tool to seamlessly handle multiple Google Analytics accounts.

It's small enough (~2kb) to use without worry. It can even be used just for a single GA account at a time to simply clean and modularize your code.

## Is it any good?

You bet.

## Usage

It's as easy as adding [one javascript file](https://github.com/jbckmn/gauntlet.js/blob/master/dist/gauntlet.min.js) to your document, and defining the Google Analytics profiles to which you will send data.

````html
<script type="text/javascript" 
  src="/gauntlet.min.js">
</script>
<script type="text/javascript">
  if (Gauntlet) {
    // Let's list out our accounts
    var myGauntlet = new Gauntlet({
      accounts:[
        {
          profile: 'UA-XXXXX-XX',
          domain: 'auto',
          name: 'ProductAccount'
        },
        {
          profile: 'UA-XXXXX-XX',
          domain: 'example.com',
          name: 'BrandAccount'
        }
      ],
      custom: {
        'dimension1': 'custom dimension data',
        'metric2': 'custom metric data'
      },
      displayFeatures: true
    });
  }
</script>
````

Alternatively, you can download the Gauntlet source and bundle/minify it into your own source code. It plays nicely with your other source files.

## Author

[Joshua Beckman](http://www.andjosh.com): [@jbckmn](https://twitter.com/jbckmn)

## License

Licensed under [MIT](https://github.com/jbckmn/gauntlet.js/blob/master/LICENSE).