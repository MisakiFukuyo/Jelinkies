Jelinkies - Simple JavaScript value-link library
=========================================================

## Classes

### Jelinkies#constructor(initialValue)

Make linkable value.

#### initialValue

Link objective value at first,can set any type.

### Jelinkies#constructor(captureTargert,captureMethod,insertMethod)

#### captureTargert

Any types cpture target.

#### captureMethod

Function of has a argument,this function should return link objective.

#### insertMethod

Function of has two arguments,first argument is captureTarget itself,second argument is inserted value,this function should assign value to link objective.

### JelinkiesDual#constructor(linkableValueA,linkableValueB)

Creaete bi-direction link

#### linkableValueA,B

Linkable values.

## Usage(Sample code)

    // single diction value

    var initial = 10;

    var simpleLink = new Jelinkies(initial);

    var linked;

    simpleLink.onSignaledActions.push(function(l){linked = l});

    console.log(simpleLink.linkedValue());

    simpleLink.linkedValue(15);

    console.log(simpleLink.linkedValue());
    console.log(linked);

    // single direction caputure

    var foo = {
      something:3
    };

    var somthingOuter = 0;

    var fooLink = new Jelinkies(foo,function(t){return t.something;},function(c,v){c.something = v;});

    fooLink.onSignaledActions.push(function(l){somthingOuter = l});

    console.log(fooLink.linkedValue());

    fooLink.linkedValue(5);

    console.log(fooLink.linkedValue());
    console.log(somthingOuter);

    // bi direction caputure

    var bar = {
      something:3
    }

    var baz = {
      another:10
    }

    var barLink = new Jelinkies(bar,function(t){return t.something},function(c,v){c.something = v});
    var bazLink = new Jelinkies(baz,function(t){return t.another},function(c,v){c.another = v});

    var dualLink = new JelinkiesDual(barLink,bazLink);

    console.log(barLink.linkedValue());
    console.log(bazLink.linkedValue());

    barLink.linkedValue(5);

    console.log(bar.something);
    console.log(baz.another);

    bazLink.linkedValue(12);

    console.log(bar.something);
    console.log(baz.another);

## License

Zlib License.

See LICENSE.md
